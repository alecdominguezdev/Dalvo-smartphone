import 'dart:io' show Platform;

import 'package:local_auth/local_auth.dart';
import 'package:flutter/services.dart';

class BiometricResult {
  final bool verified;
  final String method;
  final String label;
  final bool allowNormalRegistration;

  const BiometricResult(
    this.verified,
    this.method, {
    this.label = 'biometría del dispositivo',
    this.allowNormalRegistration = false,
  });
}

class BiometricPresentation {
  final String label;
  final String method;

  const BiometricPresentation(this.label, this.method);
}

class BiometricService {
  static final LocalAuthentication _auth = LocalAuthentication();

  static Future<bool> isAvailable() async {
    try {
      return await _auth.isDeviceSupported() && await _auth.canCheckBiometrics;
    } catch (_) {
      return false;
    }
  }

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

  /// La asistencia no bloquea a quien todavía no tiene huella o Face ID.
  /// Primero se intenta la biometría; si no existe, se usa el código/patrón
  /// nativo del teléfono. Un teléfono sin bloqueo queda identificado como tal
  /// en el registro, sin que Dalvo lea ni guarde ninguna contraseña.
  static Future<BiometricPresentation> attendancePresentation() async {
    if (await isAvailable()) return presentation();
    return const BiometricPresentation(
      'código o contraseña del celular',
      'device_credential',
    );
  }

  static Future<BiometricResult> verify({
    String localizedReason = 'Confirma tu identidad para registrar el checado en Dalvo.',
  }) async {
    if (!await isAvailable()) {
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
      localizedReason: localizedReason,
      options: const AuthenticationOptions(
        biometricOnly: true,
        stickyAuth: true,
        useErrorDialogs: true,
      ),
    );
    return BiometricResult(
      verified,
      method,
      label: await presentation().then((value) => value.label),
    );
  }

  static bool _hasNoDeviceCredential(PlatformException error) {
    final code = error.code.toLowerCase();
    return code.contains('passcodenotset') ||
        code.contains('nodevicecredential') ||
        code.contains('notavailable') ||
        code.contains('notenrolled');
  }

  static Future<BiometricResult> verifyForAttendance({
    String localizedReason = 'Confirma tu identidad para registrar el checado en Dalvo.',
  }) async {
    if (await isAvailable()) {
      return verify(localizedReason: localizedReason);
    }

    try {
      final supported = await _auth.isDeviceSupported();
      if (!supported) {
        return const BiometricResult(
          false,
          'unprotected',
          label: 'sin bloqueo configurado',
          allowNormalRegistration: true,
        );
      }
      final verified = await _auth.authenticate(
        localizedReason: localizedReason,
        options: const AuthenticationOptions(
          biometricOnly: false,
          stickyAuth: true,
          useErrorDialogs: true,
        ),
      );
      return BiometricResult(
        verified,
        'device_credential',
        label: 'código del celular',
      );
    } on PlatformException catch (error) {
      if (_hasNoDeviceCredential(error)) {
        return const BiometricResult(
          false,
          'unprotected',
          label: 'sin bloqueo configurado',
          allowNormalRegistration: true,
        );
      }
      rethrow;
    }
  }
}
