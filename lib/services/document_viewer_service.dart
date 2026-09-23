import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import 'api_client.dart';

class DocumentViewerService {
  DocumentViewerService._();

  static Future<void> open(
    BuildContext context, {
    required String scope,
    required int fileId,
  }) async {
    try {
      final uri = await ApiClient.instance.temporaryFileUrl(scope: scope, fileId: fileId);
      final opened = await launchUrl(uri, mode: LaunchMode.externalApplication);
      if (!opened) throw const ApiException('El dispositivo no encontró una aplicación para abrir el archivo.');
    } catch (error) {
      if (!context.mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(error is ApiException ? error.message : 'No se pudo abrir el archivo.')),
      );
    }
  }
}
