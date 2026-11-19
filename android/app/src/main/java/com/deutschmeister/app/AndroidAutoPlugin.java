package com.deutschmeister.app;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

/**
 * Plugin de Capacitor para enlazar el Frontend (React 19) con el servicio
 * nativo de Android Auto (DeutschMeisterAutoService).
 */
@CapacitorPlugin(name = "AndroidAuto")
public class AndroidAutoPlugin extends Plugin {

    private static volatile AndroidAutoPlugin sInstance;
    private static volatile String sPendingAction = null;
    private static volatile String sPendingPayload = null;

    @Override
    public void load() {
        super.load();
        sInstance = this;

        // Si llegó un comando antes de que React cargara, lo despachamos al inicializar
        if (sPendingAction != null) {
            JSObject ret = new JSObject();
            ret.put("action", sPendingAction);
            ret.put("payload", sPendingPayload);
            notifyListeners("androidAutoCommand", ret, true);
        }
    }

    @Override
    protected void handleOnDestroy() {
        if (sInstance == this) {
            sInstance = null;
        }
        super.handleOnDestroy();
    }

    /**
     * Actualiza los datos que se visualizan en la pantalla del vehículo (Teleprompter y Metadatos)
     */
    @PluginMethod
    public void updateCarScreen(PluginCall call) {
        String title = call.getString("title", "DeutschMeister Fahrmodus");
        String subtitle = call.getString("subtitle", "");
        String album = call.getString("album", "Academia A1-B1");
        String phase = call.getString("phase", "idle");
        String spanishText = call.getString("spanishText", "");
        String germanText = call.getString("germanText", "");
        String waveLabel = call.getString("waveLabel", "OLA 1/4");
        String blockProgress = call.getString("blockProgress", "");
        int countdownSec = call.getInt("countdownSec", 0);
        boolean isPlaying = Boolean.TRUE.equals(call.getBoolean("isPlaying", false));

        DeutschMeisterAutoService.updateSessionState(
            title,
            subtitle,
            album,
            phase,
            spanishText,
            germanText,
            waveLabel,
            blockProgress,
            countdownSec,
            isPlaying
        );

        call.resolve();
    }

    /**
     * Publica la lista de bloques en la cola de MediaSession para visualización a pantalla ancha
     */
    @PluginMethod
    public void updateSessionQueue(PluginCall call) {
        JSArray itemsArray = call.getArray("items");
        if (itemsArray != null) {
            List<DeutschMeisterAutoService.QueueItemData> list = new ArrayList<>();
            for (int i = 0; i < itemsArray.length(); i++) {
                try {
                    JSONObject obj = itemsArray.getJSONObject(i);
                    long index = obj.optLong("index", i);
                    String title = obj.optString("title", "Bloque " + (i + 1));
                    String subtitle = obj.optString("subtitle", "");
                    list.add(new DeutschMeisterAutoService.QueueItemData(index, title, subtitle));
                } catch (Exception ignored) {}
            }
            DeutschMeisterAutoService.updateSessionQueue(list);
        }
        call.resolve();
    }

    /**
     * Consulta comandos pendientes que hayan despertado la aplicación desde Android Auto
     */
    @PluginMethod
    public void getPendingAutoCommand(PluginCall call) {
        JSObject ret = new JSObject();
        ret.put("action", sPendingAction);
        ret.put("payload", sPendingPayload);

        // Limpiar tras entrega
        sPendingAction = null;
        sPendingPayload = null;

        call.resolve(ret);
    }

    public static boolean hasActiveBridge() {
        return sInstance != null;
    }

    /**
     * Notifica un comando originado en la pantalla del auto o volante hacia React
     */
    public static void notifyCommandToJs(String action, String payload) {
        AndroidAutoPlugin plugin = sInstance;
        if (plugin != null) {
            sPendingAction = null;
            sPendingPayload = null;
            JSObject ret = new JSObject();
            ret.put("action", action);
            ret.put("payload", payload);
            plugin.notifyListeners("androidAutoCommand", ret, false);
        } else {
            sPendingAction = action;
            sPendingPayload = payload;
        }
    }
}
