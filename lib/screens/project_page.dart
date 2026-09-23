import 'package:flutter/material.dart';

import '../models/mobile_models.dart';
import '../services/api_client.dart';
import '../theme/dalvo_theme.dart';
import '../widgets/dalvo_widgets.dart';
import 'report_form_page.dart';

class ProjectPage extends StatefulWidget {
  final DalvoProject project;
  const ProjectPage({super.key, required this.project});

  @override
  State<ProjectPage> createState() => _ProjectPageState();
}

class _ProjectPageState extends State<ProjectPage> {
  bool _loading = true;
  String? _error;
  List<SupervisionReport> _reports = const [];

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
      _reports = await ApiClient.instance.reports(widget.project.id);
    } catch (error) {
      _error = error.toString();
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _newReport() async {
    final created = await Navigator.of(context).push<bool>(
      MaterialPageRoute(builder: (_) => ReportFormPage(project: widget.project)),
    );
    if (created == true) await _load();
  }

  @override
  Widget build(BuildContext context) {
    final project = widget.project;
    final progress = (project.lastProgress ?? 0).clamp(0, 100).toDouble();
    final closed = project.state.trim().toLowerCase() == 'cerrada';

    return Scaffold(
      appBar: AppBar(
        title: Text(project.folio.isEmpty ? 'Proyecto' : project.folio),
      ),
      body: RefreshIndicator(
        onRefresh: _load,
        child: ListView(
          physics: const AlwaysScrollableScrollPhysics(),
          padding: const EdgeInsets.fromLTRB(18, 8, 18, 112),
          children: [
            DalvoAnimatedEntry(
              child: Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: DalvoColors.ink,
                  borderRadius: BorderRadius.circular(14),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          width: 48,
                          height: 48,
                          decoration: BoxDecoration(
                            color: DalvoColors.primary,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: const Icon(Icons.business_center_outlined, color: Colors.white),
                        ),
                        const SizedBox(width: 13),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                project.company.isEmpty ? 'Proyecto Dalvo' : project.company,
                                style: Theme.of(context).textTheme.titleLarge?.copyWith(color: Colors.white),
                              ),
                              const SizedBox(height: 5),
                              Text(
                                project.title.isEmpty ? 'Sin descripción' : project.title,
                                style: const TextStyle(color: Color(0xFFB8C1C6), height: 1.35),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 18),
                    Wrap(
                      spacing: 7,
                      runSpacing: 7,
                      children: [
                        _DarkBadge(
                          icon: closed ? Icons.check_circle_outline : Icons.flag_outlined,
                          label: project.state.isEmpty ? 'Sin estado' : project.state,
                        ),
                        if (project.po.isNotEmpty)
                          _DarkBadge(icon: Icons.receipt_long_outlined, label: project.po),
                        if (project.supervisor.isNotEmpty)
                          _DarkBadge(icon: Icons.person_outline_rounded, label: project.supervisor),
                      ],
                    ),
                    const SizedBox(height: 20),
                    Row(
                      children: [
                        const Text('Avance del proyecto', style: TextStyle(color: Color(0xFFB8C1C6), fontSize: 12)),
                        const Spacer(),
                        Text('${progress.toStringAsFixed(0)}%', style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w900)),
                      ],
                    ),
                    const SizedBox(height: 8),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(9),
                      child: LinearProgressIndicator(
                        value: progress / 100,
                        minHeight: 7,
                        backgroundColor: Colors.white.withOpacity(.10),
                        color: closed ? const Color(0xFF61D09C) : const Color(0xFF72D4F7),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 26),
            DalvoAnimatedEntry(
              delayMs: 120,
              child: DalvoSectionTitle(
                title: 'Informes de supervisión',
              ),
            ),
            const SizedBox(height: 12),
            if (_loading) ...[
              const DalvoSkeleton(height: 126),
              const SizedBox(height: 10),
              const DalvoSkeleton(height: 126),
            ] else if (_error != null)
              DalvoEmptyState(
                icon: Icons.error_outline_rounded,
                title: 'No se pudieron cargar los datos',
                message: _error!,
                error: true,
              )
            else if (_reports.isEmpty)
              const DalvoEmptyState(
                icon: Icons.description_outlined,
                title: 'Aún no hay informes',
                message: 'Crea el primer informe de supervisión de este proyecto.',
              )
            else
              ...List.generate(
                _reports.length,
                (index) => Padding(
                  padding: const EdgeInsets.only(bottom: 10),
                  child: DalvoAnimatedEntry(
                    delayMs: 30 * (index > 5 ? 5 : index),
                    child: _ReportCard(
                      report: _reports[index],
                      label: 'I${_reports.length - index}-${project.folio.isEmpty ? project.id : project.folio}',
                    ),
                  ),
                ),
              ),
          ],
        ),
      ),
      bottomNavigationBar: SafeArea(
        top: false,
        minimum: const EdgeInsets.fromLTRB(18, 8, 18, 14),
        child: FilledButton.icon(
          onPressed: _newReport,
          icon: const Icon(Icons.add_a_photo_outlined),
          label: const Text('Nuevo informe'),
        ),
      ),
    );
  }
}

class _DarkBadge extends StatelessWidget {
  final IconData icon;
  final String label;
  const _DarkBadge({required this.icon, required this.label});

  @override
  Widget build(BuildContext context) => Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 7),
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(.09),
          borderRadius: BorderRadius.circular(9),
          border: Border.all(color: Colors.white.withOpacity(.08)),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, color: Colors.white, size: 14),
            const SizedBox(width: 5),
            Text(
              label,
              style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w700),
            ),
          ],
        ),
      );
}

class _ReportCard extends StatelessWidget {
  final SupervisionReport report;
  final String label;
  const _ReportCard({required this.report, required this.label});

  @override
  Widget build(BuildContext context) {
    final date = report.visitDate?.toLocal();
    final dateText = date == null
        ? 'Sin fecha'
        : '${date.day.toString().padLeft(2, '0')}/${date.month.toString().padLeft(2, '0')}/${date.year}';
    final incomplete = report.incompleteInformation;
    final color = incomplete ? DalvoColors.warning : DalvoColors.success;

    return DalvoSurface(
      padding: const EdgeInsets.all(17),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              DalvoIconTile(
                icon: incomplete ? Icons.warning_amber_rounded : Icons.task_alt_rounded,
                color: color,
                background: color.withOpacity(.10),
                size: 41,
              ),
              const SizedBox(width: 11),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(label, style: const TextStyle(fontWeight: FontWeight.w900)),
                    const SizedBox(height: 2),
                    Text(dateText, style: Theme.of(context).textTheme.bodySmall),
                    if (report.supervisor.isNotEmpty) ...[
                      const SizedBox(height: 2),
                      Text(report.supervisor, style: Theme.of(context).textTheme.bodySmall),
                    ],
                  ],
                ),
              ),
              DalvoBadge(
                label: '${report.progress?.toStringAsFixed(0) ?? '-'}%',
                foreground: color,
                background: color.withOpacity(.10),
              ),
            ],
          ),
          const SizedBox(height: 13),
          Row(
            children: [
              Expanded(
                child: Text(
                  report.status.replaceAll('_', ' '),
                  style: const TextStyle(fontWeight: FontWeight.w800),
                ),
              ),
              const Icon(Icons.photo_camera_outlined, size: 17, color: DalvoColors.muted),
              const SizedBox(width: 5),
              Text('${report.photosCount}', style: Theme.of(context).textTheme.bodySmall),
            ],
          ),
          if (incomplete && report.missingInformation.isNotEmpty) ...[
            const SizedBox(height: 11),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: DalvoColors.warningSoft,
                borderRadius: BorderRadius.circular(10),
              ),
              child: Text(
                report.missingInformation,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(color: DalvoColors.warning, fontSize: 12, fontWeight: FontWeight.w600),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
