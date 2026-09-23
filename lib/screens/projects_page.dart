import 'package:flutter/material.dart';

import '../models/mobile_models.dart';
import '../services/api_client.dart';
import '../theme/dalvo_theme.dart';
import '../widgets/dalvo_widgets.dart';
import 'project_page.dart';

class ProjectsPage extends StatefulWidget {
  final bool embedded;
  const ProjectsPage({super.key, this.embedded = false});

  @override
  State<ProjectsPage> createState() => _ProjectsPageState();
}

class _ProjectsPageState extends State<ProjectsPage> {
  final _search = TextEditingController();
  bool _loading = true;
  String? _error;
  List<DalvoProject> _projects = const [];

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

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      _projects = await ApiClient.instance.projects(search: _search.text);
    } catch (error) {
      _error = error.toString();
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final content = RefreshIndicator(
      onRefresh: _load,
      child: ListView(
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.fromLTRB(18, 12, 18, 28),
        children: [
          const DalvoAnimatedEntry(
            child: DalvoSectionTitle(
              title: 'Proyectos',
            ),
          ),
          const SizedBox(height: 16),
          DalvoAnimatedEntry(
            delayMs: 60,
            child: TextField(
              controller: _search,
              onSubmitted: (_) => _load(),
              decoration: InputDecoration(
                hintText: 'Buscar folio, empresa, proyecto o PO',
                prefixIcon: const Icon(Icons.search_rounded),
                suffixIcon: _search.text.isEmpty
                    ? null
                    : IconButton(
                        onPressed: () {
                          _search.clear();
                          _load();
                        },
                        icon: const Icon(Icons.close_rounded),
                      ),
              ),
            ),
          ),
          const SizedBox(height: 14),
          if (!_loading && _error == null)
            DalvoAnimatedEntry(
              delayMs: 90,
              child: Row(
                children: [
                  Text(
                    '${_projects.length} proyecto${_projects.length == 1 ? '' : 's'}',
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(fontWeight: FontWeight.w700),
                  ),
                  const Spacer(),
                  TextButton.icon(
                    onPressed: _load,
                    icon: const Icon(Icons.refresh_rounded, size: 17),
                    label: const Text('Actualizar'),
                  ),
                ],
              ),
            ),
          if (_loading) ...[
            const DalvoSkeleton(height: 170),
            const SizedBox(height: 10),
            const DalvoSkeleton(height: 170),
            const SizedBox(height: 10),
            const DalvoSkeleton(height: 170),
          ] else if (_error != null)
            DalvoEmptyState(
              icon: Icons.error_outline_rounded,
              title: 'No se pudieron cargar los proyectos',
              message: _error!,
              error: true,
              action: OutlinedButton.icon(
                onPressed: _load,
                icon: const Icon(Icons.refresh_rounded),
                label: const Text('Reintentar'),
              ),
            )
          else if (_projects.isEmpty)
            const DalvoEmptyState(
              icon: Icons.dashboard_outlined,
              title: 'No hay proyectos disponibles',
              message: 'Tu usuario no tiene proyectos visibles con los filtros actuales.',
            )
          else
            ...List.generate(
              _projects.length,
              (index) => Padding(
                padding: const EdgeInsets.only(bottom: 11),
                child: DalvoAnimatedEntry(
                  delayMs: 30 * (index > 5 ? 5 : index),
                  child: _ProjectCard(project: _projects[index]),
                ),
              ),
            ),
        ],
      ),
    );

    if (widget.embedded) return content;
    return Scaffold(appBar: AppBar(title: const Text('Proyectos')), body: content);
  }
}

class _ProjectCard extends StatelessWidget {
  final DalvoProject project;
  const _ProjectCard({required this.project});

  @override
  Widget build(BuildContext context) {
    final state = project.state.trim();
    final closed = state.toLowerCase() == 'cerrada';
    final progress = (project.lastProgress ?? 0).clamp(0, 100).toDouble();

    return DalvoSurface(
      onTap: () => Navigator.of(context).push(
        MaterialPageRoute(builder: (_) => ProjectPage(project: project)),
      ),
      padding: const EdgeInsets.all(18),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              DalvoIconTile(
                icon: closed ? Icons.check_rounded : Icons.work_outline_rounded,
                color: closed ? DalvoColors.success : DalvoColors.primary,
                background: closed ? DalvoColors.successSoft : DalvoColors.primarySoft,
                size: 46,
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
                    const SizedBox(height: 3),
                    Text(
                      project.company.isEmpty ? 'Sin empresa' : project.company,
                      style: Theme.of(context).textTheme.bodySmall,
                    ),
                  ],
                ),
              ),
              Container(
                width: 34,
                height: 34,
                decoration: BoxDecoration(
                  color: DalvoColors.surfaceSoft,
                  borderRadius: BorderRadius.circular(9),
                ),
                child: const Icon(Icons.arrow_outward_rounded, size: 17, color: DalvoColors.muted),
              ),
            ],
          ),
          const SizedBox(height: 15),
          Text(
            project.title.isEmpty ? 'Sin descripción' : project.title,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(fontWeight: FontWeight.w700),
          ),
          const SizedBox(height: 14),
          Wrap(
            spacing: 7,
            runSpacing: 7,
            children: [
              DalvoBadge(
                label: state.isEmpty ? 'Sin estado' : state,
                icon: closed ? Icons.check_circle_outline : Icons.flag_outlined,
                foreground: closed ? DalvoColors.success : null,
                background: closed ? DalvoColors.successSoft : null,
              ),
              if ((project.status).trim().isNotEmpty)
                DalvoBadge(
                  label: project.status,
                  icon: Icons.info_outline_rounded,
                  foreground: DalvoColors.muted,
                  background: DalvoColors.surfaceSoft,
                ),
            ],
          ),
          ...[
            const SizedBox(height: 16),
            Row(
              children: [
                Text('Avance del proyecto', style: Theme.of(context).textTheme.bodySmall),
                const Spacer(),
                Text(
                  '${progress.toStringAsFixed(0)}%',
                  style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w900),
                ),
              ],
            ),
            const SizedBox(height: 7),
            ClipRRect(
              borderRadius: BorderRadius.circular(9),
              child: LinearProgressIndicator(
                value: progress / 100,
                minHeight: 7,
                backgroundColor: DalvoColors.line,
                color: closed ? DalvoColors.success : DalvoColors.primary,
              ),
            ),
          ],
          if (project.supervisor.isNotEmpty) ...[
            const SizedBox(height: 15),
            Row(
              children: [
                const Icon(Icons.person_outline_rounded, size: 17, color: DalvoColors.muted),
                const SizedBox(width: 6),
                Expanded(
                  child: Text(project.supervisor, style: Theme.of(context).textTheme.bodySmall),
                ),
              ],
            ),
          ],
        ],
      ),
    );
  }
}
