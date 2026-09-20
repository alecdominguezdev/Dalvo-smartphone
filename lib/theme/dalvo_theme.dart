import 'package:flutter/material.dart';

class DalvoColors {
  static const primary = Color(0xFF1682B1);
  static const primaryDark = Color(0xFF0B526F);
  static const primaryDeep = Color(0xFF0A3D54);
  static const primarySoft = Color(0xFFE8F5FA);
  static const cyanSoft = Color(0xFFD7F3FB);
  static const ink = Color(0xFF15191C);
  static const inkSoft = Color(0xFF252B2F);
  static const muted = Color(0xFF737C82);
  static const canvas = Color(0xFFF5F7F8);
  static const surface = Colors.white;
  static const surfaceSoft = Color(0xFFF9FAFA);
  static const line = Color(0xFFE2E7E9);
  static const success = Color(0xFF21865E);
  static const successSoft = Color(0xFFE7F6EF);
  static const warning = Color(0xFFB77717);
  static const warningSoft = Color(0xFFFFF3DB);
  static const danger = Color(0xFFBF4545);
  static const dangerSoft = Color(0xFFFDECEC);
}

ThemeData buildDalvoTheme() {
  const radius = BorderRadius.all(Radius.circular(12));
  final scheme = ColorScheme.fromSeed(
    seedColor: DalvoColors.primary,
    brightness: Brightness.light,
  ).copyWith(
    primary: DalvoColors.primary,
    onPrimary: Colors.white,
    surface: DalvoColors.surface,
    onSurface: DalvoColors.ink,
    error: DalvoColors.danger,
  );

  return ThemeData(
    useMaterial3: true,
    colorScheme: scheme,
    scaffoldBackgroundColor: DalvoColors.canvas,
    fontFamily: 'Roboto',
    splashFactory: InkSparkle.splashFactory,
    appBarTheme: const AppBarTheme(
      backgroundColor: DalvoColors.canvas,
      foregroundColor: DalvoColors.ink,
      elevation: 0,
      scrolledUnderElevation: 0,
      centerTitle: false,
      surfaceTintColor: Colors.transparent,
      titleTextStyle: TextStyle(
        color: DalvoColors.ink,
        fontSize: 18,
        fontWeight: FontWeight.w800,
        letterSpacing: -0.2,
      ),
    ),
    cardTheme: const CardThemeData(
      elevation: 0,
      margin: EdgeInsets.zero,
      color: DalvoColors.surface,
      surfaceTintColor: Colors.transparent,
      shape: RoundedRectangleBorder(
        borderRadius: radius,
        side: BorderSide(color: DalvoColors.line),
      ),
    ),
    dividerTheme: const DividerThemeData(color: DalvoColors.line, thickness: 1),
    inputDecorationTheme: const InputDecorationTheme(
      filled: true,
      fillColor: DalvoColors.surface,
      contentPadding: EdgeInsets.symmetric(horizontal: 14, vertical: 14),
      border: OutlineInputBorder(
        borderRadius: radius,
        borderSide: BorderSide(color: DalvoColors.line),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: radius,
        borderSide: BorderSide(color: DalvoColors.line),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: radius,
        borderSide: BorderSide(color: DalvoColors.primary, width: 1.5),
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: radius,
        borderSide: BorderSide(color: DalvoColors.danger),
      ),
      labelStyle: TextStyle(color: DalvoColors.muted, fontSize: 13),
      hintStyle: TextStyle(color: Color(0xFF9AA1A6), fontSize: 13),
      prefixIconColor: DalvoColors.muted,
      suffixIconColor: DalvoColors.muted,
    ),
    filledButtonTheme: FilledButtonThemeData(
      style: FilledButton.styleFrom(
        backgroundColor: DalvoColors.ink,
        foregroundColor: Colors.white,
        minimumSize: const Size(0, 50),
        padding: const EdgeInsets.symmetric(horizontal: 18),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(11)),
        textStyle: const TextStyle(fontWeight: FontWeight.w800, fontSize: 13.5),
      ),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        foregroundColor: DalvoColors.ink,
        minimumSize: const Size(0, 48),
        padding: const EdgeInsets.symmetric(horizontal: 16),
        side: const BorderSide(color: DalvoColors.line),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(11)),
        textStyle: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13),
      ),
    ),
    textButtonTheme: TextButtonThemeData(
      style: TextButton.styleFrom(
        foregroundColor: DalvoColors.primaryDark,
        textStyle: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13),
      ),
    ),
    chipTheme: ChipThemeData(
      backgroundColor: DalvoColors.surfaceSoft,
      side: const BorderSide(color: DalvoColors.line),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
      labelStyle: const TextStyle(color: DalvoColors.ink, fontWeight: FontWeight.w600, fontSize: 12),
    ),
    textTheme: const TextTheme(
      displaySmall: TextStyle(
        color: DalvoColors.ink,
        fontSize: 30,
        height: 1.05,
        fontWeight: FontWeight.w900,
        letterSpacing: -0.8,
      ),
      headlineSmall: TextStyle(
        color: DalvoColors.ink,
        fontSize: 23,
        height: 1.1,
        fontWeight: FontWeight.w900,
        letterSpacing: -0.45,
      ),
      titleLarge: TextStyle(
        color: DalvoColors.ink,
        fontSize: 19,
        fontWeight: FontWeight.w800,
        letterSpacing: -0.2,
      ),
      titleMedium: TextStyle(color: DalvoColors.ink, fontSize: 15.5, fontWeight: FontWeight.w800),
      bodyLarge: TextStyle(color: DalvoColors.ink, fontSize: 14, height: 1.35),
      bodyMedium: TextStyle(color: DalvoColors.ink, fontSize: 13.5, height: 1.35),
      bodySmall: TextStyle(color: DalvoColors.muted, fontSize: 12, height: 1.3),
    ),
    pageTransitionsTheme: const PageTransitionsTheme(
      builders: {
        TargetPlatform.android: FadeUpwardsPageTransitionsBuilder(),
        TargetPlatform.iOS: FadeUpwardsPageTransitionsBuilder(),
        TargetPlatform.windows: FadeUpwardsPageTransitionsBuilder(),
        TargetPlatform.macOS: FadeUpwardsPageTransitionsBuilder(),
      },
    ),
  );
}
