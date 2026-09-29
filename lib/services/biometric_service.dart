import 'dart:io' show Platform;

import 'package:local_auth/local_auth.dart';

class BiometricResult {
  final bool verified;
  final String method;

  const BiometricResult(this.verified, this.method);
}

class BiometricPresentation {
  final String label;
  final String method;

  const BiometricPresentation(this.label, this.method);
}

class BiometricService {
  static final LocalAuthentication _auth = LocalAuthentication();

  /// Texto que debe mostrar cada plataforma antes del checado. iPhone usa el
  /// nombre de Apple (Face ID/Touch ID); Android conserva el de huella.
  static Future<BiometricPresentation> presentation() async {
    try {
      final available = await _auth.getAvailableBiometrics();
      if (available.contains(BiometricType.face)) {
        return const BiometricPresentation('Face ID', 'face');
      }
      if (available.contains(BiometricType.fingerprint)) {
        return BiometricPresentation(
          Platform.isIOS ? 'Touch ID' : 'huella digital',
          'fingerprint',
        );
      }
      if (available.contains(BiometricType.strong)) {
        return const BiometricPresentation('biometría del dispositivo', 'strong');
      }
      if (available.contains(BiometricType.weak)) {
        return const BiometricPresentation('biometría del dispositivo', 'weak');
      }
    } catch (_) {
      // El mensaje del botón conserva una alternativa clara mientras el
      // sistema termina de exponer el sensor biométrico.
    }
    return BiometricPresentation(
      Platform.isIOS ? 'Face ID' : 'huella digital',
      Platform.isIOS ? 'face' : 'fingerprint',
    );
  }

  static Future<BiometricResult> verify() async {
    final supported = await _auth.isDeviceSupported();
    final canCheck = await _auth.canCheckBiometrics;
    if (!supported || !canCheck) {
      throw Exception('Este dispositivo no tiene biometría disponible.');
    }

    final available = await _auth.getAvailableBiometrics();
    String method = 'strong';
    if (available.contains(BiometricType.face)) {
      method = 'face';
    } else if (available.contains(BiometricType.fingerprint)) {
      method = 'fingerprint';
    } else if (available.contains(BiometricType.strong)) {
      method = 'strong';
    } else if (available.contains(BiometricType.weak)) {
      method = 'weak';
    }

    final verified = await _auth.authenticate(
      localizedReason: 'Confirma tu identidad para registrar el checado en Dalvo.',
      options: const AuthenticationOptions(
        biometricOnly: true,
        stickyAuth: true,
        useErrorDialogs: true,
      ),
    );
    return BiometricResult(verified, method);
  }
}
