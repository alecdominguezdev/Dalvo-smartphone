# Configuración móvil requerida

## Android

En `android/app/src/main/AndroidManifest.xml`, dentro de `<manifest>`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.USE_BIOMETRIC" />
```

Para `local_auth`, la actividad principal debe usar `FlutterFragmentActivity`.
Ejemplo Kotlin:

```kotlin
import io.flutter.embedding.android.FlutterFragmentActivity

class MainActivity: FlutterFragmentActivity()
```

## iOS

Agregar a `ios/Runner/Info.plist`:

```xml
<key>NSCameraUsageDescription</key>
<string>Dalvo requiere la cámara para adjuntar evidencia a los reportes.</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>Dalvo requiere acceso a fotografías para adjuntar evidencia.</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>Dalvo utiliza tu ubicación para validar visitas y checados en proyecto.</string>
<key>NSFaceIDUsageDescription</key>
<string>Dalvo utiliza Face ID para confirmar el checado del supervisor.</string>
```

## API por ambiente

Pruebas, sin parámetros adicionales:

```bash
flutter run
```

usa por defecto:

`https://pruebas.dalvosystem.com/api/mobile/v1`

Producción posteriormente, sin cambiar código:

```bash
flutter run --dart-define=DALVO_API_BASE_URL=https://dalvosystem.com/api/mobile/v1
```

Para compilar Android producción:

```bash
flutter build apk --release --dart-define=DALVO_API_BASE_URL=https://dalvosystem.com/api/mobile/v1
```
