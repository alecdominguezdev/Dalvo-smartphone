import 'dart:convert';
import 'dart:math';

import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;

import '../config/api_config.dart';
import '../models/mobile_models.dart';

class ApiException implements Exception {
  final String message;
  final int? statusCode;
  final String? code;

  const ApiException(this.message, {this.statusCode, this.code});

  @override
  String toString() => message;
}

class ApiClient {
  ApiClient._();
  static final ApiClient instance = ApiClient._();

  static const _storage = FlutterSecureStorage();
  static const _tokenKey = 'dalvo_mobile_token';
  static const _deviceIdKey = 'dalvo_mobile_device_id';

  String? _token;
  MobileUser? currentUser;
  MobileAccessProfile? currentAccess;

  Future<void> initialize() async {
    _token = await _storage.read(key: _tokenKey);
  }

  bool get hasToken => (_token ?? '').isNotEmpty;
  String get bearerToken => _token ?? '';

  Future<String> _deviceId() async {
    final existing = await _storage.read(key: _deviceIdKey);
    if (existing != null && existing.isNotEmpty) return existing;
    final random = Random.secure();
    final bytes = List<int>.generate(24, (_) => random.nextInt(256));
    final value = base64UrlEncode(bytes).replaceAll('=', '');
    await _storage.write(key: _deviceIdKey, value: value);
    return value;
  }

  Map<String, String> _headers({bool auth = true}) => {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        if (auth && hasToken) 'Authorization': 'Bearer $_token',
      };

  Map<String, dynamic> _decode(http.Response response) {
    Map<String, dynamic> body = {};
    try {
      final decoded = jsonDecode(response.body);
      if (decoded is Map<String, dynamic>) body = decoded;
    } catch (_) {}

    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw ApiException(
        '${body['message'] ?? 'No se pudo completar la solicitud.'}',
        statusCode: response.statusCode,
        code: body['code']?.toString(),
      );
    }
    return body;
  }

  Future<Map<String, dynamic>> health() async {
    final response = await http.get(ApiConfig.uri('/health'));
    return _decode(response);
  }

  Future<MobileUser> login(String username, String password) async {
    final response = await http.post(
      ApiConfig.uri('/auth/login'),
      headers: _headers(auth: false),
      body: jsonEncode({
        'username': username.trim(),
        'password': password,
        'deviceId': await _deviceId(),
        'deviceName': 'Dalvo Móvil',
        'platform': 'flutter',
      }),
    );
    final data = _decode(response);
    final token = '${data['token'] ?? ''}';
    if (token.isEmpty) throw const ApiException('La API no devolvió una sesión válida.');
    _token = token;
    await _storage.write(key: _tokenKey, value: token);
    currentUser = MobileUser.fromJson(data['user'] as Map<String, dynamic>);
    if (data['access'] is Map<String, dynamic>) {
      currentAccess = MobileAccessProfile.fromJson(data['access'] as Map<String, dynamic>);
    } else {
      await access();
    }
    return currentUser!;
  }

  Future<MobileUser> me() async {
    final response = await http.get(ApiConfig.uri('/me'), headers: _headers());
    final data = _decode(response);
    currentUser = MobileUser.fromJson(data['user'] as Map<String, dynamic>);
    if (data['access'] is Map<String, dynamic>) {
      currentAccess = MobileAccessProfile.fromJson(data['access'] as Map<String, dynamic>);
    } else {
      await access();
    }
    return currentUser!;
  }

  Future<MobileAccessProfile> access() async {
    final response = await http.get(ApiConfig.uri('/access'), headers: _headers());
    final data = _decode(response);
    currentAccess = MobileAccessProfile.fromJson(
      (data['access'] as Map<String, dynamic>? ?? const <String, dynamic>{}),
    );
    return currentAccess!;
  }

  Future<void> logout() async {
    if (hasToken) {
      try {
        await http.post(ApiConfig.uri('/auth/logout'), headers: _headers());
      } catch (_) {}
    }
    _token = null;
    currentUser = null;
    currentAccess = null;
    await _storage.delete(key: _tokenKey);
  }

  Future<List<DalvoProject>> projects({String search = ''}) async {
    final response = await http.get(
      ApiConfig.uri('/projects', search.trim().isEmpty ? null : {'search': search.trim()}),
      headers: _headers(),
    );
    final data = _decode(response);
    final rows = (data['projects'] as List? ?? const []);
    return rows
        .whereType<Map<String, dynamic>>()
        .map(DalvoProject.fromJson)
        .toList();
  }

  Future<List<SupervisionReport>> reports(int projectId) async {
    final response = await http.get(
      ApiConfig.uri('/projects/$projectId/reports'),
      headers: _headers(),
    );
    final data = _decode(response);
    final rows = (data['reports'] as List? ?? const []);
    return rows
        .whereType<Map<String, dynamic>>()
        .map(SupervisionReport.fromJson)
        .toList();
  }

  Future<int> createReport({
    required int projectId,
    required double progress,
    required String workDone,
    required String pending,
    required String incidents,
    required String observations,
    required bool incompleteInformation,
    required String missingInformation,
    required double latitude,
    required double longitude,
    required double accuracyMeters,
  }) async {
    final response = await http.post(
      ApiConfig.uri('/projects/$projectId/reports'),
      headers: _headers(),
      body: jsonEncode({
        'progress': progress,
        'workDone': workDone.trim(),
        'pending': pending.trim(),
        'incidents': incidents.trim(),
        'observations': observations.trim(),
        'incompleteInformation': incompleteInformation,
        'missingInformation': missingInformation.trim(),
        'latitude': latitude,
        'longitude': longitude,
        'accuracyMeters': accuracyMeters,
      }),
    );
    final data = _decode(response);
    return int.tryParse('${data['reportId'] ?? 0}') ?? 0;
  }

  Future<void> uploadPhotos({
    required int projectId,
    required int reportId,
    required List<String> filePaths,
  }) async {
    if (filePaths.isEmpty) return;
    final request = http.MultipartRequest(
      'POST',
      ApiConfig.uri('/projects/$projectId/reports/$reportId/photos'),
    );
    request.headers['Accept'] = 'application/json';
    request.headers['Authorization'] = 'Bearer $_token';
    for (final filePath in filePaths) {
      request.files.add(await http.MultipartFile.fromPath('photos', filePath));
    }
    final streamed = await request.send();
    final response = await http.Response.fromStream(streamed);
    _decode(response);
  }

  Future<void> submitReport(int reportId) async {
    final response = await http.post(
      ApiConfig.uri('/reports/$reportId/submit'),
      headers: _headers(),
    );
    _decode(response);
  }

  Future<AttendanceStatus> attendanceStatus(int projectId) async {
    final response = await http.get(
      ApiConfig.uri('/projects/$projectId/attendance/status'),
      headers: _headers(),
    );
    return AttendanceStatus.fromJson(_decode(response));
  }

  Future<Map<String, dynamic>> registerAttendance({
    required int projectId,
    required String event,
    required double latitude,
    required double longitude,
    required double accuracyMeters,
    required bool biometricVerified,
    required String biometricMethod,
  }) async {
    final response = await http.post(
      ApiConfig.uri('/projects/$projectId/attendance'),
      headers: _headers(),
      body: jsonEncode({
        'event': event,
        'latitude': latitude,
        'longitude': longitude,
        'accuracyMeters': accuracyMeters,
        'biometricVerified': biometricVerified,
        'biometricMethod': biometricMethod,
        'deviceId': await _deviceId(),
      }),
    );
    return _decode(response);
  }

  Future<AttendanceStatus> attendanceOverview() async {
    final response = await http.get(
      ApiConfig.uri('/attendance/status'),
      headers: _headers(),
    );
    return AttendanceStatus.fromJson(_decode(response));
  }

  Future<List<AttendanceMovement>> attendanceHistory({int limit = 50}) async {
    final response = await http.get(
      ApiConfig.uri('/attendance/history', {'limit': '$limit'}),
      headers: _headers(),
    );
    final data = _decode(response);
    return (data['history'] as List? ?? const [])
        .whereType<Map<String, dynamic>>()
        .map(AttendanceMovement.fromJson)
        .toList();
  }

  Future<Map<String, dynamic>> checkAttendance({
    required String event,
    required double latitude,
    required double longitude,
    required double accuracyMeters,
    required bool biometricVerified,
    required String biometricMethod,
  }) async {
    final response = await http.post(
      ApiConfig.uri('/attendance/check'),
      headers: _headers(),
      body: jsonEncode({
        'event': event,
        'latitude': latitude,
        'longitude': longitude,
        'accuracyMeters': accuracyMeters,
        'biometricVerified': biometricVerified,
        'biometricMethod': biometricMethod,
        'deviceId': await _deviceId(),
      }),
    );
    return _decode(response);
  }

  Future<List<AttendanceUser>> attendanceUsers({String search = ''}) async {
    final response = await http.get(
      ApiConfig.uri('/admin/attendance/users', {'search': search.trim()}),
      headers: _headers(),
    );
    final data = _decode(response);
    return (data['users'] as List? ?? const [])
        .whereType<Map<String, dynamic>>()
        .map(AttendanceUser.fromJson)
        .toList();
  }

  Future<List<AttendanceLocation>> attendanceLocations({String search = ''}) async {
    final response = await http.get(
      ApiConfig.uri('/admin/attendance/locations', {'search': search.trim()}),
      headers: _headers(),
    );
    final data = _decode(response);
    return (data['locations'] as List? ?? const [])
        .whereType<Map<String, dynamic>>()
        .map(AttendanceLocation.fromJson)
        .toList();
  }

  Future<void> saveAttendanceLocation({
    int? locationId,
    required String name,
    required double latitude,
    required double longitude,
    required int radiusMeters,
    required List<int> userIds,
  }) async {
    final uri = locationId == null
        ? ApiConfig.uri('/admin/attendance/locations')
        : ApiConfig.uri('/admin/attendance/locations/$locationId');
    final body = jsonEncode({
      'name': name.trim(),
      'latitude': latitude,
      'longitude': longitude,
      'radiusMeters': radiusMeters,
      'userIds': userIds,
    });
    final response = locationId == null
        ? await http.post(uri, headers: _headers(), body: body)
        : await http.put(uri, headers: _headers(), body: body);
    _decode(response);
  }

  Future<void> deleteAttendanceLocation(int locationId) async {
    final response = await http.delete(
      ApiConfig.uri('/admin/attendance/locations/$locationId'),
      headers: _headers(),
    );
    _decode(response);
  }

  Future<List<AttendanceMovement>> attendanceTeamLogs({String search = '', String date = ''}) async {
    final response = await http.get(
      ApiConfig.uri('/admin/attendance/logs', {
        'search': search.trim(),
        if (date.isNotEmpty) 'date': date,
      }),
      headers: _headers(),
    );
    final data = _decode(response);
    return (data['logs'] as List? ?? const [])
        .whereType<Map<String, dynamic>>()
        .map(AttendanceMovement.fromJson)
        .toList();
  }

  Future<List<DocumentTarget>> documentTargets({
    required String scope,
    String search = '',
  }) async {
    final response = await http.get(
      ApiConfig.uri('/documents/targets', {'scope': scope, 'search': search.trim()}),
      headers: _headers(),
    );
    final data = _decode(response);
    return (data['targets'] as List? ?? const [])
        .whereType<Map<String, dynamic>>()
        .map(DocumentTarget.fromJson)
        .toList();
  }

  Future<Map<String, dynamic>> assignDocuments({
    required String scope,
    required int targetId,
    required String documentType,
    required List<String> filePaths,
    String detail = '',
    double? amount,
    bool amountIncludesTax = false,
    String source = 'archivo',
  }) async {
    final request = http.MultipartRequest('POST', ApiConfig.uri('/documents/assign'));
    request.headers['Accept'] = 'application/json';
    request.headers['Authorization'] = 'Bearer $_token';
    request.fields.addAll({
      'scope': scope,
      'targetId': '$targetId',
      'documentType': documentType,
      'detail': detail.trim(),
      'source': source,
      if (amount != null) 'amount': amount.toStringAsFixed(2),
      if (amount != null) 'amountIncludesTax': amountIncludesTax ? 'true' : 'false',
    });
    for (final filePath in filePaths) {
      request.files.add(await http.MultipartFile.fromPath('files', filePath));
    }
    final response = await http.Response.fromStream(await request.send());
    return _decode(response);
  }

  Future<List<FinancialAccount>> financialAccounts({
    required bool receivable,
    String search = '',
    String state = '',
    String pending = '',
    String company = '',
    String from = '',
    String to = '',
  }) async {
    final path = receivable ? '/finance/receivables' : '/finance/payables';
    final response = await http.get(
      ApiConfig.uri(path, {
        'search': search.trim(),
        if (state.isNotEmpty) 'state': state,
        if (pending.isNotEmpty) 'pending': pending,
        if (company.isNotEmpty) 'company': company,
        if (from.isNotEmpty) 'from': from,
        if (to.isNotEmpty) 'to': to,
      }),
      headers: _headers(),
    );
    final data = _decode(response);
    return (data['accounts'] as List? ?? const [])
        .whereType<Map<String, dynamic>>()
        .map(FinancialAccount.fromJson)
        .toList();
  }

  Future<List<Map<String, dynamic>>> budgets({
    String search = '', String state = '', String status = '', String company = '',
  }) async {
    final response = await http.get(ApiConfig.uri('/budgets', {
      'search': search.trim(),
      if (state.isNotEmpty) 'state': state,
      if (status.isNotEmpty) 'status': status,
      if (company.isNotEmpty) 'company': company,
    }), headers: _headers());
    final data = _decode(response);
    return (data['budgets'] as List? ?? const []).whereType<Map<String, dynamic>>().toList();
  }

  Future<Map<String, dynamic>> budgetFull(int budgetId) async {
    final response = await http.get(ApiConfig.uri('/budgets/$budgetId/full'), headers: _headers());
    return _decode(response);
  }

  Future<void> updateBudgetStatus(int budgetId, String action) async {
    final response = await http.patch(ApiConfig.uri('/budgets/$budgetId/status'), headers: _headers(), body: jsonEncode({'action': action}));
    _decode(response);
  }

  Future<List<Map<String, dynamic>>> purchases({String search = '', String status = ''}) async {
    final response = await http.get(ApiConfig.uri('/purchases', {
      'search': search.trim(), if (status.isNotEmpty) 'status': status,
    }), headers: _headers());
    final data = _decode(response);
    return (data['purchases'] as List? ?? const []).whereType<Map<String, dynamic>>().toList();
  }

  Future<Map<String, dynamic>> purchaseDetail(int orderId) async {
    final response = await http.get(ApiConfig.uri('/purchases/$orderId'), headers: _headers());
    return _decode(response);
  }

  Future<Map<String, dynamic>> financialDetail({required bool receivable, required int accountId}) async {
    final kind = receivable ? 'receivables' : 'payables';
    final response = await http.get(ApiConfig.uri('/finance/$kind/$accountId'), headers: _headers());
    return _decode(response);
  }

  Future<List<Map<String, dynamic>>> tasks({String search = '', String status = '', String priority = ''}) async {
    final response = await http.get(ApiConfig.uri('/tasks', {
      'search': search.trim(), if (status.isNotEmpty) 'status': status, if (priority.isNotEmpty) 'priority': priority,
    }), headers: _headers());
    final data = _decode(response);
    return (data['tasks'] as List? ?? const []).whereType<Map<String, dynamic>>().toList();
  }

  Future<void> updateTaskStatus(int taskId, String status) async {
    final response = await http.patch(ApiConfig.uri('/tasks/$taskId/status'), headers: _headers(), body: jsonEncode({'status': status}));
    _decode(response);
  }

  Future<Uri> temporaryFileUrl({required String scope, required int fileId}) async {
    final response = await http.post(ApiConfig.uri('/files/$scope/$fileId/open'), headers: _headers());
    final data = _decode(response);
    final uri = Uri.tryParse('${data['url'] ?? ''}');
    if (uri == null || !uri.hasScheme) throw const ApiException('No se pudo preparar la vista del archivo.');
    return uri;
  }

  Future<Uri> temporaryExportUrl(String kind) async {
    final response = await http.post(ApiConfig.uri('/exports/$kind/open'), headers: _headers());
    final data = _decode(response);
    final uri = Uri.tryParse('${data['url'] ?? ''}');
    if (uri == null || !uri.hasScheme) throw const ApiException('No se pudo preparar la exportación.');
    return uri;
  }

  Future<List<BudgetApproval>> budgetApprovals({String search = ''}) async {
    final response = await http.get(
      ApiConfig.uri('/approvals/budgets', {'search': search.trim()}),
      headers: _headers(),
    );
    final data = _decode(response);
    return (data['approvals'] as List? ?? const [])
        .whereType<Map<String, dynamic>>()
        .map(BudgetApproval.fromJson)
        .toList();
  }

  Future<Map<String, dynamic>> approveBudget(int quoteId) async {
    final response = await http.post(
      ApiConfig.uri('/approvals/budgets/$quoteId/approve'),
      headers: _headers(),
    );
    return _decode(response);
  }

  Future<List<TeamAttendance>> teamAttendance({String search = '', String? date}) async {
    final response = await http.get(
      ApiConfig.uri('/attendance/team', {
        'search': search.trim(),
        if ((date ?? '').isNotEmpty) 'date': date!,
      }),
      headers: _headers(),
    );
    final data = _decode(response);
    return (data['attendance'] as List? ?? const [])
        .whereType<Map<String, dynamic>>()
        .map(TeamAttendance.fromJson)
        .toList();
  }

  Future<List<CompanyLocationTarget>> companyLocations({String search = ''}) async {
    final response = await http.get(
      ApiConfig.uri('/admin/company-locations', {'search': search.trim()}),
      headers: _headers(),
    );
    final data = _decode(response);
    return (data['locations'] as List? ?? const [])
        .whereType<Map<String, dynamic>>()
        .map(CompanyLocationTarget.fromJson)
        .toList();
  }

  Future<CompanyLocationTarget> saveCompanyLocation({
    required int companyId,
    int? branchId,
    required String name,
    required double latitude,
    required double longitude,
    required int radiusMeters,
  }) async {
    final response = await http.put(
      ApiConfig.uri('/admin/company-locations'),
      headers: _headers(),
      body: jsonEncode({
        'companyId': companyId,
        'branchId': branchId,
        'name': name.trim(),
        'latitude': latitude,
        'longitude': longitude,
        'radiusMeters': radiusMeters,
      }),
    );
    final data = _decode(response);
    return CompanyLocationTarget.fromJson(
      data['location'] as Map<String, dynamic>? ?? const <String, dynamic>{},
    );
  }

  Future<void> deactivateCompanyLocation(int locationId) async {
    final response = await http.delete(
      ApiConfig.uri('/admin/company-locations/$locationId'),
      headers: _headers(),
    );
    _decode(response);
  }

  Future<OperationsSummary> operationsSummary() async {
    final response = await http.get(
      ApiConfig.uri('/reports/summary'),
      headers: _headers(),
    );
    final data = _decode(response);
    return OperationsSummary.fromJson(
      data['summary'] as Map<String, dynamic>? ?? const <String, dynamic>{},
    );
  }
}
