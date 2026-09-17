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

  factory SupervisionReport.fromJson(Map<String, dynamic> json) =>
      SupervisionReport(
        id: int.tryParse('${json['id'] ?? 0}') ?? 0,
        projectId: int.tryParse('${json['projectId'] ?? 0}') ?? 0,
        supervisor: '${json['supervisor'] ?? ''}',
        visitDate: json['visitDate'] == null
            ? null
            : DateTime.tryParse('${json['visitDate']}'),
        progress: json['progress'] == null
            ? null
            : double.tryParse('${json['progress']}'),
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

  factory AttendanceStatus.fromJson(Map<String, dynamic> json) =>
      AttendanceStatus(
        checkedIn: json['checkedIn'] == true,
        lastEvent: json['lastEvent'] is Map<String, dynamic>
            ? json['lastEvent'] as Map<String, dynamic>
            : null,
      );
}
