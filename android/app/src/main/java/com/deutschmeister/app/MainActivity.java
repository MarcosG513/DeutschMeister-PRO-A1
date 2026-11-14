package com.deutschmeister.app;

import android.content.Intent;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(AndroidAutoPlugin.class);
        super.onCreate(savedInstanceState);
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
