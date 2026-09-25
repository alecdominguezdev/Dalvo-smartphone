import 'package:flutter/material.dart';

import '../models/mobile_models.dart';
import '../services/api_client.dart';
import '../theme/dalvo_theme.dart';
import '../widgets/dalvo_widgets.dart';
import 'module_common.dart';
import 'project_page.dart';

class ReportsOverviewPage extends StatefulWidget {
  const ReportsOverviewPage({super.key});

  @override
  State<ReportsOverviewPage> createState() => _ReportsOverviewPageState();
}

class _ReportsOverviewPageState extends State<ReportsOverviewPage> {
  final _search = TextEditingController();
  bool _loading = true;
  String? _error;
  List<DalvoProject> _projects = const [];
  String _status = 'todos';

  @override
  void initState() {
    super.initState();
    _load();
  }

  @override
  void dispose() {
    _search.dispose();
    super.dispose();
  }

  List<DalvoProject> get _visibleProjects {
    final query = _search.text.trim().toLowerCase();
    return _projects.where((project) {
      final reportState = (project.lastReportState ?? '').trim().toLowerCase();
      final matchesQuery = query.isEmpty || [
        project.folio,
        project.company,
        project.title,
        project.po,
        project.supervisor,
      ].any((value) => value.toLowerCase().contains(query));
      final matchesStatus = switch (_status) {
        'sin-informe' => reportState.isEmpty,
        'incompleto' => reportState.contains('incompleto'),
        'completo' => reportState.isNotEmpty && !reportState.contains('incompleto'),
        _ => true,
      };
      return matchesQuery && matchesStatus;
    }).toList();
  }

  Future<void> _chooseStatus() async {
    final value = await showModalBottomSheet<String>(
      context: context,
      backgroundColor: Colors.white,
      builder: (context) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const ListTile(title: Text('Filtrar informes', style: TextStyle(fontWeight: FontWeight.w900))),
            for (final item in const [
              ('todos', 'Todos'),
              ('completo', 'Con informe completo'),
              ('incompleto', 'Con información incompleta'),
              ('sin-informe', 'Sin informe'),
            ])
              ListTile(
                title: Text(item.$2),
                trailing: _status == item.$1 ? const Icon(Icons.check_rounded, color: DalvoColors.primary) : null,
                onTap: () => Navigator.pop(context, item.$1),
              ),
          ],
        ),
      ),
    );
    if (value != null && mounted) setState(() => _status = value);
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final rows = await ApiClient.instance.projects();
      rows.sort((a, b) {
        final ad = a.lastReportAt ?? DateTime.fromMillisecondsSinceEpoch(0);
        final bd = b.lastReportAt ?? DateTime.fromMillisecondsSinceEpoch(0);
        return bd.compareTo(ad);
      });
      _projects = rows;
    } catch (error) {
      _error = error.toString();
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final visibleProjects = _visibleProjects;
    return RefreshIndicator(
        onRefresh: _load,
        child: ListView(
          physics: const AlwaysScrollableScrollPhysics(),
          padding: const EdgeInsets.fromLTRB(18, 12, 18, 28),
          children: [
            const DalvoAnimatedEntry(
              child: ModuleHeader(
                eyebrow: 'Supervisión',
                title: 'Informes',
                subtitle: 'Consulta los avances registrados en tus proyectos asignados.',
                icon: Icons.description_outlined,
              ),
            ),
            const SizedBox(height: 16),
            ModuleSearch(
              controller: _search,
              hint: 'Buscar folio, empresa, proyecto, PO o supervisor',
              onSearch: () => setState(() {}),
              onFilters: _chooseStatus,
              filtersActive: _status != 'todos',
            ),
            const SizedBox(height: 16),
            if (_loading) ...[
              const DalvoSkeleton(height: 135),
              const SizedBox(height: 10),
              const DalvoSkeleton(height: 135),
            ] else if (_error != null)
              DalvoEmptyState(
                icon: Icons.error_outline_rounded,
                title: 'No se pudieron cargar los informes',
                message: _error!,
                error: true,
                action: OutlinedButton.icon(
                  onPressed: _load,
                  icon: const Icon(Icons.refresh_rounded),
                  label: const Text('Reintentar'),
                ),
              )
            else if (visibleProjects.isEmpty)
              const DalvoEmptyState(
                icon: Icons.description_outlined,
                title: 'Sin informes visibles',
                message: 'No hay proyectos que coincidan con los filtros seleccionados.',
              )
            else
              ...List.generate(
                visibleProjects.length,
                (index) => Padding(
                  padding: const EdgeInsets.only(bottom: 11),
                  child: DalvoAnimatedEntry(
                    delayMs: 35 * (index > 5 ? 5 : index),
                    child: _LatestReportCard(project: visibleProjects[index]),
                  ),
                ),
              ),
          ],
        ),
      );
  }
}

class _LatestReportCard extends StatelessWidget {
  final DalvoProject project;
  const _LatestReportCard({required this.project});

  @override
  Widget build(BuildContext context) {
    final state = (project.lastReportState ?? '').trim();
    final incomplete = state.toUpperCase().contains('INCOMPLETO');
    final progress = (project.lastProgress ?? 0).clamp(0, 100).toDouble();
    final color = state.isEmpty
        ? DalvoColors.muted
        : incomplete
            ? DalvoColors.warning
            : DalvoColors.success;

    return DalvoSurface(
      onTap: () => Navigator.of(context).push(
        MaterialPageRoute(builder: (_) => ProjectPage(project: project)),
      ),
      padding: const EdgeInsets.all(18),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              DalvoIconTile(
                icon: state.isEmpty
                    ? Icons.description_outlined
                    : incomplete
                        ? Icons.warning_amber_rounded
                        : Icons.task_alt_rounded,
                color: color,
                background: color.withOpacity(.10),
                size: 43,
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      project.folio.isEmpty ? 'Proyecto #${project.id}' : project.folio,
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                    const SizedBox(height: 2),
                    Text(project.company, style: Theme.of(context).textTheme.bodySmall),
                  ],
                ),
              ),
              Text(_date(project.lastReportAt), style: Theme.of(context).textTheme.bodySmall),
            ],
          ),
          const SizedBox(height: 14),
          Row(
            children: [
              Expanded(
                child: Text(
                  state.isEmpty ? 'Sin informe registrado' : state.replaceAll('_', ' '),
                  style: const TextStyle(fontWeight: FontWeight.w800),
                ),
              ),
              if (project.lastProgress != null)
                DalvoBadge(
                  label: '${progress.toStringAsFixed(0)}%',
                  foreground: color,
                  background: color.withOpacity(.10),
                ),
            ],
          ),
        ],
      ),
    );
  }

  static String _date(DateTime? value) {
    if (value == null) return '';
    final d = value.toLocal();
    return '${d.day.toString().padLeft(2, '0')}/${d.month.toString().padLeft(2, '0')}/${d.year}';
  }
}
