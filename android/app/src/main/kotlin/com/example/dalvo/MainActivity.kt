package com.example.dalvo

import android.Manifest
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import androidx.core.app.ActivityCompat
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import io.flutter.embedding.android.FlutterFragmentActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel

class MainActivity : FlutterFragmentActivity() {
    private val channelName = "dalvo/notifications"
    private val notificationChannelId = "dalvo_presupuestos"
    private val budgetNotificationId = 26001
    private var notificationsChannel: MethodChannel? = null

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        notificationsChannel = MethodChannel(flutterEngine.dartExecutor.binaryMessenger, channelName)
        notificationsChannel!!.setMethodCallHandler { call, result ->
            when (call.method) {
                "initialize" -> {
                    createNotificationChannel()
                    requestNotificationPermission()
                    result.success(readBudgetId(intent))
                }
                "setBudgetBadge" -> {
                    val count = call.argument<Int>("count") ?: 0
                    if (count <= 0) {
                        NotificationManagerCompat.from(this).cancel(budgetNotificationId)
                    }
                    result.success(null)
                }
                "showNewBudget" -> {
                    val count = call.argument<Int>("count") ?: 1
                    val budgetId = call.argument<Int>("budgetId")
                    showBudgetNotification(count, budgetId)
                    result.success(null)
                }
                else -> result.notImplemented()
            }
        }
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        setIntent(intent)
        val budgetId = readBudgetId(intent) ?: return
        notificationsChannel?.invokeMethod("notificationTap", mapOf("budgetId" to budgetId))
    }

    private fun readBudgetId(intent: Intent?): Int? {
        val id = intent?.getIntExtra("dalvo_budget_id", 0) ?: 0
        return id.takeIf { it > 0 }
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                notificationChannelId,
                "Presupuestos",
                NotificationManager.IMPORTANCE_HIGH
            ).apply {
                description = "Avisos de nuevos presupuestos pendientes de aprobación"
                setShowBadge(true)
            }
            getSystemService(NotificationManager::class.java).createNotificationChannel(channel)
        }
    }

    private fun requestNotificationPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU &&
            ActivityCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED
        ) {
            ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.POST_NOTIFICATIONS), 26001)
        }
    }

    private fun showBudgetNotification(count: Int, budgetId: Int? = null) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU &&
            ActivityCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED
        ) return

        val intent = packageManager.getLaunchIntentForPackage(packageName) ?: Intent(this, MainActivity::class.java)
        intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP
        if (budgetId != null && budgetId > 0) intent.putExtra("dalvo_budget_id", budgetId)
        val pendingIntent = PendingIntent.getActivity(
            this,
            budgetId ?: 0,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        val text = if (count == 1) "Tienes un nuevo presupuesto pendiente de aprobación." else "Tienes $count nuevos presupuestos pendientes de aprobación."
        val notification = NotificationCompat.Builder(this, notificationChannelId)
            .setSmallIcon(applicationInfo.icon)
            .setContentTitle("Dalvo")
            .setContentText(text)
            .setStyle(NotificationCompat.BigTextStyle().bigText(text))
            .setContentIntent(pendingIntent)
            .setAutoCancel(true)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setNumber(count)
            .build()
        NotificationManagerCompat.from(this).notify(budgetNotificationId, notification)
    }

    private fun showBudgetSummary(count: Int) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU &&
            ActivityCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED
        ) return
        val intent = packageManager.getLaunchIntentForPackage(packageName) ?: Intent(this, MainActivity::class.java)
        val pendingIntent = PendingIntent.getActivity(
            this, 0, intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        )
        val notification = NotificationCompat.Builder(this, notificationChannelId)
            .setSmallIcon(applicationInfo.icon)
            .setContentTitle("Presupuestos pendientes")
            .setContentText("Tienes $count pendiente${if (count == 1) "" else "s"} de aprobación.")
            .setContentIntent(pendingIntent)
            .setOnlyAlertOnce(true)
            .setSilent(true)
            .setAutoCancel(false)
            .setNumber(count)
            .build()
        NotificationManagerCompat.from(this).notify(budgetNotificationId, notification)
    }
}
