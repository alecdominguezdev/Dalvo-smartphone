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
}
