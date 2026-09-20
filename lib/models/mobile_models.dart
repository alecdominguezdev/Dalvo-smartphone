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

  const AttendanceStatus({required this.checkedIn, this.lastEvent});

  factory AttendanceStatus.fromJson(Map<String, dynamic> json) => AttendanceStatus(
        checkedIn: json['checkedIn'] == true,
        lastEvent: json['lastEvent'] is Map<String, dynamic>
            ? json['lastEvent'] as Map<String, dynamic>
            : null,
      );
}
