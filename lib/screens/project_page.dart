import 'package:flutter/material.dart';

import '../models/mobile_models.dart';
import '../services/api_client.dart';
import '../services/biometric_service.dart';
import '../services/location_service.dart';
import 'report_form_page.dart';

class ProjectPage extends StatefulWidget {
  final DalvoProject project;
  const ProjectPage({super.key, required this.project});

  @override
  State<ProjectPage> createState() => _ProjectPageState();
}

class _ProjectPageState extends State<ProjectPage> {
  bool _loading = true;
  bool _actionLoading = false;
  String? _error;
  List<SupervisionReport> _reports = const [];
  AttendanceStatus? _attendance;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final results = await Future.wait([
        ApiClient.instance.reports(widget.project.id),
        ApiClient.instance.attendanceStatus(widget.project.id),
      ]);
      _reports = results[0] as List<SupervisionReport>;
      _attendance = results[1] as AttendanceStatus;
    } catch (error) {
      _error = error.toString();
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _attendanceAction() async {
    if (_actionLoading) return;
    setState(() => _actionLoading = true);
    try {
      final biometric = await BiometricService.verify();
      if (!biometric.verified) return;
      final position = await LocationService.currentPosition();
      final event = (_attendance?.checkedIn ?? false) ? 'SALIDA' : 'ENTRADA';
      final result = await ApiClient.instance.registerAttendance(
        projectId: widget.project.id,
        event: event,
        latitude: position.latitude,
        longitude: position.longitude,
        accuracyMeters: position.accuracy,
        biometricVerified: biometric.verified,
        biometricMethod: biometric.method,
      );
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            '$event registrada · ${result['distanceMeters'] ?? '-'} m del punto del proyecto',
          ),
        ),
      );
      await _load();
    } catch (error) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(error.toString())),
      );
    } finally {
      if (mounted) setState(() => _actionLoading = false);
    }
  }

  Future<void> _newReport() async {
    final created = await Navigator.of(context).push<bool>(
      MaterialPageRoute(
        builder: (_) => ReportFormPage(project: widget.project),
      ),
    );
    if (created == true) await _load();
  }

  @override
  Widget build(BuildContext context) {
    final project = widget.project;
    return Scaffold(
      appBar: AppBar(title: Text(project.folio.isEmpty ? 'Proyecto' : project.folio)),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _newReport,
        icon: const Icon(Icons.add_a_photo_outlined),
        label: const Text('Nuevo reporte'),
      ),
      body: RefreshIndicator(
        onRefresh: _load,
        child: ListView(
          padding: const EdgeInsets.fromLTRB(18, 8, 18, 100),
          children: [
            Card(
              child: Padding(
                padding: const EdgeInsets.all(18),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      project.company,
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(
                            fontWeight: FontWeight.w800,
                          ),
                    ),
                    const SizedBox(height: 6),
                    Text(project.title.isEmpty ? 'Sin descripción' : project.title),
                    const SizedBox(height: 14),
                    Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children: [
                        _InfoPill(icon: Icons.flag_outlined, text: project.state),
                        if (project.po.isNotEmpty)
                          _InfoPill(icon: Icons.receipt_long_outlined, text: project.po),
                        if (project.supervisor.isNotEmpty)
                          _InfoPill(icon: Icons.person_outline, text: project.supervisor),
                      ],
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 14),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(18),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Text(
                      'Chequeo en proyecto',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.w800,
                          ),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      (_attendance?.checkedIn ?? false)
                          ? 'Tienes una entrada activa. La salida volverá a validar ubicación y biometría.'
                          : 'La entrada requiere ubicación dentro del proyecto y confirmación biométrica.',
                    ),
                    const SizedBox(height: 14),
                    FilledButton.icon(
                      onPressed: _actionLoading ? null : _attendanceAction,
                      icon: _actionLoading
                          ? const SizedBox(
                              width: 18,
                              height: 18,
                              child: CircularProgressIndicator(strokeWidth: 2),
                            )
                          : Icon(
                              (_attendance?.checkedIn ?? false)
                                  ? Icons.logout
                                  : Icons.fingerprint,
                            ),
                      label: Padding(
                        padding: const EdgeInsets.symmetric(vertical: 12),
                        child: Text(
                          (_attendance?.checkedIn ?? false)
                              ? 'Registrar salida'
                              : 'Registrar entrada',
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 22),
            Text(
              'Reportes de supervisión',
              style: Theme.of(context).textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w800,
                  ),
            ),
            const SizedBox(height: 10),
            if (_loading)
              const Padding(
                padding: EdgeInsets.all(32),
                child: Center(child: CircularProgressIndicator()),
              )
            else if (_error != null)
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(18),
                  child: Text(_error!),
                ),
              )
            else if (_reports.isEmpty)
              const Card(
                child: Padding(
                  padding: EdgeInsets.all(18),
                  child: Text('Todavía no hay reportes de supervisión para este proyecto.'),
                ),
              )
            else
              ..._reports.map(
                (report) => Padding(
                  padding: const EdgeInsets.only(bottom: 10),
                  child: _ReportCard(report: report),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

class _InfoPill extends StatelessWidget {
  final IconData icon;
  final String text;
  const _InfoPill({required this.icon, required this.text});

  @override
  Widget build(BuildContext context) => Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 7),
        decoration: BoxDecoration(
          color: Theme.of(context).colorScheme.surfaceContainerHighest,
          borderRadius: BorderRadius.circular(999),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 15),
            const SizedBox(width: 6),
            Text(text.isEmpty ? '-' : text),
          ],
        ),
      );
}

class _ReportCard extends StatelessWidget {
  final SupervisionReport report;
  const _ReportCard({required this.report});

  @override
  Widget build(BuildContext context) {
    final date = report.visitDate?.toLocal();
    final dateText = date == null
        ? 'Sin fecha'
        : '${date.day.toString().padLeft(2, '0')}/${date.month.toString().padLeft(2, '0')}/${date.year}';
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    dateText,
                    style: const TextStyle(fontWeight: FontWeight.w800),
                  ),
                ),
                Text('${report.progress?.toStringAsFixed(0) ?? '-'}%'),
              ],
            ),
            const SizedBox(height: 6),
            Text(report.status.replaceAll('_', ' ')),
            const SizedBox(height: 8),
            Row(
              children: [
                const Icon(Icons.photo_camera_outlined, size: 17),
                const SizedBox(width: 5),
                Text('${report.photosCount} foto${report.photosCount == 1 ? '' : 's'}'),
                if (report.incompleteInformation) ...[
                  const SizedBox(width: 14),
                  const Icon(Icons.warning_amber_rounded, size: 17),
                  const SizedBox(width: 5),
                  const Text('Información pendiente'),
                ],
              ],
            ),
          ],
        ),
      ),
    );
  }
}
