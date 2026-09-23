import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:listen_sharing_intent/listen_sharing_intent.dart';

class SharedDocumentService extends ChangeNotifier {
  SharedDocumentService._();
  static final SharedDocumentService instance = SharedDocumentService._();

  StreamSubscription<List<SharedMediaFile>>? _subscription;
  final List<String> _pendingPaths = [];
  bool _started = false;

  List<String> get pendingPaths => List.unmodifiable(_pendingPaths);
  bool get hasPending => _pendingPaths.isNotEmpty;

  bool get _supportsShareIntents =>
      !kIsWeb &&
      (defaultTargetPlatform == TargetPlatform.android ||
          defaultTargetPlatform == TargetPlatform.iOS);

  Future<void> initialize() async {
    if (_started) return;
    _started = true;
    if (!_supportsShareIntents) return;
    _subscription = ReceiveSharingIntent.instance.getMediaStream().listen(_receive);
    final initial = await ReceiveSharingIntent.instance.getInitialMedia();
    _receive(initial);
  }

  void _receive(List<SharedMediaFile> files) {
    var changed = false;
    for (final file in files) {
      final path = file.path.trim();
      if (path.isNotEmpty && !_pendingPaths.contains(path)) {
        _pendingPaths.add(path);
        changed = true;
      }
    }
    if (changed) notifyListeners();
  }

  List<String> takePending() {
    final result = List<String>.from(_pendingPaths);
    _pendingPaths.clear();
    if (_supportsShareIntents) ReceiveSharingIntent.instance.reset();
    notifyListeners();
    return result;
  }

  void clear() {
    _pendingPaths.clear();
    if (_supportsShareIntents) ReceiveSharingIntent.instance.reset();
    notifyListeners();
  }

  @override
  void dispose() {
    _subscription?.cancel();
    super.dispose();
  }
}
