import 'dart:async';
import 'dart:io' show Platform;

import 'package:flutter/material.dart';

import '../models/mobile_models.dart';
import '../services/api_client.dart';
import '../services/budget_notification_service.dart';
import '../services/push_notification_service.dart';
import '../services/shared_document_service.dart';
import '../theme/dalvo_theme.dart';
import '../widgets/dalvo_widgets.dart';
import 'home_page.dart';
import 'document_assignment_page.dart';
import 'login_page.dart';
import 'budgets_page.dart';
import 'attendance_page.dart';
import 'profile_page.dart';
import 'projects_page.dart';

class DalvoShellPage extends StatefulWidget {
  const DalvoShellPage({super.key});

  @override
  State<DalvoShellPage> createState() => _DalvoShellPageState();
}

class _DalvoShellPageState extends State<DalvoShellPage> with WidgetsBindingObserver {
  int _index = 0;
  bool _openingShared = false;
  int _pendingBudgets = 0;
  Set<int>? _knownPendingBudgetIds;
  Timer? _budgetTimer;
  StreamSubscription<int?>? _budgetNotificationTapSubscription;
  StreamSubscription<int?>? _pushOpenedBudgetSubscription;
  StreamSubscription<dynamic>? _pushForegroundSubscription;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    BudgetNotificationService.instance.initialize();
    _budgetNotificationTapSubscription = BudgetNotificationService.instance.budgetTaps.listen(_openBudgetFromNotification);
    if (Platform.isAndroid || Platform.isIOS) {
      _pushOpenedBudgetSubscription = PushNotificationService.instance.openedBudgets.listen(_openBudgetFromNotification);
      _pushForegroundSubscription = PushNotificationService.instance.foregroundMessages.listen((message) {
        final budgetId = PushNotificationService.instance.budgetIdFrom(message);
        final pendingCount = int.tryParse('${message.data['pendingCount'] ?? ''}') ?? 1;
        BudgetNotificationService.instance.showNewBudget(count: pendingCount, budgetId: budgetId);
        unawaited(_refreshBudgetAlerts(notifyPages: true));
      });
    }
    SharedDocumentService.instance.addListener(_handleSharedDocuments);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _handleSharedDocuments();
      _refreshBudgetAlerts();
    });
    _budgetTimer = Timer.periodic(const Duration(seconds: 30), (_) => _refreshBudgetAlerts());
    if (Platform.isAndroid || Platform.isIOS) {
      unawaited(_initializePushNotifications());
    }
  }

  Future<void> _initializePushNotifications() async {
    try {
      await PushNotificationService.instance.initialize();
      await PushNotificationService.instance.registerCurrentDevice();
    } catch (_) {
      // La app debe seguir operando si el teléfono rechaza los avisos.
    }
  }

  @override
  void dispose() {
    SharedDocumentService.instance.removeListener(_handleSharedDocuments);
    WidgetsBinding.instance.removeObserver(this);
    _budgetTimer?.cancel();
    _budgetNotificationTapSubscription?.cancel();
    _pushOpenedBudgetSubscription?.cancel();
    _pushForegroundSubscription?.cancel();
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.resumed) _refreshBudgetAlerts();
  }

  Future<void> _refreshBudgetAlerts({bool notifyPages = false}) async {
    try {
      final pending = (await ApiClient.instance.budgets(pendingApproval: true))
        ..sort((a, b) => '${b['updatedAt'] ?? b['createdAt'] ?? ''}'.compareTo('${a['updatedAt'] ?? a['createdAt'] ?? ''}'));
      final ids = pending.map((row) => int.tryParse('${row['id']}') ?? 0).where((id) => id > 0).toSet();
      if (_knownPendingBudgetIds != null) {
        final newCount = ids.difference(_knownPendingBudgetIds!).length;
        if (newCount > 0 && mounted) {
          final latest = pending.firstWhere(
            (row) => ids.difference(_knownPendingBudgetIds!).contains(int.tryParse('${row['id']}') ?? 0),
            orElse: () => pending.first,
          );
          final budgetId = int.tryParse('${latest['id']}');
          BudgetNotificationService.instance.showNewBudget(count: newCount, budgetId: budgetId);
          ScaffoldMessenger.of(context).showSnackBar(SnackBar(
            content: Text(newCount == 1 ? 'Nuevo presupuesto pendiente de aprobación.' : '$newCount nuevos presupuestos pendientes de aprobación.'),
            action: SnackBarAction(label: 'Ver', onPressed: () => _openBudgetFromNotification(budgetId)),
          ));
        }
      }
      final changed = _knownPendingBudgetIds == null ||
          _knownPendingBudgetIds!.length != ids.length ||
          !_knownPendingBudgetIds!.containsAll(ids);
      _knownPendingBudgetIds = ids;
      BudgetNotificationService.instance.setBudgetBadge(pending.length);
      if (notifyPages || changed) BudgetNotificationService.instance.notifyBudgetUpdated();
      if (mounted) setState(() => _pendingBudgets = pending.length);
    } catch (_) {
      // El usuario puede no tener permiso de presupuesto; la navegación sigue disponible.
    }
  }

  void _openBudgetFromNotification(int? budgetId) {
    if (!mounted) return;
    if (budgetId == null || budgetId <= 0) {
      _goTo('budgets');
      return;
    }
    Navigator.of(context).push(MaterialPageRoute(
      builder: (_) => BudgetDetailPage(
        budgetId: budgetId,
        onStatusChanged: _refreshBudgetAlerts,
      ),
    ));
  }

  Future<void> _handleSharedDocuments() async {
    if (!mounted || _openingShared || !SharedDocumentService.instance.hasPending) return;
    _openingShared = true;
    final files = SharedDocumentService.instance.takePending();
    await Navigator.of(context).push(MaterialPageRoute(
      builder: (_) => DocumentAssignmentPage(initialFiles: files, source: 'compartido'),
    ));
    _openingShared = false;
  }

  MobileUser? get _user => ApiClient.instance.currentUser;
  MobileAccessProfile? get _access => ApiClient.instance.currentAccess;
  List<_Destination> get _destinations => [
        const _Destination(
          label: 'Inicio',
          icon: Icons.home_outlined,
          selectedIcon: Icons.home_rounded,
          keyName: 'home',
        ),
        _Destination(
          label: 'Presupuestos',
          icon: Icons.request_quote_outlined,
          selectedIcon: Icons.request_quote_rounded,
          keyName: 'budgets',
          badge: _pendingBudgets,
        ),
        const _Destination(label: 'Asistencia', icon: Icons.fingerprint_rounded, selectedIcon: Icons.fingerprint_rounded, keyName: 'attendance'),
        const _Destination(label: 'Proyectos', icon: Icons.dashboard_outlined, selectedIcon: Icons.dashboard_rounded, keyName: 'projects'),
        const _Destination(
          label: 'Ajustes',
          icon: Icons.settings_outlined,
          selectedIcon: Icons.settings_rounded,
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
      case 'budgets':
        return BudgetsPage(onPendingChanged: _refreshBudgetAlerts);
      case 'attendance':
        return const AttendancePage();
      case 'account':
        return ProfilePage(onLogout: _logout);
      default:
        return HomePage(
          onOpenProjects: () => _goTo('projects'),
          onOpenBudgets: () => _goTo('budgets'),
          onOpenAttendance: () => _goTo('attendance'),
          onOpenProfile: () => _goTo('account'),
          pendingBudgets: _pendingBudgets,
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
        onOpenPage: (page) {
          Navigator.of(context).pop();
          Navigator.of(context).push(MaterialPageRoute(builder: (_) => page));
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
            borderRadius: BorderRadius.circular(10),
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
  final int badge;

  const _Destination({
    required this.label,
    required this.icon,
    required this.selectedIcon,
    required this.keyName,
    this.badge = 0,
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
              Stack(clipBehavior: Clip.none, children: [
                AnimatedSwitcher(
                  duration: const Duration(milliseconds: 180),
                  child: Icon(
                    selected ? destination.selectedIcon : destination.icon,
                    key: ValueKey(selected),
                    size: 21,
                    color: selected ? DalvoColors.ink : const Color(0xFFB5BEC3),
                  ),
                ),
                if (destination.badge > 0)
                  Positioned(
                    right: -12,
                    top: -9,
                    child: Container(
                      constraints: const BoxConstraints(minWidth: 18, minHeight: 18),
                      padding: const EdgeInsets.symmetric(horizontal: 4),
                      alignment: Alignment.center,
                      decoration: const BoxDecoration(color: DalvoColors.danger, shape: BoxShape.circle),
                      child: Text('${destination.badge}', style: const TextStyle(color: Colors.white, fontSize: 9, fontWeight: FontWeight.w900)),
                    ),
                  ),
              ],
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
  final ValueChanged<Widget> onOpenPage;
  final VoidCallback onLogout;

  const _DalvoDrawer({
    required this.user,
    required this.access,
    required this.onGoTo,
    required this.onOpenPage,
    required this.onLogout,
  });

  @override
  Widget build(BuildContext context) {
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
            Expanded(child: ListView(padding: const EdgeInsets.symmetric(vertical: 8), children: [
            _DrawerItem(icon: Icons.home_outlined, label: 'Inicio', onTap: () => onGoTo('home')),
            _DrawerItem(icon: Icons.request_quote_outlined, label: 'Presupuestos', onTap: () => onGoTo('budgets')),
            _DrawerItem(icon: Icons.fingerprint_rounded, label: 'Asistencia', onTap: () => onGoTo('attendance')),
            _DrawerItem(icon: Icons.dashboard_outlined, label: 'Proyectos', onTap: () => onGoTo('projects')),
            _DrawerItem(
              icon: Icons.settings_outlined,
              label: 'Ajustes',
              onTap: () => onGoTo('account'),
            ),
            ])),
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

class _ModuleAppBar extends StatelessWidget implements PreferredSizeWidget {
  final String title;
  const _ModuleAppBar(this.title);
  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
  @override
  Widget build(BuildContext context) => AppBar(title: Text(title));
}
