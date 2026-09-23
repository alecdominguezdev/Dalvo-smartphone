import 'package:flutter/material.dart';

import '../theme/dalvo_theme.dart';
import '../widgets/dalvo_widgets.dart';

String dalvoMoney(dynamic value) {
  final number = double.tryParse('$value') ?? 0;
  final parts = number.toStringAsFixed(2).split('.');
  final chars = parts.first.split('').reversed.toList();
  final groups = <String>[];
  for (var index = 0; index < chars.length; index += 3) {
    groups.add(chars.skip(index).take(3).toList().reversed.join());
  }
  return '\$${groups.reversed.join(',')}.${parts.last}';
}

String dalvoDate(dynamic value) {
  final text = '$value';
  final date = DateTime.tryParse(text);
  if (date == null) return text.isEmpty || text == 'null' ? '—' : text;
  return '${date.day.toString().padLeft(2, '0')}/${date.month.toString().padLeft(2, '0')}/${date.year}';
}

Color statusColor(String value) {
  final text = value.toLowerCase();
  if (text.contains('aprob') || text.contains('complet') || text.contains('pagad')) return DalvoColors.success;
  if (text.contains('rechaz') || text.contains('cancel') || text.contains('no aprobado')) return DalvoColors.danger;
  if (text.contains('pend') || text.contains('espera') || text.contains('proceso')) return DalvoColors.warning;
  return DalvoColors.primaryDark;
}

class ModuleHeader extends StatelessWidget {
  final String eyebrow;
  final String title;
  final String subtitle;
  final IconData icon;
  final Widget? trailing;

  const ModuleHeader({
    super.key,
    required this.eyebrow,
    required this.title,
    required this.subtitle,
    required this.icon,
    this.trailing,
  });

  @override
  Widget build(BuildContext context) => Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(eyebrow.toUpperCase(), style: const TextStyle(color: DalvoColors.muted, fontSize: 11, fontWeight: FontWeight.w900, letterSpacing: 2)),
          const SizedBox(height: 7),
          Row(children: [
            DalvoIconTile(icon: icon),
            const SizedBox(width: 12),
            Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(title, style: Theme.of(context).textTheme.headlineSmall),
              if (subtitle.trim().isNotEmpty) ...[
                const SizedBox(height: 3),
                Text(subtitle, style: Theme.of(context).textTheme.bodySmall),
              ],
            ])),
            if (trailing != null) ...[
              const SizedBox(width: 8),
              trailing!,
            ],
          ]),
        ],
      );
}

class ModuleSearch extends StatelessWidget {
  final TextEditingController controller;
  final String hint;
  final VoidCallback onSearch;
  final VoidCallback? onFilters;
  final bool filtersActive;

  const ModuleSearch({super.key, required this.controller, required this.hint, required this.onSearch, this.onFilters, this.filtersActive = false});

  @override
  Widget build(BuildContext context) => Row(children: [
        Expanded(child: TextField(
          controller: controller,
          textInputAction: TextInputAction.search,
          onSubmitted: (_) => onSearch(),
          decoration: InputDecoration(hintText: hint, prefixIcon: const Icon(Icons.search_rounded), suffixIcon: IconButton(onPressed: onSearch, icon: const Icon(Icons.arrow_forward_rounded))),
        )),
        if (onFilters != null) ...[
          const SizedBox(width: 8),
          SizedBox(width: 50, height: 50, child: OutlinedButton(
            onPressed: onFilters,
            style: OutlinedButton.styleFrom(padding: EdgeInsets.zero, backgroundColor: filtersActive ? DalvoColors.primarySoft : Colors.white),
            child: Icon(Icons.tune_rounded, color: filtersActive ? DalvoColors.primaryDark : DalvoColors.ink),
          )),
        ],
      ]);
}

class DetailValue extends StatelessWidget {
  final String label;
  final String value;
  const DetailValue({super.key, required this.label, required this.value});

  @override
  Widget build(BuildContext context) => Padding(
        padding: const EdgeInsets.only(bottom: 13),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(label.toUpperCase(), style: const TextStyle(color: DalvoColors.muted, fontSize: 10, fontWeight: FontWeight.w900, letterSpacing: 1.2)),
          const SizedBox(height: 4),
          Text(value.trim().isEmpty ? '—' : value, style: const TextStyle(fontWeight: FontWeight.w700)),
        ]),
      );
}
