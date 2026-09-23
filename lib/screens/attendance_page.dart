import 'package:flutter/material.dart';

import '../models/mobile_models.dart';
import '../services/api_client.dart';
import '../services/biometric_service.dart';
import '../services/location_service.dart';
import '../theme/dalvo_theme.dart';
import '../widgets/dalvo_widgets.dart';
import 'module_common.dart';

class AttendancePage extends StatefulWidget {
  const AttendancePage({super.key});
  @override
  State<AttendancePage> createState() => _AttendancePageState();
}

class _AttendancePageState extends State<AttendancePage> {
  AttendanceStatus? _status;
  List<AttendanceMovement> _history = const [];
  bool _loading = true;
  bool _saving = false;
  String? _error;

  bool get _isAdmin {
    final role = (ApiClient.instance.currentUser?.role ?? '').toLowerCase().replaceAll('ó', 'o');
    return role == 'administracion' || role == 'superadmin';
  }

  @override
  void initState() { super.initState(); _load(); }

  Future<void> _load() async {
    setState(() { _loading = true; _error = null; });
    try {
      final values = await Future.wait([
        ApiClient.instance.attendanceOverview(),
        ApiClient.instance.attendanceHistory(),
      ]);
      _status = values[0] as AttendanceStatus;
      _history = values[1] as List<AttendanceMovement>;
    } catch (error) {
      _error = error.toString();
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _register() async {
    if (_saving) return;
    setState(() => _saving = true);
    try {
      final biometric = await BiometricService.verify();
      if (!biometric.verified) return;
      final position = await LocationService.currentPosition();
      final event = (_status?.checkedIn ?? false) ? 'SALIDA' : 'ENTRADA';
      final result = await ApiClient.instance.checkAttendance(
        event: event,
        latitude: position.latitude,
        longitude: position.longitude,
        accuracyMeters: position.accuracy,
        biometricVerified: biometric.verified,
        biometricMethod: biometric.method,
      );
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text('$event registrada en ${result['locationName'] ?? 'la locación'} · ${result['distanceMeters'] ?? '-'} m'),
      ));
      await _load();
    } catch (error) {
      if (mounted) ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('$error')));
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  Future<void> _openAdmin() async {
    await Navigator.of(context).push(MaterialPageRoute(builder: (_) => const AttendanceAdminPage()));
    await _load();
  }

  @override
  Widget build(BuildContext context) {
    final checkedIn = _status?.checkedIn ?? false;
    final locations = _status?.locations ?? const <AttendanceLocation>[];
    return RefreshIndicator(
      onRefresh: _load,
      child: ListView(
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.fromLTRB(16, 18, 16, 100),
        children: [
          ModuleHeader(
            eyebrow: 'Personal',
            title: 'Asistencia',
            subtitle: 'Registra tu entrada o salida desde cualquiera de tus locaciones autorizadas.',
            icon: Icons.fingerprint_rounded,
            trailing: _isAdmin ? OutlinedButton.icon(
              onPressed: _openAdmin,
              icon: const Icon(Icons.settings_outlined, size: 18),
              label: const Text('Administrar'),
            ) : null,
          ),
          const SizedBox(height: 18),
          if (_loading) ...[
            const DalvoSkeleton(height: 180),
            const SizedBox(height: 12),
            const DalvoSkeleton(height: 120),
          ] else if (_error != null)
            DalvoEmptyState(
              icon: Icons.error_outline_rounded,
              title: 'No se pudo cargar la asistencia',
              message: _error!,
              error: true,
              action: OutlinedButton.icon(onPressed: _load, icon: const Icon(Icons.refresh_rounded), label: const Text('Reintentar')),
            )
          else ...[
            _CheckCard(checkedIn: checkedIn, saving: _saving, locations: locations, onCheck: locations.isEmpty ? null : _register),
            const SizedBox(height: 24),
            const DalvoSectionTitle(title: 'Entradas y salidas'),
            const SizedBox(height: 12),
            if (_history.isEmpty)
              const DalvoEmptyState(icon: Icons.history_rounded, title: 'Sin movimientos', message: 'Tus entradas y salidas aparecerán aquí.')
            else
              ..._history.map((movement) => Padding(padding: const EdgeInsets.only(bottom: 9), child: _MovementCard(movement: movement))),
          ],
        ],
      ),
    );
  }
}

class _CheckCard extends StatelessWidget {
  final bool checkedIn;
  final bool saving;
  final List<AttendanceLocation> locations;
  final VoidCallback? onCheck;
  const _CheckCard({required this.checkedIn, required this.saving, required this.locations, required this.onCheck});

  @override
  Widget build(BuildContext context) => DalvoSurface(
    padding: const EdgeInsets.all(18),
    child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
      Row(children: [
        DalvoIconTile(
          icon: checkedIn ? Icons.location_on_rounded : Icons.fingerprint_rounded,
          color: checkedIn ? DalvoColors.success : DalvoColors.primary,
          background: checkedIn ? DalvoColors.successSoft : DalvoColors.primarySoft,
          size: 48,
        ),
        const SizedBox(width: 12),
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(checkedIn ? 'Entrada activa' : 'Listo para checar', style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: 3),
          Text(checkedIn ? 'Registra tu salida al terminar tu jornada.' : 'Se validará tu ubicación y biometría.', style: Theme.of(context).textTheme.bodySmall),
        ])),
        DalvoBadge(
          label: checkedIn ? 'DENTRO' : 'FUERA',
          foreground: checkedIn ? DalvoColors.success : DalvoColors.muted,
          background: checkedIn ? DalvoColors.successSoft : DalvoColors.surfaceSoft,
        ),
      ]),
      const SizedBox(height: 18),
      if (locations.isEmpty)
        Container(
          padding: const EdgeInsets.all(13),
          decoration: BoxDecoration(color: DalvoColors.warningSoft, borderRadius: BorderRadius.circular(10)),
          child: const Text('Administración todavía no te asigna una locación.', style: TextStyle(color: DalvoColors.warning, fontWeight: FontWeight.w700)),
        )
      else ...[
        Text('Locaciones permitidas (${locations.length})', style: Theme.of(context).textTheme.bodySmall?.copyWith(fontWeight: FontWeight.w800)),
        const SizedBox(height: 8),
        Wrap(spacing: 7, runSpacing: 7, children: locations.map((location) => DalvoBadge(label: '${location.name} · ${location.radiusMeters} m', icon: Icons.location_on_outlined)).toList()),
        const SizedBox(height: 18),
        FilledButton.icon(
          onPressed: saving ? null : onCheck,
          icon: saving ? const SizedBox(width: 18, height: 18, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white)) : Icon(checkedIn ? Icons.logout_rounded : Icons.fingerprint_rounded),
          label: Text(saving ? 'Validando…' : checkedIn ? 'Registrar salida' : 'Registrar entrada'),
        ),
      ],
    ]),
  );
}

class AttendanceAdminPage extends StatefulWidget {
  const AttendanceAdminPage({super.key});
  @override
  State<AttendanceAdminPage> createState() => _AttendanceAdminPageState();
}

class _AttendanceAdminPageState extends State<AttendanceAdminPage> {
  int _tab = 0;
  List<AttendanceLocation> _locations = const [];
  List<AttendanceMovement> _logs = const [];
  bool _loading = true;
  String? _error;

  @override
  void initState() { super.initState(); _load(); }

  Future<void> _load() async {
    setState(() { _loading = true; _error = null; });
    try {
      final values = await Future.wait([ApiClient.instance.attendanceLocations(), ApiClient.instance.attendanceTeamLogs()]);
      _locations = values[0] as List<AttendanceLocation>;
      _logs = values[1] as List<AttendanceMovement>;
    } catch (error) {
      _error = error.toString();
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _edit([AttendanceLocation? location]) async {
    final saved = await showModalBottomSheet<bool>(
      context: context,
      isScrollControlled: true,
      useSafeArea: true,
      backgroundColor: Colors.white,
      builder: (_) => _LocationEditor(location: location),
    );
    if (saved == true) await _load();
  }

  Future<void> _delete(AttendanceLocation location) async {
    final confirm = await showDialog<bool>(context: context, builder: (context) => AlertDialog(
      title: const Text('Desactivar locación'),
      content: Text('¿Quieres desactivar ${location.name}? Ya no se podrá checar ahí.'),
      actions: [
        TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Cancelar')),
        FilledButton(onPressed: () => Navigator.pop(context, true), child: const Text('Desactivar')),
      ],
    ));
    if (confirm != true) return;
    await ApiClient.instance.deleteAttendanceLocation(location.id);
    await _load();
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('Administrar asistencia')),
    floatingActionButton: _tab == 0 ? FloatingActionButton.extended(
      onPressed: () => _edit(),
      icon: const Icon(Icons.add_location_alt_outlined),
      label: const Text('Agregar locación'),
    ) : null,
    body: RefreshIndicator(
      onRefresh: _load,
      child: ListView(
        physics: const AlwaysScrollableScrollPhysics(),
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 100),
        children: [
          SegmentedButton<int>(
            segments: const [
              ButtonSegment(value: 0, icon: Icon(Icons.location_on_outlined), label: Text('Locaciones')),
              ButtonSegment(value: 1, icon: Icon(Icons.history_rounded), label: Text('Movimientos')),
            ],
            selected: {_tab},
            onSelectionChanged: (value) => setState(() => _tab = value.first),
          ),
          const SizedBox(height: 16),
          if (_loading)
            const DalvoSkeleton(height: 180)
          else if (_error != null)
            DalvoEmptyState(icon: Icons.error_outline, title: 'No se pudo cargar', message: _error!, error: true)
          else if (_tab == 0)
            if (_locations.isEmpty)
              const DalvoEmptyState(icon: Icons.add_location_alt_outlined, title: 'Agrega la primera locación', message: 'Define nombre, coordenadas, radio y usuarios autorizados.')
            else
              ..._locations.map((location) => Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: DalvoSurface(onTap: () => _edit(location), child: Row(children: [
                  const DalvoIconTile(icon: Icons.location_on_outlined),
                  const SizedBox(width: 12),
                  Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                    Text(location.name, style: Theme.of(context).textTheme.titleMedium),
                    const SizedBox(height: 4),
                    Text('${location.radiusMeters} m · ${location.assignedUsers.length} usuario(s)', style: Theme.of(context).textTheme.bodySmall),
                  ])),
                  IconButton(tooltip: 'Desactivar', onPressed: () => _delete(location), icon: const Icon(Icons.delete_outline_rounded, color: DalvoColors.danger)),
                ])),
              ))
          else if (_logs.isEmpty)
            const DalvoEmptyState(icon: Icons.history_rounded, title: 'Sin movimientos', message: 'Todavía no hay entradas ni salidas.')
          else
            ..._logs.map((movement) => Padding(padding: const EdgeInsets.only(bottom: 9), child: _MovementCard(movement: movement, showUser: true))),
        ],
      ),
    ),
  );
}

class _LocationEditor extends StatefulWidget {
  final AttendanceLocation? location;
  const _LocationEditor({this.location});
  @override
  State<_LocationEditor> createState() => _LocationEditorState();
}

class _LocationEditorState extends State<_LocationEditor> {
  final _formKey = GlobalKey<FormState>();
  late final TextEditingController _name;
  late final TextEditingController _latitude;
  late final TextEditingController _longitude;
  late final TextEditingController _radius;
  List<AttendanceUser> _users = const [];
  late Set<int> _selected;
  bool _loadingUsers = true;
  bool _saving = false;
  bool _locating = false;

  @override
  void initState() {
    super.initState();
    final location = widget.location;
    _name = TextEditingController(text: location?.name ?? '');
    _latitude = TextEditingController(text: location == null ? '' : '${location.latitude}');
    _longitude = TextEditingController(text: location == null ? '' : '${location.longitude}');
    _radius = TextEditingController(text: '${location?.radiusMeters ?? 300}');
    _selected = location?.assignedUsers.map((user) => user.id).toSet() ?? <int>{};
    _loadUsers();
  }

  Future<void> _loadUsers() async {
    try { _users = await ApiClient.instance.attendanceUsers(); }
    finally { if (mounted) setState(() => _loadingUsers = false); }
  }

  Future<void> _useCurrentLocation() async {
    setState(() => _locating = true);
    try {
      final position = await LocationService.currentPosition();
      _latitude.text = position.latitude.toStringAsFixed(7);
      _longitude.text = position.longitude.toStringAsFixed(7);
    } catch (error) {
      if (mounted) ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('$error')));
    } finally {
      if (mounted) setState(() => _locating = false);
    }
  }

  Future<void> _save() async {
    if (!_formKey.currentState!.validate() || _saving) return;
    setState(() => _saving = true);
    try {
      await ApiClient.instance.saveAttendanceLocation(
        locationId: widget.location?.id,
        name: _name.text,
        latitude: double.parse(_latitude.text),
        longitude: double.parse(_longitude.text),
        radiusMeters: int.parse(_radius.text),
        userIds: _selected.toList(),
      );
      if (mounted) Navigator.pop(context, true);
    } catch (error) {
      if (mounted) ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('$error')));
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  @override
  void dispose() { _name.dispose(); _latitude.dispose(); _longitude.dispose(); _radius.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) => Padding(
    padding: EdgeInsets.fromLTRB(18, 16, 18, MediaQuery.viewInsetsOf(context).bottom + 18),
    child: Form(
      key: _formKey,
      child: SingleChildScrollView(child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
        Text(widget.location == null ? 'Nueva locación' : 'Editar locación', style: Theme.of(context).textTheme.headlineSmall),
        const SizedBox(height: 6),
        Text('Ejemplo: BMW Planta SLP. El radio define desde dónde se permite checar.', style: Theme.of(context).textTheme.bodySmall),
        const SizedBox(height: 18),
        TextFormField(controller: _name, decoration: const InputDecoration(labelText: 'Nombre de la locación'), validator: (value) => (value ?? '').trim().isEmpty ? 'Escribe un nombre.' : null),
        const SizedBox(height: 11),
        Row(children: [
          Expanded(child: TextFormField(controller: _latitude, keyboardType: const TextInputType.numberWithOptions(decimal: true, signed: true), decoration: const InputDecoration(labelText: 'Latitud'), validator: (value) => double.tryParse(value ?? '') == null ? 'Inválida' : null)),
          const SizedBox(width: 9),
          Expanded(child: TextFormField(controller: _longitude, keyboardType: const TextInputType.numberWithOptions(decimal: true, signed: true), decoration: const InputDecoration(labelText: 'Longitud'), validator: (value) => double.tryParse(value ?? '') == null ? 'Inválida' : null)),
        ]),
        const SizedBox(height: 10),
        OutlinedButton.icon(onPressed: _locating ? null : _useCurrentLocation, icon: const Icon(Icons.my_location_rounded), label: Text(_locating ? 'Obteniendo ubicación…' : 'Usar mi ubicación actual')),
        const SizedBox(height: 11),
        TextFormField(
          controller: _radius,
          keyboardType: TextInputType.number,
          decoration: const InputDecoration(labelText: 'Radio permitido (metros)', helperText: 'Mínimo 50 m. Para 2 km escribe 2000.'),
          validator: (value) { final number = int.tryParse(value ?? ''); return number == null || number < 50 || number > 10000 ? 'Usa un valor de 50 a 10000.' : null; },
        ),
        const SizedBox(height: 18),
        Text('Usuarios autorizados', style: Theme.of(context).textTheme.titleMedium),
        const SizedBox(height: 8),
        if (_loadingUsers)
          const Center(child: CircularProgressIndicator())
        else
          Container(
            constraints: const BoxConstraints(maxHeight: 260),
            decoration: BoxDecoration(border: Border.all(color: DalvoColors.line), borderRadius: BorderRadius.circular(10)),
            child: ListView.separated(
              shrinkWrap: true,
              itemCount: _users.length,
              separatorBuilder: (_, __) => const Divider(height: 1),
              itemBuilder: (context, index) {
                final user = _users[index];
                return CheckboxListTile(
                  value: _selected.contains(user.id),
                  onChanged: (value) => setState(() => value == true ? _selected.add(user.id) : _selected.remove(user.id)),
                  title: Text(user.displayName, style: const TextStyle(fontWeight: FontWeight.w700)),
                  subtitle: Text('@${user.username}'),
                  controlAffinity: ListTileControlAffinity.leading,
                );
              },
            ),
          ),
        const SizedBox(height: 18),
        FilledButton.icon(
          onPressed: _saving ? null : _save,
          icon: _saving ? const SizedBox(width: 18, height: 18, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white)) : const Icon(Icons.save_outlined),
          label: Text(_saving ? 'Guardando…' : 'Guardar locación'),
        ),
      ])),
    ),
  );
}

class _MovementCard extends StatelessWidget {
  final AttendanceMovement movement;
  final bool showUser;
  const _MovementCard({required this.movement, this.showUser = false});

  @override
  Widget build(BuildContext context) {
    final entry = movement.event.toUpperCase() == 'ENTRADA';
    final date = movement.createdAt?.toLocal();
    final stamp = date == null ? 'Sin fecha' : '${date.day.toString().padLeft(2, '0')}/${date.month.toString().padLeft(2, '0')}/${date.year} ${date.hour.toString().padLeft(2, '0')}:${date.minute.toString().padLeft(2, '0')}';
    return DalvoSurface(
      padding: const EdgeInsets.all(14),
      child: Row(children: [
        DalvoIconTile(icon: entry ? Icons.login_rounded : Icons.logout_rounded, color: entry ? DalvoColors.success : DalvoColors.primary, background: entry ? DalvoColors.successSoft : DalvoColors.primarySoft, size: 42),
        const SizedBox(width: 11),
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(showUser && movement.userName.isNotEmpty ? movement.userName : movement.event, style: const TextStyle(fontWeight: FontWeight.w900)),
          const SizedBox(height: 2),
          Text('${movement.locationName} · $stamp', style: Theme.of(context).textTheme.bodySmall),
        ])),
        DalvoBadge(label: movement.event, foreground: entry ? DalvoColors.success : DalvoColors.primary),
      ]),
    );
  }
}
