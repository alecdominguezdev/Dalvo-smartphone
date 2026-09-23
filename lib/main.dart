import 'package:flutter/material.dart';

import 'screens/login_page.dart';
import 'screens/shell_page.dart';
import 'services/api_client.dart';
import 'services/shared_document_service.dart';
import 'theme/dalvo_theme.dart';
import 'widgets/dalvo_widgets.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const DalvoMobileApp());
}

class DalvoMobileApp extends StatelessWidget {
  const DalvoMobileApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Dalvo Móvil',
      theme: buildDalvoTheme(),
      home: const _BootstrapPage(),
    );
  }
}

class _BootstrapPage extends StatefulWidget {
  const _BootstrapPage();

  @override
  State<_BootstrapPage> createState() => _BootstrapPageState();
}

class _BootstrapPageState extends State<_BootstrapPage> {
  bool _loading = true;
  bool _authenticated = false;

  @override
  void initState() {
    super.initState();
    _bootstrap();
  }

  Future<void> _bootstrap() async {
    try {
      await ApiClient.instance.initialize();
    } catch (error, stackTrace) {
      debugPrint('Error iniciando almacenamiento seguro: $error');
      debugPrintStack(stackTrace: stackTrace);
    }

    try {
      await SharedDocumentService.instance.initialize();
    } catch (error, stackTrace) {
      debugPrint('Error iniciando archivos compartidos: $error');
      debugPrintStack(stackTrace: stackTrace);
    }

    if (ApiClient.instance.hasToken) {
      try {
        await ApiClient.instance.me();
        _authenticated = true;
      } catch (error, stackTrace) {
        debugPrint('Error recuperando sesión: $error');
        debugPrintStack(stackTrace: stackTrace);
        try {
          await ApiClient.instance.logout();
        } catch (logoutError) {
          debugPrint('Error limpiando sesión: $logoutError');
        }
      }
    }
    if (mounted) setState(() => _loading = false);
  }

  @override
  Widget build(BuildContext context) {
    if (_loading) return const _DalvoLaunchView();
    if (_authenticated) return const DalvoShellPage();
    return const LoginPage();
  }
}

class _DalvoLaunchView extends StatefulWidget {
  const _DalvoLaunchView();

  @override
  State<_DalvoLaunchView> createState() => _DalvoLaunchViewState();
}

class _DalvoLaunchViewState extends State<_DalvoLaunchView>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 950),
      lowerBound: .96,
      upperBound: 1.03,
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        body: Center(
          child: ScaleTransition(
            scale: _controller,
            child: const Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                DalvoLogo(width: 150),
                SizedBox(height: 22),
                SizedBox(
                  width: 24,
                  height: 24,
                  child: CircularProgressIndicator(
                    strokeWidth: 2.2,
                    color: DalvoColors.primary,
                  ),
                ),
              ],
            ),
          ),
        ),
      );
}
