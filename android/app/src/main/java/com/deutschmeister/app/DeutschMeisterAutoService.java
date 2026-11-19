package com.deutschmeister.app;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ServiceInfo;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.RectF;
import android.graphics.Typeface;
import android.media.AudioAttributes;
import android.media.AudioFocusRequest;
import android.media.AudioManager;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.media.MediaBrowserCompat;
import android.support.v4.media.MediaDescriptionCompat;
import android.support.v4.media.MediaMetadataCompat;
import android.support.v4.media.session.MediaSessionCompat;
import android.support.v4.media.session.PlaybackStateCompat;
import android.text.Layout;
import android.text.StaticLayout;
import android.text.TextPaint;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;
import androidx.media.MediaBrowserServiceCompat;

import java.util.ArrayList;
import java.util.List;

/**
 * Servicio oficial de integración con Android Auto (MediaBrowserServiceCompat)
 * para DeutschMeister PRO A1 (Fahrmodus / Modo Conducción).
 *
 * Blindado contra TransactionTooLargeException (480x480 px en RGB_565 = ~450 KB)
 * con tolerancia total a fallos try/catch(Throwable) para garantizar visualización
 * inmediata y sin bloqueos en la pantalla del coche.
 */
public class DeutschMeisterAutoService extends MediaBrowserServiceCompat {

    private static final String TAG = "DeutschMeisterAuto";
    private static final String ROOT_ID = "root_id";
    private static final String CHANNEL_ID = "deutschmeister_fahrmodus_playback";
    private static final int NOTIFICATION_ID = 4201;

    // Acciones personalizadas en la pantalla de Android Auto
    public static final String ACTION_REPEAT_SRS = "ACTION_REPEAT_SRS";
    public static final String ACTION_NEXT_WAVE = "ACTION_NEXT_WAVE";

    public static class QueueItemData {
        public final long index;
        public final String title;
        public final String subtitle;

        public QueueItemData(long index, String title, String subtitle) {
            this.index = index;
            this.title = title;
            this.subtitle = subtitle;
        }
    }

    private static volatile DeutschMeisterAutoService sInstance;

    // Caché de último estado recibido desde React
    private static String sLastTitle = "DeutschMeister Fahrmodus";
    private static String sLastSubtitle = "Listo para iniciar en carretera";
    private static String sLastAlbum = "Academia A1-B1";
    private static String sLastPhase = "idle";
    private static String sLastSpanishText = "";
    private static String sLastGermanText = "";
    private static String sLastWaveLabel = "OLA 1/4";
    private static String sLastBlockProgress = "1/48";
    private static int sLastCountdownSec = 0;
    private static boolean sLastIsPlaying = false;
    private static List<QueueItemData> sLastQueueItems = null;

    private MediaSessionCompat mSession;
    private PlaybackStateCompat.Builder mStateBuilder;
    private AudioManager mAudioManager;
    private AudioFocusRequest mAudioFocusRequest;
    private boolean mHasAudioFocus = false;
    private volatile boolean mWasPlayingBeforeFocusLoss = false;
    private boolean mIsForeground = false;
    private String mCachedTeleprompterKey = "";
    private Bitmap mCachedTeleprompterBitmap = null;

    private final AudioManager.OnAudioFocusChangeListener mFocusChangeListener = focusChange -> {
        try {
            switch (focusChange) {
                case AudioManager.AUDIOFOCUS_LOSS_TRANSIENT:
                    Log.d(TAG, "AudioFocus: LOSS_TRANSIENT (ej. indicaciones GPS). Pausando temporalmente.");
                    mWasPlayingBeforeFocusLoss = sLastIsPlaying || mIsForeground;
                    AndroidAutoPlugin.notifyCommandToJs("pause", null);
                    break;

                case AudioManager.AUDIOFOCUS_GAIN:
                    Log.d(TAG, "AudioFocus: GAIN. Reanudación pendiente=" + mWasPlayingBeforeFocusLoss);
                    mHasAudioFocus = true;
                    if (mWasPlayingBeforeFocusLoss) {
                        mWasPlayingBeforeFocusLoss = false;
                        AndroidAutoPlugin.notifyCommandToJs("play", null);
                    }
                    break;

                case AudioManager.AUDIOFOCUS_LOSS_TRANSIENT_CAN_DUCK:
                    Log.d(TAG, "AudioFocus: LOSS_TRANSIENT_CAN_DUCK. Manteniendo sesión activa.");
                    break;

                case AudioManager.AUDIOFOCUS_LOSS:
                    Log.d(TAG, "AudioFocus: LOSS permanente. Pausando y liberando foco.");
                    mWasPlayingBeforeFocusLoss = false;
                    mHasAudioFocus = false;
                    AndroidAutoPlugin.notifyCommandToJs("pause", null);
                    abandonAudioFocus();
                    updateForegroundState(false, sLastTitle, sLastSubtitle);
                    break;

                default:
                    break;
            }
        } catch (Throwable t) {
            Log.w(TAG, "Error procesando cambio de AudioFocus: " + t.getMessage());
        }
    };

    public static DeutschMeisterAutoService getInstance() {
        return sInstance;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        sInstance = this;

        try {
            // 1. Inicializar MediaSessionCompat con soporte de botones, cola y transporte
            mSession = new MediaSessionCompat(this, TAG);
            mSession.setFlags(
                MediaSessionCompat.FLAG_HANDLES_MEDIA_BUTTONS |
                MediaSessionCompat.FLAG_HANDLES_TRANSPORT_CONTROLS |
                MediaSessionCompat.FLAG_HANDLES_QUEUE_COMMANDS
            );

            // 2. Configurar acciones de transporte y botones personalizados
            mStateBuilder = new PlaybackStateCompat.Builder()
                .setActions(
                    PlaybackStateCompat.ACTION_PLAY |
                    PlaybackStateCompat.ACTION_PAUSE |
                    PlaybackStateCompat.ACTION_PLAY_PAUSE |
                    PlaybackStateCompat.ACTION_SKIP_TO_NEXT |
                    PlaybackStateCompat.ACTION_SKIP_TO_PREVIOUS |
                    PlaybackStateCompat.ACTION_STOP |
                    PlaybackStateCompat.ACTION_PLAY_FROM_MEDIA_ID |
                    PlaybackStateCompat.ACTION_SKIP_TO_QUEUE_ITEM
                )
                .addCustomAction(
                    new PlaybackStateCompat.CustomAction.Builder(
                        ACTION_REPEAT_SRS,
                        "Repetir (+SRS)",
                        android.R.drawable.ic_menu_rotate
                    ).build()
                )
                .addCustomAction(
                    new PlaybackStateCompat.CustomAction.Builder(
                        ACTION_NEXT_WAVE,
                        "Siguiente Ola",
                        android.R.drawable.ic_media_ff
                    ).build()
                );

            mSession.setPlaybackState(mStateBuilder.build());
            mSession.setCallback(new MediaSessionCallback());
            setSessionToken(mSession.getSessionToken());
            mSession.setActive(true);

            // Metadatos iniciales livianos (<1 KB, sin Bitmap) para que la negociación inicial
            // con Android Auto sea instantánea y garantice que el icono aparezca de inmediato.
            MediaMetadataCompat.Builder initMeta = new MediaMetadataCompat.Builder()
                .putString(MediaMetadataCompat.METADATA_KEY_TITLE, sLastTitle)
                .putString(MediaMetadataCompat.METADATA_KEY_ARTIST, sLastSubtitle)
                .putString(MediaMetadataCompat.METADATA_KEY_ALBUM, sLastAlbum);
            mSession.setMetadata(initMeta.build());
            mAudioManager = (AudioManager) getSystemService(Context.AUDIO_SERVICE);
            createNotificationChannel();

        } catch (Throwable t) {
            Log.e(TAG, "Error crítico blindado en onCreate: " + t.getMessage(), t);
        }
    }

    @Override
    public void onDestroy() {
        try {
            mWasPlayingBeforeFocusLoss = false;
            abandonAudioFocus();
            stopForegroundCompat(true);
            if (sInstance == this) {
                sInstance = null;
            }
            if (mSession != null) {
                mSession.setActive(false);
                mSession.release();
            }
        } catch (Throwable t) {
            Log.w(TAG, "Error en onDestroy: " + t.getMessage());
        }
        super.onDestroy();
    }

    // ── ÁRBOL DE NAVEGACIÓN TÁCTIL EN LA PANTALLA DEL AUTO ──

    @Nullable
    @Override
    public BrowserRoot onGetRoot(@NonNull String clientPackageName, int clientUid, @Nullable Bundle rootHints) {
        try {
            return new BrowserRoot(ROOT_ID, null);
        } catch (Throwable t) {
            Log.e(TAG, "Error en onGetRoot: " + t.getMessage(), t);
            return new BrowserRoot(ROOT_ID, null);
        }
    }

    @Override
    public void onLoadChildren(@NonNull String parentId, @NonNull Result<List<MediaBrowserCompat.MediaItem>> result) {
        try {
            List<MediaBrowserCompat.MediaItem> items = new ArrayList<>();

            if (ROOT_ID.equals(parentId)) {
                items.add(createPlayableItem("root_resume", "🔖 Retomar Último Bloque Guardado", "Continúa exactamente donde lo dejaste"));
                items.add(createBrowsableItem("folder_a1", "🎓 Nivel A1: Conversación y Base", "der/die/das, verbos clave y regla V2"));
                items.add(createBrowsableItem("folder_a2", "🎓 Nivel A2: Fluidez e Imprevistos", "Atascos, preposiciones y pasado hablado"));
                items.add(createBrowsableItem("folder_b1", "🎓 Nivel B1: Argumentación y Conectores", "Subordinadas, conectores y cortesía"));
                items.add(createBrowsableItem("folder_redemittel", "💬 Frases Comunes (Redemittel)", "Frases nativas diarias, citas y llamadas"));
                items.add(createBrowsableItem("folder_vocab", "⚡ Rutas de Vocabulario Técnico", "Enpal, StVO, Redemittel y Supervivencia"));
            } else if ("folder_a1".equals(parentId)) {
                items.add(createPlayableItem("class__a1_sustantivos_articulos", "A1.1: Sustantivos y Artículos (der/die/das)", "15 sustantivos frecuentes y el cambio a 'den'"));
                items.add(createPlayableItem("class__a1_verbos_mas_usados", "A1.2: Los 12 Verbos Más Usados", "sein, haben, machen, gehen, kommen, brauchen..."));
                items.add(createPlayableItem("class__a1_verbos_modales_conversacion", "A1.3: Los 6 Verbos Modales", "können, müssen, wollen, dürfen, sollen, möchten"));
                items.add(createPlayableItem("class__a1_pronombres_interaccion", "A1.4: Pronombres (mich/mir, dich/dir)", "Casos acusativo y dativo en primera persona"));
                items.add(createPlayableItem("class__a1_v2_baustelle", "A1.5: Regla V2 y Llegada al Cliente", "Estructura verbal y prefijos separables"));
            } else if ("folder_a2".equals(parentId)) {
                items.add(createPlayableItem("class__a2_preocupaciones_imprevistos", "A2.1: Preocupaciones, Atascos y Averías", "Gestión de retrasos, atascos y averías"));
                items.add(createPlayableItem("class__a2_preposiciones_dativo_wechsel", "A2.2: Preposiciones y Dativo (Wo/Wohin)", "mit, zu, bei, nach y preposiciones mixtas"));
                items.add(createPlayableItem("class__a2_perfekt_conversacional", "A2.3: Pasado Hablado (Perfekt + war/hatte)", "Formas conversacionales con haben y sein"));
            } else if ("folder_b1".equals(parentId)) {
                items.add(createPlayableItem("class__b1_conectores_subordinadas", "B1.1: Conectores (weil, dass, obwohl, deshalb)", "Oraciones compuestas y verbo al final"));
                items.add(createPlayableItem("class__b1_cortesia_preguntas_indirectas", "B1.2: Cortesía (Könnten Sie) e Indirectas", "Konjunktiv II y preguntas diplomáticas"));
            } else if ("folder_redemittel".equals(parentId)) {
                items.add(createPlayableItem("class__redemittel_supervivencia_diaria", "Redemittel 1: 15 Frases Nativas Diarias", "Expresiones espontáneas de hablantes nativos"));
                items.add(createPlayableItem("class__redemittel_telefono_citas_compras", "Redemittel 2: Teléfono, Citas y Consultas", "Llamadas profesionales y gestión de citas"));
            } else if ("folder_vocab".equals(parentId)) {
                items.add(createPlayableItem("vocab__enpal", "⚡ Enpal / Baustelle (Kap. 20)", "Vocabulario de montaje solar y obra"));
                items.add(createPlayableItem("vocab__stvo", "🛑 Señales de Tráfico StVO (Kap. 21)", "Normas de circulación vial alemanas"));
                items.add(createPlayableItem("vocab__redemittel22", "💬 Tabla Redemittel A1+ (Kap. 22)", "Catálogo de comunicación cotidiana"));
                items.add(createPlayableItem("vocab__mix", "🔥 Mix 50 Supervivencia", "Batería aleatoria de 50 palabras clave"));
            }

            result.sendResult(items);
        } catch (Throwable t) {
            Log.e(TAG, "Error en onLoadChildren: " + t.getMessage(), t);
            result.sendResult(new ArrayList<>());
        }
    }

    private MediaBrowserCompat.MediaItem createBrowsableItem(String mediaId, String title, String subtitle) {
        MediaDescriptionCompat desc = new MediaDescriptionCompat.Builder()
            .setMediaId(mediaId)
            .setTitle(title)
            .setSubtitle(subtitle)
            .build();
        return new MediaBrowserCompat.MediaItem(desc, MediaBrowserCompat.MediaItem.FLAG_BROWSABLE);
    }

    private MediaBrowserCompat.MediaItem createPlayableItem(String mediaId, String title, String subtitle) {
        MediaDescriptionCompat desc = new MediaDescriptionCompat.Builder()
            .setMediaId(mediaId)
            .setTitle(title)
            .setSubtitle(subtitle)
            .build();
        return new MediaBrowserCompat.MediaItem(desc, MediaBrowserCompat.MediaItem.FLAG_PLAYABLE);
    }

    // ── PUBLICACIÓN DE COLA A PANTALLA ANCHA (LIMITADA A 20 ÍTEMS LIGEROS) ──

    public static void updateSessionQueue(List<QueueItemData> items) {
        try {
            sLastQueueItems = items;
            DeutschMeisterAutoService service = sInstance;
            if (service != null) {
                service.applySessionQueue(items);
            }
        } catch (Throwable t) {
            Log.w(TAG, "Error en updateSessionQueue: " + t.getMessage());
        }
    }

    private void applySessionQueue(List<QueueItemData> items) {
        if (mSession == null || items == null) return;
        try {
            // Máximo 20 elementos para nunca saturar el búfer IPC del Binder
            int limit = Math.min(items.size(), 20);
            List<MediaSessionCompat.QueueItem> queueList = new ArrayList<>(limit);

            for (int i = 0; i < limit; i++) {
                QueueItemData item = items.get(i);
                String safeTitle = item.title != null ? item.title : "Bloque " + (item.index + 1);
                if (safeTitle.length() > 60) safeTitle = safeTitle.substring(0, 57) + "...";

                String safeSub = item.subtitle != null ? item.subtitle : "";
                if (safeSub.length() > 60) safeSub = safeSub.substring(0, 57) + "...";

                MediaDescriptionCompat desc = new MediaDescriptionCompat.Builder()
                    .setMediaId(String.valueOf(item.index))
                    .setTitle(safeTitle)
                    .setSubtitle(safeSub)
                    .build();
                queueList.add(new MediaSessionCompat.QueueItem(desc, item.index));
            }
            mSession.setQueue(queueList);
            mSession.setQueueTitle("📋 Bloques de la Lección (Toca para saltar)");
        } catch (Throwable t) {
            Log.w(TAG, "Error aplicando cola en MediaSession: " + t.getMessage());
        }
    }

    // ── LIMPIEZA DE PREFIJOS EN NATIVO ──

    public static String cleanTextForCar(String raw) {
        if (raw == null) return "";
        try {
            return raw.replaceAll("(?i)^¿\\s*Cómo\\s+(dices|preguntas)(\\s+en\\s+una\\s+conversación|\\s+al\\s+cliente|\\s+a\\s+tu\\s+compañero|\\s+con\\s+educación|\\s+al\\s+teléfono|\\s+a\\s+alguien\\s+de\\s+tú)?\\s*:\\s*", "")
                      .replaceAll("(?i)^En\\s+una\\s+frase\\s*:\\s*", "")
                      .replaceAll("\\?$", "")
                      .trim();
        } catch (Throwable t) {
            return raw.trim();
        }
    }

    // ── HELPER DE DIBUJADO CON AUTO-ESCALADO GIGANTE (StaticLayout) ──

    private static void drawAutoFitText(
        Canvas canvas,
        String text,
        int left,
        int topY,
        int right,
        int bottomY,
        int textColor,
        int maxFontSize,
        int minFontSize,
        boolean isBold
    ) {
        if (text == null) return;
        String clean = text.trim();
        if (clean.isEmpty()) return;
        int width = right - left;
        int targetHeight = bottomY - topY;
        if (width <= 0 || targetHeight <= 0) return;

        try {
            TextPaint paint = new TextPaint(Paint.ANTI_ALIAS_FLAG);
            paint.setColor(textColor);
            paint.setTypeface(Typeface.create(Typeface.DEFAULT, isBold ? Typeface.BOLD : Typeface.NORMAL));

            StaticLayout bestLayout = null;

            for (int size = maxFontSize; size >= minFontSize; size -= 2) {
                paint.setTextSize(size);
                StaticLayout layout = StaticLayout.Builder.obtain(clean, 0, clean.length(), paint, width)
                    .setAlignment(Layout.Alignment.ALIGN_CENTER)
                    .setLineSpacing(3f, 1.1f)
                    .build();

                if (layout.getHeight() <= targetHeight) {
                    bestLayout = layout;
                    break;
                }
            }

            if (bestLayout == null) {
                paint.setTextSize(minFontSize);
                bestLayout = StaticLayout.Builder.obtain(clean, 0, clean.length(), paint, width)
                    .setAlignment(Layout.Alignment.ALIGN_CENTER)
                    .setLineSpacing(2f, 1.05f)
                    .build();
            }

            int layoutHeight = bestLayout.getHeight();
            int startY = topY + Math.max(0, (targetHeight - layoutHeight) / 2);

            canvas.save();
            canvas.translate(left, startY);
            bestLayout.draw(canvas);
            canvas.restore();
        } catch (Throwable t) {
            Log.w(TAG, "drawAutoFitText protegido contra excepción: " + t.getMessage());
        }
    }

    // ── TELEPROMPTER GRÁFICO (BITMAP 256x256 px EN RGB_565 = ~131 KB ÓPTIMO PARA BINDER) ──

    public static Bitmap createTeleprompterBitmap(
        String phase,
        String spanishText,
        String germanText,
        String waveLabel,
        String blockProgress,
        int countdownSec
    ) {
        try {
            final int SIZE = 256;
            final int MARGIN = 10;

            // RGB_565: 2 bytes por píxel (256 x 256 x 2 = ~131 KB, mínimo tráfico Binder IPC)
            Bitmap bitmap = Bitmap.createBitmap(SIZE, SIZE, Bitmap.Config.RGB_565);
            Canvas canvas = new Canvas(bitmap);

            // 1. Fondo negro OLED puro (#000000)
            canvas.drawColor(Color.BLACK);

            // 2. Franja Superior Compacta de Fase y Bloque (Alto: 32px)
            final int HEADER_HEIGHT = 32;
            int headerBgColor;
            int headerTextColor;
            String phaseBadge;

            if (phase != null && (phase.contains("waiting") || phase.contains("countdown"))) {
                headerBgColor = 0xFF451A03; // Ámbar intenso oscuro
                headerTextColor = 0xFFFBBF24; // Ámbar brillante
                phaseBadge = "🎙️ TU TURNO: " + countdownSec + "s";
            } else if (phase != null && (phase.contains("revealing") || phase.contains("solution"))) {
                headerBgColor = 0xFF064E3B; // Verde esmeralda oscuro
                headerTextColor = 0xFF34D399; // Verde esmeralda brillante
                phaseBadge = "✅ SOLUCIÓN CHARON";
            } else if (phase != null && phase.contains("explaining")) {
                headerBgColor = 0xFF3B0764; // Púrpura oscuro
                headerTextColor = 0xFFC084FC; // Púrpura brillante
                phaseBadge = "🎓 REGLA / MICRO-TIP";
            } else if (phase != null && phase.contains("prompting")) {
                headerBgColor = 0xFF083344; // Azul cian oscuro
                headerTextColor = 0xFF22D3EE; // Azul cian brillante
                phaseBadge = "🎧 ESCUCHA EL RETO";
            } else {
                headerBgColor = 0xFF18181B; // Zinc 900
                headerTextColor = 0xFFE4E4E7;
                phaseBadge = "FAHRMODUS OLED";
            }

            Paint headerBgPaint = new Paint();
            headerBgPaint.setColor(headerBgColor);
            headerBgPaint.setStyle(Paint.Style.FILL);
            canvas.drawRect(0, 0, SIZE, HEADER_HEIGHT, headerBgPaint);

            // Línea divisoria bajo la cabecera
            Paint headerLinePaint = new Paint();
            headerLinePaint.setColor(0xFF27272A);
            headerLinePaint.setStrokeWidth(1.5f);
            canvas.drawLine(0, HEADER_HEIGHT, SIZE, HEADER_HEIGHT, headerLinePaint);

            // Texto centrado del encabezado (13px Bold)
            TextPaint headerTextPaint = new TextPaint(Paint.ANTI_ALIAS_FLAG);
            headerTextPaint.setColor(headerTextColor);
            headerTextPaint.setTextSize(13f);
            headerTextPaint.setTypeface(Typeface.create(Typeface.DEFAULT, Typeface.BOLD));
            headerTextPaint.setTextAlign(Paint.Align.CENTER);

            String fullHeader = phaseBadge;
            if (blockProgress != null && !blockProgress.trim().isEmpty()) {
                fullHeader += "  •  " + blockProgress.trim();
            }
            canvas.drawText(fullHeader, SIZE / 2f, 21f, headerTextPaint);

            // 3. Limpieza de textos
            String cleanEs = cleanTextForCar(spanishText);
            String cleanDe = cleanTextForCar(germanText);

            // 4. Distribución del Cuerpo Central (Y = 36 a Y = 248)
            if (phase != null && (phase.contains("revealing") || phase.contains("solution"))) {
                // ── FASE REVEALING: ESPAÑOL ARRIBA (Y = 38..108) Y ALEMÁN GIGANTE ABAJO (Y = 116..246) ──
                drawAutoFitText(
                    canvas,
                    cleanEs,
                    MARGIN,
                    38,
                    SIZE - MARGIN,
                    108,
                    0xFFE4E4E7, // Gris claro (#E4E4E7)
                    20,
                    12,
                    true
                );

                // Línea divisoria sutil
                Paint linePaint = new Paint();
                linePaint.setColor(0xFF27272A);
                linePaint.setStrokeWidth(1.5f);
                canvas.drawLine(MARGIN + 6, 111, SIZE - MARGIN - 6, 111, linePaint);

                // Respuesta en Alemán en Verde Esmeralda Brillante (#34D399) Gigante
                drawAutoFitText(
                    canvas,
                    cleanDe,
                    MARGIN,
                    116,
                    SIZE - MARGIN,
                    246,
                    0xFF34D399,
                    30,
                    14,
                    true
                );

            } else if (phase != null && (phase.contains("waiting") || phase.contains("countdown"))) {
                // ── FASE WAITING: RETO EN BLANCO GIGANTE (Y = 38..174) Y PÍLDORA ÁMBAR (Y = 182..244) ──
                drawAutoFitText(
                    canvas,
                    cleanEs,
                    MARGIN,
                    38,
                    SIZE - MARGIN,
                    174,
                    0xFFFFFFFF, // Blanco puro
                    28,
                    14,
                    true
                );

                // Píldora ámbar con contador gigante
                RectF pillRect = new RectF(MARGIN + 6, 182, SIZE - MARGIN - 6, 244);

                Paint pillBg = new Paint(Paint.ANTI_ALIAS_FLAG);
                pillBg.setColor(0xFF451A03);
                pillBg.setStyle(Paint.Style.FILL);
                canvas.drawRoundRect(pillRect, 12f, 12f, pillBg);

                Paint pillStroke = new Paint(Paint.ANTI_ALIAS_FLAG);
                pillStroke.setColor(0xFFF59E0B);
                pillStroke.setStyle(Paint.Style.STROKE);
                pillStroke.setStrokeWidth(2f);
                canvas.drawRoundRect(pillRect, 12f, 12f, pillStroke);

                TextPaint countPaint = new TextPaint(Paint.ANTI_ALIAS_FLAG);
                countPaint.setColor(0xFFFBBF24);
                countPaint.setTextSize(28f);
                countPaint.setTypeface(Typeface.create(Typeface.DEFAULT, Typeface.BOLD));
                countPaint.setTextAlign(Paint.Align.CENTER);

                String waitText = (countdownSec > 0) ? "🎙️ " + countdownSec + " s" : "🎙️ ¡Habla ahora!";
                canvas.drawText(waitText, SIZE / 2f, 222f, countPaint);

            } else {
                // ── FASE PROMPTING / EXPLAINING / IDLE: TODO EL LIENZO EN GIGANTE (Y = 38..246) ──
                drawAutoFitText(
                    canvas,
                    cleanEs,
                    MARGIN,
                    38,
                    SIZE - MARGIN,
                    246,
                    0xFFF8FAFC, // Blanco brillante (#F8FAFC)
                    28,
                    13,
                    true
                );
            }

            return bitmap;
        } catch (Throwable t) {
            Log.e(TAG, "Error generando Bitmap del Teleprompter: " + t.getMessage(), t);
            return null; // Fallback seguro sin colapsar el servicio
        }
    }

    // ── ACTUALIZACIÓN DE ESTADO DESDE REACT ──

    public static void updateSessionState(
        String title,
        String subtitle,
        String album,
        String phase,
        String spanishText,
        String germanText,
        String waveLabel,
        String blockProgress,
        int countdownSec,
        boolean isPlaying
    ) {
        try {
            sLastTitle = title != null ? title : sLastTitle;
            sLastSubtitle = subtitle != null ? subtitle : sLastSubtitle;
            sLastAlbum = album != null ? album : sLastAlbum;
            sLastPhase = phase != null ? phase : sLastPhase;
            sLastSpanishText = spanishText != null ? spanishText : sLastSpanishText;
            sLastGermanText = germanText != null ? germanText : sLastGermanText;
            sLastWaveLabel = waveLabel != null ? waveLabel : sLastWaveLabel;
            sLastBlockProgress = blockProgress != null ? blockProgress : sLastBlockProgress;
            sLastCountdownSec = countdownSec;
            sLastIsPlaying = isPlaying;

            DeutschMeisterAutoService service = sInstance;
            if (service != null) {
                service.applySessionState(
                    sLastTitle,
                    sLastSubtitle,
                    sLastAlbum,
                    sLastPhase,
                    sLastSpanishText,
                    sLastGermanText,
                    sLastWaveLabel,
                    sLastBlockProgress,
                    sLastCountdownSec,
                    sLastIsPlaying
                );
            }
        } catch (Throwable t) {
            Log.w(TAG, "Error en updateSessionState: " + t.getMessage());
        }
    }

    private void applySessionState(
        String title,
        String subtitle,
        String album,
        String phase,
        String spanishText,
        String germanText,
        String waveLabel,
        String blockProgress,
        int countdownSec,
        boolean isPlaying
    ) {
        if (mSession == null) return;

        try {
            // Generar o reutilizar Teleprompter cacheado de 256x256 RGB_565 (~131 KB, seguro para Binder IPC)
            String cacheKey = (phase != null ? phase : "")
                + "|" + (title != null ? title : "")
                + "|" + (subtitle != null ? subtitle : "")
                + "|" + (isPlaying ? "1" : "0");
            Bitmap teleprompterBitmap;
            if (cacheKey.equals(mCachedTeleprompterKey) && mCachedTeleprompterBitmap != null && !mCachedTeleprompterBitmap.isRecycled()) {
                teleprompterBitmap = mCachedTeleprompterBitmap;
            } else {
                teleprompterBitmap = createTeleprompterBitmap(
                    phase,
                    spanishText,
                    germanText,
                    waveLabel,
                    blockProgress,
                    countdownSec
                );
                if (teleprompterBitmap != null) {
                    mCachedTeleprompterKey = cacheKey;
                    mCachedTeleprompterBitmap = teleprompterBitmap;
                }
            }

            // Actualizar Metadatos (title y subtitle particionados para 2 líneas completas)
            MediaMetadataCompat.Builder metaBuilder = new MediaMetadataCompat.Builder()
                .putString(MediaMetadataCompat.METADATA_KEY_TITLE, title)
                .putString(MediaMetadataCompat.METADATA_KEY_ARTIST, subtitle)
                .putString(MediaMetadataCompat.METADATA_KEY_ALBUM, album);

            if (teleprompterBitmap != null) {
                metaBuilder.putBitmap(MediaMetadataCompat.METADATA_KEY_ALBUM_ART, teleprompterBitmap);
            }

            mSession.setMetadata(metaBuilder.build());

            // Actualizar PlaybackState
            int state = isPlaying ? PlaybackStateCompat.STATE_PLAYING : PlaybackStateCompat.STATE_PAUSED;
            mStateBuilder.setState(state, PlaybackStateCompat.PLAYBACK_POSITION_UNKNOWN, 1.0f);
            mSession.setPlaybackState(mStateBuilder.build());

            // Sincronizar AudioFocus y Foreground Service (mediaPlayback)
            if (isPlaying) {
                mWasPlayingBeforeFocusLoss = false;
                requestAudioFocus();
                updateForegroundState(true, title, subtitle);
            } else {
                // Solo liberar el foco si la pausa NO proviene de AUDIOFOCUS_LOSS_TRANSIENT,
                // para seguir recibiendo AUDIOFOCUS_GAIN al finalizar la indicación GPS.
                if (!mWasPlayingBeforeFocusLoss) {
                    abandonAudioFocus();
                }
                updateForegroundState(false, title, subtitle);
            }

        } catch (Throwable t) {
            Log.e(TAG, "Error aplicando estado de sesión en auto: " + t.getMessage(), t);
        }
    }

    // ── GESTIÓN DE AUDIO FOCUS Y FOREGROUND SERVICE ──

    private void createNotificationChannel() {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                NotificationManager manager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
                if (manager != null && manager.getNotificationChannel(CHANNEL_ID) == null) {
                    NotificationChannel channel = new NotificationChannel(
                        CHANNEL_ID,
                        "Fahrmodus · Modo Conducción",
                        NotificationManager.IMPORTANCE_LOW
                    );
                    channel.setDescription("Reproducción continua de DeutschMeister PRO en coche y segundo plano");
                    channel.setShowBadge(false);
                    manager.createNotificationChannel(channel);
                }
            }
        } catch (Throwable t) {
            Log.w(TAG, "Error creando canal de notificación: " + t.getMessage());
        }
    }

    private void requestAudioFocus() {
        try {
            if (mAudioManager == null) {
                mAudioManager = (AudioManager) getSystemService(Context.AUDIO_SERVICE);
            }
            if (mAudioManager == null || mHasAudioFocus) return;

            int result;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                if (mAudioFocusRequest == null) {
                    AudioAttributes attrs = new AudioAttributes.Builder()
                        .setUsage(AudioAttributes.USAGE_MEDIA)
                        .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
                        .build();
                    mAudioFocusRequest = new AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN)
                        .setAudioAttributes(attrs)
                        .setAcceptsDelayedFocusGain(true)
                        .setOnAudioFocusChangeListener(mFocusChangeListener)
                        .build();
                }
                result = mAudioManager.requestAudioFocus(mAudioFocusRequest);
            } else {
                result = mAudioManager.requestAudioFocus(
                    mFocusChangeListener,
                    AudioManager.STREAM_MUSIC,
                    AudioManager.AUDIOFOCUS_GAIN
                );
            }
            mHasAudioFocus = (result == AudioManager.AUDIOFOCUS_REQUEST_GRANTED);
        } catch (Throwable t) {
            Log.w(TAG, "Error solicitando AudioFocus: " + t.getMessage());
        }
    }

    private void abandonAudioFocus() {
        try {
            if (mAudioManager == null) return;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                if (mAudioFocusRequest != null) {
                    mAudioManager.abandonAudioFocusRequest(mAudioFocusRequest);
                }
            } else {
                mAudioManager.abandonAudioFocus(mFocusChangeListener);
            }
            mHasAudioFocus = false;
        } catch (Throwable t) {
            Log.w(TAG, "Error liberando AudioFocus: " + t.getMessage());
        }
    }

    private void updateForegroundState(boolean isPlaying, String title, String subtitle) {
        try {
            if (isPlaying) {
                createNotificationChannel();
                Intent openAppIntent = new Intent(this, MainActivity.class);
                openAppIntent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP | Intent.FLAG_ACTIVITY_CLEAR_TOP);
                int pendingFlags = PendingIntent.FLAG_UPDATE_CURRENT;
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                    pendingFlags |= PendingIntent.FLAG_IMMUTABLE;
                }
                PendingIntent contentIntent = PendingIntent.getActivity(this, 0, openAppIntent, pendingFlags);

                int smallIcon = getApplicationInfo().icon != 0
                    ? getApplicationInfo().icon
                    : android.R.drawable.ic_media_play;

                NotificationCompat.Builder builder = new NotificationCompat.Builder(this, CHANNEL_ID)
                    .setContentTitle(title != null && !title.isEmpty() ? title : "DeutschMeister Fahrmodus")
                    .setContentText(subtitle != null && !subtitle.isEmpty() ? subtitle : "Modo conducción activo")
                    .setSmallIcon(smallIcon)
                    .setContentIntent(contentIntent)
                    .setOngoing(true)
                    .setOnlyAlertOnce(true)
                    .setVisibility(NotificationCompat.VISIBILITY_PUBLIC);

                if (mSession != null) {
                    builder.setStyle(
                        new androidx.media.app.NotificationCompat.MediaStyle()
                            .setMediaSession(mSession.getSessionToken())
                    );
                }

                Notification notification = builder.build();
                if (mIsForeground) {
                    NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
                    if (notificationManager != null) {
                        notificationManager.notify(NOTIFICATION_ID, notification);
                    }
                } else {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                        startForeground(
                            NOTIFICATION_ID,
                            notification,
                            ServiceInfo.FOREGROUND_SERVICE_TYPE_MEDIA_PLAYBACK
                        );
                    } else {
                        startForeground(NOTIFICATION_ID, notification);
                    }
                    mIsForeground = true;
                }
            } else if (mIsForeground) {
                stopForegroundCompat(false);
            }
        } catch (Throwable t) {
            Log.w(TAG, "Error actualizando ForegroundService: " + t.getMessage());
        }
    }

    private void stopForegroundCompat(boolean removeNotification) {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                stopForeground(removeNotification ? STOP_FOREGROUND_REMOVE : STOP_FOREGROUND_DETACH);
            } else {
                stopForeground(removeNotification);
            }
            mIsForeground = false;
        } catch (Throwable t) {
            Log.w(TAG, "Error deteniendo ForegroundService: " + t.getMessage());
        }
    }

    // ── CALLBACK DE CONTROLES Y CLICKS DESDE LA PANTALLA DEL AUTO ──

    private class MediaSessionCallback extends MediaSessionCompat.Callback {

        private void dispatchCommand(String action, String payload) {
            try {
                Log.d(TAG, "Despachando comando de Android Auto: " + action + " (Payload: " + payload + ")");

                // 1. Notificar en tiempo real al frontend vía Plugin de Capacitor
                boolean hadActiveBridge = AndroidAutoPlugin.hasActiveBridge();
                AndroidAutoPlugin.notifyCommandToJs(action, payload);

                // 2. Solo despertar MainActivity si el puente JS aún no está activo
                if (!hadActiveBridge) {
                    Intent intent = new Intent(DeutschMeisterAutoService.this, MainActivity.class);
                    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);
                    intent.putExtra("autoCommand", action);
                    if (payload != null) {
                        intent.putExtra("autoPayload", payload);
                    }
                    startActivity(intent);
                }
            } catch (Throwable t) {
                Log.w(TAG, "Error despachando comando a MainActivity: " + t.getMessage());
            }
        }

        @Override
        public void onPlay() {
            mWasPlayingBeforeFocusLoss = false;
            requestAudioFocus();
            dispatchCommand("play", null);
        }

        @Override
        public void onPause() {
            mWasPlayingBeforeFocusLoss = false;
            dispatchCommand("pause", null);
        }

        @Override
        public void onSkipToNext() {
            dispatchCommand("next", null);
        }

        @Override
        public void onSkipToPrevious() {
            dispatchCommand("previous", null);
        }

        @Override
        public void onPlayFromMediaId(String mediaId, Bundle extras) {
            dispatchCommand("playMediaId", mediaId);
        }

        @Override
        public void onSkipToQueueItem(long id) {
            dispatchCommand("jumpToIndex", String.valueOf(id));
        }

        @Override
        public void onCustomAction(String action, Bundle extras) {
            try {
                if (ACTION_REPEAT_SRS.equals(action)) {
                    dispatchCommand("repeatSrs", null);
                } else if (ACTION_NEXT_WAVE.equals(action)) {
                    dispatchCommand("nextWave", null);
                } else {
                    dispatchCommand(action, null);
                }
            } catch (Throwable t) {
                Log.w(TAG, "Error en onCustomAction: " + t.getMessage());
            }
        }
    }
}
