import 'dart:async';
import 'dart:io' show Platform;

import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';

import 'api_client.dart';

class PushNotificationService {
  PushNotificationService._();
  static final PushNotificationService instance = PushNotificationService._();

  final FirebaseMessaging _messaging = FirebaseMessaging.instance;
  static final FlutterLocalNotificationsPlugin _localNotifications = FlutterLocalNotificationsPlugin();
  static const AndroidNotificationChannel _budgetChannel = AndroidNotificationChannel(
    'dalvo_presupuestos',
    'Presupuestos',
    description: 'Avisos de nuevos presupuestos pendientes de aprobación',
    importance: Importance.high,
  );
  final StreamController<RemoteMessage> _foregroundController =
      StreamController<RemoteMessage>.broadcast();
  final StreamController<int?> _openedBudgetController =
      StreamController<int?>.broadcast();

  StreamSubscription<RemoteMessage>? _foregroundSubscription;
  StreamSubscription<RemoteMessage>? _openedSubscription;
  StreamSubscription<String>? _tokenRefreshSubscription;
  bool _initialized = false;

  Stream<RemoteMessage> get foregroundMessages => _foregroundController.stream;
  Stream<int?> get openedBudgets => _openedBudgetController.stream;

  Future<void> initialize() async {
    if (_initialized) return;
    _initialized = true;

    await _initializeLocalNotifications();
    await _messaging.requestPermission(alert: true, badge: true, sound: true);
    await _messaging.setForegroundNotificationPresentationOptions(
      alert: true,
      badge: true,
      sound: true,
    );
    _foregroundSubscription = FirebaseMessaging.onMessage.listen(
      _foregroundController.add,
    );
    _openedSubscription = FirebaseMessaging.onMessageOpenedApp.listen(
      (message) => _openedBudgetController.add(_budgetId(message)),
    );
    _tokenRefreshSubscription = _messaging.onTokenRefresh.listen(
      (_) => registerCurrentDevice(),
    );

    final launchMessage = await _messaging.getInitialMessage();
    if (launchMessage != null) {
      scheduleMicrotask(
        () => _openedBudgetController.add(_budgetId(launchMessage)),
      );
    }
  }

  Future<void> _initializeLocalNotifications() async {
    const initialization = InitializationSettings(
      android: AndroidInitializationSettings('@mipmap/ic_launcher'),
      iOS: DarwinInitializationSettings(),
    );
    await _localNotifications.initialize(
      initialization,
      onDidReceiveNotificationResponse: (response) {
        final budgetId = int.tryParse(response.payload ?? '');
        _openedBudgetController.add(budgetId);
      },
    );
    await _localNotifications
        .resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>()
        ?.createNotificationChannel(_budgetChannel);
    final details = await _localNotifications.getNotificationAppLaunchDetails();
    if (details?.didNotificationLaunchApp ?? false) {
      final budgetId = int.tryParse(details?.notificationResponse?.payload ?? '');
      scheduleMicrotask(() => _openedBudgetController.add(budgetId));
    }
  }

  static Future<void> showBackgroundBudgetNotification(RemoteMessage message) async {
    final data = message.data;
    if (data['type'] != 'budget_pending') return;
    final budgetId = int.tryParse('${data['budgetId'] ?? data['id'] ?? ''}');
    final count = int.tryParse('${data['pendingCount'] ?? ''}') ?? 1;
    final title = '${data['notificationTitle'] ?? 'Dalvo'}'.trim();
    final body = '${data['notificationBody'] ?? ''}'.trim().isNotEmpty
        ? '${data['notificationBody']}'
        : count == 1
            ? 'Nuevo presupuesto pendiente de aprobar.'
            : 'Tienes $count presupuestos pendientes de aprobar.';
    const initialization = InitializationSettings(
      android: AndroidInitializationSettings('@mipmap/ic_launcher'),
      iOS: DarwinInitializationSettings(),
    );
    await _localNotifications.initialize(initialization);
    await _localNotifications
        .resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>()
        ?.createNotificationChannel(_budgetChannel);
    await _localNotifications.show(
      budgetId ?? 26001,
      title.isEmpty ? 'Dalvo' : title,
      body,
      NotificationDetails(
        android: AndroidNotificationDetails(
          _budgetChannel.id,
          _budgetChannel.name,
          channelDescription: _budgetChannel.description,
          importance: Importance.high,
          priority: Priority.high,
          number: count,
          icon: '@mipmap/ic_launcher',
        ),
      ),
      payload: budgetId?.toString(),
    );
  }

  Future<void> registerCurrentDevice() async {
    if (!ApiClient.instance.hasToken) return;
    if (Platform.isIOS) {
      var apnsToken = await _messaging.getAPNSToken();
      if (apnsToken == null) {
        await Future<void>.delayed(const Duration(seconds: 2));
        apnsToken = await _messaging.getAPNSToken();
      }
      if (apnsToken == null) return;
    }
    final token = await _messaging.getToken();
    if (token == null || token.isEmpty) return;
    await ApiClient.instance.registerPushToken(
      token: token,
      platform: Platform.isIOS ? 'ios' : 'android',
    );
  }

  int? budgetIdFrom(RemoteMessage message) => _budgetId(message);

  int? _budgetId(RemoteMessage message) {
    final data = message.data;
    if (data['type'] != 'budget_pending' && data['budgetId'] == null) return null;
    return int.tryParse('${data['budgetId'] ?? data['id'] ?? ''}');
  }
}
