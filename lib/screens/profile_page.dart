import 'package:flutter/material.dart';

import '../models/mobile_models.dart';
import '../services/api_client.dart';
import '../theme/dalvo_theme.dart';
import '../widgets/dalvo_widgets.dart';

class ProfilePage extends StatelessWidget {
  final VoidCallback onLogout;
  const ProfilePage({super.key, required this.onLogout});

  @override
  Widget build(BuildContext context) {
    final user = ApiClient.instance.currentUser;
    final access = ApiClient.instance.currentAccess;
    final branches = access?.branches ?? const <DalvoBranchAccess>[];

    return ListView(
      padding: const EdgeInsets.fromLTRB(18, 12, 18, 28),
      children: [
        const DalvoAnimatedEntry(
          child: DalvoSectionTitle(
            title: 'Perfil',
          ),
        ),
        const SizedBox(height: 16),
        DalvoAnimatedEntry(
          delayMs: 60,
          child: _ProfileHero(
            name: user?.displayName ?? 'Usuario Dalvo',
            username: user?.username ?? '',
            role: _roleLabel(user?.role ?? ''),
            initials: user?.initials ?? 'D',
          ),
        ),
        const SizedBox(height: 24),
        if (branches.isNotEmpty) ...[
          const SizedBox(height: 24),
          const DalvoAnimatedEntry(
            delayMs: 180,
            child: DalvoSectionTitle(
              title: 'Sucursales',
            ),
          ),
          const SizedBox(height: 12),
          DalvoAnimatedEntry(
            delayMs: 220,
            child: DalvoSurface(
              padding: const EdgeInsets.symmetric(vertical: 4),
              child: Column(
                children: [
                  for (var i = 0; i < branches.length; i++) ...[
                    ListTile(
                      contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 2),
                      leading: const DalvoIconTile(icon: Icons.storefront_outlined, size: 39),
                      title: Text(
                        '${branches[i].company} · ${branches[i].name}',
                        style: const TextStyle(fontWeight: FontWeight.w800),
                      ),
                      subtitle: Text(
                        '${branches[i].level.isEmpty ? 'Acceso' : branches[i].level} · ${branches[i].permissions.length} permisos',
                      ),
                    ),
                    if (i < branches.length - 1)
                      const Divider(height: 1, indent: 62, endIndent: 12),
                  ],
                ],
              ),
            ),
          ),
        ],
        const SizedBox(height: 24),
        const DalvoAnimatedEntry(
          delayMs: 240,
          child: DalvoSectionTitle(title: 'Seguridad'),
        ),
        const SizedBox(height: 12),
        const DalvoAnimatedEntry(
          delayMs: 280,
          child: DalvoSurface(
            padding: EdgeInsets.symmetric(vertical: 4),
            child: Column(
              children: [
                _SecurityTile(
                  icon: Icons.fingerprint_rounded,
                  title: 'Biometría',
                  subtitle: 'Huella o reconocimiento facial',
                ),
                Divider(height: 1, indent: 62, endIndent: 12),
                _SecurityTile(
                  icon: Icons.location_on_outlined,
                  title: 'Ubicación',
                  subtitle: 'Ubicación en visitas y chequeos',
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 22),
        DalvoAnimatedEntry(
          delayMs: 320,
          child: OutlinedButton.icon(
            onPressed: onLogout,
            icon: const Icon(Icons.logout_rounded, color: DalvoColors.danger),
            label: const Text(
              'Cerrar sesión',
              style: TextStyle(color: DalvoColors.danger),
            ),
          ),
        ),
      ],
    );
  }

  static String _roleLabel(String role) {
    final value = role.trim();
    if (value.isEmpty) return 'Usuario';
    return value[0].toUpperCase() + value.substring(1);
  }
}

class _ProfileHero extends StatelessWidget {
  final String name;
  final String username;
  final String role;
  final String initials;

  const _ProfileHero({
    required this.name,
    required this.username,
    required this.role,
    required this.initials,
  });

  @override
  Widget build(BuildContext context) => Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: DalvoColors.ink,
          borderRadius: BorderRadius.circular(14),
        ),
        child: Row(
          children: [
            Container(
              width: 66,
              height: 66,
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: DalvoColors.primary,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Text(
                initials,
                style: const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.w900,
                  fontSize: 21,
                ),
              ),
            ),
            const SizedBox(width: 15),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    name,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(color: Colors.white),
                  ),
                  const SizedBox(height: 3),
                  Text(
                    '@$username',
                    style: const TextStyle(color: Color(0xFFB8C1C6), fontSize: 12),
                  ),
                  const SizedBox(height: 10),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(.10),
                      borderRadius: BorderRadius.circular(9),
                    ),
                    child: Text(
                      role,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 11,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      );
}

class _SecurityTile extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;

  const _SecurityTile({
    required this.icon,
    required this.title,
    required this.subtitle,
  });

  @override
  Widget build(BuildContext context) => ListTile(
        contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 4),
        leading: DalvoIconTile(icon: icon, size: 39),
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.w800)),
        subtitle: Text(subtitle),
        trailing: const Icon(Icons.check_circle_rounded, color: DalvoColors.success, size: 20),
      );
}
