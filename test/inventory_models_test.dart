import '../lib/models/inventory_models.dart';

void main() {
  final item = InventoryItem.fromJson({
    'id': '12', 'folio': 'INV-000012', 'name': 'Taladro', 'quantity': 10,
    'toolType': 'Eléctrica', 'model': 'DCD771', 'serialNumber': 'SER-01',
    'description': 'Incluye batería', 'observations': 'Buen estado',
    'location': 'Almacén SLP', 'unit': 'pieza', 'version': 2,
    'images': [{'id': '7', 'name': 'taladro.jpg'}],
    'movements': [{'type': 'Alta', 'previousQuantity': 0, 'quantity': 10}],
  });
  assert(item.id == 12 && item.quantity == 10 && item.version == 2);
  assert(item.images.first.id == 7 && item.movements.first['quantity'] == 10);
  assert(item.serialNumber == 'SER-01' && item.toolType == 'Eléctrica');
  final result = InventoryResult.fromJson({
    'items': [{ 'id': 12, 'name': 'Taladro', 'quantity': 10 }],
    'total': '1', 'summary': { 'articles': '1', 'units': 10, 'empty': 0 },
    'types': ['Eléctrica'], 'hasMore': true,
    'permissions': {'canCreate': false, 'canEdit': true},
  });
  assert(result.items.single.unit == 'pieza');
  assert(result.total == 1 && result.articles == 1 && result.units == 10);
  assert(result.hasMore && !result.access.canCreate && result.access.canEdit);
  final empty = InventoryResult.fromJson({});
  assert(empty.items.isEmpty && empty.total == 0 && empty.types.isEmpty);
  assert(!empty.hasMore && !empty.access.canCreate && !empty.access.canEdit);
  print('PASS: modelos Dart, campos del artículo, fotografías, historial, resumen, paginación y permisos.');
}
