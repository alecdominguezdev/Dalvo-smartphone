import 'dart:async';

import 'package:flutter/material.dart';

import '../services/api_client.dart';
import '../services/budget_notification_service.dart';
import '../services/document_viewer_service.dart';
import '../theme/dalvo_theme.dart';
import '../widgets/dalvo_widgets.dart';
import 'module_common.dart';

class BudgetsPage extends StatefulWidget {
  final Future<void> Function()? onPendingChanged;
  const BudgetsPage({super.key, this.onPendingChanged});
  @override
  State<BudgetsPage> createState() => _BudgetsPageState();
}

class _BudgetsPageState extends State<BudgetsPage> {
  final _search = TextEditingController();
  String _state = '';
  String _status = '';
  String _company = '';
  bool _pendingOnly = true;
  int _pendingCount = 0;
  bool _loading = true;
  String? _error;
  List<Map<String, dynamic>> _rows = const [];
  StreamSubscription<void>? _budgetUpdateSubscription;

  @override
  void initState() {
    super.initState();
    _budgetUpdateSubscription = BudgetNotificationService.instance.budgetUpdates.listen((_) => _load());
    _load();
  }
  @override
  void dispose() {
    _budgetUpdateSubscription?.cancel();
    _search.dispose();
    super.dispose();
  }

  Future<void> _load() async {
    setState(() { _loading = true; _error = null; });
    try {
      final rows = await ApiClient.instance.budgets(
        search: _search.text,
        state: _state,
        status: _status,
        company: _company,
        pendingApproval: _pendingOnly,
      );
      final pendingRows = await ApiClient.instance.budgets(pendingApproval: true);
      rows.sort((a, b) => '${b['updatedAt'] ?? b['createdAt'] ?? ''}'.compareTo('${a['updatedAt'] ?? a['createdAt'] ?? ''}'));
      if (mounted) setState(() {
        _rows = rows;
        _pendingCount = pendingRows.length;
      });
    } catch (error) {
      if (mounted) setState(() => _error = error is ApiException ? error.message : 'No se pudieron cargar los presupuestos.');
    } finally { if (mounted) setState(() => _loading = false); }
  }

  Future<void> _filters() async {
    var state = _state, status = _status, company = _company;
    await showModalBottomSheet(context: context, isScrollControlled: true, builder: (context) => StatefulBuilder(builder: (context, setSheet) => Padding(
      padding: EdgeInsets.fromLTRB(20, 22, 20, 24 + MediaQuery.of(context).viewInsets.bottom),
      child: Column(mainAxisSize: MainAxisSize.min, crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text('Filtrar presupuestos', style: Theme.of(context).textTheme.titleLarge), const SizedBox(height: 18),
        TextFormField(initialValue: company, decoration: const InputDecoration(labelText: 'Empresa', hintText: 'Ej. HONDA DE MEXICO'), onChanged: (value) => company = value.trim()), const SizedBox(height: 12),
        DropdownButtonFormField<String>(initialValue: state, decoration: const InputDecoration(labelText: 'Estado'), items: const [
          DropdownMenuItem(value: '', child: Text('Todos')), DropdownMenuItem(value: 'Abierta', child: Text('Abierta')), DropdownMenuItem(value: 'En proceso', child: Text('En proceso')), DropdownMenuItem(value: 'Cerrada', child: Text('Cerrada')),
        ], onChanged: (value) => setSheet(() => state = value ?? '')), const SizedBox(height: 12),
        DropdownButtonFormField<String>(initialValue: status, decoration: const InputDecoration(labelText: 'Estatus'), items: const [
          DropdownMenuItem(value: '', child: Text('Todos')), DropdownMenuItem(value: 'En espera de aprobación', child: Text('En espera de aprobación')), DropdownMenuItem(value: 'Aprobado', child: Text('Aprobado')), DropdownMenuItem(value: 'No aprobado', child: Text('No aprobado')), DropdownMenuItem(value: 'En espera de PO', child: Text('En espera de PO')),
        ], onChanged: (value) => setSheet(() => status = value ?? '')), const SizedBox(height: 18),
        Row(children: [Expanded(child: OutlinedButton(onPressed: () { state=''; status=''; company=''; setSheet((){}); }, child: const Text('Limpiar'))), const SizedBox(width: 8), Expanded(child: FilledButton(onPressed: () { _state=state; _status=status; _company=company; if(status.isNotEmpty && status!='En espera de aprobación')_pendingOnly=false; Navigator.pop(context); _load(); }, child: const Text('Aplicar')))]),
      ]),
    )));
  }

  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
    onRefresh: _load,
    child: ListView(padding: const EdgeInsets.fromLTRB(16, 18, 16, 100), children: [
      const ModuleHeader(eyebrow: 'Presupuesto', title: 'Cotizaciones y proyectos', subtitle: 'Consulta la información financiera y aprueba con todos los datos a la vista.', icon: Icons.request_quote_outlined),
      const SizedBox(height: 18),
      SegmentedButton<bool>(
        segments: const [
          ButtonSegment<bool>(
            value: true,
            icon: Icon(Icons.approval_outlined),
            label: Text('Por aprobar'),
          ),
          ButtonSegment<bool>(
            value: false,
            icon: Icon(Icons.list_alt_rounded),
            label: Text('Todos'),
          ),
        ],
        selected: {_pendingOnly},
        onSelectionChanged: (values) {
          setState(() {
            _pendingOnly = values.first;
            if (_pendingOnly) {
              _state = '';
              _status = '';
            }
          });
          _load();
        },
      ),
      const SizedBox(height: 12),
      ModuleSearch(controller: _search, hint: 'Folio, empresa, proyecto, cliente o PO', onSearch: _load, onFilters: _filters, filtersActive: _state.isNotEmpty || _status.isNotEmpty || _company.isNotEmpty),
      const SizedBox(height: 14),
      if (!_loading && _error == null) ...[
        Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(color: DalvoColors.warningSoft, borderRadius: BorderRadius.circular(11), border: Border.all(color: DalvoColors.warning.withOpacity(.22))),
          child: Row(children: [
            const Icon(Icons.notifications_active_outlined, color: DalvoColors.warning),
            const SizedBox(width: 10),
            Expanded(child: Text('$_pendingCount presupuesto${_pendingCount == 1 ? '' : 's'} por aprobar', style: const TextStyle(color: DalvoColors.warning, fontWeight: FontWeight.w900))),
          ]),
        ),
        const SizedBox(height: 12),
      ],
      if (_loading) const Center(child: Padding(padding: EdgeInsets.all(40), child: CircularProgressIndicator()))
      else if (_error != null) DalvoEmptyState(icon: Icons.error_outline, title: 'No se pudo cargar', message: _error!, error: true, action: OutlinedButton(onPressed: _load, child: const Text('Reintentar')))
      else if (_rows.isEmpty) const DalvoEmptyState(icon: Icons.search_off_rounded, title: 'Sin resultados', message: 'No hay presupuestos que coincidan con los filtros.')
      else ..._rows.map((row) => Padding(padding: const EdgeInsets.only(bottom: 10), child: _BudgetCard(row: row, onTap: () async {
        await Navigator.of(context).push(MaterialPageRoute(builder: (_) => BudgetDetailPage(
          budgetId: int.tryParse('${row['id']}') ?? 0,
          onStatusChanged: widget.onPendingChanged,
        )));
        await _load();
        await widget.onPendingChanged?.call();
      }))),
    ]),
  );
  }

}

class _BudgetCard extends StatelessWidget {
  final Map<String, dynamic> row;
  final VoidCallback onTap;
  const _BudgetCard({required this.row, required this.onTap});
  @override
  Widget build(BuildContext context) {
    final status = '${row['status'] ?? ''}';
    return DalvoSurface(onTap: onTap, child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Expanded(child: Text('${row['folio'] ?? 'Sin folio'}', style: Theme.of(context).textTheme.titleMedium)),
        Text(dalvoMoney(row['amount']), style: const TextStyle(fontWeight: FontWeight.w900)),
      ]),
      const SizedBox(height: 7),
      Text('${row['company'] ?? ''}', style: const TextStyle(color: DalvoColors.primaryDark, fontWeight: FontWeight.w800)),
      const SizedBox(height: 5), Text('${row['title'] ?? ''}', maxLines: 2, overflow: TextOverflow.ellipsis),
      if ('${row['po'] ?? ''}'.trim().isNotEmpty) ...[const SizedBox(height: 5), Text('PO: ${row['po']}', style: Theme.of(context).textTheme.bodySmall)],
      const SizedBox(height: 12), Row(children: [
        DalvoBadge(label: status.isEmpty ? '${row['state'] ?? ''}' : status, foreground: statusColor(status)),
        const Spacer(), const Icon(Icons.chevron_right_rounded, color: DalvoColors.muted),
      ]),
    ]));
  }
}

class BudgetDetailPage extends StatefulWidget {
  final int budgetId;
  final Future<void> Function()? onStatusChanged;
  const BudgetDetailPage({
    super.key,
    required this.budgetId,
    this.onStatusChanged,
  });
  @override
  State<BudgetDetailPage> createState() => _BudgetDetailPageState();
}

class _BudgetDetailPageState extends State<BudgetDetailPage> {
  Map<String, dynamic>? _data;
  String? _error;
  String? _feedback;
  bool _feedbackApproved = false;
  bool _busy = false;
  @override
  void initState(){super.initState();_load();}
  Future<void> _load() async { try { final data=await ApiClient.instance.budgetFull(widget.budgetId); if(mounted)setState((){_data=data;_error=null;}); } catch(error){if(mounted)setState(()=>_error=error is ApiException?error.message:'No se pudo cargar el presupuesto.');} }
  Future<void> _status(String action) async {
    const labels = {
      'approve': ('Aprobar presupuesto', 'Se marcará el presupuesto como aprobado.', 'Aprobar'),
      'reject': ('No aprobar presupuesto', 'Se marcará el presupuesto como no aprobado.', 'No aprobar'),
      'close': ('Cerrar orden', 'El presupuesto se marcará como cerrado.', 'Cerrar orden'),
      'reopen': ('Reabrir presupuesto', 'El presupuesto volverá a estar activo.', 'Reabrir'),
    };
    final copy = labels[action] ?? labels['reject']!;
    final approve=action=='approve';
    final confirm=await showDialog<bool>(context: context,builder:(context)=>AlertDialog(title:Text(copy.$1),content:Text(copy.$2),actions:[TextButton(onPressed:()=>Navigator.pop(context,false),child:const Text('Cancelar')),FilledButton(onPressed:()=>Navigator.pop(context,true),child:Text(copy.$3))]));
    if(confirm!=true)return; setState(()=>_busy=true);
    try {
      final result=await ApiClient.instance.updateBudgetStatus(widget.budgetId,action);
      await _load();
      await widget.onStatusChanged?.call();
      if (!mounted) return;
      final message='${result['message'] ?? 'Presupuesto actualizado correctamente.'}';
      setState(() { _feedback=message; _feedbackApproved=approve || action == 'reopen'; });
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        backgroundColor: approve || action == 'reopen' ? DalvoColors.success : DalvoColors.warning,
        content: Row(children:[
          Icon(approve || action == 'reopen' ? Icons.check_circle_rounded : Icons.info_outline_rounded,color:Colors.white),
          const SizedBox(width:10),
          Expanded(child:Text(message,style:const TextStyle(color:Colors.white,fontWeight:FontWeight.w700))),
        ]),
      ));
    } catch(error) {
      if(mounted)ScaffoldMessenger.of(context).showSnackBar(SnackBar(content:Text(error is ApiException?error.message:'No se pudo actualizar.')));
    } finally {if(mounted)setState(()=>_busy=false);}
  }
  @override
  Widget build(BuildContext context){
    final data=_data,budget=data?['budget'] as Map<String,dynamic>?,financial=data?['financial'] as Map<String,dynamic>?;
    final statusKey='${budget?['status']??''}'.trim().toLowerCase();
    final stateKey='${budget?['state']??''}'.trim().toLowerCase();
    final isPendingApproval=statusKey=='en espera de aprobación'||statusKey=='en espera de aprobacion';
    // El texto visible manda: un presupuesto aprobado jamás debe conservar acciones de aprobación.
    final canApprove=budget?['canApprove']==true && isPendingApproval;
    final canReopen=budget?['canReopen']==true && stateKey=='cerrada';
    final canClose=budget?['canClose']==true && stateKey!='cerrada';
    return Scaffold(appBar:AppBar(title:Text(budget?['folio']?.toString()??'Presupuesto')),body:_error!=null?Center(child:DalvoEmptyState(icon:Icons.error_outline,title:'No se pudo cargar',message:_error!,error:true,action:OutlinedButton(onPressed:_load,child:const Text('Reintentar')))):data==null?const Center(child:CircularProgressIndicator()):RefreshIndicator(onRefresh:_load,child:ListView(padding:const EdgeInsets.fromLTRB(16,10,16,30),children:[
      ModuleHeader(eyebrow:'Presupuesto',title:'${budget?['title']??''}',subtitle:'Información de decisión, costos y documentos del proyecto.',icon:Icons.request_quote_outlined),
      if(_feedback!=null)...[const SizedBox(height:12),Container(
        padding:const EdgeInsets.all(14),
        decoration:BoxDecoration(
          color:_feedbackApproved?DalvoColors.successSoft:DalvoColors.warningSoft,
          borderRadius:BorderRadius.circular(8),
          border:Border.all(color:(_feedbackApproved?DalvoColors.success:DalvoColors.warning).withOpacity(.25)),
        ),
        child:Row(children:[
          Icon(_feedbackApproved?Icons.check_circle_rounded:Icons.info_outline_rounded,color:_feedbackApproved?DalvoColors.success:DalvoColors.warning),
          const SizedBox(width:10),
          Expanded(child:Text(_feedback!,style:TextStyle(color:_feedbackApproved?DalvoColors.success:DalvoColors.warning,fontWeight:FontWeight.w800))),
        ]),
      )],
      const SizedBox(height:16),DalvoSurface(child:Column(crossAxisAlignment:CrossAxisAlignment.start,children:[
        Text('Datos del proyecto',style:Theme.of(context).textTheme.titleMedium),const SizedBox(height:14),
        DetailValue(label:'Empresa',value:'${budget?['company']??''}'),DetailValue(label:'Sucursal',value:'${budget?['branch']??''}'),DetailValue(label:'Cliente / Usuario',value:'${budget?['client']??''}'),DetailValue(label:'Área',value:'${budget?['area']??''}'),DetailValue(label:'Fecha',value:dalvoDate(budget?['date'])),DetailValue(label:'Folio',value:'${budget?['folio']??''}'),DetailValue(label:'PO',value:'${budget?['po']??''}'),DetailValue(label:'Estado / Estatus',value:'${budget?['state']??''} · ${budget?['status']??''}'),DetailValue(label:'Owner',value:'${budget?['owner']??''}'),
        if(canApprove) ...[
          const SizedBox(height: 12),
          Row(children:[Expanded(child:OutlinedButton(onPressed:_busy?null:()=>_status('reject'),child:const Text('No aprobar'))),const SizedBox(width:8),Expanded(child:FilledButton(onPressed:_busy?null:()=>_status('approve'),child:const Text('Aprobar')))]),
        ],
        if(canClose) ...[
          const SizedBox(height: 10),
          SizedBox(width: double.infinity, child: OutlinedButton.icon(onPressed:_busy?null:()=>_status('close'),icon:const Icon(Icons.lock_outline_rounded),label:const Text('Cerrar orden'))),
        ],
        if(canReopen) ...[
          const SizedBox(height: 12),
          SizedBox(width: double.infinity, child: FilledButton.icon(onPressed:_busy?null:()=>_status('reopen'),icon:const Icon(Icons.lock_open_rounded),label:const Text('Reabrir presupuesto'))),
        ],
      ])),
      const SizedBox(height:12),_FinancialSummary(financial:financial??const{}),
      if(data['quote'] is Map<String,dynamic>)...[const SizedBox(height:12),_QuoteSummary(quote:data['quote'] as Map<String,dynamic>)],
      const SizedBox(height:12),_CostBlocks(costs:(data['costs'] as Map<String,dynamic>? ?? const{})),
      const SizedBox(height:12),_FilesSection(files:(data['files'] as List? ?? const[])),
      const SizedBox(height:12),_HistorySection(rows:(data['history'] as List? ?? const[])),
    ])));
  }
}

class _QuoteSummary extends StatelessWidget {
  final Map<String, dynamic> quote;
  const _QuoteSummary({required this.quote});

  @override
  Widget build(BuildContext context) => DalvoSurface(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const DalvoIconTile(
                  icon: Icons.description_outlined,
                  size: 40,
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Cotización vigente',
                        style: Theme.of(context).textTheme.titleMedium,
                      ),
                      const SizedBox(height: 2),
                      Text(
                        '${quote['folio'] ?? 'Sin folio'} · Versión ${quote['version'] ?? 0}',
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                    ],
                  ),
                ),
                Text(
                  dalvoMoney(quote['amount']),
                  style: const TextStyle(fontWeight: FontWeight.w900),
                ),
              ],
            ),
            const SizedBox(height: 11),
            DalvoBadge(
              label: '${quote['status'] ?? 'Sin estatus'}',
              foreground: statusColor('${quote['status'] ?? ''}'),
            ),
          ],
        ),
      );
}

class _FinancialSummary extends StatelessWidget { final Map<String,dynamic> financial; const _FinancialSummary({required this.financial});
  @override Widget build(BuildContext context)=>DalvoSurface(child:Column(crossAxisAlignment:CrossAxisAlignment.start,children:[Text('Resumen financiero',style:Theme.of(context).textTheme.titleMedium),const SizedBox(height:14),
    _moneyRow('Equipos',financial['totalEquipment']),_moneyRow('Mano de obra',financial['totalLabor']),_moneyRow('Materiales',financial['totalMaterials']),_moneyRow('Presupuesto adicional',financial['totalAdditional']),const Divider(),_moneyRow('Costo de cotización',financial['quotationCost']),_moneyRow('Factor de venta',financial['saleFactor'],money:false),_moneyRow('Precio de venta',financial['salePrice']),_moneyRow('Utilidad bruta',financial['grossProfit']),_moneyRow('Comisión supervisor (${financial['commissionPercent']??0}%)',financial['commission']),const Divider(),_moneyRow('Utilidad total',financial['totalProfit'],bold:true),
  ]));
  Widget _moneyRow(String label,dynamic value,{bool money=true,bool bold=false})=>Padding(padding:const EdgeInsets.symmetric(vertical:6),child:Row(children:[Expanded(child:Text(label,style:TextStyle(fontWeight:bold?FontWeight.w900:FontWeight.w500))),Text(money?dalvoMoney(value):'${value??0}',style:TextStyle(fontWeight:bold?FontWeight.w900:FontWeight.w700))]));
}

class _CostBlocks extends StatelessWidget { final Map<String,dynamic> costs; const _CostBlocks({required this.costs});
  @override Widget build(BuildContext context){final sections={'equipment':'Equipos','contractors':'Contratistas','labor':'Mano de obra','materials':'Materiales','additionals':'Adicionales'};return DalvoSurface(child:Column(crossAxisAlignment:CrossAxisAlignment.start,children:[Text('Costos por bloque',style:Theme.of(context).textTheme.titleMedium),const SizedBox(height:8),...sections.entries.map((entry){final rows=(costs[entry.key] as List? ?? const []);return ExpansionTile(tilePadding:EdgeInsets.zero,title:Text(entry.value,style:const TextStyle(fontWeight:FontWeight.w800)),trailing:Text('${rows.length}'),children:rows.isEmpty?[const Align(alignment:Alignment.centerLeft,child:Padding(padding:EdgeInsets.only(bottom:12),child:Text('Sin partidas')))] : rows.whereType<Map<String,dynamic>>().map((row)=>ListTile(contentPadding:EdgeInsets.zero,title:Text('${row['description']??row['block']??'Partida'}'),subtitle:Text('Cantidad: ${row['quantity']??row['people']??1}'),trailing:Text(dalvoMoney(row['subtotal']??row['amount']),style:const TextStyle(fontWeight:FontWeight.w800)))).toList());}),]));}
}

class _FilesSection extends StatelessWidget { final List files; const _FilesSection({required this.files});
  @override Widget build(BuildContext context)=>DalvoSurface(child:Column(crossAxisAlignment:CrossAxisAlignment.start,children:[Text('Documentos del proyecto',style:Theme.of(context).textTheme.titleMedium),const SizedBox(height:8),if(files.isEmpty)const Text('Sin archivos cargados',style:TextStyle(color:DalvoColors.muted)) else ...files.whereType<Map<String,dynamic>>().map((file)=>ListTile(contentPadding:EdgeInsets.zero,leading:const DalvoIconTile(icon:Icons.picture_as_pdf_outlined,size:38),title:Text('${file['name']??'Archivo'}',maxLines:2,overflow:TextOverflow.ellipsis),subtitle:Text('${file['type']??'Documento'} · ${dalvoDate(file['createdAt'])}'),trailing:IconButton(tooltip:'Abrir',icon:const Icon(Icons.open_in_new_rounded),onPressed:()=>DocumentViewerService.open(context,scope:'${file['scope']??'BUDGET'}',fileId:int.tryParse('${file['id']}')??0))))]));
}

class _HistorySection extends StatelessWidget { final List rows; const _HistorySection({required this.rows});
  @override Widget build(BuildContext context)=>DalvoSurface(child:Column(crossAxisAlignment:CrossAxisAlignment.start,children:[Text('Historial de cambios',style:Theme.of(context).textTheme.titleMedium),const SizedBox(height:8),if(rows.isEmpty)const Text('Todavía no hay cambios registrados.',style:TextStyle(color:DalvoColors.muted)) else ...rows.whereType<Map<String,dynamic>>().map((row)=>ListTile(contentPadding:EdgeInsets.zero,leading:const Icon(Icons.history_rounded),title:Text('${row['action']??'Cambio'}'),subtitle:Text('${row['user']??'Sistema'} · ${dalvoDate(row['createdAt'])}')))]));
}
