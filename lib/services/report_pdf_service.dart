import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import 'api_client.dart';

class ReportPdfService {
  ReportPdfService._();

  static Future<void> open(BuildContext context, int reportId) async {
    try {
      final uri = await ApiClient.instance.temporaryReportPdfUrl(reportId);
      final opened = await launchUrl(uri, mode: LaunchMode.externalApplication);
      if (!opened) {
        throw const ApiException('El dispositivo no encontró una aplicación para abrir el PDF.');
      }
    } catch (error) {
      if (!context.mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(error is ApiException ? error.message : 'No se pudo descargar el informe en PDF.')),
      );
    }
  }
}
