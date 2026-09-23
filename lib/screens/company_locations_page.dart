import 'package:flutter/material.dart';

import '../models/mobile_models.dart';
import '../services/api_client.dart';
import '../services/location_service.dart';
import '../theme/dalvo_theme.dart';
import '../widgets/dalvo_widgets.dart';
import 'module_common.dart';

class CompanyLocationsPage extends StatefulWidget {
  const CompanyLocationsPage({super.key});

  @override
  State<CompanyLocationsPage> createState() => _CompanyLocationsPageState();
}

class _CompanyLocationsPageState extends State<CompanyLocationsPage> {
  final _search = TextEditingController();
  List<CompanyLocationTarget> _rows = [];
  bool _loading = true;
  String? _error;

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
      final rows = await ApiClient.instance.companyLocations(search: _search.text);
      if (mounted) setState(() => _rows = rows);
    } catch (error) {
      if (mounted) setState(() => _error = '$error');
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _edit(CompanyLocationTarget target) async {
    final changed = await showModalBottomSheet<bool>(
      context: context,
      isScrollControlled: true,
      useSafeArea: true,
      backgroundColor: Colors.white,
      builder: (_) => _LocationEditorSheet(target: target),
    );
    if (changed == true) await _load();
  }

  @override
  Widget build(BuildContext context) => RefreshIndicator(
        onRefresh: _load,
        child: ListView(
          padding: const EdgeInsets.fromLTRB(16, 18, 16, 100),
          children: [
            const ModuleHeader(
              eyebrow: 'Administración móvil',
              title: 'Ubicaciones de empresas',
              subtitle: 'Define desde el celular el lugar y perímetro donde se permite registrar asistencia.',
              icon: Icons.location_city_outlined,
            ),
            const SizedBox(height: 18),
            ModuleSearch(
              controller: _search,
              hint: 'Buscar empresa o sucursal',
              onSearch: _load,
            ),
            const SizedBox(height: 16),
            if (_loading) ...[
              const DalvoSkeleton(height: 126),
              const SizedBox(height: 10),
              const DalvoSkeleton(height: 126),
            ] else if (_error != null)
              DalvoEmptyState(
                icon: Icons.error_outline_rounded,
                title: 'No se pudieron cargar las empresas',
                message: _error!,
                error: true,
              )
            else if (_rows.isEmpty)
              const DalvoEmptyState(
                icon: Icons.location_off_outlined,
                title: 'Sin empresas',
                message: 'No hay empresas o sucursales que coincidan con la búsqueda.',
              )
            else
              ..._rows.map(
                (item) => Padding(
                  padding: const EdgeInsets.only(bottom: 10),
                  child: DalvoSurface(
                    onTap: () => _edit(item),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            DalvoIconTile(
                              icon: item.configured ? Icons.location_on_rounded : Icons.add_location_alt_outlined,
                              color: item.configured ? DalvoColors.success : DalvoColors.primary,
                              background: item.configured ? DalvoColors.successSoft : DalvoColors.primarySoft,
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(item.company, style: Theme.of(context).textTheme.titleMedium),
                                  const SizedBox(height: 3),
                                  Text(item.branch.isEmpty ? 'General' : item.branch, style: Theme.of(context).textTheme.bodySmall),
                                ],
                              ),
                            ),
                            DalvoBadge(
                              label: item.configured ? 'CONFIGURADA' : 'PENDIENTE',
                              foreground: item.configured ? DalvoColors.success : DalvoColors.warning,
                              background: item.configured ? DalvoColors.successSoft : DalvoColors.warningSoft,
                            ),
                          ],
                        ),
                        if (item.address.trim().isNotEmpty) ...[
                          const SizedBox(height: 12),
                          Text(item.address, maxLines: 2, overflow: TextOverflow.ellipsis, style: Theme.of(context).textTheme.bodySmall),
                        ],
                        const SizedBox(height: 12),
                        Row(
                          children: [
                            Icon(Icons.radio_button_checked_rounded, size: 17, color: item.configured ? DalvoColors.primaryDark : DalvoColors.muted),
                            const SizedBox(width: 7),
                            Expanded(
                              child: Text(
                                item.configured
                                    ? '${item.locationName} · Radio ${item.radiusMeters} m'
                                    : 'Toca para usar el GPS de este teléfono',
                                style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 12),
                              ),
                            ),
                            const Icon(Icons.chevron_right_rounded, color: DalvoColors.muted),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              ),
          ],
        ),
      );
}

class _LocationEditorSheet extends StatefulWidget {
  final CompanyLocationTarget target;

  const _LocationEditorSheet({required this.target});

  @override
  State<_LocationEditorSheet> createState() => _LocationEditorSheetState();
}

class _LocationEditorSheetState extends State<_LocationEditorSheet> {
  late final TextEditingController _name;
  late final TextEditingController _latitude;
  late final TextEditingController _longitude;
  late final TextEditingController _radius;
  bool _locating = false;
  bool _saving = false;
  String? _error;

  @override
  void initState() {
    super.initState();
    final target = widget.target;
    _name = TextEditingController(
      text: target.locationName.isNotEmpty ? target.locationName : '${target.company} · ${target.branch}',
    );
    _latitude = TextEditingController(text: target.latitude?.toStringAsFixed(7) ?? '');
    _longitude = TextEditingController(text: target.longitude?.toStringAsFixed(7) ?? '');
    _radius = TextEditingController(text: '${target.radiusMeters}');
  }

  @override
  void dispose() {
    _name.dispose();
    _latitude.dispose();
    _longitude.dispose();
    _radius.dispose();
    super.dispose();
  }

  Future<void> _useCurrentLocation() async {
    setState(() {
      _locating = true;
      _error = null;
    });
    try {
      final position = await LocationService.currentPosition();
      _latitude.text = position.latitude.toStringAsFixed(7);
      _longitude.text = position.longitude.toStringAsFixed(7);
    } catch (error) {
      setState(() => _error = '$error');
    } finally {
      if (mounted) setState(() => _locating = false);
    }
  }

  Future<void> _save() async {
    final latitude = double.tryParse(_latitude.text.trim());
    final longitude = double.tryParse(_longitude.text.trim());
    final radius = int.tryParse(_radius.text.trim());
    if (latitude == null || longitude == null || radius == null || radius < 100 || radius > 5000) {
      setState(() => _error = 'Obtén la ubicación e indica un radio entre 100 y 5,000 metros.');
      return;
    }
    setState(() {
      _saving = true;
      _error = null;
    });
    try {
      await ApiClient.instance.saveCompanyLocation(
        companyId: widget.target.companyId,
        branchId: widget.target.branchId,
        name: _name.text,
        latitude: latitude,
        longitude: longitude,
        radiusMeters: radius,
      );
      if (mounted) Navigator.of(context).pop(true);
    } catch (error) {
      if (mounted) setState(() => _error = '$error');
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  Future<void> _deactivate() async {
    final locationId = widget.target.locationId;
    if (locationId == null) return;
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Desactivar ubicación'),
        content: const Text('Los proyectos dejarán de heredar este perímetro hasta que vuelvas a configurarlo.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Cancelar')),
          FilledButton(onPressed: () => Navigator.pop(context, true), child: const Text('Desactivar')),
        ],
      ),
    );
    if (confirmed != true) return;
    setState(() => _saving = true);
    try {
      await ApiClient.instance.deactivateCompanyLocation(locationId);
      if (mounted) Navigator.of(context).pop(true);
    } catch (error) {
      if (mounted) setState(() => _error = '$error');
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final bottom = MediaQuery.viewInsetsOf(context).bottom;
    return SingleChildScrollView(
      padding: EdgeInsets.fromLTRB(18, 18, 18, bottom + 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Row(
            children: [
              const DalvoIconTile(icon: Icons.add_location_alt_outlined),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(widget.target.company, style: Theme.of(context).textTheme.titleLarge),
                    Text(widget.target.branch, style: Theme.of(context).textTheme.bodySmall),
                  ],
                ),
              ),
              IconButton(onPressed: () => Navigator.pop(context), icon: const Icon(Icons.close_rounded)),
            ],
          ),
          const SizedBox(height: 18),
          TextField(
            controller: _name,
            decoration: const InputDecoration(labelText: 'Nombre del lugar', hintText: 'Ej. Planta BMW SLP'),
          ),
          const SizedBox(height: 12),
          FilledButton.icon(
            onPressed: _locating || _saving ? null : _useCurrentLocation,
            icon: _locating
                ? const SizedBox(width: 18, height: 18, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                : const Icon(Icons.my_location_rounded),
            label: Text(_locating ? 'Obteniendo ubicación…' : 'Usar mi ubicación actual'),
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: TextField(
                  controller: _latitude,
                  keyboardType: const TextInputType.numberWithOptions(decimal: true, signed: true),
                  decoration: const InputDecoration(labelText: 'Latitud'),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: TextField(
                  controller: _longitude,
                  keyboardType: const TextInputType.numberWithOptions(decimal: true, signed: true),
                  decoration: const InputDecoration(labelText: 'Longitud'),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          TextField(
            controller: _radius,
            keyboardType: TextInputType.number,
            decoration: const InputDecoration(labelText: 'Radio permitido (metros)', helperText: 'Recomendado: 300 m. Máximo: 5,000 m.'),
          ),
          const SizedBox(height: 10),
          Wrap(
            spacing: 7,
            runSpacing: 7,
            children: [150, 300, 500, 1000, 2000]
                .map((meters) => ActionChip(label: Text(meters == 2000 ? '2 km' : '$meters m'), onPressed: () => setState(() => _radius.text = '$meters')))
                .toList(),
          ),
          if (_error != null) ...[
            const SizedBox(height: 14),
            Text(_error!, style: const TextStyle(color: DalvoColors.danger, fontWeight: FontWeight.w700)),
          ],
          const SizedBox(height: 20),
          FilledButton.icon(
            onPressed: _saving ? null : _save,
            icon: _saving
                ? const SizedBox(width: 18, height: 18, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                : const Icon(Icons.save_outlined),
            label: const Text('Guardar ubicación'),
          ),
          if (widget.target.configured) ...[
            const SizedBox(height: 8),
            OutlinedButton.icon(
              onPressed: _saving ? null : _deactivate,
              icon: const Icon(Icons.location_off_outlined),
              label: const Text('Desactivar ubicación'),
            ),
          ],
        ],
      ),
    );
  }
}
