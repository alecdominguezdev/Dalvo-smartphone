import 'package:local_auth/local_auth.dart';

class BiometricResult {
  final bool verified;
  final String method;

  const BiometricResult(this.verified, this.method);
}

class BiometricService {
  static final LocalAuthentication _auth = LocalAuthentication();

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
