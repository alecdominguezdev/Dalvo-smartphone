import 'package:flutter/material.dart';

import '../models/mobile_models.dart';
import '../services/api_client.dart';
import '../theme/dalvo_theme.dart';
import '../widgets/dalvo_widgets.dart';
import 'document_assignment_page.dart';

class OperationsPage extends StatefulWidget {
  const OperationsPage({super.key});

  @override
  State<OperationsPage> createState() => _OperationsPageState();
}

class _OperationsPageState extends State<OperationsPage> {
  final _search = TextEditingController();
  String _section = 'summary';
  bool _loading = false;
  String? _error;
  OperationsSummary? _summary;
  List<FinancialAccount> _accounts = [];
  List<BudgetApproval> _approvals = [];
  List<TeamAttendance> _attendance = [];

  MobileUser? get _user => ApiClient.instance.currentUser;
  MobileAccessProfile? get _access => ApiClient.instance.currentAccess;

  bool _allows(String module) {
    final modules = _access?.modules ?? const [];
    return modules.any((item) => item.key == module && item.allowed && item.mobileAvailable);
  }

  bool get _isAdmin => ['administracion', 'superadmin'].contains((_user?.role ?? '').toLowerCase());
  bool get _isSuperadmin => (_user?.role ?? '').toLowerCase() == 'superadmin';

  List<(String, String, IconData)> get _sections => [
        ('summary', 'Resumen', Icons.space_dashboard_outlined),
        if (_allows('cuentas-pagar')) ('payables', 'CxP', Icons.payments_outlined),
        if (_allows('cuentas-cobrar')) ('receivables', 'CxC', Icons.request_quote_outlined),
        if (_isSuperadmin) ('approvals', 'Aprobar', Icons.approval_outlined),
        if (_isAdmin) ('attendance', 'Equipo', Icons.badge_outlined),
      ];

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
    setState(() { _loading = true; _error = null; });
    try {
      switch (_section) {
        case 'payables':
          _accounts = await ApiClient.instance.financialAccounts(receivable: false, search: _search.text);
          break;
        case 'receivables':
          _accounts = await ApiClient.instance.financialAccounts(receivable: true, search: _search.text);
          break;
        case 'approvals':
          _approvals = await ApiClient.instance.budgetApprovals(search: _search.text);
          break;
        case 'attendance':
          _attendance = await ApiClient.instance.teamAttendance(search: _search.text);
          break;
        default:
          _summary = await ApiClient.instance.operationsSummary();
      }
    } catch (error) {
      if (mounted) setState(() => _error = '$error');
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _approve(BudgetApproval item) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Aprobar cotización'),
        content: Text('${item.quote}\n${item.company} · ${item.projectFolio}\n\nEsta es la misma aprobación de la web y no agrega comentarios.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Cancelar')),
          FilledButton(onPressed: () => Navigator.pop(context, true), child: const Text('Aprobar')),
        ],
      ),
    );
    if (confirmed != true) return;
    setState(() => _loading = true);
    try {
      await ApiClient.instance.approveBudget(item.id);
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Cotización aprobada.')));
      await _load();
    } catch (error) {
      if (mounted) setState(() { _error = '$error'; _loading = false; });
    }
  }

  Future<void> _attach(FinancialAccount item) async {
    final changed = await Navigator.of(context).push<bool>(MaterialPageRoute(
      builder: (_) => DocumentAssignmentPage(
        initialScope: _section == 'receivables' ? 'RECEIVABLE' : 'PAYABLE',
        initialTargetId: item.id,
      ),
    ));
    if (changed == true) _load();
  }

  String _money(double value) {
    final fixed = value.toStringAsFixed(2);
    final parts = fixed.split('.');
    final chars = parts.first.split('').reversed.toList();
    final groups = <String>[];
    for (var index = 0; index < chars.length; index += 3) {
      groups.add(chars.skip(index).take(3).toList().reversed.join());
    }
    return '\$${groups.reversed.join(',')}.${parts.last}';
  }

  @override
  Widget build(BuildContext context) {
    final showSearch = _section != 'summary';
    return RefreshIndicator(
      onRefresh: _load,
      child: ListView(
        padding: const EdgeInsets.fromLTRB(16, 18, 16, 110),
        children: [
          const DalvoSectionTitle(
            title: 'Operación',
            subtitle: 'Las mismas cuentas, estados y permisos del sistema web.',
          ),
          const SizedBox(height: 14),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: _sections.map((section) => Padding(
                padding: const EdgeInsets.only(right: 8),
                child: ChoiceChip(
                  avatar: Icon(section.$3, size: 17),
                  label: Text(section.$2),
                  selected: _section == section.$1,
                  onSelected: (_) {
                    _search.clear();
                    setState(() => _section = section.$1);
                    _load();
                  },
                ),
              )).toList(),
            ),
          ),
          if (showSearch) ...[
            const SizedBox(height: 12),
            TextField(
              controller: _search,
              textInputAction: TextInputAction.search,
              onSubmitted: (_) => _load(),
              decoration: InputDecoration(
                hintText: 'Folio, empresa, proyecto o PO',
                prefixIcon: const Icon(Icons.search),
                suffixIcon: IconButton(onPressed: _load, icon: const Icon(Icons.arrow_forward)),
              ),
            ),
          ],
          const SizedBox(height: 14),
          if (_loading) const LinearProgressIndicator(minHeight: 2),
          if (_error != null) ...[
            DalvoEmptyState(
              icon: Icons.error_outline,
              title: 'No se pudo cargar',
              message: _error!,
              error: true,
              action: OutlinedButton(onPressed: _load, child: const Text('Reintentar')),
            ),
          ] else if (!_loading) ...[
            if (_section == 'summary') _summaryView(),
            if (_section == 'payables' || _section == 'receivables') _accountsView(),
            if (_section == 'approvals') _approvalsView(),
            if (_section == 'attendance') _attendanceView(),
          ],
        ],
      ),
    );
  }

  Widget _summaryView() {
    final item = _summary;
    if (item == null) return const SizedBox.shrink();
    return Column(children: [
      Row(children: [
        Expanded(child: DalvoStatCard(label: 'CxP pendientes', value: '${item.pendingPayables}', icon: Icons.payments_outlined, helper: _money(item.payableAmount))),
        const SizedBox(width: 10),
        Expanded(child: DalvoStatCard(label: 'CxC pendientes', value: '${item.pendingReceivables}', icon: Icons.request_quote_outlined, helper: _money(item.receivableAmount))),
      ]),
      const SizedBox(height: 10),
      Row(children: [
        Expanded(child: DalvoStatCard(label: 'Proyectos', value: '${item.projects}', icon: Icons.work_outline)),
        const SizedBox(width: 10),
        Expanded(child: DalvoStatCard(label: 'Informes borrador', value: '${item.draftSupervisionReports}', icon: Icons.description_outlined)),
      ]),
    ]);
  }

  Widget _accountsView() {
    if (_accounts.isEmpty) return const DalvoEmptyState(icon: Icons.search_off, title: 'Sin resultados', message: 'No hay cuentas visibles con estos filtros.');
    return Column(children: _accounts.map((item) => Padding(
      padding: const EdgeInsets.only(bottom: 9),
      child: DalvoSurface(
        padding: const EdgeInsets.all(14),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [
            Expanded(child: Text(item.folio.isEmpty ? 'Cuenta #${item.id}' : item.folio, style: Theme.of(context).textTheme.titleMedium)),
            Text(_money(item.amount), style: const TextStyle(fontWeight: FontWeight.w900)),
          ]),
          const SizedBox(height: 3),
          Text(item.company, style: const TextStyle(color: DalvoColors.primaryDark, fontWeight: FontWeight.w700)),
          const SizedBox(height: 3),
          Text(item.title, maxLines: 2, overflow: TextOverflow.ellipsis),
          if (item.po.isNotEmpty) Text('PO: ${item.po}', style: Theme.of(context).textTheme.bodySmall),
          const SizedBox(height: 10),
          Row(children: [
            Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(item.state, style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 12)),
              Text(item.pending, style: Theme.of(context).textTheme.bodySmall),
            ])),
            OutlinedButton.icon(onPressed: () => _attach(item), icon: const Icon(Icons.attach_file, size: 18), label: const Text('Adjuntar')),
          ]),
        ]),
      ),
    )).toList());
  }

  Widget _approvalsView() {
    if (_approvals.isEmpty) return const DalvoEmptyState(icon: Icons.task_alt, title: 'Sin aprobaciones pendientes', message: 'No hay cotizaciones visibles por aprobar.');
    return Column(children: _approvals.map((item) => Padding(
      padding: const EdgeInsets.only(bottom: 9),
      child: DalvoSurface(
        padding: const EdgeInsets.all(14),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [Expanded(child: Text(item.quote, style: Theme.of(context).textTheme.titleMedium)), Text(_money(item.subtotal), style: const TextStyle(fontWeight: FontWeight.w900))]),
          const SizedBox(height: 4),
          Text('${item.company} · ${item.projectFolio}', style: const TextStyle(color: DalvoColors.primaryDark, fontWeight: FontWeight.w700)),
          const SizedBox(height: 3),
          Text(item.title, maxLines: 2, overflow: TextOverflow.ellipsis),
          const SizedBox(height: 10),
          SizedBox(width: double.infinity, child: FilledButton.icon(onPressed: () => _approve(item), icon: const Icon(Icons.check), label: const Text('Aprobar cotización'))),
        ]),
      ),
    )).toList());
  }

  Widget _attendanceView() {
    if (_attendance.isEmpty) return const DalvoEmptyState(icon: Icons.badge_outlined, title: 'Sin checadas', message: 'No hay entradas o salidas con estos filtros.');
    return Column(children: _attendance.map((item) => Padding(
      padding: const EdgeInsets.only(bottom: 9),
      child: DalvoSurface(
        padding: const EdgeInsets.all(14),
        child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
          DalvoIconTile(
            icon: item.insideGeofence ? Icons.location_on : Icons.location_off,
            color: item.insideGeofence ? DalvoColors.success : DalvoColors.danger,
            background: item.insideGeofence ? DalvoColors.successSoft : DalvoColors.dangerSoft,
          ),
          const SizedBox(width: 12),
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(item.supervisor, style: Theme.of(context).textTheme.titleMedium),
            Text('${item.event} · ${item.distanceMeters.round()} m del proyecto', style: TextStyle(color: item.insideGeofence ? DalvoColors.success : DalvoColors.danger, fontWeight: FontWeight.w700, fontSize: 12)),
            const SizedBox(height: 3),
            Text('${item.folio} · ${item.company}'),
            Text(item.project, style: Theme.of(context).textTheme.bodySmall),
          ])),
        ]),
      ),
    )).toList());
  }
}
