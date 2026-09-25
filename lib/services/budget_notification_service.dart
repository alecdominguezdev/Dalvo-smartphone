import 'package:flutter/services.dart';
import 'dart:async';

class BudgetNotificationService {
  BudgetNotificationService._();
  static final BudgetNotificationService instance = BudgetNotificationService._();

  static const _channel = MethodChannel('dalvo/notifications');
  final _budgetTapController = StreamController<int?>.broadcast();
  final _budgetUpdateController = StreamController<void>.broadcast();

  Stream<int?> get budgetTaps => _budgetTapController.stream;
  Stream<void> get budgetUpdates => _budgetUpdateController.stream;

  /// Hace que las vistas abiertas se recarguen al llegar un push o cambiar la
  /// lista de presupuestos. No depende de que el usuario salga y entre a ella.
  void notifyBudgetUpdated() => _budgetUpdateController.add(null);

  Future<void> initialize() async {
    try {
      _channel.setMethodCallHandler((call) async {
        if (call.method == 'notificationTap' || call.method == 'openBudget') {
          final arguments = call.arguments;
          final budgetId = arguments is Map
              ? int.tryParse('${arguments['budgetId'] ?? arguments['id'] ?? ''}')
              : int.tryParse('$arguments');
          _budgetTapController.add(budgetId);
        }
      });
      final initialBudgetId = await _channel.invokeMethod<dynamic>('initialize');
      final budgetId = int.tryParse('$initialBudgetId');
      if (budgetId != null && budgetId > 0) _budgetTapController.add(budgetId);
    } catch (_) {
      // En Windows/iOS o builds anteriores el canal puede no estar disponible.
    }
  }

  Future<void> setBudgetBadge(int count) async {
    try {
      await _channel.invokeMethod<void>('setBudgetBadge', {'count': count});
    } catch (_) {}
  }

  Future<void> showNewBudget({required int count, int? budgetId}) async {
    try {
      await _channel.invokeMethod<void>('showNewBudget', {
        'count': count,
        if (budgetId != null) 'budgetId': budgetId,
      });
    } catch (_) {}
  }
}
