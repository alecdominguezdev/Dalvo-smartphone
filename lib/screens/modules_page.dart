import 'package:flutter/material.dart';

import '../models/mobile_models.dart';
import '../services/api_client.dart';
import '../theme/dalvo_theme.dart';
import '../widgets/dalvo_widgets.dart';
import 'budgets_page.dart';
import 'business_modules_pages.dart';
import 'company_locations_page.dart';
import 'attendance_page.dart';
import 'module_common.dart';
import 'projects_page.dart';
import 'reports_overview_page.dart';

class ModulesPage extends StatelessWidget {
  const ModulesPage({super.key});

  bool _allowed(String key) {
    final access = ApiClient.instance.currentAccess;
    for (final module in access?.modules ?? const <DalvoModuleAccess>[]) {
      if (module.key == key) return module.allowed && module.mobileAvailable;
    }
    return false;
  }

  bool get _isAdmin {
    final role = (ApiClient.instance.currentUser?.role ?? '')
        .toLowerCase()
        .replaceAll('ó', 'o');
    return role == 'administracion' || role == 'superadmin';
  }

  @override
  Widget build(BuildContext context) {
    final modules = <_ModuleEntry>[
      if (_allowed('presupuesto')) const _ModuleEntry('Presupuesto', 'Cotizaciones, costos y aprobación', Icons.request_quote_outlined, BudgetsPage()),
      if (_allowed('compras')) const _ModuleEntry('Compras', 'Órdenes, proveedores y archivos', Icons.inventory_2_outlined, PurchasesPage()),
      if (_allowed('cuentas-pagar')) const _ModuleEntry('Cuentas por pagar', 'Facturas y pagos a proveedores', Icons.payments_outlined, FinanceAccountsPage(receivable: false)),
      if (_allowed('cuentas-cobrar')) const _ModuleEntry('Cuentas por cobrar', 'Facturación, saldos y cobros', Icons.request_page_outlined, FinanceAccountsPage(receivable: true)),
      if (_allowed('tareas')) const _ModuleEntry('Tareas', 'Pendientes y seguimiento', Icons.task_alt_outlined, TasksPage()),
      if (_isAdmin) const _ModuleEntry('Empresas', 'Ubicaciones y perímetros de asistencia', Icons.location_city_outlined, CompanyLocationsPage()),
      if (ApiClient.instance.currentAccess?.canUseSupervision == true) const _ModuleEntry('Asistencia', 'Entrada y salida con ubicación', Icons.fingerprint_rounded, AttendancePage()),
      if (ApiClient.instance.currentAccess?.canUseSupervision == true) const _ModuleEntry('Proyectos', 'Proyectos asignados y avance', Icons.dashboard_outlined, ProjectsPage(embedded: true)),
      if (_allowed('reportes')) const _ModuleEntry('Informes', 'Informes de supervisión', Icons.description_outlined, ReportsOverviewPage()),
      if (_allowed('exportaciones')) const _ModuleEntry('Exportaciones', 'Descargar información autorizada', Icons.file_download_outlined, ExportsPage()),
    ];
    return ListView(padding: const EdgeInsets.fromLTRB(16, 18, 16, 100), children: [
      const ModuleHeader(eyebrow: 'Dalvo', title: 'Módulos', subtitle: '', icon: Icons.grid_view_rounded),
      const SizedBox(height: 18),
      if (modules.isEmpty) const DalvoEmptyState(icon: Icons.lock_outline, title: 'Sin módulos disponibles', message: 'Tu usuario no tiene módulos móviles habilitados.')
      else GridView.builder(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        itemCount: modules.length,
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2, mainAxisSpacing: 10, crossAxisSpacing: 10, childAspectRatio: .94),
        itemBuilder: (context, index) {
          final item = modules[index];
          return DalvoSurface(onTap: () => Navigator.of(context).push(MaterialPageRoute(builder: (_) => Scaffold(appBar: AppBar(title: Text(item.title)), body: item.page))), child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            DalvoIconTile(icon: item.icon), const Spacer(), Text(item.title, style: Theme.of(context).textTheme.titleMedium), const SizedBox(height: 5), Text(item.subtitle, maxLines: 3, overflow: TextOverflow.ellipsis, style: Theme.of(context).textTheme.bodySmall), const SizedBox(height: 8), const Align(alignment: Alignment.centerRight, child: Icon(Icons.arrow_forward_rounded, size: 18, color: DalvoColors.primaryDark)),
          ]));
        },
      ),
    ]);
  }
}

class _ModuleEntry {
  final String title;
  final String subtitle;
  final IconData icon;
  final Widget page;
  const _ModuleEntry(this.title, this.subtitle, this.icon, this.page);
}
