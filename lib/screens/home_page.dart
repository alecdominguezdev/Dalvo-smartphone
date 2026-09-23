import 'package:flutter/material.dart';

import '../models/mobile_models.dart';
import '../services/api_client.dart';
import '../theme/dalvo_theme.dart';
import '../widgets/dalvo_widgets.dart';
import 'project_page.dart';

class HomePage extends StatefulWidget {
  final VoidCallback? onOpenProjects;
  final VoidCallback onOpenBudgets;
  final VoidCallback onOpenAttendance;
  final VoidCallback onOpenProfile;
  final int pendingBudgets;

  const HomePage({
    super.key,
    required this.onOpenProjects,
    required this.onOpenBudgets,
    required this.onOpenAttendance,
    required this.onOpenProfile,
    required this.pendingBudgets,
  });

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  bool _loading = true;
  String? _error;
  List<DalvoProject> _projects = const [];

  bool get _canSupervise => ApiClient.instance.currentAccess?.canUseSupervision == true;

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
      _projects = _canSupervise ? await ApiClient.instance.projects() : const [];
    } catch (error) {
      _error = error.toString();
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final user = ApiClient.instance.currentUser;
    final latest = _projects.isEmpty ? null : _projects.first;
    final pending = _projects
        .where((p) => (p.lastReportState ?? '').toUpperCase().contains('INCOMPLETO'))
        .length;
    final reported = _projects.where((p) => (p.lastReportState ?? '').trim().isNotEmpty).length;

    return RefreshIndicator(
      onRefresh: _load,
      child: ListView(
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.fromLTRB(18, 12, 18, 28),
        children: [
          DalvoAnimatedEntry(
            child: _HeroPanel(
              name: _firstName(user?.displayName ?? 'Usuario'),
              role: _roleLabel(user?.role ?? ''),
              initials: user?.initials ?? 'D',
              projectsCount: _projects.length,
              loading: _loading,
            ),
          ),
          const SizedBox(height: 22),
          if (widget.pendingBudgets > 0) ...[
            DalvoAnimatedEntry(
              delayMs: 40,
              child: InkWell(
                onTap: widget.onOpenBudgets,
                borderRadius: BorderRadius.circular(12),
                child: Container(
                  padding: const EdgeInsets.all(15),
                  decoration: BoxDecoration(
                    color: DalvoColors.warningSoft,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: DalvoColors.warning.withOpacity(.22)),
                  ),
                  child: Row(children: [
                    const Icon(Icons.notifications_active_outlined, color: DalvoColors.warning),
                    const SizedBox(width: 11),
                    Expanded(child: Text(
                      'Tienes ${widget.pendingBudgets} presupuesto${widget.pendingBudgets == 1 ? '' : 's'} pendiente${widget.pendingBudgets == 1 ? '' : 's'} de aprobación.',
                      style: const TextStyle(color: DalvoColors.warning, fontWeight: FontWeight.w800),
                    )),
                    const Icon(Icons.chevron_right_rounded, color: DalvoColors.warning),
                  ]),
                ),
              ),
            ),
            const SizedBox(height: 18),
          ],
          if (_canSupervise) ...[
            DalvoAnimatedEntry(
              delayMs: 70,
              child: Row(
                children: [
                  Expanded(
                    child: DalvoStatCard(
                      label: 'Reportados',
                      value: _loading ? '—' : '$reported',
                      icon: Icons.task_alt_rounded,
                      accent: DalvoColors.success,
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: DalvoStatCard(
                      label: 'Pendientes',
                      value: _loading ? '—' : '$pending',
                      icon: Icons.schedule_rounded,
                      accent: pending > 0 ? DalvoColors.warning : DalvoColors.primary,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
          ],
          DalvoAnimatedEntry(
            delayMs: 120,
            child: const DalvoSectionTitle(
              title: 'Accesos rápidos',
            ),
          ),
          const SizedBox(height: 12),
          DalvoAnimatedEntry(
            delayMs: 160,
            child: _QuickActions(
              canSupervise: _canSupervise,
              pendingBudgets: widget.pendingBudgets,
              onBudgets: widget.onOpenBudgets,
              onAttendance: widget.onOpenAttendance,
              onProjects: widget.onOpenProjects,
              onProfile: widget.onOpenProfile,
            ),
          ),
          if (_canSupervise) ...[
            const SizedBox(height: 26),
            DalvoAnimatedEntry(
              delayMs: 200,
              child: DalvoSectionTitle(
                title: 'Actividad reciente',
                trailing: TextButton(
                  onPressed: widget.onOpenProjects,
                  child: const Text('Ver todos'),
                ),
              ),
            ),
            const SizedBox(height: 12),
            if (_loading)
              const DalvoSkeleton(height: 150)
            else if (_error != null)
              DalvoEmptyState(
                icon: Icons.cloud_off_outlined,
                title: 'No pudimos cargar la actividad',
                message: _error!,
                error: true,
                action: OutlinedButton.icon(
                  onPressed: _load,
                  icon: const Icon(Icons.refresh_rounded),
                  label: const Text('Reintentar'),
                ),
              )
            else if (latest == null)
              const DalvoEmptyState(
                icon: Icons.dashboard_outlined,
                title: 'Sin proyectos visibles',
                message: 'No hay proyectos disponibles para los permisos actuales de tu usuario.',
              )
            else
              DalvoAnimatedEntry(
                delayMs: 240,
                child: _RecentProjectCard(project: latest),
              ),
          ],
        ],
      ),
    );
  }

  static String _firstName(String name) {
    final clean = name.trim();
    if (clean.isEmpty) return 'Usuario';
    return clean.split(RegExp(r'\s+')).first;
  }

  static String _roleLabel(String role) {
    final value = role.trim();
    if (value.isEmpty) return 'Usuario';
    return value[0].toUpperCase() + value.substring(1);
  }
}

class _HeroPanel extends StatelessWidget {
  final String name;
  final String role;
  final String initials;
  final int projectsCount;
  final bool loading;

  const _HeroPanel({
    required this.name,
    required this.role,
    required this.initials,
    required this.projectsCount,
    required this.loading,
  });

  @override
  Widget build(BuildContext context) => Container(
        padding: const EdgeInsets.all(22),
        decoration: BoxDecoration(
          color: DalvoColors.ink,
          borderRadius: BorderRadius.circular(14),
          boxShadow: const [
            BoxShadow(color: Color(0x1A000000), blurRadius: 28, offset: Offset(0, 12)),
          ],
        ),
        child: Stack(
          children: [
            Positioned(
              right: -34,
              top: -46,
              child: Container(
                width: 150,
                height: 150,
                decoration: BoxDecoration(
                  color: DalvoColors.primary.withOpacity(.24),
                  shape: BoxShape.circle,
                ),
              ),
            ),
            Positioned(
              right: 32,
              bottom: -65,
              child: Container(
                width: 120,
                height: 120,
                decoration: BoxDecoration(
                  color: DalvoColors.primarySoft.withOpacity(.07),
                  shape: BoxShape.circle,
                ),
              ),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Container(
                      width: 46,
                      height: 46,
                      alignment: Alignment.center,
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Text(
                        initials,
                        style: const TextStyle(
                          color: DalvoColors.ink,
                          fontWeight: FontWeight.w900,
                        ),
                      ),
                    ),
                    const Spacer(),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 11, vertical: 7),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(.10),
                        borderRadius: BorderRadius.circular(9),
                        border: Border.all(color: Colors.white.withOpacity(.12)),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Icon(Icons.verified_user_outlined, size: 14, color: Colors.white),
                          const SizedBox(width: 6),
                          Text(
                            role,
                            style: const TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.w700,
                              fontSize: 11,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 26),
                Text(
                  'Hola, $name',
                  style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                        color: Colors.white,
                        fontSize: 23,
                      ),
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    const Icon(Icons.work_outline_rounded, size: 17, color: Color(0xFF9EDDF4)),
                    const SizedBox(width: 7),
                    Text(
                      loading
                          ? 'Sincronizando proyectos…'
                          : '$projectsCount proyecto${projectsCount == 1 ? '' : 's'} disponible${projectsCount == 1 ? '' : 's'}',
                      style: const TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.w700,
                        fontSize: 12,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
      );
}

class _QuickActions extends StatelessWidget {
  final bool canSupervise;
  final int pendingBudgets;
  final VoidCallback onBudgets;
  final VoidCallback onAttendance;
  final VoidCallback? onProjects;
  final VoidCallback onProfile;

  const _QuickActions({
    required this.canSupervise,
    required this.pendingBudgets,
    required this.onBudgets,
    required this.onAttendance,
    required this.onProjects,
    required this.onProfile,
  });

  @override
  Widget build(BuildContext context) {
    final actions = <_QuickActionData>[
      _QuickActionData(
        icon: Icons.request_quote_outlined,
        label: pendingBudgets > 0 ? 'Presupuestos ($pendingBudgets)' : 'Presupuestos',
        onTap: onBudgets,
        accent: DalvoColors.warning,
      ),
      _QuickActionData(
        icon: Icons.fingerprint_rounded,
        label: 'Asistencia',
        onTap: onAttendance,
        accent: DalvoColors.primary,
      ),
      if (canSupervise)
        _QuickActionData(
          icon: Icons.location_on_outlined,
          label: 'Proyectos',
          onTap: onProjects!,
          accent: DalvoColors.primary,
        ),
      _QuickActionData(
        icon: Icons.settings_outlined,
        label: 'Ajustes',
        onTap: onProfile,
        accent: const Color(0xFF2B8A63),
      ),
    ];

    return LayoutBuilder(
      builder: (context, constraints) {
        final width = (constraints.maxWidth - 10) / 2;
        return Wrap(
          spacing: 10,
          runSpacing: 10,
          children: [
            for (final action in actions)
              SizedBox(width: actions.length == 1 ? constraints.maxWidth : width, child: _QuickCard(data: action)),
          ],
        );
      },
    );
  }
}

class _QuickActionData {
  final IconData icon;
  final String label;
  final VoidCallback onTap;
  final Color accent;

  const _QuickActionData({
    required this.icon,
    required this.label,
    required this.onTap,
    required this.accent,
  });
}

class _QuickCard extends StatelessWidget {
  final _QuickActionData data;
  const _QuickCard({required this.data});

  @override
  Widget build(BuildContext context) => DalvoSurface(
        onTap: data.onTap,
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                DalvoIconTile(
                  icon: data.icon,
                  color: data.accent,
                  background: data.accent.withOpacity(.10),
                  size: 42,
                ),
                const Spacer(),
                const Icon(Icons.arrow_outward_rounded, size: 18, color: DalvoColors.muted),
              ],
            ),
            const SizedBox(height: 14),
            Text(data.label, style: Theme.of(context).textTheme.titleMedium),
          ],
        ),
      );
}

class _RecentProjectCard extends StatelessWidget {
  final DalvoProject project;
  const _RecentProjectCard({required this.project});

  @override
  Widget build(BuildContext context) {
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
            children: [
              const DalvoIconTile(icon: Icons.business_center_outlined, size: 44),
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
              const Icon(Icons.chevron_right_rounded, color: DalvoColors.muted),
            ],
          ),
          const SizedBox(height: 14),
          Text(
            project.title.isEmpty ? 'Sin descripción' : project.title,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
            style: Theme.of(context).textTheme.bodyLarge?.copyWith(fontWeight: FontWeight.w700),
          ),
          if (project.lastProgress != null) ...[
            const SizedBox(height: 16),
            Row(
              children: [
                Text('Avance', style: Theme.of(context).textTheme.bodySmall),
                const Spacer(),
                Text(
                  '${progress.toStringAsFixed(0)}%',
                  style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 12),
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
                color: DalvoColors.primary,
              ),
            ),
          ],
        ],
      ),
    );
  }
}
