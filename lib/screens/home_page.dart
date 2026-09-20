import 'package:flutter/material.dart';

import '../models/mobile_models.dart';
import '../services/api_client.dart';
import '../theme/dalvo_theme.dart';
import '../widgets/dalvo_widgets.dart';
import 'project_page.dart';

class HomePage extends StatefulWidget {
  final VoidCallback? onOpenProjects;
  final VoidCallback? onOpenReports;
  final VoidCallback onOpenProfile;

  const HomePage({
    super.key,
    required this.onOpenProjects,
    required this.onOpenReports,
    required this.onOpenProfile,
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
    final access = ApiClient.instance.currentAccess;
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
              onProjects: widget.onOpenProjects,
              onReports: widget.onOpenReports,
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
          const SizedBox(height: 26),
          DalvoAnimatedEntry(
            delayMs: 260,
            child: const DalvoSectionTitle(
              title: 'Mis módulos',
            ),
          ),
          const SizedBox(height: 12),
          DalvoAnimatedEntry(
            delayMs: 300,
            child: _ModulesCard(access: access),
          ),
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
  final VoidCallback? onProjects;
  final VoidCallback? onReports;
  final VoidCallback onProfile;

  const _QuickActions({
    required this.canSupervise,
    required this.onProjects,
    required this.onReports,
    required this.onProfile,
  });

  @override
  Widget build(BuildContext context) {
    final actions = <_QuickActionData>[
      if (canSupervise)
        _QuickActionData(
          icon: Icons.location_on_outlined,
          label: 'Proyectos',
          onTap: onProjects!,
          accent: DalvoColors.primary,
        ),
      if (canSupervise)
        _QuickActionData(
          icon: Icons.add_a_photo_outlined,
          label: 'Reportes',
          onTap: onReports!,
          accent: const Color(0xFF6B6FD8),
        ),
      _QuickActionData(
        icon: Icons.manage_accounts_outlined,
        label: 'Perfil',
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

class _ModulesCard extends StatelessWidget {
  final MobileAccessProfile? access;
  const _ModulesCard({required this.access});

  @override
  Widget build(BuildContext context) {
    final modules = access?.allowedModules ?? const <DalvoModuleAccess>[];
    if (modules.isEmpty) {
      return const DalvoEmptyState(
        icon: Icons.lock_outline_rounded,
        title: 'Sin módulos asignados',
        message: 'Dalvo no reportó módulos adicionales para este usuario.',
      );
    }

    return DalvoSurface(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Column(
        children: [
          for (var i = 0; i < modules.length; i++) ...[
            _ModuleRow(module: modules[i]),
            if (i < modules.length - 1) const Divider(height: 1, indent: 62, endIndent: 12),
          ],
        ],
      ),
    );
  }
}

class _ModuleRow extends StatelessWidget {
  final DalvoModuleAccess module;
  const _ModuleRow({required this.module});

  @override
  Widget build(BuildContext context) => ListTile(
        contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 2),
        leading: DalvoIconTile(icon: _moduleIcon(module.key), size: 39),
        title: Text(module.label, style: const TextStyle(fontWeight: FontWeight.w800)),
        subtitle: Text(module.mobileAvailable ? 'Disponible en Dalvo Móvil' : 'Acceso en Dalvo Web'),
        trailing: Icon(
          module.mobileAvailable ? Icons.phone_android_outlined : Icons.language_outlined,
          size: 19,
          color: DalvoColors.muted,
        ),
      );

  static IconData _moduleIcon(String key) {
    switch (key) {
      case 'presupuesto':
        return Icons.request_quote_outlined;
      case 'compras':
        return Icons.shopping_bag_outlined;
      case 'cuentas-pagar':
        return Icons.payments_outlined;
      case 'cuentas-cobrar':
        return Icons.receipt_long_outlined;
      case 'inventario':
        return Icons.inventory_2_outlined;
      case 'tareas':
        return Icons.task_alt_outlined;
      case 'reportes':
        return Icons.bar_chart_outlined;
      case 'exportaciones':
        return Icons.file_download_outlined;
      default:
        return Icons.grid_view_rounded;
    }
  }
}
