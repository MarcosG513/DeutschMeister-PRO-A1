import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Capacitor } from "@capacitor/core";
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Car,
  X,
  Volume2,
  Mic,
  CheckCircle2,
  Sliders,
  ShieldAlert,
  Wrench,
  BookOpen,
  Flame,
  GraduationCap,
  MessageCircle,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Zap,
  Route,
  ListOrdered,
  Bookmark
} from "lucide-react";
import { useDrivingModePlayer } from "../hooks/useDrivingModePlayer";
import { splitGermanTitle } from "../utils/helpers";
import { drivingAcademyClasses } from "../data/drivingAcademyCurriculum";
import { buildHighwaySessionQueue } from "../utils/highwayWorkoutBuilder";
import {
  buildSessionStorageKey,
  saveDrivingCheckpoint,
  getDrivingCheckpoint,
  getClassCheckpointSummary,
  clearDrivingCheckpoint
} from "../utils/drivingProgressStorage";
import {
  syncAndroidAutoScreen,
  syncAndroidAutoQueue,
  subscribeToAndroidAutoCommands,
  cleanTextForCarScreen
} from "../services/androidAutoBridge";

export default function DrivingMode({
  chapters = [],
  activeChapterId,
  onExit,
  onWordStudied,
  pendingAutoCommand = null,
  onClearAutoCommand = null
}) {
  // Pestaña principal de configuración: 'academy' (A1, A2, B1, REDEMITTEL) o 'vocab' (Rutas de vocabulario)
  const [modeCategory, setModeCategory] = useState("academy"); // 'academy' | 'vocab'

  // Configuración Academia A1-B1 & REDEMITTEL
  const [selectedLevel, setSelectedLevel] = useState("A1"); // 'A1' | 'A2' | 'B1' | 'REDEMITTEL'
  const [selectedClassIds, setSelectedClassIds] = useState(["a1_sustantivos_articulos"]);
  const [workoutMode, setWorkoutMode] = useState("highway"); // "highway" (4 Olas) | "standard" (1 Ola)

  // Configuración Rutas Vocabulario
  const [selectedRoute, setSelectedRoute] = useState("enpal"); // 'enpal' | 'stvo' | 'redemittel' | 'active' | 'mix'
  const [includeSentences, setIncludeSentences] = useState(true);
  const [includeTips, setIncludeTips] = useState(true);

  // Visibilidad MUTUAMENTE EXCLUYENTE: 'hud' (Pantalla activa OLED) | 'routes' (Selector Rutas/Clases) | 'blocks' (Lista de Bloques/Olas)
  const [activePanel, setActivePanel] = useState("hud");
  const [checkpointVersion, setCheckpointVersion] = useState(0);

  // Clases filtradas por el nivel seleccionado en la pestaña
  const levelClasses = useMemo(() => {
    return drivingAcademyClasses.filter((c) => c.level === selectedLevel);
  }, [selectedLevel]);

  // Selección múltiple inteligente de hasta 2 clases para el viaje
  const toggleClassSelection = (classId) => {
    setSelectedClassIds((prev) => {
      if (prev.includes(classId)) {
        return prev.length > 1 ? prev.filter((id) => id !== classId) : prev;
      }
      if (prev.length >= 2) {
        return [prev[1], classId]; // Mantiene máximo 2 lecciones activas para el viaje
      }
      return [...prev, classId];
    });
  };

  // Clases seleccionadas resueltas
  const selectedAcademyClasses = useMemo(() => {
    const list = drivingAcademyClasses.filter((c) => selectedClassIds.includes(c.id));
    return list.length > 0 ? list : [drivingAcademyClasses[0]];
  }, [selectedClassIds]);

  // Clave canónica de sesión para persistencia
  const sessionStorageKey = useMemo(() => {
    return buildSessionStorageKey({
      tabMode: modeCategory,
      workoutMode,
      selectedClassIds,
      selectedRoute
    });
  }, [modeCategory, workoutMode, selectedClassIds, selectedRoute]);

  // Checkpoint guardado de la sesión
  const savedCheckpoint = useMemo(() => {
    return getDrivingCheckpoint(sessionStorageKey);
  }, [sessionStorageKey, checkpointVersion]);

  // Etiqueta legible de la ruta o clase activa
  const activeHeaderLabel = useMemo(() => {
    if (modeCategory === "academy") {
      if (selectedAcademyClasses.length === 1) {
        return `${selectedAcademyClasses[0].level} • ${selectedAcademyClasses[0].title}`;
      }
      return `${selectedAcademyClasses.length} Clases (${selectedAcademyClasses.map((c) => c.level).join(" + ")}) • ${selectedAcademyClasses.map((c) => c.title.split(":")[0]).join(" + ")}`;
    }
    switch (selectedRoute) {
      case "enpal":
        return "Enpal / Baustelle (Kap. 20)";
      case "stvo":
        return "Señales StVO (Kap. 21)";
      case "redemittel":
        return "Redemittel & Alltag (Kap. 22)";
      case "mix":
        return "Mix 50 Supervivencia";
      default: {
        const found = chapters.find((c) => Number(c.id) === Number(activeChapterId));
        return found?.title || "Capítulo Actual";
      }
    }
  }, [modeCategory, selectedAcademyClasses, selectedRoute, chapters, activeChapterId]);

  // Cola activa según la categoría y modo elegidos
  const activeQueue = useMemo(() => {
    if (modeCategory === "academy") {
      const generated = buildHighwaySessionQueue(selectedAcademyClasses, workoutMode);
      return generated.map((step, idx) => ({
        ...step,
        id: step.queueKey || `step_${idx}`,
        chapter: step.classTitle || "Academia Fahrmodus",
        level: step.level || "A1",
        de: step.targetDe || step.de,
        es: step.promptEs || step.es
      }));
    }

    let rawWords = [];
    if (selectedRoute === "enpal") {
      const cap20 = chapters.find((c) => Number(c.id) === 20);
      rawWords = cap20 ? (cap20.words || []).map((w) => ({ ...w, chapter: cap20.title })) : [];
    } else if (selectedRoute === "stvo") {
      const cap21 = chapters.find((c) => Number(c.id) === 21);
      rawWords = cap21 ? (cap21.words || []).map((w) => ({ ...w, chapter: cap21.title })) : [];
    } else if (selectedRoute === "redemittel") {
      const cap22 = chapters.find((c) => Number(c.id) === 22);
      rawWords = cap22 ? (cap22.words || []).map((w) => ({ ...w, chapter: cap22.title })) : [];
    } else if (selectedRoute === "mix") {
      const all = chapters.flatMap((c) =>
        (c.words || []).map((w) => ({ ...w, chapter: c.title }))
      );
      rawWords = [...all].sort(() => Math.random() - 0.5).slice(0, 50);
    } else {
      const currentCap =
        chapters.find((c) => Number(c.id) === Number(activeChapterId)) || chapters[0];
      rawWords = currentCap
        ? (currentCap.words || []).map((w) => ({ ...w, chapter: currentCap.title }))
        : [];
    }

    return rawWords.filter((w) => w && (w.de || w.targetDe) && (w.es || w.promptEs));
  }, [modeCategory, selectedAcademyClasses, workoutMode, selectedRoute, chapters, activeChapterId]);

  // Manejador de persistencia de índice
  const handleIndexChange = useCallback(
    (idx, item) => {
      saveDrivingCheckpoint({
        sessionKey: sessionStorageKey,
        classIds: selectedClassIds,
        workoutMode,
        currentIndex: idx,
        totalItems: activeQueue.length,
        currentItem: item
      });
      setCheckpointVersion((v) => v + 1);
    },
    [sessionStorageKey, selectedClassIds, workoutMode, activeQueue.length]
  );

  const {
    currentItem,
    currentIndex,
    totalItems,
    playerState,
    isPlaying,
    countdownSec,
    startOrResume,
    pauseSession,
    skipToNext,
    repeatAndRequeueCurrent,
    jumpToIndex
  } = useDrivingModePlayer({
    initialQueue: activeQueue,
    initialIndex: savedCheckpoint?.currentIndex || 0,
    sessionKey: sessionStorageKey,
    includeSentences,
    includeTips,
    onWordStudied,
    onIndexChange: handleIndexChange
  });

  const autoPlayTargetRef = useRef(false);

  // Procesador central de comandos de Android Auto
  const executeAutoCommand = useCallback((action, payload) => {
    if (!action) return;
    console.log(`[DrivingMode AutoCommand] Ejecutando: ${action}`, payload);

    switch (action) {
      case "play":
        setActivePanel("hud");
        startOrResume();
        break;

      case "pause":
        pauseSession();
        break;

      case "next":
        skipToNext();
        break;

      case "previous":
      case "repeatSrs":
      case "ACTION_REPEAT_SRS":
        repeatAndRequeueCurrent();
        break;

      case "jumpToIndex":
        if (payload !== null && payload !== undefined) {
          setActivePanel("hud");
          jumpToIndex(Number(payload), true);
        }
        break;

      case "nextWave":
      case "ACTION_NEXT_WAVE": {
        const curWave = currentItem?.wave || 1;
        const targetWave = curWave < 4 ? curWave + 1 : 1;
        let targetIdx = activeQueue.findIndex((item, idx) => idx > currentIndex && item.wave === targetWave);
        if (targetIdx === -1) {
          targetIdx = activeQueue.findIndex((item) => item.wave === targetWave);
        }
        if (targetIdx !== -1) {
          jumpToIndex(targetIdx, true);
        } else {
          skipToNext();
        }
        break;
      }

      case "playMediaId": {
        if (!payload) return;

        if (payload === "root_resume") {
          setActivePanel("hud");
          const resumeIdx = savedCheckpoint?.currentIndex || 0;
          jumpToIndex(resumeIdx, true);
          return;
        }

        if (payload.startsWith("class__")) {
          const classId = payload.replace("class__", "");
          const targetClass = drivingAcademyClasses.find((c) => c.id === classId);
          if (targetClass) {
            setModeCategory("academy");
            setSelectedLevel(targetClass.level);
            setSelectedClassIds([targetClass.id]);
            setActivePanel("hud");
            autoPlayTargetRef.current = true;
          }
          return;
        }

        if (payload.startsWith("vocab__")) {
          const routeKey = payload.replace("vocab__", "");
          setModeCategory("vocab");
          if (routeKey === "enpal") setSelectedRoute("enpal");
          else if (routeKey === "stvo") setSelectedRoute("stvo");
          else if (routeKey === "redemittel22") setSelectedRoute("redemittel");
          else if (routeKey === "mix") setSelectedRoute("mix");
          setActivePanel("hud");
          autoPlayTargetRef.current = true;
          return;
        }
        break;
      }

      default:
        console.warn(`[DrivingMode] Comando no reconocido: ${action}`);
        break;
    }
  }, [
    startOrResume,
    pauseSession,
    skipToNext,
    repeatAndRequeueCurrent,
    jumpToIndex,
    currentItem,
    activeQueue,
    currentIndex,
    savedCheckpoint
  ]);

  // Si se cambió de clase o ruta vía Android Auto, arrancar reproducción al estar lista la cola
  useEffect(() => {
    if (autoPlayTargetRef.current && activeQueue.length > 0) {
      autoPlayTargetRef.current = false;
      const chk = getDrivingCheckpoint(sessionStorageKey);
      const startIdx = chk?.currentIndex || 0;
      jumpToIndex(startIdx, true);
    }
  }, [activeQueue, sessionStorageKey, jumpToIndex]);

  // Ejecución de comandos pendientes recibidos al montar desde App.jsx
  useEffect(() => {
    if (pendingAutoCommand?.action) {
      executeAutoCommand(pendingAutoCommand.action, pendingAutoCommand.payload);
      onClearAutoCommand?.();
    }
  }, [pendingAutoCommand, executeAutoCommand, onClearAutoCommand]);

  // Suscripción directa en tiempo real mientras el componente está montado
  useEffect(() => {
    const unsubscribe = subscribeToAndroidAutoCommands((action, payload) => {
      executeAutoCommand(action, payload);
    });
    return () => unsubscribe();
  }, [executeAutoCommand]);

  // Publicar la cola de la lección actual en Android Auto para navegación a pantalla ancha
  useEffect(() => {
    if (activeQueue.length > 0) {
      syncAndroidAutoQueue(activeQueue);
    }
  }, [activeQueue]);

  // Sincronización continua de pantalla con Android Auto (Teleprompter en Carátula y Metadatos 2 Líneas)
  useEffect(() => {
    const waveTxt = currentItem?.waveLabel || (currentItem?.wave ? `OLA ${currentItem.wave}/4` : (modeCategory === "academy" ? selectedLevel : "VOCAB"));
    const progressTxt = `${totalItems > 0 ? currentIndex + 1 : 0}/${totalItems}`;
    const albumText = `${waveTxt} • Bloque ${progressTxt}`;

    syncAndroidAutoScreen({
      phase: playerState,
      spanishText: currentItem?.promptEs || currentItem?.es || "",
      germanText: currentItem?.targetDe || currentItem?.de || "",
      waveLabel: waveTxt,
      blockProgress: progressTxt,
      album: albumText,
      countdownSec,
      isPlaying
    });
  }, [
    currentItem,
    currentIndex,
    totalItems,
    playerState,
    countdownSec,
    isPlaying,
    modeCategory,
    selectedLevel
  ]);

  const handleStart = () => {
    setActivePanel("hud");
    startOrResume();
  };

  // Configuración visual de la fase actual
  const phaseConfig = useMemo(() => {
    switch (playerState) {
      case "prompting_word":
      case "prompting_sentence":
        return {
          badge: "ESCUCHA EL RETO",
          colorClass: "text-cyan-400 border-cyan-500/40 bg-cyan-950/30",
          icon: <Volume2 className="w-8 h-8 md:w-10 md:h-10 text-cyan-400 animate-pulse" />
        };
      case "waiting_word":
      case "waiting_sentence":
        return {
          badge: `TU TURNO EN VOZ ALTA (${countdownSec}s)`,
          colorClass: "text-amber-400 border-amber-500/50 bg-amber-950/40",
          icon: <Mic className="w-8 h-8 md:w-10 md:h-10 text-amber-400 animate-bounce" />
        };
      case "revealing_word":
      case "revealing_sentence":
        return {
          badge: "SOLUCIÓN NATIVA (CHARON)",
          colorClass: "text-emerald-400 border-emerald-500/50 bg-emerald-950/40",
          icon: <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-emerald-400" />
        };
      case "explaining":
        return {
          badge: "EXPLICACIÓN / MICRO-TIP",
          colorClass: "text-purple-400 border-purple-500/40 bg-purple-950/30",
          icon: <Sliders className="w-8 h-8 md:w-10 md:h-10 text-purple-400" />
        };
      case "paused":
        return {
          badge: "SESIÓN EN PAUSA",
          colorClass: "text-slate-400 border-slate-700 bg-slate-900",
          icon: <Pause className="w-8 h-8 md:w-10 md:h-10 text-slate-400" />
        };
      default:
        return {
          badge: "LISTO PARA ARRANCAR",
          colorClass: "text-emerald-400 border-emerald-500/30 bg-zinc-950",
          icon: <Car className="w-8 h-8 md:w-10 md:h-10 text-emerald-400" />
        };
    }
  }, [playerState, countdownSec]);

  const parsedDe = currentItem?.de
    ? splitGermanTitle(currentItem.de)
    : { main: currentItem?.targetDe || "Sin datos", code: null };

  const isSentencePhase =
    playerState === "prompting_sentence" ||
    playerState === "waiting_sentence" ||
    playerState === "revealing_sentence";

  const showGermanAnswer =
    playerState === "revealing_word" ||
    playerState === "explaining" ||
    playerState === "revealing_sentence";

  // Ayudante de badges para el listado de bloques
  const getStepTypeBadge = (item) => {
    if (item.stepType === "coach") {
      return { label: "🎓 Regla", bg: "bg-purple-900/40 text-purple-300 border-purple-500/40" };
    }
    if (item.title?.includes("(Bloque Base)")) {
      return { label: "🧱 Bloque Base", bg: "bg-blue-900/40 text-blue-300 border-blue-500/40" };
    }
    if (item.stepType === "pingpong") {
      return { label: "🗣️ Ping-Pong", bg: "bg-indigo-900/40 text-indigo-300 border-indigo-500/40" };
    }
    return { label: "🎯 Práctica", bg: "bg-emerald-900/40 text-emerald-300 border-emerald-500/40" };
  };

  return (
    <div className="fixed inset-0 z-[100] h-[100dvh] max-h-[100dvh] w-full bg-black text-white flex flex-col overflow-hidden select-none">
      {/* =========================================================================
          BLOQUE 1: HEADER FIJO (flex-shrink-0 con Safe-Area Top de Android)
          ========================================================================= */}
      <header className="flex-shrink-0 w-full px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 border-b border-zinc-800 flex items-center justify-between gap-2 bg-black z-30">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
            <Car className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-black tracking-wide text-white truncate">
                FAHRMODUS <span className="text-emerald-400 text-xs font-bold">OLED</span>
              </h1>
              <span className="px-2 py-0.5 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-300 font-extrabold text-[10px]">
                {currentItem?.wave
                  ? `OLA ${currentItem.wave}/4`
                  : modeCategory === "academy"
                  ? selectedLevel
                  : "VOCAB"}
              </span>
            </div>
            <p className="text-[11px] md:text-xs text-zinc-400 font-medium truncate">
              {totalItems > 0 ? currentIndex + 1 : 0}/{totalItems} • {activeHeaderLabel}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Botón Acceso Rápido a Bloques */}
          <button
            onClick={() => setActivePanel((prev) => (prev === "blocks" ? "hud" : "blocks"))}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-bold active:scale-95 transition cursor-pointer ${
              activePanel === "blocks"
                ? "bg-purple-900 text-white border-purple-400 shadow-md shadow-purple-950"
                : "bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-zinc-200"
            }`}
            title="Ver listado de bloques"
          >
            <ListOrdered className="w-4 h-4 text-purple-400" />
            <span className="hidden sm:inline">Bloques</span>
            <span className="font-extrabold text-[10px] text-zinc-300">
              ({totalItems > 0 ? currentIndex + 1 : 0}/{totalItems})
            </span>
          </button>

          {/* Botón Selector de Rutas / Clases */}
          <button
            onClick={() => setActivePanel((prev) => (prev === "routes" ? "hud" : "routes"))}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-bold active:scale-95 transition cursor-pointer ${
              activePanel === "routes"
                ? "bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-950"
                : "bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-zinc-200"
            }`}
            title="Elegir ruta o clase"
          >
            <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Ruta / Nivel</span>
            {activePanel === "routes" ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {/* Salir */}
          <button
            onClick={onExit}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-bold text-xs active:scale-95 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span className="hidden xs:inline">Salir</span>
          </button>
        </div>
      </header>

      {/* =========================================================================
          BLOQUE 2: MAIN MUTUAMENTE EXCLUYENTE (flex-1 min-h-0 overflow-y-auto)
          ========================================================================= */}
      <main className="flex-1 min-h-0 w-full overflow-y-auto overscroll-contain px-4 py-3 flex flex-col">
        {/* =====================================================================
            VISTA A: SELECTOR DE RUTAS Y CLASES (activePanel === "routes")
            ===================================================================== */}
        {activePanel === "routes" && (
          <div className="w-full max-w-4xl mx-auto space-y-4 py-2 animate-in fade-in duration-150">
            {/* Pestañas Superiores: Academia A1-B1 vs. Vocabulario */}
            <div className="grid grid-cols-2 gap-2 bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800">
              <button
                onClick={() => setModeCategory("academy")}
                className={`py-2.5 px-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
                  modeCategory === "academy"
                    ? "bg-purple-900/80 text-purple-100 border border-purple-400 shadow-md"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <GraduationCap className="w-4 h-4 text-purple-400" />
                <span>🎓 Clases A1–B1 & Redemittel</span>
              </button>

              <button
                onClick={() => setModeCategory("vocab")}
                className={`py-2.5 px-3 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer ${
                  modeCategory === "vocab"
                    ? "bg-emerald-950 text-emerald-200 border border-emerald-400 shadow-md"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Car className="w-4 h-4 text-emerald-400" />
                <span>⚡ Vocabulario Ruta</span>
              </button>
            </div>

            {/* SECCIÓN 1: CONTENIDO ACADEMIA DE AUDIO */}
            {modeCategory === "academy" && (
              <div className="space-y-3.5">
                {/* Conmutador de Modo de Entrenamiento: Autopista 4 Olas vs. Pasada Rápida */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-zinc-950 p-2 rounded-2xl border border-zinc-800">
                  <button
                    onClick={() => setWorkoutMode("highway")}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col gap-1.5 ${
                      workoutMode === "highway"
                        ? "bg-emerald-950/90 border-emerald-400 text-emerald-100 ring-2 ring-emerald-500/50 shadow-lg shadow-emerald-950/50"
                        : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
                        <Route className="w-4 h-4 text-emerald-400" />
                        🛣️ Maratón Autopista (4 Olas)
                      </span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        60–120 min
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-300 leading-snug">
                      Repetición en espiral + Bloques base + Repetición 2-5-10 + Velocidad sin pistas
                    </p>
                  </button>

                  <button
                    onClick={() => setWorkoutMode("standard")}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col gap-1.5 ${
                      workoutMode === "standard"
                        ? "bg-blue-950/90 border-blue-400 text-blue-100 ring-2 ring-blue-500/50 shadow-lg shadow-blue-950/50"
                        : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-black text-white flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-blue-400" />
                        ⚡ Pasada Rápida (1 Ola)
                      </span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        10–15 min
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-300 leading-snug">
                      Reproducción lineal simple de 1 pasada con explicación guiada
                    </p>
                  </button>
                </div>

                {/* Filtro de Niveles */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: "A1", label: "NIVEL A1" },
                    { id: "A2", label: "NIVEL A2" },
                    { id: "B1", label: "NIVEL B1" },
                    { id: "REDEMITTEL", label: "💬 REDEMITTEL" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedLevel(tab.id)}
                      className={`py-2 px-1 rounded-xl font-black text-[11px] sm:text-xs border transition cursor-pointer truncate ${
                        selectedLevel === tab.id
                          ? "bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-950"
                          : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Micro-guía de Selección Múltiple */}
                <div className="flex items-center justify-between px-1 text-[11px] text-zinc-400">
                  <span>💡 Marca hasta 2 clases para combinarlas en tu viaje</span>
                  <span className="text-emerald-400 font-bold">
                    {selectedClassIds.length}/2 seleccionadas
                  </span>
                </div>

                {/* Tarjetas de Clases del Nivel Activo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {levelClasses.map((cls) => {
                    const selIndex = selectedClassIds.indexOf(cls.id);
                    const isSelected = selIndex !== -1;
                    const saved = getClassCheckpointSummary(cls.id, workoutMode);

                    return (
                      <button
                        key={cls.id}
                        onClick={() => toggleClassSelection(cls.id)}
                        className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between gap-2.5 cursor-pointer ${
                          isSelected
                            ? "bg-purple-950/90 border-emerald-400 text-purple-100 ring-2 ring-emerald-400 shadow-md shadow-emerald-950/50"
                            : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-xs sm:text-sm font-black text-white leading-tight">
                            {cls.title}
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {isSelected && (
                              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-black">
                                ✓ LECCIÓN {selIndex + 1}
                              </span>
                            )}
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-zinc-800 text-purple-300">
                              {cls.steps?.length || 4} pasos
                            </span>
                          </div>
                        </div>

                        <p className="text-[11px] sm:text-xs text-zinc-400 leading-snug">
                          {cls.subtitle}
                        </p>

                        {/* Insignia de Progreso Guardado */}
                        {saved && saved.currentIndex > 0 && (
                          <div className="pt-1 flex items-center gap-1.5">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center gap-1">
                              <Bookmark className="w-3 h-3 text-amber-400" />
                              Guardado: Bloque {saved.currentIndex + 1}/{saved.totalItems} (Ola {saved.wave || 1})
                            </span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Botón Fijo Verde al Final del Selector para Cargar la Sesión */}
                <div className="sticky bottom-0 pt-3 pb-2 bg-black/95 backdrop-blur-md border-t border-zinc-800 z-20">
                  <button
                    onClick={() => setActivePanel("hud")}
                    className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.99] text-black font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-950 border-2 border-emerald-300 cursor-pointer transition"
                  >
                    <Car className="w-5 h-5 fill-current" />
                    <span>
                      🚗 CARGAR RUTA DE ENTRENAMIENTO ({activeQueue.length} bloques • {workoutMode === "highway" ? "4 Olas" : "1 Ola"})
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* SECCIÓN 2: CONTENIDO VOCABULARIO RUTA */}
            {modeCategory === "vocab" && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {[
                    { id: "enpal", label: "⚡ Enpal / Baustelle (Kap. 20)", icon: <Wrench className="w-5 h-5 text-amber-400" /> },
                    { id: "stvo", label: "🛑 Señales StVO (Kap. 21)", icon: <ShieldAlert className="w-5 h-5 text-red-400" /> },
                    { id: "redemittel", label: "💬 Redemittel & Alltag (Kap. 22)", icon: <MessageCircle className="w-5 h-5 text-indigo-400" /> },
                    { id: "active", label: "🎯 Capítulo Actual", icon: <BookOpen className="w-5 h-5 text-blue-400" /> },
                    { id: "mix", label: "🔥 Mix 50 Supervivencia", icon: <Flame className="w-5 h-5 text-orange-400" /> }
                  ].map((route) => (
                    <button
                      key={route.id}
                      onClick={() => {
                        setSelectedRoute(route.id);
                        setActivePanel("hud");
                      }}
                      className={`flex items-center gap-3 p-3.5 rounded-2xl border font-bold text-left transition cursor-pointer text-xs sm:text-sm ${
                        selectedRoute === route.id
                          ? "bg-emerald-950 border-emerald-400 text-emerald-200 ring-2 ring-emerald-500/50"
                          : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                      }`}
                    >
                      {route.icon}
                      <span className="truncate">{route.label}</span>
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-zinc-800">
                  <button
                    onClick={() => setIncludeSentences((v) => !v)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      includeSentences
                        ? "bg-amber-500/20 border-amber-400 text-amber-300"
                        : "bg-zinc-900 border-zinc-800 text-zinc-500"
                    }`}
                  >
                    {includeSentences ? "✓ Incluir Frases (Satzklammer)" : "Solo Palabras Cortas"}
                  </button>

                  <button
                    onClick={() => setIncludeTips((v) => !v)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      includeTips
                        ? "bg-purple-500/20 border-purple-400 text-purple-300"
                        : "bg-zinc-900 border-zinc-800 text-zinc-500"
                    }`}
                  >
                    {includeTips ? "✓ Micro-Tips de Gramática" : "Sin Micro-Tips"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =====================================================================
            VISTA B: SELECTOR DE BLOQUES Y OLAS (activePanel === "blocks")
            ===================================================================== */}
        {activePanel === "blocks" && (
          <div className="w-full max-w-4xl mx-auto space-y-3.5 py-2 animate-in fade-in duration-150">
            {/* Cabecera del Panel de Bloques */}
            <div className="flex items-center justify-between gap-2 p-3 bg-zinc-900/90 border border-zinc-800 rounded-2xl">
              <div className="min-w-0">
                <h2 className="text-xs sm:text-sm font-black text-white flex items-center gap-2">
                  <ListOrdered className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="truncate">Bloques de la Sesión ({activeQueue.length} pasos)</span>
                </h2>
                <p className="text-[11px] text-zinc-400 truncate max-w-[240px] sm:max-w-md">
                  {activeHeaderLabel}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => {
                    clearDrivingCheckpoint(sessionStorageKey, selectedClassIds, workoutMode);
                    setCheckpointVersion((v) => v + 1);
                    jumpToIndex(0, false);
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs flex items-center gap-1.5 active:scale-95 transition cursor-pointer"
                  title="Reiniciar todo al Bloque 1"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Reiniciar al #1</span>
                </button>
                <button
                  onClick={() => setActivePanel("hud")}
                  className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 active:scale-95 transition cursor-pointer"
                  title="Cerrar y volver al HUD"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Barra de Saltos Rápidos por Olas (si workoutMode === "highway") */}
            {modeCategory === "academy" && workoutMode === "highway" && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { wave: 1, label: "Ola 1: Bloques" },
                  { wave: 2, label: "Ola 2: Espaciada" },
                  { wave: 3, label: "Ola 3: Rápida" },
                  { wave: 4, label: "Ola 4: Ping-Pong" }
                ].map((wTab) => {
                  const firstIdx = activeQueue.findIndex((item) => item.wave === wTab.wave);
                  const isCurrentWave = currentItem?.wave === wTab.wave;
                  const exists = firstIdx !== -1;
                  return (
                    <button
                      key={wTab.wave}
                      disabled={!exists}
                      onClick={() => {
                        if (exists) jumpToIndex(firstIdx, false);
                      }}
                      className={`py-2 px-2.5 rounded-xl border text-xs font-black transition cursor-pointer flex items-center justify-between gap-1 ${
                        isCurrentWave
                          ? "bg-purple-950 border-purple-400 text-white shadow-md ring-2 ring-purple-500/50"
                          : exists
                          ? "bg-zinc-900/90 border-zinc-800 text-zinc-300 hover:border-zinc-700"
                          : "bg-zinc-950 border-zinc-900 text-zinc-600 cursor-not-allowed"
                      }`}
                    >
                      <span className="truncate">{wTab.label}</span>
                      {exists && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 shrink-0">
                          #{firstIdx + 1}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Lista Numerada de Bloques */}
            <div className="space-y-2 pb-6">
              {activeQueue.map((item, idx) => {
                const isCurrent = idx === currentIndex;
                const isPast = idx < currentIndex;
                const badge = getStepTypeBadge(item);
                return (
                  <button
                    key={item.id || item.queueKey || idx}
                    onClick={() => {
                      jumpToIndex(idx, true);
                      setActivePanel("hud");
                    }}
                    className={`w-full p-3 sm:p-3.5 rounded-2xl border text-left transition flex items-start gap-3 cursor-pointer group ${
                      isCurrent
                        ? "bg-emerald-950/70 border-emerald-400 text-emerald-100 ring-2 ring-emerald-500 shadow-lg shadow-emerald-950/60"
                        : isPast
                        ? "bg-zinc-950 border-zinc-800/80 text-zinc-400 hover:border-zinc-700"
                        : "bg-zinc-900/80 border-zinc-800 text-zinc-200 hover:border-zinc-700"
                    }`}
                  >
                    {/* Número de Bloque */}
                    <div className="flex flex-col items-center justify-center shrink-0 w-10 sm:w-12 pt-0.5">
                      <span
                        className={`text-xs sm:text-sm font-black ${
                          isCurrent ? "text-emerald-400" : isPast ? "text-zinc-500" : "text-zinc-300"
                        }`}
                      >
                        #{idx + 1}
                      </span>
                      {isPast ? (
                        <span className="text-[10px] font-bold text-emerald-500">✓</span>
                      ) : isCurrent ? (
                        <span className="text-[9px] font-black text-emerald-400 animate-pulse">PLAY</span>
                      ) : null}
                    </div>

                    {/* Contenido del Bloque */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {item.wave && (
                          <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                            OLA {item.wave}/4
                          </span>
                        )}
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${badge.bg}`}>
                          {badge.label}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500 text-black">
                            ▶ EN CURSO / GUARDADO
                          </span>
                        )}
                      </div>

                      {item.title && (
                        <p className="text-xs sm:text-sm font-bold text-white truncate">
                          {item.title}
                        </p>
                      )}

                      <p className="text-xs text-zinc-300 line-clamp-2">
                        {item.promptEs || item.es}
                      </p>

                      <p className="text-xs sm:text-sm font-bold text-emerald-400 line-clamp-1">
                        {item.targetDe || item.de}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* =====================================================================
            VISTA C: ESCENARIO ACTIVO HUD (activePanel === "hud")
            ===================================================================== */}
        {activePanel === "hud" && (
          <div className="my-auto flex flex-col items-center text-center space-y-3.5 w-full max-w-3xl mx-auto py-1">
            {/* Píldora compacta doble: bloque / ola + cambiar ruta */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-1">
              <button
                onClick={() => setActivePanel("blocks")}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs font-bold text-zinc-300 hover:border-zinc-500 active:scale-95 transition cursor-pointer shadow-md"
              >
                <span className="text-emerald-400 font-extrabold uppercase">
                  {currentItem?.waveLabel || "ENTRENAMIENTO EN RUTA"}
                </span>
                <span className="text-zinc-500">•</span>
                <span className="text-purple-300 font-extrabold">
                  Bloque {totalItems > 0 ? currentIndex + 1 : 0}/{totalItems}
                </span>
                <span className="text-purple-400 font-bold shrink-0">📋 Lista ▾</span>
              </button>

              <button
                onClick={() => setActivePanel("routes")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-semibold text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 active:scale-95 transition cursor-pointer"
              >
                <span className="truncate max-w-[130px] sm:max-w-xs">{activeHeaderLabel}</span>
                <span className="text-emerald-400 font-bold">• Cambiar ▾</span>
              </button>
            </div>

            {/* Banner Inteligente de Reanudación (si está en pausa y en un bloque avanzado) */}
            {!isPlaying && currentIndex > 0 && (
              <div className="w-full max-w-md mx-auto bg-zinc-900/90 border border-emerald-500/40 rounded-2xl p-2.5 flex items-center justify-between gap-2 shadow-lg shadow-black/80 animate-in fade-in duration-150">
                <div className="flex items-center gap-2 text-left min-w-0">
                  <Bookmark className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="text-xs min-w-0">
                    <p className="font-black text-white truncate">
                      Retomando en Bloque {currentIndex + 1} de {totalItems}
                    </p>
                    <p className="text-zinc-400 text-[10px] truncate">
                      {currentItem?.title || currentItem?.waveLabel || "En progreso"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => setActivePanel("blocks")}
                    className="px-2 py-1 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] font-bold transition active:scale-95 cursor-pointer flex items-center gap-1"
                  >
                    <ListOrdered className="w-3 h-3 text-purple-400" />
                    <span>Elegir</span>
                  </button>
                  <button
                    onClick={() => jumpToIndex(0, false)}
                    className="px-2 py-1 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white text-[11px] font-bold transition active:scale-95 cursor-pointer"
                    title="Reiniciar al bloque 1"
                  >
                    ⏮ #1
                  </button>
                </div>
              </div>
            )}

            {/* Badge de Fase */}
            <div
              className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border-2 shrink-0 ${phaseConfig.colorClass}`}
            >
              {phaseConfig.icon}
              <span className="text-base md:text-xl font-black tracking-wider">
                {phaseConfig.badge}
              </span>
            </div>

            {currentItem ? (
              <div className="w-full space-y-3.5 my-auto">
                {/* Título de Paso en Academia */}
                {currentItem.title && (
                  <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-emerald-400/90">
                    {currentItem.title}
                  </p>
                )}

                {/* Pregunta en Ping-Pong si el interlocutor habló en alemán */}
                {currentItem.stepType === "pingpong" && currentItem.questionDe && (
                  <div className="inline-block px-4 py-2 rounded-2xl bg-zinc-900/90 border border-zinc-700 text-cyan-300 font-semibold text-sm md:text-base mb-1">
                    🗣️ Interlocutor: "{currentItem.questionDe}"
                  </div>
                )}

                {/* Estímulo Principal en Español */}
                <p className="text-xl md:text-3xl lg:text-4xl font-bold text-zinc-200 leading-snug px-2">
                  {currentItem.promptEs ||
                    (isSentencePhase ? currentItem.exampleSentenceEs : currentItem.es)}
                </p>

                {/* Respuesta en Alemán (Grande y clara en fase de revelación o contador en espera) */}
                <div className="min-h-[90px] md:min-h-[120px] flex flex-col items-center justify-center">
                  {showGermanAnswer ? (
                    <div className="space-y-1.5 animate-in fade-in duration-200">
                      <p className="text-3xl md:text-5xl lg:text-6xl font-black text-emerald-400 tracking-tight leading-tight px-2">
                        {currentItem.targetDe ||
                          (isSentencePhase ? currentItem.exampleSentenceDe : parsedDe.main)}
                      </p>
                      {!isSentencePhase && parsedDe.code && (
                        <p className="text-lg md:text-xl font-bold text-zinc-400">
                          {parsedDe.code}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="text-5xl md:text-7xl font-black text-amber-400/90 tracking-widest">
                      {countdownSec > 0 ? `${countdownSec}s` : "• • •"}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-zinc-500 text-lg font-medium">
                No hay términos disponibles en esta ruta.
              </div>
            )}

            {!Capacitor.isNativePlatform() && (
              <p className="text-[11px] sm:text-xs text-zinc-400/90 max-w-md px-3 pt-1 leading-snug">
                🎧 Conectado por Bluetooth / CarPlay / Android Auto: usa los botones de pista del volante para avanzar o repetir bloques.
              </p>
            )}
          </div>
        )}
      </main>

      {/* =========================================================================
          BLOQUE 3: FOOTER ANCLADO (flex-shrink-0 con Safe-Area Bottom de Android)
          ========================================================================= */}
      <footer className="flex-shrink-0 w-full bg-black border-t border-zinc-800 px-4 pt-3 pb-[max(1.25rem,calc(env(safe-area-inset-bottom,0px)+1rem))] z-30">
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={repeatAndRequeueCurrent}
            className="h-20 sm:h-24 rounded-2xl bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-700 border-2 border-zinc-700 flex flex-col items-center justify-center gap-1 text-amber-400 font-black transition active:scale-95 cursor-pointer shadow-lg"
          >
            <RotateCcw className="w-7 h-7 sm:w-8 sm:h-8" />
            <span className="text-xs sm:text-sm tracking-wide">REPETIR (+SRS)</span>
          </button>

          <button
            onClick={isPlaying ? pauseSession : handleStart}
            className={`h-20 sm:h-24 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 font-black transition active:scale-95 cursor-pointer shadow-lg ${
              isPlaying
                ? "bg-amber-500 text-black border-amber-300 hover:bg-amber-400"
                : "bg-emerald-500 text-black border-emerald-300 hover:bg-emerald-400"
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-8 h-8 sm:w-9 sm:h-9 fill-current" />
                <span className="text-sm sm:text-base tracking-wide">PAUSAR</span>
              </>
            ) : (
              <>
                <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-current" />
                <span className="text-sm sm:text-base tracking-wide">ARRANCAR</span>
              </>
            )}
          </button>

          <button
            onClick={skipToNext}
            className="h-20 sm:h-24 rounded-2xl bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-700 border-2 border-zinc-700 flex flex-col items-center justify-center gap-1 text-emerald-400 font-black transition active:scale-95 cursor-pointer shadow-lg"
          >
            <SkipForward className="w-7 h-7 sm:w-8 sm:h-8" />
            <span className="text-xs sm:text-sm tracking-wide">SIGUIENTE</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
