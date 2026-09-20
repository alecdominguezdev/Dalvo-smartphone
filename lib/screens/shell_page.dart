import 'package:flutter/material.dart';

import '../models/mobile_models.dart';
import '../services/api_client.dart';
import '../theme/dalvo_theme.dart';
import '../widgets/dalvo_widgets.dart';
import 'home_page.dart';
import 'login_page.dart';
import 'profile_page.dart';
import 'projects_page.dart';
import 'reports_overview_page.dart';

class DalvoShellPage extends StatefulWidget {
  const DalvoShellPage({super.key});

  @override
  State<DalvoShellPage> createState() => _DalvoShellPageState();
}

class _DalvoShellPageState extends State<DalvoShellPage> {
  int _index = 0;

  MobileUser? get _user => ApiClient.instance.currentUser;
  MobileAccessProfile? get _access => ApiClient.instance.currentAccess;
  bool get _canSupervise => _access?.canUseSupervision == true;

  List<_Destination> get _destinations => [
        const _Destination(
          label: 'Inicio',
          icon: Icons.home_outlined,
          selectedIcon: Icons.home_rounded,
          keyName: 'home',
        ),
        if (_canSupervise)
          const _Destination(
            label: 'Proyectos',
            icon: Icons.dashboard_outlined,
            selectedIcon: Icons.dashboard_rounded,
            keyName: 'projects',
          ),
        if (_canSupervise)
          const _Destination(
            label: 'Reportes',
            icon: Icons.description_outlined,
            selectedIcon: Icons.description_rounded,
            keyName: 'reports',
          ),
        const _Destination(
          label: 'Perfil',
          icon: Icons.person_outline_rounded,
          selectedIcon: Icons.person_rounded,
          keyName: 'account',
        ),
      ];

  void _goTo(String key) {
    final index = _destinations.indexWhere((e) => e.keyName == key);
    if (index >= 0) setState(() => _index = index);
  }

  Future<void> _logout() async {
    await ApiClient.instance.logout();
    if (!mounted) return;
    Navigator.of(context).pushAndRemoveUntil(
      MaterialPageRoute(builder: (_) => const LoginPage()),
      (_) => false,
    );
  }

  Widget _pageFor(_Destination destination) {
    switch (destination.keyName) {
      case 'projects':
        return const ProjectsPage(embedded: true);
      case 'reports':
        return const ReportsOverviewPage();
      case 'account':
        return ProfilePage(onLogout: _logout);
      default:
        return HomePage(
          onOpenProjects: _canSupervise ? () => _goTo('projects') : null,
          onOpenReports: _canSupervise ? () => _goTo('reports') : null,
          onOpenProfile: () => _goTo('account'),
        );
    }
  }

  @override
  Widget build(BuildContext context) {
    final destinations = _destinations;
    if (_index >= destinations.length) _index = 0;
    final user = _user;

    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 62,
        leadingWidth: 58,
        leading: Builder(
          builder: (context) => Padding(
            padding: const EdgeInsets.only(left: 14),
            child: _RoundAction(
              icon: Icons.menu_rounded,
              onTap: () => Scaffold.of(context).openDrawer(),
            ),
          ),
        ),
        titleSpacing: 9,
        title: const DalvoLogo(width: 104),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 14),
            child: InkWell(
              borderRadius: BorderRadius.circular(9),
              onTap: () => _goTo('account'),
              child: Container(
                width: 40,
                height: 40,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: DalvoColors.ink,
                  borderRadius: BorderRadius.circular(9),
                ),
                child: Text(
                  user?.initials ?? 'D',
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w900,
                    fontSize: 12,
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
      drawer: _DalvoDrawer(
        user: user,
        access: _access,
        onGoTo: (key) {
          Navigator.of(context).pop();
          _goTo(key);
        },
        onLogout: () {
          Navigator.of(context).pop();
          _logout();
        },
      ),
      body: IndexedStack(
        index: _index,
        children: destinations.map(_pageFor).toList(),
      ),
      bottomNavigationBar: SafeArea(
        top: false,
        minimum: const EdgeInsets.fromLTRB(14, 0, 14, 10),
        child: Container(
          height: 64,
          padding: const EdgeInsets.all(6),
          decoration: BoxDecoration(
            color: DalvoColors.ink,
            borderRadius: BorderRadius.circular(14),
            boxShadow: const [
              BoxShadow(
                color: Color(0x1A000000),
                blurRadius: 24,
                offset: Offset(0, 9),
              ),
            ],
          ),
          child: Row(
            children: [
              for (var i = 0; i < destinations.length; i++)
                Expanded(
                  child: _BottomDestination(
                    destination: destinations[i],
                    selected: i == _index,
                    onTap: () => setState(() => _index = i),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}

class _Destination {
  final String label;
  final IconData icon;
  final IconData selectedIcon;
  final String keyName;

  const _Destination({
    required this.label,
    required this.icon,
    required this.selectedIcon,
    required this.keyName,
  });
}

class _BottomDestination extends StatelessWidget {
  final _Destination destination;
  final bool selected;
  final VoidCallback onTap;

  const _BottomDestination({
    required this.destination,
    required this.selected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) => InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(11),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 220),
          curve: Curves.easeOut,
          decoration: BoxDecoration(
            color: selected ? Colors.white : Colors.transparent,
            borderRadius: BorderRadius.circular(11),
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              AnimatedSwitcher(
                duration: const Duration(milliseconds: 180),
                child: Icon(
                  selected ? destination.selectedIcon : destination.icon,
                  key: ValueKey(selected),
                  size: 21,
                  color: selected ? DalvoColors.ink : const Color(0xFFB5BEC3),
                ),
              ),
              const SizedBox(height: 4),
              Text(
                destination.label,
                maxLines: 1,
                overflow: TextOverflow.fade,
                style: TextStyle(
                  color: selected ? DalvoColors.ink : const Color(0xFFB5BEC3),
                  fontSize: 9.5,
                  fontWeight: selected ? FontWeight.w800 : FontWeight.w600,
                ),
              ),
            ],
          ),
        ),
      );
}

class _RoundAction extends StatelessWidget {
  final IconData icon;
  final VoidCallback onTap;
  const _RoundAction({required this.icon, required this.onTap});

  @override
  Widget build(BuildContext context) => Material(
        color: DalvoColors.surface,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
          side: const BorderSide(color: DalvoColors.line),
        ),
        child: InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(10),
          child: SizedBox(width: 40, height: 40, child: Icon(icon, size: 20)),
        ),
      );
}

class _DalvoDrawer extends StatelessWidget {
  final MobileUser? user;
  final MobileAccessProfile? access;
  final ValueChanged<String> onGoTo;
  final VoidCallback onLogout;

  const _DalvoDrawer({
    required this.user,
    required this.access,
    required this.onGoTo,
    required this.onLogout,
  });

  @override
  Widget build(BuildContext context) {
    final canSupervise = access?.canUseSupervision == true;
    return Drawer(
      backgroundColor: DalvoColors.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.horizontal(right: Radius.circular(16)),
      ),
      child: SafeArea(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(22, 20, 22, 18),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const DalvoLogo(width: 118),
                  const SizedBox(height: 28),
                  Container(
                    padding: const EdgeInsets.all(15),
                    decoration: BoxDecoration(
                      color: DalvoColors.ink,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Row(
                      children: [
                        Container(
                          width: 46,
                          height: 46,
                          alignment: Alignment.center,
                          decoration: BoxDecoration(
                            color: DalvoColors.primary,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Text(
                            user?.initials ?? 'D',
                            style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w900),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                user?.displayName ?? 'Usuario Dalvo',
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w800),
                              ),
                              const SizedBox(height: 2),
                              Text(
                                _roleLabel(user?.role ?? ''),
                                style: const TextStyle(color: Color(0xFFB8C1C6), fontSize: 12),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const Divider(height: 1),
            const SizedBox(height: 8),
            _DrawerItem(icon: Icons.home_outlined, label: 'Inicio', onTap: () => onGoTo('home')),
            if (canSupervise)
              _DrawerItem(
                icon: Icons.dashboard_outlined,
                label: 'Proyectos',
                onTap: () => onGoTo('projects'),
              ),
            if (canSupervise)
              _DrawerItem(
                icon: Icons.description_outlined,
                label: 'Reportes',
                onTap: () => onGoTo('reports'),
              ),
            _DrawerItem(
              icon: Icons.person_outline_rounded,
              label: 'Ajustes',
              onTap: () => onGoTo('account'),
            ),
            const Spacer(),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 18),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                decoration: BoxDecoration(
                  color: DalvoColors.primarySoft,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Row(
                  children: [
                    Icon(Icons.science_outlined, size: 17, color: DalvoColors.primaryDark),
                    SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        'Pruebas',
                        style: TextStyle(
                          color: DalvoColors.primaryDark,
                          fontWeight: FontWeight.w700,
                          fontSize: 12,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 8),
            _DrawerItem(
              icon: Icons.logout_rounded,
              label: 'Cerrar sesión',
              onTap: onLogout,
              danger: true,
            ),
            const SizedBox(height: 8),
          ],
        ),
      ),
    );
  }

  static String _roleLabel(String role) {
    final value = role.trim();
    if (value.isEmpty) return 'Usuario';
    return value[0].toUpperCase() + value.substring(1);
  }
}

class _DrawerItem extends StatelessWidget {
  final IconData icon;
  final String label;
  final VoidCallback onTap;
  final bool danger;

  const _DrawerItem({
    required this.icon,
    required this.label,
    required this.onTap,
    this.danger = false,
  });

  @override
  Widget build(BuildContext context) => Padding(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 2),
        child: ListTile(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
          leading: Icon(icon, color: danger ? DalvoColors.danger : DalvoColors.muted),
          title: Text(
            label,
            style: TextStyle(
              color: danger ? DalvoColors.danger : DalvoColors.ink,
              fontWeight: FontWeight.w700,
            ),
          ),
          onTap: onTap,
        ),
      );
}
