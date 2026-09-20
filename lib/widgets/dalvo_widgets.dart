import 'package:flutter/material.dart';

import '../theme/dalvo_theme.dart';

class DalvoLogo extends StatelessWidget {
  final double width;
  final bool white;
  const DalvoLogo({super.key, this.width = 112, this.white = false});

  @override
  Widget build(BuildContext context) => Image.asset(
        white ? 'assets/dalvo/logo-dalvo-blanco.png' : 'assets/dalvo/logo-dalvo.png',
        width: width,
        fit: BoxFit.contain,
        filterQuality: FilterQuality.high,
      );
}

class DalvoAnimatedEntry extends StatelessWidget {
  final Widget child;
  final int delayMs;
  final double offsetY;

  const DalvoAnimatedEntry({
    super.key,
    required this.child,
    this.delayMs = 0,
    this.offsetY = 12,
  });

  @override
  Widget build(BuildContext context) {
    return TweenAnimationBuilder<double>(
      tween: Tween(begin: 0, end: 1),
      duration: Duration(milliseconds: 330 + delayMs),
      curve: Curves.easeOutCubic,
      builder: (context, value, child) => Opacity(
        opacity: value,
        child: Transform.translate(
          offset: Offset(0, (1 - value) * offsetY),
          child: Transform.scale(
            scale: .985 + (.015 * value),
            alignment: Alignment.topCenter,
            child: child,
          ),
        ),
      ),
      child: child,
    );
  }
}

class DalvoSectionTitle extends StatelessWidget {
  final String title;
  final String? subtitle;
  final Widget? trailing;

  const DalvoSectionTitle({
    super.key,
    required this.title,
    this.subtitle,
    this.trailing,
  });

  @override
  Widget build(BuildContext context) => Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: Theme.of(context).textTheme.titleLarge),
                if ((subtitle ?? '').trim().isNotEmpty) ...[
                  const SizedBox(height: 3),
                  Text(subtitle!, style: Theme.of(context).textTheme.bodySmall),
                ],
              ],
            ),
          ),
          if (trailing != null) trailing!,
        ],
      );
}

class DalvoBadge extends StatelessWidget {
  final String label;
  final IconData? icon;
  final Color? foreground;
  final Color? background;

  const DalvoBadge({
    super.key,
    required this.label,
    this.icon,
    this.foreground,
    this.background,
  });

  @override
  Widget build(BuildContext context) {
    final fg = foreground ?? DalvoColors.primaryDark;
    final bg = background ?? DalvoColors.primarySoft;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 6),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (icon != null) ...[
            Icon(icon, size: 13, color: fg),
            const SizedBox(width: 5),
          ],
          Text(
            label,
            style: TextStyle(color: fg, fontSize: 11, fontWeight: FontWeight.w800),
          ),
        ],
      ),
    );
  }
}

class DalvoSurface extends StatelessWidget {
  final Widget child;
  final EdgeInsetsGeometry padding;
  final Color color;
  final BorderRadius borderRadius;
  final VoidCallback? onTap;

  const DalvoSurface({
    super.key,
    required this.child,
    this.padding = const EdgeInsets.all(16),
    this.color = DalvoColors.surface,
    this.borderRadius = const BorderRadius.all(Radius.circular(12)),
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final content = Container(
      padding: padding,
      decoration: BoxDecoration(
        color: color,
        borderRadius: borderRadius,
        border: Border.all(color: DalvoColors.line),
      ),
      child: child,
    );
    if (onTap == null) return content;
    return Material(
      color: Colors.transparent,
      child: InkWell(
        borderRadius: borderRadius,
        onTap: onTap,
        child: content,
      ),
    );
  }
}

class DalvoIconTile extends StatelessWidget {
  final IconData icon;
  final Color color;
  final Color background;
  final double size;

  const DalvoIconTile({
    super.key,
    required this.icon,
    this.color = DalvoColors.primary,
    this.background = DalvoColors.primarySoft,
    this.size = 42,
  });

  @override
  Widget build(BuildContext context) => Container(
        width: size,
        height: size,
        alignment: Alignment.center,
        decoration: BoxDecoration(
          color: background,
          borderRadius: BorderRadius.circular(10),
        ),
        child: Icon(icon, color: color, size: size * .47),
      );
}

class DalvoEmptyState extends StatelessWidget {
  final IconData icon;
  final String title;
  final String message;
  final Widget? action;
  final bool error;

  const DalvoEmptyState({
    super.key,
    required this.icon,
    required this.title,
    required this.message,
    this.action,
    this.error = false,
  });

  @override
  Widget build(BuildContext context) => DalvoSurface(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            DalvoIconTile(
              icon: icon,
              color: error ? DalvoColors.danger : DalvoColors.primary,
              background: error ? DalvoColors.dangerSoft : DalvoColors.primarySoft,
              size: 48,
            ),
            const SizedBox(height: 12),
            Text(title, style: Theme.of(context).textTheme.titleMedium),
            if (message.trim().isNotEmpty) ...[
              const SizedBox(height: 5),
              Text(
                message,
                textAlign: TextAlign.center,
                style: Theme.of(context).textTheme.bodySmall,
              ),
            ],
            if (action != null) ...[
              const SizedBox(height: 14),
              action!,
            ],
          ],
        ),
      );
}

class DalvoStatCard extends StatelessWidget {
  final String label;
  final String value;
  final IconData icon;
  final String? helper;
  final Color? accent;

  const DalvoStatCard({
    super.key,
    required this.label,
    required this.value,
    required this.icon,
    this.helper,
    this.accent,
  });

  @override
  Widget build(BuildContext context) {
    final color = accent ?? DalvoColors.primary;
    return DalvoSurface(
      padding: const EdgeInsets.all(15),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          DalvoIconTile(
            icon: icon,
            color: color,
            background: color.withOpacity(.10),
            size: 36,
          ),
          const SizedBox(height: 12),
          Text(
            value,
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(fontSize: 21),
          ),
          const SizedBox(height: 2),
          Text(label, style: Theme.of(context).textTheme.bodyMedium?.copyWith(fontWeight: FontWeight.w700)),
          if ((helper ?? '').isNotEmpty) ...[
            const SizedBox(height: 2),
            Text(helper!, style: Theme.of(context).textTheme.bodySmall),
          ],
        ],
      ),
    );
  }
}

class DalvoSkeleton extends StatefulWidget {
  final double height;
  final BorderRadius borderRadius;

  const DalvoSkeleton({
    super.key,
    required this.height,
    this.borderRadius = const BorderRadius.all(Radius.circular(12)),
  });

  @override
  State<DalvoSkeleton> createState() => _DalvoSkeletonState();
}

class _DalvoSkeletonState extends State<DalvoSkeleton> with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: const Duration(milliseconds: 900))
      ..repeat(reverse: true);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => AnimatedBuilder(
        animation: _controller,
        builder: (context, child) => Container(
          height: widget.height,
          decoration: BoxDecoration(
            color: Color.lerp(const Color(0xFFE9EDEF), const Color(0xFFF7F8F8), _controller.value),
            borderRadius: widget.borderRadius,
          ),
        ),
      );
}
