import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

import '../models/mobile_models.dart';
import '../services/api_client.dart';
import '../services/location_service.dart';
import '../theme/dalvo_theme.dart';
import '../widgets/dalvo_widgets.dart';

class ReportFormPage extends StatefulWidget {
  final DalvoProject project;
  const ReportFormPage({super.key, required this.project});

  @override
  State<ReportFormPage> createState() => _ReportFormPageState();
}

class _ReportFormPageState extends State<ReportFormPage> {
  final _picker = ImagePicker();
  final _workDone = TextEditingController();
  final _pending = TextEditingController();
  final _incidents = TextEditingController();
  final _observations = TextEditingController();
  final _missingInformation = TextEditingController();

  double _progress = 0;
  bool _incomplete = false;
  bool _saving = false;
  final List<XFile> _photos = [];

  @override
  void dispose() {
    _workDone.dispose();
    _pending.dispose();
    _incidents.dispose();
    _observations.dispose();
    _missingInformation.dispose();
    super.dispose();
  }

  Future<void> _takePhoto() async {
    final photo = await _picker.pickImage(
      source: ImageSource.camera,
      imageQuality: 78,
      maxWidth: 1920,
    );
    if (photo != null && mounted) setState(() => _photos.add(photo));
  }

  Future<void> _pickPhotos() async {
    final photos = await _picker.pickMultiImage(imageQuality: 78, maxWidth: 1920);
    if (photos.isNotEmpty && mounted) setState(() => _photos.addAll(photos));
  }

  Future<void> _submit() async {
    if (_saving) return;
    setState(() => _saving = true);
    try {
      final position = await LocationService.currentPosition();
      final reportId = await ApiClient.instance.createReport(
        projectId: widget.project.id,
        progress: _progress,
        workDone: _workDone.text,
        pending: _pending.text,
        incidents: _incidents.text,
        observations: _observations.text,
        incompleteInformation: _incomplete,
        missingInformation: _missingInformation.text,
        latitude: position.latitude,
        longitude: position.longitude,
        accuracyMeters: position.accuracy,
      );
      if (reportId <= 0) throw Exception('No se pudo crear el informe.');

      if (_photos.isNotEmpty) {
        await ApiClient.instance.uploadPhotos(
          projectId: widget.project.id,
          reportId: reportId,
          filePaths: _photos.map((e) => e.path).toList(),
        );
      }
      await ApiClient.instance.submitReport(reportId);

      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Informe guardado en Dalvo.')),
      );
      Navigator.of(context).pop(true);
    } catch (error) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(error.toString())),
      );
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final folio = widget.project.folio.isEmpty ? 'Proyecto #${widget.project.id}' : widget.project.folio;

    return Scaffold(
      backgroundColor: DalvoColors.surface,
      appBar: AppBar(
        backgroundColor: DalvoColors.surface,
        title: const Text('Nuevo informe'),
      ),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(18, 4, 18, 118),
        children: [
          DalvoAnimatedEntry(
            child: _ProjectHeader(
              folio: folio,
              title: widget.project.title,
            ),
          ),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.all(13),
            decoration: BoxDecoration(
              color: DalvoColors.primarySoft,
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: DalvoColors.primary.withOpacity(.14)),
            ),
            child: const Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Icon(Icons.info_outline_rounded, color: DalvoColors.primaryDark, size: 19),
                SizedBox(width: 9),
                Expanded(
                  child: Text(
                    'Este informe se guardará en Dalvo para revisión del supervisor y Administración. No se enviará automáticamente al cliente por correo.',
                    style: TextStyle(color: DalvoColors.primaryDark, fontSize: 12, height: 1.35, fontWeight: FontWeight.w600),
                  ),
                ),
              ],
            ),
          ),
          const _FormDivider(),
          DalvoAnimatedEntry(
            delayMs: 35,
            child: _FormSection(
              title: 'Avance',
              icon: Icons.trending_up_rounded,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          'Avance del proyecto',
                          style: Theme.of(context).textTheme.titleMedium,
                        ),
                      ),
                      AnimatedContainer(
                        duration: const Duration(milliseconds: 180),
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                        decoration: BoxDecoration(
                          color: DalvoColors.ink,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          '${_progress.toStringAsFixed(0)}%',
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 12,
                            fontWeight: FontWeight.w900,
                          ),
                        ),
                      ),
                    ],
                  ),
                  Slider(
                    value: _progress,
                    min: 0,
                    max: 100,
                    divisions: 20,
                    label: '${_progress.toStringAsFixed(0)}%',
                    onChanged: (value) => setState(() => _progress = value),
                  ),
                ],
              ),
            ),
          ),
          const _FormDivider(),
          DalvoAnimatedEntry(
            delayMs: 70,
            child: _FormSection(
              title: 'Informe',
              icon: Icons.description_outlined,
              child: Column(
                children: [
                  _Field(
                    controller: _workDone,
                    label: 'Trabajo realizado',
                    hint: 'Describe lo realizado durante la visita',
                  ),
                  const SizedBox(height: 12),
                  _Field(
                    controller: _pending,
                    label: 'Pendientes',
                    hint: 'Indica trabajos o acciones pendientes',
                  ),
                  const SizedBox(height: 12),
                  _Field(
                    controller: _incidents,
                    label: 'Percances / incidencias',
                    hint: 'Registra cualquier percance o incidencia',
                  ),
                  const SizedBox(height: 12),
                  _Field(
                    controller: _observations,
                    label: 'Observaciones',
                    hint: 'Agrega observaciones adicionales',
                  ),
                ],
              ),
            ),
          ),
          const _FormDivider(),
          DalvoAnimatedEntry(
            delayMs: 105,
            child: _FormSection(
              title: 'Información',
              icon: Icons.fact_check_outlined,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  InkWell(
                    borderRadius: BorderRadius.circular(10),
                    onTap: () => setState(() => _incomplete = !_incomplete),
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                      decoration: BoxDecoration(
                        color: _incomplete ? DalvoColors.warningSoft : DalvoColors.surfaceSoft,
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(
                          color: _incomplete ? DalvoColors.warning.withOpacity(.22) : DalvoColors.line,
                        ),
                      ),
                      child: Row(
                        children: [
                          Icon(
                            _incomplete ? Icons.warning_amber_rounded : Icons.check_circle_outline_rounded,
                            size: 20,
                            color: _incomplete ? DalvoColors.warning : DalvoColors.success,
                          ),
                          const SizedBox(width: 10),
                          const Expanded(
                            child: Text(
                              'Falta información',
                              style: TextStyle(fontWeight: FontWeight.w700, fontSize: 13),
                            ),
                          ),
                          Switch.adaptive(
                            value: _incomplete,
                            activeColor: DalvoColors.primary,
                            onChanged: (value) => setState(() => _incomplete = value),
                          ),
                        ],
                      ),
                    ),
                  ),
                  AnimatedSize(
                    duration: const Duration(milliseconds: 220),
                    curve: Curves.easeOutCubic,
                    child: !_incomplete
                        ? const SizedBox.shrink()
                        : Padding(
                            padding: const EdgeInsets.only(top: 12),
                            child: _Field(
                              controller: _missingInformation,
                              label: 'Información faltante',
                              hint: 'Indica qué información está pendiente',
                              minLines: 2,
                            ),
                          ),
                  ),
                ],
              ),
            ),
          ),
          const _FormDivider(),
          DalvoAnimatedEntry(
            delayMs: 140,
            child: _FormSection(
              title: 'Evidencia',
              icon: Icons.photo_camera_outlined,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: FilledButton.icon(
                          onPressed: _takePhoto,
                          icon: const Icon(Icons.photo_camera_outlined, size: 18),
                          label: const Text('Tomar foto'),
                        ),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: OutlinedButton.icon(
                          onPressed: _pickPhotos,
                          icon: const Icon(Icons.photo_library_outlined, size: 18),
                          label: const Text('Galería'),
                        ),
                      ),
                    ],
                  ),
                  AnimatedSize(
                    duration: const Duration(milliseconds: 220),
                    curve: Curves.easeOutCubic,
                    child: _photos.isEmpty
                        ? const SizedBox.shrink()
                        : Padding(
                            padding: const EdgeInsets.only(top: 14),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  '${_photos.length} foto${_photos.length == 1 ? '' : 's'}',
                                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                        fontWeight: FontWeight.w800,
                                        color: DalvoColors.ink,
                                      ),
                                ),
                                const SizedBox(height: 9),
                                GridView.builder(
                                  shrinkWrap: true,
                                  physics: const NeverScrollableScrollPhysics(),
                                  itemCount: _photos.length,
                                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                                    crossAxisCount: 3,
                                    crossAxisSpacing: 8,
                                    mainAxisSpacing: 8,
                                  ),
                                  itemBuilder: (context, index) {
                                    final photo = _photos[index];
                                    return Stack(
                                      fit: StackFit.expand,
                                      children: [
                                        ClipRRect(
                                          borderRadius: BorderRadius.circular(10),
                                          child: Image.file(File(photo.path), fit: BoxFit.cover),
                                        ),
                                        Positioned(
                                          top: 5,
                                          right: 5,
                                          child: Material(
                                            color: DalvoColors.ink.withOpacity(.78),
                                            borderRadius: BorderRadius.circular(8),
                                            child: InkWell(
                                              borderRadius: BorderRadius.circular(8),
                                              onTap: () => setState(() => _photos.removeAt(index)),
                                              child: const SizedBox(
                                                width: 28,
                                                height: 28,
                                                child: Icon(Icons.close_rounded, color: Colors.white, size: 16),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ],
                                    );
                                  },
                                ),
                              ],
                            ),
                          ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          color: DalvoColors.surface,
          border: Border(top: BorderSide(color: DalvoColors.line)),
        ),
        child: SafeArea(
          top: false,
          minimum: const EdgeInsets.fromLTRB(18, 10, 18, 12),
          child: FilledButton.icon(
            onPressed: _saving ? null : _submit,
            icon: _saving
                ? const SizedBox(
                    width: 18,
                    height: 18,
                    child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                  )
                : const Icon(Icons.save_outlined, size: 18),
            label: Text(_saving ? 'Guardando...' : 'Guardar informe'),
          ),
        ),
      ),
    );
  }
}

class _ProjectHeader extends StatelessWidget {
  final String folio;
  final String title;

  const _ProjectHeader({required this.folio, required this.title});

  @override
  Widget build(BuildContext context) => Container(
        padding: const EdgeInsets.symmetric(vertical: 12),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const DalvoIconTile(
              icon: Icons.assignment_outlined,
              size: 40,
              color: Colors.white,
              background: DalvoColors.ink,
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(folio, style: Theme.of(context).textTheme.titleMedium),
                  if (title.trim().isNotEmpty) ...[
                    const SizedBox(height: 3),
                    Text(
                      title,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: Theme.of(context).textTheme.bodySmall,
                    ),
                  ],
                ],
              ),
            ),
          ],
        ),
      );
}

class _FormSection extends StatelessWidget {
  final String title;
  final IconData icon;
  final Widget child;

  const _FormSection({required this.title, required this.icon, required this.child});

  @override
  Widget build(BuildContext context) => Padding(
        padding: const EdgeInsets.symmetric(vertical: 16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              children: [
                Icon(icon, size: 18, color: DalvoColors.primary),
                const SizedBox(width: 8),
                Text(title, style: Theme.of(context).textTheme.titleMedium),
              ],
            ),
            const SizedBox(height: 13),
            child,
          ],
        ),
      );
}

class _FormDivider extends StatelessWidget {
  const _FormDivider();

  @override
  Widget build(BuildContext context) => const Divider(height: 1);
}

class _Field extends StatelessWidget {
  final TextEditingController controller;
  final String label;
  final String hint;
  final int minLines;

  const _Field({
    required this.controller,
    required this.label,
    required this.hint,
    this.minLines = 3,
  });

  @override
  Widget build(BuildContext context) => TextField(
        controller: controller,
        minLines: minLines,
        maxLines: 6,
        decoration: InputDecoration(
          labelText: label,
          hintText: hint,
          alignLabelWithHint: true,
        ),
      );
}
