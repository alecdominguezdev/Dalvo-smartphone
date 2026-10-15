import 'dart:typed_data';

int inventoryInt(dynamic value) => int.tryParse('$value') ?? 0;

class InventoryImage {
  final int id;
  final String name;
  const InventoryImage({required this.id, required this.name});
  factory InventoryImage.fromJson(Map<String, dynamic> json) => InventoryImage(
    id: inventoryInt(json['id']),
    name: '${json['name'] ?? ''}',
  );
}

class InventoryUpload {
  final String name;
  final Uint8List bytes;
  const InventoryUpload({required this.name, required this.bytes});
}

class InventoryItem {
  final int id;
  final String folio;
  final String name;
  final int quantity;
  final String description;
  final String serialNumber;
  final String model;
  final String toolType;
  final String observations;
  final String location;
  final String unit;
  final int version;
  final List<InventoryImage> images;
  final List<Map<String, dynamic>> movements;
  const InventoryItem({
    required this.id,
    required this.folio,
    required this.name,
    required this.quantity,
    required this.description,
    required this.serialNumber,
    required this.model,
    required this.toolType,
    required this.observations,
    required this.location,
    required this.unit,
    required this.version,
    required this.images,
    required this.movements,
  });
  factory InventoryItem.fromJson(Map<String, dynamic> json) => InventoryItem(
    id: inventoryInt(json['id']),
    folio: '${json['folio'] ?? ''}',
    name: '${json['name'] ?? ''}',
    quantity: inventoryInt(json['quantity']),
    description: '${json['description'] ?? ''}',
    serialNumber: '${json['serialNumber'] ?? ''}',
    model: '${json['model'] ?? ''}',
    toolType: '${json['toolType'] ?? ''}',
    observations: '${json['observations'] ?? ''}',
    location: '${json['location'] ?? ''}',
    unit: '${json['unit'] ?? 'pieza'}',
    version: inventoryInt(json['version']),
    images: (json['images'] as List? ?? const [])
        .whereType<Map<String, dynamic>>()
        .map(InventoryImage.fromJson)
        .toList(),
    movements: (json['movements'] as List? ?? const [])
        .whereType<Map<String, dynamic>>()
        .toList(),
  );
}

class InventoryAccess {
  final bool canCreate;
  final bool canEdit;
  const InventoryAccess({this.canCreate = false, this.canEdit = false});
  factory InventoryAccess.fromJson(Map<String, dynamic> json) =>
      InventoryAccess(
        canCreate: json['canCreate'] == true,
        canEdit: json['canEdit'] == true,
      );
}

class InventoryResult {
  final List<InventoryItem> items;
  final int total;
  final int articles;
  final int units;
  final int empty;
  final List<String> types;
  final bool hasMore;
  final InventoryAccess access;
  const InventoryResult({
    required this.items,
    required this.total,
    required this.articles,
    required this.units,
    required this.empty,
    required this.types,
    required this.hasMore,
    required this.access,
  });
  factory InventoryResult.fromJson(Map<String, dynamic> json) {
    final summary =
        json['summary'] as Map<String, dynamic>? ?? const <String, dynamic>{};
    return InventoryResult(
      items: (json['items'] as List? ?? const [])
          .whereType<Map<String, dynamic>>()
          .map(InventoryItem.fromJson)
          .toList(),
      total: inventoryInt(json['total']),
      articles: inventoryInt(summary['articles']),
      units: inventoryInt(summary['units']),
      empty: inventoryInt(summary['empty']),
      types: (json['types'] as List? ?? const [])
          .map((value) => '$value')
          .toList(),
      hasMore: json['hasMore'] == true,
      access: InventoryAccess.fromJson(
        json['permissions'] as Map<String, dynamic>? ??
            const <String, dynamic>{},
      ),
    );
  }
}
