class MobileUser {
  final int id;
  final String name;
  final String username;
  final String role;

  const MobileUser({
    required this.id,
    required this.name,
    required this.username,
    required this.role,
  });

  factory MobileUser.fromJson(Map<String, dynamic> json) => MobileUser(
        id: int.tryParse('${json['id'] ?? 0}') ?? 0,
        name: '${json['name'] ?? ''}',
        username: '${json['username'] ?? ''}',
        role: '${json['role'] ?? ''}',
      );

  String get displayName => name.trim().isEmpty ? username : name.trim();
  String get initials {
    final parts = displayName.split(RegExp(r'\s+')).where((e) => e.isNotEmpty).toList();
    if (parts.isEmpty) return 'D';
    if (parts.length == 1) return parts.first.substring(0, 1).toUpperCase();
    return '${parts.first.substring(0, 1)}${parts.last.substring(0, 1)}'.toUpperCase();
  }
}

class DalvoModuleAccess {
  final String key;
  final String label;
  final String permission;
  final bool allowed;
  final bool mobileAvailable;

  const DalvoModuleAccess({
    required this.key,
    required this.label,
    required this.permission,
    required this.allowed,
    required this.mobileAvailable,
  });

  factory DalvoModuleAccess.fromJson(Map<String, dynamic> json) => DalvoModuleAccess(
        key: '${json['key'] ?? ''}',
        label: '${json['label'] ?? ''}',
        permission: '${json['permission'] ?? ''}',
        allowed: json['allowed'] == true,
        mobileAvailable: json['mobileAvailable'] == true,
      );
}

class DalvoBranchAccess {
  final int id;
  final String company;
  final String name;
  final String level;
  final List<String> permissions;

  const DalvoBranchAccess({
    required this.id,
    required this.company,
    required this.name,
    required this.level,
    required this.permissions,
  });

  factory DalvoBranchAccess.fromJson(Map<String, dynamic> json) => DalvoBranchAccess(
        id: int.tryParse('${json['id'] ?? 0}') ?? 0,
        company: '${json['company'] ?? ''}',
        name: '${json['name'] ?? ''}',
        level: '${json['level'] ?? ''}',
        permissions: (json['permissions'] as List? ?? const [])
            .map((e) => e.toString())
            .where((e) => e.isNotEmpty)
            .toList(),
      );
}

class MobileAccessProfile {
  final List<String> permissions;
  final List<DalvoModuleAccess> modules;
  final List<DalvoBranchAccess> branches;
  final bool canUseSupervision;

  const MobileAccessProfile({
    required this.permissions,
    required this.modules,
    required this.branches,
    required this.canUseSupervision,
  });

  factory MobileAccessProfile.fromJson(Map<String, dynamic> json) => MobileAccessProfile(
        permissions: (json['permissions'] as List? ?? const [])
            .map((e) => e.toString())
            .where((e) => e.isNotEmpty)
            .toList(),
        modules: (json['modules'] as List? ?? const [])
            .whereType<Map<String, dynamic>>()
            .map(DalvoModuleAccess.fromJson)
            .toList(),
        branches: (json['branches'] as List? ?? const [])
            .whereType<Map<String, dynamic>>()
            .map(DalvoBranchAccess.fromJson)
            .toList(),
        canUseSupervision: json['canUseSupervision'] == true,
      );

  List<DalvoModuleAccess> get allowedModules => modules.where((e) => e.allowed).toList();
}

class DalvoProject {
  final int id;
  final String folio;
  final String company;
  final String title;
  final String area;
  final String po;
  final String state;
  final String status;
  final String supervisor;
  final String? lastReportState;
  final double? lastProgress;
  final DateTime? lastReportAt;

  const DalvoProject({
    required this.id,
    required this.folio,
    required this.company,
    required this.title,
    required this.area,
    required this.po,
    required this.state,
    required this.status,
    required this.supervisor,
    this.lastReportState,
    this.lastProgress,
    this.lastReportAt,
  });

  factory DalvoProject.fromJson(Map<String, dynamic> json) => DalvoProject(
        id: int.tryParse('${json['id'] ?? 0}') ?? 0,
        folio: '${json['folio'] ?? ''}',
        company: '${json['company'] ?? ''}',
        title: '${json['title'] ?? ''}',
        area: '${json['area'] ?? ''}',
        po: '${json['po'] ?? ''}',
        state: '${json['state'] ?? ''}',
        status: '${json['status'] ?? ''}',
        supervisor: '${json['supervisor'] ?? ''}',
        lastReportState: json['lastReportState']?.toString(),
        lastProgress: json['lastProgress'] == null
            ? null
            : double.tryParse('${json['lastProgress']}'),
        lastReportAt: json['lastReportAt'] == null
            ? null
            : DateTime.tryParse('${json['lastReportAt']}'),
      );
}

class SupervisionReport {
  final int id;
  final int projectId;
  final String supervisor;
  final DateTime? visitDate;
  final double? progress;
  final String workDone;
  final String pending;
  final String incidents;
  final String observations;
  final bool incompleteInformation;
  final String missingInformation;
  final String status;
  final int photosCount;

  const SupervisionReport({
    required this.id,
    required this.projectId,
    required this.supervisor,
    required this.visitDate,
    required this.progress,
    required this.workDone,
    required this.pending,
    required this.incidents,
    required this.observations,
    required this.incompleteInformation,
    required this.missingInformation,
    required this.status,
    required this.photosCount,
  });

  factory SupervisionReport.fromJson(Map<String, dynamic> json) => SupervisionReport(
        id: int.tryParse('${json['id'] ?? 0}') ?? 0,
        projectId: int.tryParse('${json['projectId'] ?? 0}') ?? 0,
        supervisor: '${json['supervisor'] ?? ''}',
        visitDate: json['visitDate'] == null ? null : DateTime.tryParse('${json['visitDate']}'),
        progress: json['progress'] == null ? null : double.tryParse('${json['progress']}'),
        workDone: '${json['workDone'] ?? ''}',
        pending: '${json['pending'] ?? ''}',
        incidents: '${json['incidents'] ?? ''}',
        observations: '${json['observations'] ?? ''}',
        incompleteInformation: json['incompleteInformation'] == true,
        missingInformation: '${json['missingInformation'] ?? ''}',
        status: '${json['status'] ?? ''}',
        photosCount: int.tryParse('${json['photosCount'] ?? 0}') ?? 0,
      );
}

class AttendanceStatus {
  final bool checkedIn;
  final Map<String, dynamic>? lastEvent;
  final List<AttendanceLocation> locations;

  const AttendanceStatus({
    required this.checkedIn,
    this.lastEvent,
    this.locations = const [],
  });

  factory AttendanceStatus.fromJson(Map<String, dynamic> json) => AttendanceStatus(
        checkedIn: json['checkedIn'] == true,
        lastEvent: json['lastEvent'] is Map<String, dynamic>
            ? json['lastEvent'] as Map<String, dynamic>
            : null,
        locations: (json['locations'] as List? ?? const [])
            .whereType<Map<String, dynamic>>()
            .map(AttendanceLocation.fromJson)
            .toList(),
      );
}

class AttendanceUser {
  final int id;
  final String name;
  final String username;

  const AttendanceUser({required this.id, required this.name, required this.username});

  factory AttendanceUser.fromJson(Map<String, dynamic> json) => AttendanceUser(
        id: int.tryParse('${json['id'] ?? 0}') ?? 0,
        name: '${json['name'] ?? ''}',
        username: '${json['username'] ?? ''}',
      );

  String get displayName => name.trim().isEmpty ? username : name.trim();
}

class AttendanceLocation {
  final int id;
  final String name;
  final double latitude;
  final double longitude;
  final int radiusMeters;
  final bool active;
  final List<AttendanceUser> assignedUsers;

  const AttendanceLocation({
    required this.id,
    required this.name,
    required this.latitude,
    required this.longitude,
    required this.radiusMeters,
    this.active = true,
    this.assignedUsers = const [],
  });

  factory AttendanceLocation.fromJson(Map<String, dynamic> json) => AttendanceLocation(
        id: int.tryParse('${json['id'] ?? 0}') ?? 0,
        name: '${json['name'] ?? ''}',
        latitude: double.tryParse('${json['latitude'] ?? 0}') ?? 0,
        longitude: double.tryParse('${json['longitude'] ?? 0}') ?? 0,
        radiusMeters: int.tryParse('${json['radiusMeters'] ?? 300}') ?? 300,
        active: json['active'] != false,
        assignedUsers: (json['assignedUsers'] as List? ?? const [])
            .whereType<Map<String, dynamic>>()
            .map(AttendanceUser.fromJson)
            .toList(),
      );
}

class AttendanceMovement {
  final int id;
  final String event;
  final int locationId;
  final String locationName;
  final int? userId;
  final String userName;
  final double distanceMeters;
  final bool insideGeofence;
  final DateTime? createdAt;

  const AttendanceMovement({
    required this.id,
    required this.event,
    required this.locationId,
    required this.locationName,
    required this.userId,
    required this.userName,
    required this.distanceMeters,
    required this.insideGeofence,
    required this.createdAt,
  });

  factory AttendanceMovement.fromJson(Map<String, dynamic> json) => AttendanceMovement(
        id: int.tryParse('${json['id'] ?? 0}') ?? 0,
        event: '${json['event'] ?? ''}',
        locationId: int.tryParse('${json['locationId'] ?? 0}') ?? 0,
        locationName: '${json['locationName'] ?? ''}',
        userId: json['userId'] == null ? null : int.tryParse('${json['userId']}'),
        userName: '${json['userName'] ?? ''}',
        distanceMeters: double.tryParse('${json['distanceMeters'] ?? 0}') ?? 0,
        insideGeofence: json['insideGeofence'] != false,
        createdAt: json['createdAt'] == null ? null : DateTime.tryParse('${json['createdAt']}'),
      );
}

class DocumentTarget {
  final int id;
  final String folio;
  final String company;
  final String title;
  final String reference;
  final String state;
  final String status;
  final double amount;

  const DocumentTarget({
    required this.id,
    required this.folio,
    required this.company,
    required this.title,
    required this.reference,
    required this.state,
    required this.status,
    required this.amount,
  });

  factory DocumentTarget.fromJson(Map<String, dynamic> json) => DocumentTarget(
        id: int.tryParse('${json['id'] ?? 0}') ?? 0,
        folio: '${json['folio'] ?? ''}',
        company: '${json['company'] ?? ''}',
        title: '${json['title'] ?? ''}',
        reference: '${json['reference'] ?? ''}',
        state: '${json['state'] ?? ''}',
        status: '${json['status'] ?? ''}',
        amount: double.tryParse('${json['amount'] ?? 0}') ?? 0,
      );
}

class FinancialAccount {
  final int id;
  final int projectId;
  final String folio;
  final String company;
  final String title;
  final String po;
  final String state;
  final String pending;
  final double amount;
  final int filesCount;
  final List<String> fileTypes;

  const FinancialAccount({
    required this.id,
    required this.projectId,
    required this.folio,
    required this.company,
    required this.title,
    required this.po,
    required this.state,
    required this.pending,
    required this.amount,
    required this.filesCount,
    required this.fileTypes,
  });

  factory FinancialAccount.fromJson(Map<String, dynamic> json) => FinancialAccount(
        id: int.tryParse('${json['id'] ?? 0}') ?? 0,
        projectId: int.tryParse('${json['projectId'] ?? 0}') ?? 0,
        folio: '${json['folio'] ?? ''}',
        company: '${json['company'] ?? ''}',
        title: '${json['title'] ?? ''}',
        po: '${json['po'] ?? ''}',
        state: '${json['state'] ?? ''}',
        pending: '${json['pending'] ?? ''}',
        amount: double.tryParse('${json['amount'] ?? 0}') ?? 0,
        filesCount: int.tryParse('${json['filesCount'] ?? 0}') ?? 0,
        fileTypes: (json['fileTypes'] as List? ?? const []).map((e) => '$e').toList(),
      );
}

class BudgetApproval {
  final int id;
  final int projectId;
  final String quote;
  final String projectFolio;
  final String company;
  final String title;
  final int version;
  final String status;
  final double subtotal;

  const BudgetApproval({
    required this.id,
    required this.projectId,
    required this.quote,
    required this.projectFolio,
    required this.company,
    required this.title,
    required this.version,
    required this.status,
    required this.subtotal,
  });

  factory BudgetApproval.fromJson(Map<String, dynamic> json) => BudgetApproval(
        id: int.tryParse('${json['id'] ?? 0}') ?? 0,
        projectId: int.tryParse('${json['projectId'] ?? 0}') ?? 0,
        quote: '${json['quote'] ?? ''}',
        projectFolio: '${json['projectFolio'] ?? ''}',
        company: '${json['company'] ?? ''}',
        title: '${json['title'] ?? ''}',
        version: int.tryParse('${json['version'] ?? 0}') ?? 0,
        status: '${json['status'] ?? ''}',
        subtotal: double.tryParse('${json['subtotal'] ?? 0}') ?? 0,
      );
}

class TeamAttendance {
  final int id;
  final int projectId;
  final String supervisor;
  final String event;
  final double distanceMeters;
  final bool insideGeofence;
  final DateTime? createdAt;
  final String folio;
  final String company;
  final String project;

  const TeamAttendance({
    required this.id,
    required this.projectId,
    required this.supervisor,
    required this.event,
    required this.distanceMeters,
    required this.insideGeofence,
    required this.createdAt,
    required this.folio,
    required this.company,
    required this.project,
  });

  factory TeamAttendance.fromJson(Map<String, dynamic> json) => TeamAttendance(
        id: int.tryParse('${json['id'] ?? 0}') ?? 0,
        projectId: int.tryParse('${json['projectId'] ?? 0}') ?? 0,
        supervisor: '${json['supervisor'] ?? ''}',
        event: '${json['event'] ?? ''}',
        distanceMeters: double.tryParse('${json['distanceMeters'] ?? 0}') ?? 0,
        insideGeofence: json['insideGeofence'] == true,
        createdAt: json['createdAt'] == null ? null : DateTime.tryParse('${json['createdAt']}'),
        folio: '${json['folio'] ?? ''}',
        company: '${json['company'] ?? ''}',
        project: '${json['project'] ?? ''}',
      );
}

class CompanyLocationTarget {
  final int companyId;
  final String company;
  final String companyAddress;
  final int? branchId;
  final String branch;
  final String address;
  final int? locationId;
  final String locationName;
  final double? latitude;
  final double? longitude;
  final int radiusMeters;
  final bool active;
  final DateTime? updatedAt;

  const CompanyLocationTarget({
    required this.companyId,
    required this.company,
    required this.companyAddress,
    required this.branchId,
    required this.branch,
    required this.address,
    required this.locationId,
    required this.locationName,
    required this.latitude,
    required this.longitude,
    required this.radiusMeters,
    required this.active,
    required this.updatedAt,
  });

  factory CompanyLocationTarget.fromJson(Map<String, dynamic> json) => CompanyLocationTarget(
        companyId: int.tryParse('${json['companyId'] ?? 0}') ?? 0,
        company: '${json['company'] ?? ''}',
        companyAddress: '${json['companyAddress'] ?? ''}',
        branchId: json['branchId'] == null ? null : int.tryParse('${json['branchId']}'),
        branch: '${json['branch'] ?? ''}',
        address: '${json['address'] ?? ''}',
        locationId: json['locationId'] == null ? null : int.tryParse('${json['locationId']}'),
        locationName: '${json['locationName'] ?? ''}',
        latitude: json['latitude'] == null ? null : double.tryParse('${json['latitude']}'),
        longitude: json['longitude'] == null ? null : double.tryParse('${json['longitude']}'),
        radiusMeters: int.tryParse('${json['radiusMeters'] ?? 300}') ?? 300,
        active: json['active'] == true,
        updatedAt: json['updatedAt'] == null ? null : DateTime.tryParse('${json['updatedAt']}'),
      );

  bool get configured => active && latitude != null && longitude != null;
}

class OperationsSummary {
  final int projects;
  final int pendingPayables;
  final double payableAmount;
  final int pendingReceivables;
  final double receivableAmount;
  final int draftSupervisionReports;

  const OperationsSummary({
    required this.projects,
    required this.pendingPayables,
    required this.payableAmount,
    required this.pendingReceivables,
    required this.receivableAmount,
    required this.draftSupervisionReports,
  });

  factory OperationsSummary.fromJson(Map<String, dynamic> json) => OperationsSummary(
        projects: int.tryParse('${json['projects'] ?? 0}') ?? 0,
        pendingPayables: int.tryParse('${json['pendingPayables'] ?? 0}') ?? 0,
        payableAmount: double.tryParse('${json['payableAmount'] ?? 0}') ?? 0,
        pendingReceivables: int.tryParse('${json['pendingReceivables'] ?? 0}') ?? 0,
        receivableAmount: double.tryParse('${json['receivableAmount'] ?? 0}') ?? 0,
        draftSupervisionReports: int.tryParse('${json['draftSupervisionReports'] ?? 0}') ?? 0,
      );
}
