import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

import '../models/mobile_models.dart';
import '../services/api_client.dart';
import '../theme/dalvo_theme.dart';
import '../widgets/dalvo_widgets.dart';

class DocumentAssignmentPage extends StatefulWidget {
  final List<String> initialFiles;
  final String source;
  final String? initialScope;
  final int? initialTargetId;

  const DocumentAssignmentPage({
    super.key,
    this.initialFiles = const [],
    this.source = 'archivo',
    this.initialScope,
    this.initialTargetId,
  });

  @override
  State<DocumentAssignmentPage> createState() => _DocumentAssignmentPageState();
}

class _DocumentAssignmentPageState extends State<DocumentAssignmentPage> {
  final _search = TextEditingController();
  final _detail = TextEditingController();
  final _amount = TextEditingController();
  final _picker = ImagePicker();
  final List<String> _files = [];
  List<DocumentTarget> _targets = [];
  String _scope = 'PROJECT';
  String _documentType = 'Comprobante';
  int? _targetId;
  bool _loading = false;
  bool _saving = false;
  bool _amountIncludesTax = true;
  String? _error;

  static const _types = <String, List<String>>{
    'PROJECT': ['Comprobante', 'Factura', 'Orden de compra', 'Complemento de pago', 'Otro'],
    'PAYABLE': ['Factura', 'Comprobante de pago', 'Complemento de pago'],
    'RECEIVABLE': ['Factura', 'GR', 'Track ID', 'Comprobante de pago', 'Complemento de pago'],
  };

  @override
  void initState() {
    super.initState();
    _scope = widget.initialScope ?? 'PROJECT';
    _documentType = _types[_scope]!.first;
    _targetId = widget.initialTargetId;
    _files.addAll(widget.initialFiles.where((path) => path.trim().isNotEmpty));
    _loadTargets();
  }

  @override
  void dispose() {
    _search.dispose();
    _detail.dispose();
    _amount.dispose();
    super.dispose();
  }

  Future<void> _loadTargets() async {
    setState(() { _loading = true; _error = null; });
    try {
      final rows = await ApiClient.instance.documentTargets(scope: _scope, search: _search.text);
      if (!mounted) return;
      setState(() {
        _targets = rows;
        if (_targetId != null && !rows.any((row) => row.id == _targetId)) _targetId = null;
      });
    } catch (error) {
      if (mounted) setState(() => _error = '$error');
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _pickFiles() async {
    final files = await FilePicker.pickFiles(
      type: FileType.custom,
      allowedExtensions: const ['pdf', 'xml', 'txt', 'csv', 'xls', 'xlsx', 'jpg', 'jpeg', 'png', 'webp', 'heic', 'heif'],
    );
    _addFiles(files.map((file) => file.path).whereType<String>());
  }

  Future<void> _pickGallery() async {
    final files = await _picker.pickMultiImage(imageQuality: 92);
    _addFiles(files.map((file) => file.path));
  }

  Future<void> _takePhoto() async {
    final file = await _picker.pickImage(source: ImageSource.camera, imageQuality: 92);
    if (file != null) _addFiles([file.path]);
  }

  void _addFiles(Iterable<String> paths) {
    setState(() {
      for (final path in paths) {
        if (path.isNotEmpty && !_files.contains(path) && _files.length < 20) _files.add(path);
      }
    });
  }

  String _name(String path) => path.replaceAll('\\', '/').split('/').last;

  Future<void> _submit() async {
    final isPayment = _scope == 'RECEIVABLE' && _documentType == 'Comprobante de pago';
    final amount = double.tryParse(_amount.text.replaceAll(',', '').replaceAll(r'$', '').trim());
    if (_targetId == null || _files.isEmpty || (isPayment && (amount == null || amount <= 0))) {
      setState(() => _error = isPayment
          ? 'Selecciona una cuenta, agrega archivos e indica el monto real recibido.'
          : 'Selecciona un destino y agrega al menos un archivo.');
      return;
    }
    setState(() { _saving = true; _error = null; });
    try {
      final result = await ApiClient.instance.assignDocuments(
        scope: _scope,
        targetId: _targetId!,
        documentType: _documentType,
        filePaths: _files,
        detail: _detail.text,
        amount: isPayment ? amount : null,
        amountIncludesTax: isPayment && _amountIncludesTax,
        source: widget.source,
      );
      if (!mounted) return;
      final assigned = result['assigned'] ?? 0;
      final duplicates = result['duplicates'] ?? 0;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('$assigned archivo(s) asignado(s)${duplicates == 0 ? '' : ' · $duplicates duplicado(s) omitido(s)'}')),
      );
      Navigator.of(context).pop(true);
    } catch (error) {
      if (mounted) setState(() => _error = '$error');
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final isPayment = _scope == 'RECEIVABLE' && _documentType == 'Comprobante de pago';
    return Scaffold(
      appBar: AppBar(title: const Text('Asignar documentos')),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.fromLTRB(16, 8, 16, 120),
          children: [
            const DalvoSectionTitle(
              title: 'Destino del archivo',
              subtitle: 'El documento aparecerá también en la ficha web del proyecto o cuenta.',
            ),
            const SizedBox(height: 14),
            SegmentedButton<String>(
              segments: const [
                ButtonSegment(value: 'PROJECT', label: Text('Proyecto'), icon: Icon(Icons.work_outline)),
                ButtonSegment(value: 'PAYABLE', label: Text('CxP'), icon: Icon(Icons.payments_outlined)),
                ButtonSegment(value: 'RECEIVABLE', label: Text('CxC'), icon: Icon(Icons.request_quote_outlined)),
              ],
              selected: {_scope},
              onSelectionChanged: (values) {
                setState(() {
                  _scope = values.first;
                  _documentType = _types[_scope]!.first;
                  _targetId = null;
                  _targets = [];
                });
                _loadTargets();
              },
            ),
            const SizedBox(height: 12),
            Row(children: [
              Expanded(
                child: TextField(
                  controller: _search,
                  textInputAction: TextInputAction.search,
                  onSubmitted: (_) => _loadTargets(),
                  decoration: const InputDecoration(prefixIcon: Icon(Icons.search), hintText: 'Folio, empresa, proyecto o PO'),
                ),
              ),
              const SizedBox(width: 8),
              IconButton.filledTonal(onPressed: _loading ? null : _loadTargets, icon: const Icon(Icons.search)),
            ]),
            const SizedBox(height: 12),
            if (_loading) const LinearProgressIndicator(minHeight: 2),
            DropdownButtonFormField<int>(
              value: _targetId,
              isExpanded: true,
              decoration: const InputDecoration(labelText: 'Proyecto o cuenta'),
              items: _targets.map((target) => DropdownMenuItem(
                value: target.id,
                child: Text('${target.folio} · ${target.company} · ${target.title}', maxLines: 2, overflow: TextOverflow.ellipsis),
              )).toList(),
              onChanged: (value) => setState(() => _targetId = value),
            ),
            const SizedBox(height: 18),
            DropdownButtonFormField<String>(
              value: _documentType,
              decoration: const InputDecoration(labelText: 'Tipo de documento'),
              items: _types[_scope]!.map((value) => DropdownMenuItem(value: value, child: Text(value))).toList(),
              onChanged: (value) => setState(() => _documentType = value ?? _types[_scope]!.first),
            ),
            if (isPayment) ...[
              const SizedBox(height: 12),
              TextField(
                controller: _amount,
                keyboardType: const TextInputType.numberWithOptions(decimal: true),
                decoration: const InputDecoration(labelText: 'Monto real del comprobante', prefixText: r'$ '),
              ),
              SwitchListTile(
                contentPadding: EdgeInsets.zero,
                title: const Text('El monto incluye IVA', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 13)),
                subtitle: const Text('Se aplicará el neto a CxC y se conservará el total recibido.'),
                value: _amountIncludesTax,
                onChanged: (value) => setState(() => _amountIncludesTax = value),
              ),
              const Text('El comprobante registra el cobro; la cuenta seguirá esperando el complemento de pago.', style: TextStyle(color: DalvoColors.muted, fontSize: 12)),
            ],
            const SizedBox(height: 12),
            TextField(
              controller: _detail,
              maxLength: 500,
              minLines: 2,
              maxLines: 4,
              decoration: const InputDecoration(labelText: 'Detalle o referencia', hintText: 'Ej. transferencia BBVA, folio y concepto'),
            ),
            const SizedBox(height: 8),
            const DalvoSectionTitle(title: 'Archivos', subtitle: 'Puedes combinar compartidos, galería, cámara y documentos.'),
            const SizedBox(height: 10),
            Wrap(spacing: 8, runSpacing: 8, children: [
              OutlinedButton.icon(onPressed: _pickFiles, icon: const Icon(Icons.attach_file), label: const Text('Archivos')),
              OutlinedButton.icon(onPressed: _pickGallery, icon: const Icon(Icons.photo_library_outlined), label: const Text('Galería')),
              OutlinedButton.icon(onPressed: _takePhoto, icon: const Icon(Icons.photo_camera_outlined), label: const Text('Cámara')),
            ]),
            const SizedBox(height: 10),
            if (_files.isEmpty)
              const DalvoEmptyState(icon: Icons.upload_file_outlined, title: 'Sin archivos', message: 'Agrega uno o varios documentos para continuar.')
            else
              ..._files.asMap().entries.map((entry) => ListTile(
                    dense: true,
                    contentPadding: EdgeInsets.zero,
                    leading: const Icon(Icons.insert_drive_file_outlined),
                    title: Text(_name(entry.value), maxLines: 1, overflow: TextOverflow.ellipsis),
                    trailing: IconButton(
                      icon: const Icon(Icons.close),
                      onPressed: () => setState(() => _files.removeAt(entry.key)),
                    ),
                  )),
            if (_error != null) ...[
              const SizedBox(height: 12),
              Text(_error!, style: const TextStyle(color: DalvoColors.danger, fontWeight: FontWeight.w700)),
            ],
          ],
        ),
      ),
      bottomNavigationBar: SafeArea(
        minimum: const EdgeInsets.all(16),
        child: FilledButton.icon(
          onPressed: _saving ? null : _submit,
          icon: _saving
              ? const SizedBox(width: 18, height: 18, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
              : const Icon(Icons.cloud_upload_outlined),
          label: Text(_saving ? 'Asignando…' : 'Asignar ${_files.length} archivo(s)'),
        ),
      ),
    );
  }
}
