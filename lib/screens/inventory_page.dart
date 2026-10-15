import 'dart:async';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:image_picker/image_picker.dart';

import '../models/inventory_models.dart';
import '../services/api_client.dart';
import '../theme/dalvo_theme.dart';
import '../widgets/dalvo_widgets.dart';
import 'module_common.dart';

class InventoryPage extends StatefulWidget {
  const InventoryPage({super.key});
  @override
  State<InventoryPage> createState() => _InventoryPageState();
}

class _InventoryPageState extends State<InventoryPage> {
  final _search = TextEditingController();
  Timer? _searchTimer;
  InventoryResult? _result;
  List<InventoryItem> _items = [];
  String _type = '';
  String _availability = '';
  String? _error;
  bool _loading = true;
  bool _loadingMore = false;
  int _page = 1;
  int _request = 0;

  @override
  void initState() {
    super.initState();
    _load();
  }

  @override
  void dispose() {
    _request++;
    _searchTimer?.cancel();
    _search.dispose();
    super.dispose();
  }

  Future<void> _load({bool more = false}) async {
    if (more && (_loadingMore || _loading)) return;
    final request = ++_request;
    final page = more ? _page + 1 : 1;
    setState(() {
      if (more) {
        _loadingMore = true;
      } else {
        _loading = true;
      }
      _error = null;
    });
    try {
      final result = await ApiClient.instance.inventory(
        search: _search.text,
        type: _type,
        availability: _availability,
        page: page,
      );
      if (!mounted || request != _request) return;
      setState(() {
        _result = result;
        _items = more ? [..._items, ...result.items] : result.items;
        _page = page;
      });
    } catch (error) {
      if (mounted && request == _request)
        setState(() => _error = error.toString());
    } finally {
      if (mounted && request == _request)
        setState(() {
          _loading = false;
          _loadingMore = false;
        });
    }
  }

  Future<void> _newItem() async {
    final item = await Navigator.of(context).push<InventoryItem>(
      MaterialPageRoute(builder: (_) => const InventoryFormPage()),
    );
    if (!mounted || item == null) return;
    await _open(item.id);
  }

  Future<void> _open(int id) async {
    await Navigator.of(
      context,
    ).push(MaterialPageRoute(builder: (_) => InventoryDetailPage(itemId: id)));
    if (mounted) await _load();
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(
      title: const Text('Inventario'),
      actions: [
        IconButton(
          onPressed: () => _load(),
          tooltip: 'Actualizar inventario',
          icon: const Icon(Icons.refresh_rounded),
        ),
      ],
    ),
    floatingActionButton: _result?.access.canCreate == true
        ? FloatingActionButton.extended(
            onPressed: _newItem,
            backgroundColor: DalvoColors.ink,
            foregroundColor: Colors.white,
            icon: const Icon(Icons.add_rounded),
            label: const Text('Nuevo artículo'),
          )
        : null,
    body: RefreshIndicator(
      onRefresh: () => _load(),
      child: CustomScrollView(
        physics: const AlwaysScrollableScrollPhysics(),
        slivers: [
          SliverPadding(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 0),
            sliver: SliverToBoxAdapter(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const ModuleHeader(
                    eyebrow: 'Almacén',
                    title: 'Todo en su lugar',
                    subtitle:
                        'Fotografías, herramientas y existencias a la mano.',
                    icon: Icons.inventory_2_outlined,
                  ),
                  const SizedBox(height: 20),
                  Row(
                    children: [
                      Expanded(
                        child: _InventoryStat(
                          label: 'Artículos',
                          value: '${_result?.articles ?? '—'}',
                        ),
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: _InventoryStat(
                          label: 'Unidades',
                          value: '${_result?.units ?? '—'}',
                        ),
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: _InventoryStat(
                          label: 'Sin stock',
                          value: '${_result?.empty ?? '—'}',
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 18),
                  TextField(
                    controller: _search,
                    textInputAction: TextInputAction.search,
                    onSubmitted: (_) {
                      _searchTimer?.cancel();
                      _load();
                    },
                    onChanged: (_) {
                      _searchTimer?.cancel();
                      _searchTimer = Timer(
                        const Duration(milliseconds: 350),
                        () => _load(),
                      );
                    },
                    decoration: InputDecoration(
                      hintText: 'Nombre, folio, modelo o serie',
                      prefixIcon: const Icon(Icons.search_rounded),
                      suffixIcon: IconButton(
                        tooltip: 'Limpiar búsqueda',
                        onPressed: () {
                          _search.clear();
                          _load();
                        },
                        icon: const Icon(Icons.close_rounded),
                      ),
                    ),
                  ),
                  const SizedBox(height: 10),
                  Wrap(
                    spacing: 8,
                    runSpacing: 4,
                    children: [
                      ChoiceChip(
                        label: const Text('Todos'),
                        selected: _availability.isEmpty,
                        onSelected: (_) {
                          setState(() => _availability = '');
                          _load();
                        },
                      ),
                      ChoiceChip(
                        label: const Text('Con existencias'),
                        selected: _availability == 'available',
                        onSelected: (_) {
                          setState(() => _availability = 'available');
                          _load();
                        },
                      ),
                      ChoiceChip(
                        label: const Text('Sin existencias'),
                        selected: _availability == 'empty',
                        onSelected: (_) {
                          setState(() => _availability = 'empty');
                          _load();
                        },
                      ),
                    ],
                  ),
                  if (_result?.types.isNotEmpty == true)
                    Padding(
                      padding: const EdgeInsets.only(top: 10),
                      child: DropdownButtonFormField<String>(
                        value: _type,
                        isExpanded: true,
                        decoration: const InputDecoration(
                          labelText: 'Tipo de herramienta',
                        ),
                        items: [
                          const DropdownMenuItem(
                            value: '',
                            child: Text('Todos los tipos'),
                          ),
                          ...{
                            ..._result!.types,
                            if (_type.isNotEmpty) _type,
                          }.map(
                            (type) => DropdownMenuItem(
                              value: type,
                              child: Text(
                                type,
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                          ),
                        ],
                        onChanged: (value) {
                          setState(() => _type = value ?? '');
                          _load();
                        },
                      ),
                    ),
                  const SizedBox(height: 18),
                  if (_error != null)
                    Padding(
                      padding: const EdgeInsets.only(bottom: 16),
                      child: DalvoEmptyState(
                        icon: Icons.cloud_off_outlined,
                        title: 'No pudimos cargar el inventario',
                        message: _error!,
                        error: true,
                        action: OutlinedButton(
                          onPressed: () => _load(),
                          child: const Text('Reintentar'),
                        ),
                      ),
                    ),
                  if (!_loading && _error == null)
                    Padding(
                      padding: const EdgeInsets.only(bottom: 12),
                      child: Text(
                        '${_result?.total ?? 0} artículos encontrados',
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                    ),
                ],
              ),
            ),
          ),
          if (_loading)
            const SliverToBoxAdapter(
              child: Padding(
                padding: EdgeInsets.all(36),
                child: Center(child: CircularProgressIndicator()),
              ),
            )
          else if (_items.isEmpty && _error == null)
            SliverPadding(
              padding: const EdgeInsets.all(16),
              sliver: SliverToBoxAdapter(
                child: DalvoEmptyState(
                  icon: Icons.inventory_2_outlined,
                  title:
                      _search.text.isEmpty &&
                          _availability.isEmpty &&
                          _type.isEmpty
                      ? 'Tu almacén empieza aquí'
                      : 'Sin coincidencias',
                  message:
                      _search.text.isEmpty &&
                          _availability.isEmpty &&
                          _type.isEmpty
                      ? 'Registra un artículo con su fotografía y cantidad para comenzar.'
                      : 'Prueba otro nombre, folio o filtro.',
                  action: _result?.access.canCreate == true
                      ? OutlinedButton.icon(
                          onPressed: _newItem,
                          icon: const Icon(Icons.add),
                          label: const Text('Registrar artículo'),
                        )
                      : null,
                ),
              ),
            )
          else
            SliverPadding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              sliver: SliverLayoutBuilder(
                builder: (context, constraints) {
                  final columns = constraints.crossAxisExtent >= 900
                      ? 3
                      : constraints.crossAxisExtent >= 560
                      ? 2
                      : 1;
                  return SliverGrid(
                    delegate: SliverChildBuilderDelegate(
                      (context, index) => _InventoryCard(
                        item: _items[index],
                        onTap: () => _open(_items[index].id),
                      ),
                      childCount: _items.length,
                    ),
                    gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: columns,
                      crossAxisSpacing: 14,
                      mainAxisSpacing: 14,
                      mainAxisExtent:
                          365 +
                          (MediaQuery.textScalerOf(context).scale(14) - 14) * 8,
                    ),
                  );
                },
              ),
            ),
          if (_result?.hasMore == true && !_loading)
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.all(18),
                child: Center(
                  child: OutlinedButton(
                    onPressed: _loadingMore ? null : () => _load(more: true),
                    child: Text(
                      _loadingMore ? 'Cargando…' : 'Ver más artículos',
                    ),
                  ),
                ),
              ),
            ),
          const SliverToBoxAdapter(child: SizedBox(height: 110)),
        ],
      ),
    ),
  );
}

class _InventoryStat extends StatelessWidget {
  final String label;
  final String value;
  const _InventoryStat({required this.label, required this.value});
  @override
  Widget build(BuildContext context) => DalvoSurface(
    padding: const EdgeInsets.all(12),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: Theme.of(context).textTheme.bodySmall),
        const SizedBox(height: 6),
        FittedBox(
          fit: BoxFit.scaleDown,
          child: Text(value, style: Theme.of(context).textTheme.headlineSmall),
        ),
      ],
    ),
  );
}

class InventoryPhoto extends StatelessWidget {
  final InventoryImage? image;
  final BoxFit fit;
  const InventoryPhoto({super.key, this.image, this.fit = BoxFit.contain});
  Widget _empty() => Container(
    color: DalvoColors.surfaceSoft,
    alignment: Alignment.center,
    child: const Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(Icons.handyman_outlined, size: 45, color: DalvoColors.muted),
        SizedBox(height: 8),
        Text(
          'Sin fotografía',
          style: TextStyle(color: DalvoColors.muted, fontSize: 12),
        ),
      ],
    ),
  );
  @override
  Widget build(BuildContext context) {
    if (image == null) return _empty();
    return Container(
      color: DalvoColors.surfaceSoft,
      child: Image.network(
        ApiClient.instance.inventoryImageUri(image!.id).toString(),
        headers: ApiClient.instance.inventoryImageHeaders,
        fit: fit,
        semanticLabel: image!.name,
        errorBuilder: (_, error, stack) => _empty(),
        loadingBuilder: (_, child, progress) => progress == null
            ? child
            : const Center(child: CircularProgressIndicator(strokeWidth: 2)),
      ),
    );
  }
}

class _InventoryCard extends StatelessWidget {
  final InventoryItem item;
  final VoidCallback onTap;
  const _InventoryCard({required this.item, required this.onTap});
  @override
  Widget build(BuildContext context) => Semantics(
    button: true,
    label: '${item.name}, ${item.quantity} ${item.unit}, ${item.folio}',
    child: DalvoSurface(
      onTap: onTap,
      padding: EdgeInsets.zero,
      borderRadius: BorderRadius.circular(14),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            height: 188,
            width: double.infinity,
            child: ClipRRect(
              borderRadius: const BorderRadius.vertical(
                top: Radius.circular(14),
              ),
              child: InventoryPhoto(
                image: item.images.isEmpty ? null : item.images.first,
              ),
            ),
          ),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          item.toolType.isEmpty ? 'Artículo' : item.toolType,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: Theme.of(context).textTheme.bodySmall,
                        ),
                      ),
                      const SizedBox(width: 8),
                      DalvoBadge(
                        label: '${item.quantity} ${item.unit}',
                        foreground: item.quantity == 0
                            ? DalvoColors.warning
                            : DalvoColors.success,
                        background: item.quantity == 0
                            ? DalvoColors.warningSoft
                            : DalvoColors.successSoft,
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Text(
                    item.name,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  const SizedBox(height: 5),
                  Text(
                    item.folio,
                    style: Theme.of(context).textTheme.bodySmall,
                  ),
                  const Spacer(),
                  Row(
                    children: [
                      const Icon(
                        Icons.location_on_outlined,
                        size: 14,
                        color: DalvoColors.muted,
                      ),
                      const SizedBox(width: 4),
                      Expanded(
                        child: Text(
                          item.location.isEmpty
                              ? 'Ubicación sin especificar'
                              : item.location,
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: Theme.of(context).textTheme.bodySmall,
                        ),
                      ),
                      const Icon(Icons.arrow_forward_rounded, size: 18),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    ),
  );
}

class InventoryDetailPage extends StatefulWidget {
  final int itemId;
  const InventoryDetailPage({super.key, required this.itemId});
  @override
  State<InventoryDetailPage> createState() => _InventoryDetailPageState();
}

class _InventoryDetailPageState extends State<InventoryDetailPage> {
  InventoryItem? _item;
  InventoryAccess _access = const InventoryAccess();
  String? _error;
  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    try {
      final data = await ApiClient.instance.inventoryDetail(widget.itemId);
      if (!mounted) return;
      setState(() {
        _item = InventoryItem.fromJson(data['item'] as Map<String, dynamic>);
        _access = InventoryAccess.fromJson(
          data['permissions'] as Map<String, dynamic>,
        );
        _error = null;
      });
    } catch (error) {
      if (mounted) setState(() => _error = error.toString());
    }
  }

  Future<void> _edit() async {
    final item = await Navigator.of(context).push<InventoryItem>(
      MaterialPageRoute(builder: (_) => InventoryFormPage(item: _item)),
    );
    if (mounted && item != null) await _load();
  }

  @override
  Widget build(BuildContext context) {
    final item = _item;
    return Scaffold(
      appBar: AppBar(
        title: const Text('Detalle del artículo'),
        actions: [
          if (_access.canEdit && item != null)
            IconButton(
              onPressed: _edit,
              tooltip: 'Editar artículo',
              icon: const Icon(Icons.edit_outlined),
            ),
        ],
      ),
      body: _error != null
          ? Center(
              child: Padding(
                padding: const EdgeInsets.all(18),
                child: DalvoEmptyState(
                  icon: Icons.cloud_off_outlined,
                  title: 'No pudimos abrir el artículo',
                  message: _error!,
                  error: true,
                  action: OutlinedButton(
                    onPressed: _load,
                    child: const Text('Reintentar'),
                  ),
                ),
              ),
            )
          : item == null
          ? const Center(child: CircularProgressIndicator())
          : RefreshIndicator(
              onRefresh: _load,
              child: ListView(
                physics: const AlwaysScrollableScrollPhysics(),
                padding: const EdgeInsets.all(16),
                children: [
                  ClipRRect(
                    borderRadius: BorderRadius.circular(14),
                    child: SizedBox(
                      height: 270,
                      child: item.images.isEmpty
                          ? const InventoryPhoto()
                          : PageView(
                              children: item.images
                                  .map((image) => InventoryPhoto(image: image))
                                  .toList(),
                            ),
                    ),
                  ),
                  if (item.images.length > 1)
                    Padding(
                      padding: const EdgeInsets.only(top: 8),
                      child: Text(
                        'Desliza para ver las ${item.images.length} fotografías',
                        textAlign: TextAlign.center,
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                    ),
                  const SizedBox(height: 18),
                  Text(
                    item.folio,
                    style: Theme.of(context).textTheme.bodySmall,
                  ),
                  const SizedBox(height: 6),
                  Text(
                    item.name,
                    style: Theme.of(context).textTheme.headlineSmall,
                  ),
                  const SizedBox(height: 12),
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: [
                      DalvoBadge(
                        label: '${item.quantity} ${item.unit}',
                        foreground: item.quantity == 0
                            ? DalvoColors.warning
                            : DalvoColors.success,
                        background: item.quantity == 0
                            ? DalvoColors.warningSoft
                            : DalvoColors.successSoft,
                      ),
                      DalvoBadge(
                        label: item.quantity == 0
                            ? 'Sin existencias'
                            : 'En inventario',
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),
                  DalvoSurface(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        DetailValue(
                          label: 'Tipo de herramienta',
                          value: item.toolType,
                        ),
                        DetailValue(label: 'Modelo', value: item.model),
                        DetailValue(
                          label: 'Número de serie',
                          value: item.serialNumber,
                        ),
                        DetailValue(
                          label: 'Ubicación / almacén',
                          value: item.location,
                        ),
                        const Divider(),
                        DetailValue(
                          label: 'Descripción',
                          value: item.description,
                        ),
                        DetailValue(
                          label: 'Observaciones',
                          value: item.observations,
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),
                  if (_access.canEdit)
                    FilledButton.icon(
                      onPressed: _edit,
                      icon: const Icon(Icons.edit_outlined),
                      label: const Text('Editar artículo'),
                    ),
                  const SizedBox(height: 20),
                  DalvoSurface(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Historial de cantidades',
                          style: Theme.of(context).textTheme.titleMedium,
                        ),
                        const SizedBox(height: 10),
                        if (item.movements.isEmpty)
                          const Text('Sin cambios de cantidad registrados.')
                        else
                          ...item.movements.map(
                            (row) => ListTile(
                              contentPadding: EdgeInsets.zero,
                              leading: const Icon(Icons.swap_horiz_rounded),
                              title: Text(
                                '${row['type']} · ${row['previousQuantity']} → ${row['quantity']}',
                              ),
                              subtitle: Text(
                                '${dalvoDate(row['createdAt'])} · ${row['source'] == 'app' ? 'Aplicación' : 'Página web'}',
                              ),
                            ),
                          ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 30),
                ],
              ),
            ),
    );
  }
}

class InventoryFormPage extends StatefulWidget {
  final InventoryItem? item;
  const InventoryFormPage({super.key, this.item});
  @override
  State<InventoryFormPage> createState() => _InventoryFormPageState();
}

class _InventoryFormPageState extends State<InventoryFormPage> {
  final _form = GlobalKey<FormState>();
  final _picker = ImagePicker();
  final Map<String, TextEditingController> _fields = {};
  final List<InventoryUpload> _photos = [];
  final Set<int> _removed = {};
  bool _saving = false;
  bool _dirty = false;
  String? _error;
  List<InventoryImage> get _existing =>
      (widget.item?.images ?? const <InventoryImage>[])
          .where((image) => !_removed.contains(image.id))
          .toList();
  @override
  void initState() {
    super.initState();
    final item = widget.item;
    final values = <String, String>{
      'name': item?.name ?? '',
      'toolType': item?.toolType ?? '',
      'model': item?.model ?? '',
      'serialNumber': item?.serialNumber ?? '',
      'location': item?.location ?? '',
      'quantity': '${item?.quantity ?? 1}',
      'unit': item?.unit ?? 'pieza',
      'description': item?.description ?? '',
      'observations': item?.observations ?? '',
    };
    for (final entry in values.entries) {
      _fields[entry.key] = TextEditingController(text: entry.value)
        ..addListener(_changed);
    }
  }

  void _changed() {
    if (mounted && !_dirty) setState(() => _dirty = true);
  }

  @override
  void dispose() {
    for (final controller in _fields.values) {
      controller.dispose();
    }
    super.dispose();
  }

  Future<void> _addFiles(List<XFile> files) async {
    if (files.isEmpty) return;
    if (_existing.length + _photos.length + files.length > 5) {
      setState(
        () => _error = 'Puedes guardar hasta 5 fotografías por artículo.',
      );
      return;
    }
    try {
      final photos = <InventoryUpload>[];
      for (final file in files) {
        if (await file.length() > 8 * 1024 * 1024)
          throw const ApiException('Cada fotografía debe pesar hasta 8 MB.');
        final bytes = await file.readAsBytes();
        if (bytes.isEmpty)
          throw const ApiException('La fotografía seleccionada está vacía.');
        photos.add(InventoryUpload(name: file.name, bytes: bytes));
      }
      if (mounted)
        setState(() {
          _photos.addAll(photos);
          _dirty = true;
          _error = null;
        });
    } catch (error) {
      if (mounted) setState(() => _error = error.toString());
    }
  }

  Future<void> _gallery() async {
    try {
      await _addFiles(
        await _picker.pickMultiImage(imageQuality: 80, maxWidth: 1920),
      );
    } catch (_) {
      if (mounted)
        setState(
          () =>
              _error = 'No se pudo abrir la galería. Usa Seleccionar archivos.',
        );
    }
  }

  Future<void> _camera() async {
    try {
      final file = await _picker.pickImage(
        source: ImageSource.camera,
        imageQuality: 80,
        maxWidth: 1920,
      );
      if (file != null) await _addFiles([file]);
    } catch (_) {
      if (mounted)
        setState(
          () => _error = 'No se pudo abrir la cámara. Revisa el permiso o selecciona una fotografía.',
        );
    }
  }

  Future<void> _files() async {
    try {
      // Mismo selector y retorno List<PlatformFile> usado por document_assignment_page.dart.
      final files = await FilePicker.pickFiles(
        type: FileType.custom,
        allowedExtensions: ['jpg', 'jpeg', 'png', 'webp'],
      );
      if (!mounted || files.isEmpty) return;
      final paths = files.map((file) => file.path).whereType<String>().toList();
      if (paths.length != files.length) {
        throw const ApiException(
          'No se pudo leer uno de los archivos. Selecciona las fotografías desde Galería.',
        );
      }
      await _addFiles(paths.map((path) => XFile(path)).toList());
    } catch (error) {
      if (mounted) setState(() => _error = error.toString());
    }
  }

  Future<void> _leave() async {
    if (_saving) return;
    var discard = !_dirty;
    if (_dirty)
      discard =
          await showDialog<bool>(
            context: context,
            builder: (_) => AlertDialog(
              title: const Text('Hay cambios sin guardar'),
              content: const Text(
                '¿Quieres salir del formulario y descartar los cambios?',
              ),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(context, false),
                  child: const Text('Seguir editando'),
                ),
                FilledButton(
                  onPressed: () => Navigator.pop(context, true),
                  child: const Text('Salir'),
                ),
              ],
            ),
          ) ??
          false;
    if (!mounted || !discard) return;
    setState(() => _dirty = false);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) Navigator.of(context).pop();
    });
  }

  Future<void> _save() async {
    if (_saving || !_form.currentState!.validate()) return;
    setState(() {
      _saving = true;
      _error = null;
    });
    final item = <String, dynamic>{
      for (final entry in _fields.entries) entry.key: entry.value.text.trim(),
      'quantity': int.parse(_fields['quantity']!.text),
      'removedImageIds': _removed.toList(),
      if (widget.item != null) 'version': widget.item!.version,
    };
    try {
      final saved = await ApiClient.instance.saveInventory(
        id: widget.item?.id,
        item: item,
        images: _photos,
      );
      if (!mounted) return;
      setState(() {
        _saving = false;
        _dirty = false;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Artículo guardado correctamente.')),
      );
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted) Navigator.of(context).pop(saved);
      });
    } catch (error) {
      if (mounted)
        setState(() {
          _saving = false;
          _error = error.toString();
        });
    }
  }

  Widget _field(
    String key,
    String label, {
    bool required = false,
    int max = 180,
    int lines = 1,
    String? hint,
  }) => TextFormField(
    controller: _fields[key],
    enabled: !_saving,
    maxLines: lines,
    maxLength: max,
    decoration: InputDecoration(
      labelText: label,
      hintText: hint,
      counterText: '',
    ),
    textCapitalization: key == 'serialNumber'
        ? TextCapitalization.none
        : TextCapitalization.sentences,
    validator: (value) {
      final text = (value ?? '').trim();
      if (required && text.isEmpty) return 'Completa este campo';
      if (text.length > max) return 'Usa hasta $max caracteres';
      return null;
    },
  );
  @override
  Widget build(BuildContext context) => PopScope(
    canPop: !_dirty && !_saving,
    onPopInvokedWithResult: (didPop, result) {
      if (!didPop) _leave();
    },
    child: Scaffold(
      appBar: AppBar(
        title: Text(widget.item == null ? 'Nuevo artículo' : 'Editar artículo'),
        leading: IconButton(
          onPressed: _saving ? null : _leave,
          tooltip: 'Volver',
          icon: const Icon(Icons.arrow_back_rounded),
        ),
      ),
      bottomNavigationBar: SafeArea(
        child: Container(
          padding: const EdgeInsets.all(16),
          decoration: const BoxDecoration(
            color: DalvoColors.surface,
            border: Border(top: BorderSide(color: DalvoColors.line)),
          ),
          child: FilledButton.icon(
            onPressed: _saving ? null : _save,
            icon: _saving
                ? const SizedBox(
                    width: 18,
                    height: 18,
                    child: CircularProgressIndicator(strokeWidth: 2),
                  )
                : const Icon(Icons.check_rounded),
            label: Text(
              _saving
                  ? 'Guardando artículo…'
                  : widget.item == null
                  ? 'Registrar artículo'
                  : 'Guardar cambios',
            ),
          ),
        ),
      ),
      body: Form(
        key: _form,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            Text(
              widget.item?.folio ??
                  'El folio se genera automáticamente al guardar',
              style: Theme.of(context).textTheme.bodySmall,
            ),
            const SizedBox(height: 16),
            DalvoSurface(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '1. Fotografías',
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  const SizedBox(height: 6),
                  const Text(
                    'Hasta 5 imágenes · JPG, PNG o WEBP · 8 MB por imagen',
                    style: TextStyle(color: DalvoColors.muted, fontSize: 12),
                  ),
                  const SizedBox(height: 12),
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: [
                      OutlinedButton.icon(
                        onPressed: _saving ? null : _camera,
                        icon: const Icon(Icons.camera_alt_outlined),
                        label: const Text('Cámara'),
                      ),
                      OutlinedButton.icon(
                        onPressed: _saving ? null : _gallery,
                        icon: const Icon(Icons.photo_library_outlined),
                        label: const Text('Galería'),
                      ),
                      TextButton.icon(
                        onPressed: _saving ? null : _files,
                        icon: const Icon(Icons.folder_open_outlined),
                        label: const Text('Seleccionar archivos'),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: [
                      for (final image in _existing)
                        _photoTile(
                          InventoryPhoto(image: image),
                          () => setState(() {
                            _removed.add(image.id);
                            _dirty = true;
                          }),
                        ),
                      for (final image in _photos)
                        _photoTile(
                          Image.memory(
                            image.bytes,
                            fit: BoxFit.cover,
                            errorBuilder: (_, error, stack) =>
                                const Icon(Icons.broken_image_outlined),
                          ),
                          () => setState(() {
                            _photos.remove(image);
                            _dirty = true;
                          }),
                        ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(
                    '${_existing.length + _photos.length} de 5 imágenes',
                    style: Theme.of(context).textTheme.bodySmall,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            DalvoSurface(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '2. Datos del artículo',
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  const SizedBox(height: 16),
                  _field(
                    'name',
                    'Nombre del artículo *',
                    required: true,
                    max: 255,
                    hint: 'Ej. Taladro inalámbrico',
                  ),
                  const SizedBox(height: 14),
                  _field(
                    'toolType',
                    'Tipo de herramienta *',
                    required: true,
                    max: 120,
                    hint: 'Ej. Eléctrica, manual o medición',
                  ),
                  const SizedBox(height: 14),
                  _field('model', 'Modelo', hint: 'Opcional'),
                  const SizedBox(height: 14),
                  _field(
                    'serialNumber',
                    'Número de serie',
                    hint: 'Una serie o varias separadas por coma',
                  ),
                  const SizedBox(height: 14),
                  _field(
                    'location',
                    'Ubicación / almacén',
                    hint: 'Ej. Almacén SLP · Estante A',
                  ),
                  const SizedBox(height: 14),
                  TextFormField(
                    controller: _fields['quantity'],
                    enabled: !_saving,
                    decoration: const InputDecoration(labelText: 'Cantidad *'),
                    keyboardType: TextInputType.number,
                    inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                    validator: (value) {
                      final quantity = int.tryParse(value ?? '');
                      return quantity == null ||
                              quantity < 0 ||
                              quantity > 2147483647
                          ? 'Ingresa una cantidad entera válida'
                          : null;
                    },
                  ),
                  const SizedBox(height: 14),
                  _field(
                    'unit',
                    'Unidad',
                    max: 30,
                    hint: 'Ej. pieza, equipo o juego',
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            DalvoSurface(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '3. Información adicional',
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  const SizedBox(height: 16),
                  _field(
                    'description',
                    'Descripción',
                    max: 5000,
                    lines: 3,
                    hint: 'Características, marca y accesorios incluidos',
                  ),
                  const SizedBox(height: 14),
                  _field(
                    'observations',
                    'Observaciones',
                    max: 5000,
                    lines: 3,
                    hint: 'Estado del artículo o notas importantes',
                  ),
                ],
              ),
            ),
            if (_error != null)
              Padding(
                padding: const EdgeInsets.only(top: 16),
                child: Text(
                  _error!,
                  style: const TextStyle(
                    color: DalvoColors.danger,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
            const SizedBox(height: 20),
          ],
        ),
      ),
    ),
  );
  Widget _photoTile(Widget child, VoidCallback remove) => SizedBox(
    width: 90,
    height: 90,
    child: Stack(
      children: [
        Positioned.fill(
          child: ClipRRect(
            borderRadius: BorderRadius.circular(10),
            child: child,
          ),
        ),
        Positioned(
          top: 2,
          right: 2,
          child: IconButton.filled(
            tooltip: 'Retirar fotografía',
            style: IconButton.styleFrom(
              backgroundColor: DalvoColors.ink,
              foregroundColor: Colors.white,
              minimumSize: const Size(26, 26),
              padding: const EdgeInsets.all(3),
            ),
            onPressed: _saving ? null : remove,
            icon: const Icon(Icons.close, size: 16),
          ),
        ),
      ],
    ),
  );
}
