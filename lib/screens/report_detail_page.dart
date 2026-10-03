import 'package:flutter/material.dart';

import '../config/api_config.dart';
import '../models/mobile_models.dart';
import '../services/api_client.dart';
import '../services/report_pdf_service.dart';
import '../theme/dalvo_theme.dart';
import '../widgets/dalvo_widgets.dart';

class ReportDetailPage extends StatefulWidget {
  final SupervisionReport report;
  final String label;

  const ReportDetailPage({
    super.key,
    required this.report,
    required this.label,
  });

  @override
  State<ReportDetailPage> createState() => _ReportDetailPageState();
}

class _ReportDetailPageState extends State<ReportDetailPage> {
  bool _loading = true;
  String? _error;
  Map<String, dynamic>? _report;
  List<Map<String, dynamic>> _files = const [];

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    if (mounted) {
      setState(() {
        _loading = true;
        _error = null;
      });
    }
    try {
      final data = await ApiClient.instance.reportDetail(widget.report.id);
      final report = data['report'];
      final files = data['files'];
      if (mounted) {
        setState(() {
          _report = report is Map<String, dynamic> ? report : null;
          _files = (files as List? ?? const [])
              .whereType<Map<String, dynamic>>()
              .toList();
        });
      }
    } catch (error) {
      if (mounted) {
        setState(() {
          _error = error is ApiException
              ? error.message
              : 'No se pudo abrir la información del informe.';
        });
      }
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  String _value(String key, String fallback) {
    final value = _report?[key]?.toString().trim() ?? '';
    return value.isEmpty ? fallback : value;
  }

  double get _progress {
    final value = _report?['progress'] ?? widget.report.progress ?? 0;
    return (double.tryParse('$value') ?? 0).clamp(0, 100).toDouble();
  }

  bool get _incomplete =>
      _report?['incompleteInformation'] == true ||
      (_report == null && widget.report.incompleteInformation);

  @override
  Widget build(BuildContext context) {
    final report = widget.report;
    final progress = _progress;
    final visitDate = _report?['visitDate'] ?? report.visitDate;
    final status = _value('status', report.status).replaceAll('_', ' ');
    final supervisor = _value('supervisor', report.supervisor);

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.label),
        actions: [
          IconButton(
            tooltip: 'Descargar PDF',
            icon: const Icon(Icons.picture_as_pdf_outlined),
            onPressed: _loading ? null : () => ReportPdfService.open(context, report.id),
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _load,
        child: ListView(
          physics: const AlwaysScrollableScrollPhysics(),
          padding: const EdgeInsets.fromLTRB(16, 8, 16, 32),
          children: [
            DalvoSurface(
              color: DalvoColors.ink,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const DalvoIconTile(
                        icon: Icons.description_outlined,
                        color: Colors.white,
                        background: DalvoColors.primary,
                        size: 44,
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              widget.label,
                              style: Theme.of(context)
                                  .textTheme
                                  .titleLarge
                                  ?.copyWith(color: Colors.white),
                            ),
                            const SizedBox(height: 3),
                            Text(
                              _formatDate(visitDate),
                              style: const TextStyle(color: Color(0xFFBAC3C8)),
                            ),
                          ],
                        ),
                      ),
                      DalvoBadge(
                        label: '${progress.toStringAsFixed(0)}%',
                        foreground: Colors.white,
                        background: Colors.white.withOpacity(.12),
                      ),
                    ],
                  ),
                  const SizedBox(height: 18),
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          status.isEmpty ? 'Sin estatus' : status,
                          style: const TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                      ),
                      if (supervisor.isNotEmpty)
                        Flexible(
                          child: Text(
                            supervisor,
                            overflow: TextOverflow.ellipsis,
                            style: const TextStyle(color: Color(0xFFBAC3C8)),
                          ),
                        ),
                    ],
                  ),
                ],
              ),
            ),
            if (_loading) ...[
              const SizedBox(height: 14),
              const LinearProgressIndicator(minHeight: 2),
            ],
            if (_error != null) ...[
              const SizedBox(height: 14),
              DalvoEmptyState(
                icon: Icons.error_outline_rounded,
                title: 'No se pudo cargar el detalle',
                message: _error!,
                error: true,
                action: OutlinedButton(
                  onPressed: _load,
                  child: const Text('Reintentar'),
                ),
              ),
            ] else ...[
              const SizedBox(height: 14),
              _TextSection(
                title: 'Trabajos realizados',
                icon: Icons.task_alt_rounded,
                value: _value('workDone', report.workDone),
              ),
              const SizedBox(height: 10),
              _TextSection(
                title: 'Pendientes',
                icon: Icons.pending_actions_outlined,
                value: _value('pending', report.pending),
              ),
              const SizedBox(height: 10),
              _TextSection(
                title: 'Percances / incidencias',
                icon: Icons.warning_amber_rounded,
                value: _value('incidents', report.incidents),
              ),
              const SizedBox(height: 10),
              _TextSection(
                title: 'Observaciones',
                icon: Icons.notes_rounded,
                value: _value('observations', report.observations),
              ),
              if (_incomplete) ...[
                const SizedBox(height: 10),
                _TextSection(
                  title: 'Información faltante',
                  icon: Icons.info_outline_rounded,
                  value: _value(
                    'missingInformation',
                    report.missingInformation,
                  ),
                  warning: true,
                ),
              ],
              const SizedBox(height: 10),
              _EvidenceSection(files: _files),
            ],
          ],
        ),
      ),
    );
  }
}

class _TextSection extends StatelessWidget {
  final String title;
  final IconData icon;
  final String value;
  final bool warning;

  const _TextSection({
    required this.title,
    required this.icon,
    required this.value,
    this.warning = false,
  });

  @override
  Widget build(BuildContext context) => DalvoSurface(
        color: warning ? DalvoColors.warningSoft : DalvoColors.surface,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(
                  icon,
                  size: 19,
                  color: warning ? DalvoColors.warning : DalvoColors.primary,
                ),
                const SizedBox(width: 8),
                Text(title, style: Theme.of(context).textTheme.titleMedium),
              ],
            ),
            const SizedBox(height: 10),
            Text(
              value.trim().isEmpty ? 'Sin información registrada.' : value,
              style: TextStyle(
                color: warning ? DalvoColors.warning : DalvoColors.ink,
                height: 1.45,
              ),
            ),
          ],
        ),
      );
}

class _EvidenceSection extends StatelessWidget {
  final List<Map<String, dynamic>> files;
  const _EvidenceSection({required this.files});

  @override
  Widget build(BuildContext context) => DalvoSurface(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const Icon(
                  Icons.photo_library_outlined,
                  size: 19,
                  color: DalvoColors.primary,
                ),
                const SizedBox(width: 8),
                Text('Evidencia', style: Theme.of(context).textTheme.titleMedium),
                const Spacer(),
                Text(
                  '${files.length}',
                  style: const TextStyle(
                    color: DalvoColors.muted,
                    fontWeight: FontWeight.w800,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            if (files.isEmpty)
              const Text(
                'Este informe no tiene fotografías.',
                style: TextStyle(color: DalvoColors.muted),
              )
            else
              GridView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: files.length,
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 8,
                  mainAxisSpacing: 8,
                  childAspectRatio: 1.1,
                ),
                itemBuilder: (context, index) {
                  final file = files[index];
                  final uri = _reportFileUri('${file['url'] ?? ''}');
                  final image = Image.network(
                    uri.toString(),
                    fit: BoxFit.cover,
                    headers: {
                      'Authorization':
                          'Bearer ${ApiClient.instance.bearerToken}',
                    },
                    errorBuilder: (_, __, ___) => const Center(
                      child: Icon(
                        Icons.broken_image_outlined,
                        color: DalvoColors.muted,
                      ),
                    ),
                  );
                  return Material(
                    color: DalvoColors.surfaceSoft,
                    clipBehavior: Clip.antiAlias,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                      side: const BorderSide(color: DalvoColors.line),
                    ),
                    child: InkWell(
                      onTap: () => showDialog<void>(
                        context: context,
                        builder: (context) => Dialog(
                          backgroundColor: DalvoColors.ink,
                          insetPadding: const EdgeInsets.all(14),
                          child: SizedBox(
                            width: double.maxFinite,
                            height: MediaQuery.sizeOf(context).height * .75,
                            child: Stack(
                              children: [
                                Positioned.fill(
                                  child: InteractiveViewer(
                                    minScale: .8,
                                    maxScale: 5,
                                    child: image,
                                  ),
                                ),
                                Positioned(
                                  right: 8,
                                  top: 8,
                                  child: IconButton.filled(
                                    onPressed: () => Navigator.pop(context),
                                    icon: const Icon(Icons.close_rounded),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                      child: image,
                    ),
                  );
                },
              ),
          ],
        ),
      );
}

Uri _reportFileUri(String value) {
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return Uri.parse(value);
  }
  final base = Uri.parse(ApiConfig.baseUrl);
  return base.replace(
    path: value.startsWith('/') ? value : '/$value',
    query: null,
    fragment: null,
  );
}

String _formatDate(dynamic value) {
  final date = value is DateTime ? value : DateTime.tryParse('$value');
  if (date == null) return 'Sin fecha';
  final local = date.toLocal();
  return '${local.day.toString().padLeft(2, '0')}/${local.month.toString().padLeft(2, '0')}/${local.year}';
}
