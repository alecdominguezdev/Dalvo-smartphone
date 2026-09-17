import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

import '../models/mobile_models.dart';
import '../services/api_client.dart';
import '../services/location_service.dart';

class ReportFormPage extends StatefulWidget {
  final DalvoProject project;
  const ReportFormPage({super.key, required this.project});

  @override
  State<ReportFormPage> createState() => _ReportFormPageState();
}

class _ReportFormPageState extends State<ReportFormPage> {
  final _workDone = TextEditingController();
  final _pending = TextEditingController();
  final _incidents = TextEditingController();
  final _observations = TextEditingController();
  final _missingInformation = TextEditingController();
  final _picker = ImagePicker();

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
    final photos = await _picker.pickMultiImage(
      imageQuality: 78,
      maxWidth: 1920,
    );
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
      if (reportId <= 0) throw Exception('No se pudo crear el reporte.');

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
        const SnackBar(content: Text('Reporte enviado correctamente.')),
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
    return Scaffold(
      appBar: AppBar(title: const Text('Nuevo reporte')),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(18, 8, 18, 120),
        children: [
          Text(
            widget.project.folio,
            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                  fontWeight: FontWeight.w800,
                ),
          ),
          Text(widget.project.title),
          const SizedBox(height: 24),
          Text(
            'Avance del proyecto · ${_progress.toStringAsFixed(0)}%',
            style: const TextStyle(fontWeight: FontWeight.w700),
          ),
          Slider(
            value: _progress,
            min: 0,
            max: 100,
            divisions: 20,
            label: '${_progress.toStringAsFixed(0)}%',
            onChanged: (value) => setState(() => _progress = value),
          ),
          const SizedBox(height: 8),
          _Field(
            controller: _workDone,
            label: '¿Qué se realizó?',
            hint: 'Describe los trabajos realizados durante la visita.',
          ),
          const SizedBox(height: 14),
          _Field(
            controller: _pending,
            label: '¿Qué queda pendiente?',
            hint: 'Pendientes o próximos trabajos.',
          ),
          const SizedBox(height: 14),
          _Field(
            controller: _incidents,
            label: 'Percances / incidencias',
            hint: 'Registra cualquier problema encontrado.',
          ),
          const SizedBox(height: 14),
          _Field(
            controller: _observations,
            label: 'Observaciones',
            hint: 'Información adicional del proyecto.',
          ),
          const SizedBox(height: 16),
          Card(
            child: SwitchListTile(
              value: _incomplete,
              onChanged: (value) => setState(() => _incomplete = value),
              title: const Text('Falta información'),
              subtitle: const Text('El reporte puede enviarse indicando qué información está pendiente.'),
            ),
          ),
          if (_incomplete) ...[
            const SizedBox(height: 14),
            _Field(
              controller: _missingInformation,
              label: 'Información faltante',
              hint: 'Ej. Falta confirmación del proveedor.',
            ),
          ],
          const SizedBox(height: 24),
          Text(
            'Evidencia fotográfica',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w800,
                ),
          ),
          const SizedBox(height: 6),
          const Text('Puedes tomar una sola foto o agregar varias.'),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                child: OutlinedButton.icon(
                  onPressed: _takePhoto,
                  icon: const Icon(Icons.photo_camera_outlined),
                  label: const Text('Tomar foto'),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: OutlinedButton.icon(
                  onPressed: _pickPhotos,
                  icon: const Icon(Icons.photo_library_outlined),
                  label: const Text('Galería'),
                ),
              ),
            ],
          ),
          if (_photos.isNotEmpty) ...[
            const SizedBox(height: 14),
            SizedBox(
              height: 112,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                itemCount: _photos.length,
                separatorBuilder: (_, __) => const SizedBox(width: 8),
                itemBuilder: (context, index) {
                  final photo = _photos[index];
                  return Stack(
                    children: [
                      ClipRRect(
                        borderRadius: BorderRadius.circular(12),
                        child: Image.file(
                          File(photo.path),
                          width: 112,
                          height: 112,
                          fit: BoxFit.cover,
                        ),
                      ),
                      Positioned(
                        right: 4,
                        top: 4,
                        child: IconButton.filled(
                          visualDensity: VisualDensity.compact,
                          onPressed: () => setState(() => _photos.removeAt(index)),
                          icon: const Icon(Icons.close, size: 17),
                        ),
                      ),
                    ],
                  );
                },
              ),
            ),
          ],
        ],
      ),
      bottomNavigationBar: SafeArea(
        minimum: const EdgeInsets.all(16),
        child: FilledButton.icon(
          onPressed: _saving ? null : _submit,
          icon: _saving
              ? const SizedBox(
                  width: 18,
                  height: 18,
                  child: CircularProgressIndicator(strokeWidth: 2),
                )
              : const Icon(Icons.send),
          label: const Padding(
            padding: EdgeInsets.symmetric(vertical: 14),
            child: Text('Enviar reporte'),
          ),
        ),
      ),
    );
  }
}

class _Field extends StatelessWidget {
  final TextEditingController controller;
  final String label;
  final String hint;

  const _Field({
    required this.controller,
    required this.label,
    required this.hint,
  });

  @override
  Widget build(BuildContext context) => TextField(
        controller: controller,
        minLines: 3,
        maxLines: 6,
        decoration: InputDecoration(
          labelText: label,
          hintText: hint,
          alignLabelWithHint: true,
        ),
      );
}
