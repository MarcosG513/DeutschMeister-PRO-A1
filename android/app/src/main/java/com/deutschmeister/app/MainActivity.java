package com.deutschmeister.app;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(AndroidAutoPlugin.class);
        super.onCreate(savedInstanceState);

        WindowCompat.setDecorFitsSystemWindows(getWindow(), true);
        View rootView = findViewById(android.R.id.content);
        if (rootView != null) {
            rootView.setBackgroundColor(Color.parseColor("#0F172A"));
            ViewCompat.setOnApplyWindowInsetsListener(rootView, (v, windowInsets) -> {
                Insets insets = windowInsets.getInsets(WindowInsetsCompat.Type.systemBars());
                v.setPadding(insets.left, insets.top, insets.right, insets.bottom);
                return WindowInsetsCompat.CONSUMED;
            });
            ViewCompat.requestApplyInsets(rootView);
        }

        handleAutoIntent(getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        handleAutoIntent(intent);
    }

    private void handleAutoIntent(Intent intent) {
        if (intent != null && intent.hasExtra("autoCommand")) {
            String command = intent.getStringExtra("autoCommand");
            String payload = intent.getStringExtra("autoPayload");
            AndroidAutoPlugin.notifyCommandToJs(command, payload);
        }
    }
}
