class ApiConfig {
  static const String baseUrl = String.fromEnvironment(
    'DALVO_API_BASE_URL',
    defaultValue: 'https://pruebas.dalvosystem.com/api/mobile/v1',
  );

  static Uri uri(String path, [Map<String, dynamic>? query]) {
    final cleanBase = baseUrl.endsWith('/')
        ? baseUrl.substring(0, baseUrl.length - 1)
        : baseUrl;
    final cleanPath = path.startsWith('/') ? path : '/$path';
    final uri = Uri.parse('$cleanBase$cleanPath');
    if (query == null || query.isEmpty) return uri;
    return uri.replace(
      queryParameters: query.map(
        (key, value) => MapEntry(key, value?.toString() ?? ''),
      ),
    );
  }
}
