import 'package:flutter/material.dart';

import '../services/api_client.dart';
import '../theme/dalvo_theme.dart';
import '../widgets/dalvo_widgets.dart';
import 'shell_page.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _username = TextEditingController();
  final _password = TextEditingController();
  bool _loading = false;
  bool _obscure = true;
  String? _error;

  @override
  void dispose() {
    _username.dispose();
    _password.dispose();
    super.dispose();
  }

  Future<void> _login() async {
    if (_username.text.trim().isEmpty || _password.text.isEmpty) {
      setState(() => _error = 'Ingresa usuario y contraseña.');
      return;
    }
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      await ApiClient.instance.login(_username.text, _password.text);
      if (!mounted) return;
      Navigator.of(context).pushAndRemoveUntil(
        MaterialPageRoute(builder: (_) => const DalvoShellPage()),
        (_) => false,
      );
    } catch (error) {
      if (mounted) setState(() => _error = error.toString());
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: DalvoColors.surface,
      body: Stack(
        children: [
          Positioned(
            top: -90,
            right: -95,
            child: _AccentBlock(
              width: 220,
              height: 220,
              color: DalvoColors.cyanSoft.withOpacity(.68),
            ),
          ),
          Positioned(
            bottom: -125,
            left: -105,
            child: _AccentBlock(
              width: 250,
              height: 250,
              color: DalvoColors.primarySoft.withOpacity(.82),
            ),
          ),
          SafeArea(
            child: LayoutBuilder(
              builder: (context, constraints) => SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 24),
                child: ConstrainedBox(
                  constraints: BoxConstraints(minHeight: constraints.maxHeight - 48),
                  child: Center(
                    child: ConstrainedBox(
                      constraints: const BoxConstraints(maxWidth: 400),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          const DalvoAnimatedEntry(
                            child: Align(
                              alignment: Alignment.centerLeft,
                              child: DalvoLogo(width: 126),
                            ),
                          ),
                          const SizedBox(height: 34),
                          DalvoAnimatedEntry(
                            delayMs: 40,
                            child: Text(
                              'Iniciar sesión',
                              style: Theme.of(context).textTheme.headlineSmall,
                            ),
                          ),
                          const SizedBox(height: 20),
                          DalvoAnimatedEntry(
                            delayMs: 80,
                            child: TextField(
                              controller: _username,
                              textInputAction: TextInputAction.next,
                              autocorrect: false,
                              decoration: const InputDecoration(
                                labelText: 'Usuario',
                                prefixIcon: Icon(Icons.person_outline_rounded),
                              ),
                            ),
                          ),
                          const SizedBox(height: 12),
                          DalvoAnimatedEntry(
                            delayMs: 110,
                            child: TextField(
                              controller: _password,
                              obscureText: _obscure,
                              onSubmitted: (_) => _loading ? null : _login(),
                              decoration: InputDecoration(
                                labelText: 'Contraseña',
                                prefixIcon: const Icon(Icons.lock_outline_rounded),
                                suffixIcon: IconButton(
                                  onPressed: () => setState(() => _obscure = !_obscure),
                                  icon: Icon(
                                    _obscure ? Icons.visibility_outlined : Icons.visibility_off_outlined,
                                  ),
                                ),
                              ),
                            ),
                          ),
                          AnimatedSize(
                            duration: const Duration(milliseconds: 200),
                            curve: Curves.easeOutCubic,
                            child: _error == null
                                ? const SizedBox.shrink()
                                : Padding(
                                    padding: const EdgeInsets.only(top: 12),
                                    child: Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                                      decoration: BoxDecoration(
                                        color: DalvoColors.dangerSoft,
                                        borderRadius: BorderRadius.circular(10),
                                        border: Border.all(color: DalvoColors.danger.withOpacity(.15)),
                                      ),
                                      child: Row(
                                        children: [
                                          const Icon(Icons.error_outline_rounded, size: 18, color: DalvoColors.danger),
                                          const SizedBox(width: 8),
                                          Expanded(
                                            child: Text(
                                              _error!,
                                              style: const TextStyle(
                                                color: DalvoColors.danger,
                                                fontWeight: FontWeight.w600,
                                                fontSize: 12.5,
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                          ),
                          const SizedBox(height: 18),
                          DalvoAnimatedEntry(
                            delayMs: 145,
                            child: FilledButton(
                              onPressed: _loading ? null : _login,
                              child: AnimatedSwitcher(
                                duration: const Duration(milliseconds: 180),
                                transitionBuilder: (child, animation) => FadeTransition(
                                  opacity: animation,
                                  child: ScaleTransition(scale: animation, child: child),
                                ),
                                child: _loading
                                    ? const SizedBox(
                                        key: ValueKey('loading'),
                                        width: 19,
                                        height: 19,
                                        child: CircularProgressIndicator(
                                          strokeWidth: 2,
                                          color: Colors.white,
                                        ),
                                      )
                                    : const Row(
                                        key: ValueKey('label'),
                                        mainAxisAlignment: MainAxisAlignment.center,
                                        children: [
                                          Text('Ingresar'),
                                          SizedBox(width: 8),
                                          Icon(Icons.arrow_forward_rounded, size: 18),
                                        ],
                                      ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _AccentBlock extends StatelessWidget {
  final double width;
  final double height;
  final Color color;

  const _AccentBlock({
    required this.width,
    required this.height,
    required this.color,
  });

  @override
  Widget build(BuildContext context) => Container(
        width: width,
        height: height,
        decoration: BoxDecoration(
          color: color,
          borderRadius: BorderRadius.circular(42),
        ),
      );
}
