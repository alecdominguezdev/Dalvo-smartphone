import 'package:flutter/services.dart';

class BudgetNotificationService {
  BudgetNotificationService._();
  static final BudgetNotificationService instance = BudgetNotificationService._();

  static const _channel = MethodChannel('dalvo/notifications');

  Future<void> initialize() async {
    try {
      await _channel.invokeMethod<void>('initialize');
    } catch (_) {
      // En Windows/iOS o builds anteriores el canal puede no estar disponible.
    }
  }

  Future<void> setBudgetBadge(int count) async {
    try {
      await _channel.invokeMethod<void>('setBudgetBadge', {'count': count});
    } catch (_) {}
  }

  Future<void> showNewBudget({required int count}) async {
    try {
      await _channel.invokeMethod<void>('showNewBudget', {'count': count});
    } catch (_) {}
  }
}
