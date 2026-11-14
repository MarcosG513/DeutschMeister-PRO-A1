// src/utils/highwayWorkoutBuilder.js

/**
 * Construye una sesión de entrenamiento profundo en 4 Olas para trayectos de 2 a 3 horas.
 * Reutiliza los mismos strings de promptEs/targetDe/tipEs para 100% Cache Hit en IndexedDB/Firestore.
 */
export function buildHighwaySessionQueue(selectedClasses = [], mode = "highway") {
  if (!Array.isArray(selectedClasses) || selectedClasses.length === 0) return [];

  // Intercalar los pasos de las clases seleccionadas (si el usuario eligió 2 clases)
  const interleavedSteps = [];
  const maxLen = Math.max(...selectedClasses.map((c) => (c.steps || []).length));

  for (let i = 0; i < maxLen; i++) {
    for (const cls of selectedClasses) {
      if (cls.steps && cls.steps[i]) {
        interleavedSteps.push({
          ...cls.steps[i],
          classId: cls.id,
          classTitle: cls.title,
          level: cls.level,
          de: cls.steps[i].targetDe,
          es: cls.steps[i].promptEs
        });
      }
    }
  }

  if (mode === "standard") {
    return interleavedSteps.map((step, idx) => ({
      ...step,
      de: step.targetDe || step.de,
      es: step.promptEs || step.es,
      wave: 1,
      waveLabel: "MODO ESTÁNDAR • 1 PASADA",
      queueKey: `std_${idx}`
    }));
  }

  const finalQueue = [];

  // =========================================================================
  // OLA 1: APRENDIZAJE GUIADO + CONSTRUCCIÓN POR BLOQUES (CON MICRO-TIPS)
  // =========================================================================
  for (const step of interleavedSteps) {
    // Si el drill define un bloque base corto (Chaining), lo entrenamos justo antes de la oración completa
    if (step.stepType === "drill" && step.blockPromptEs && step.blockTargetDe) {
      finalQueue.push({
        stepType: "drill",
        title: `${step.title} (Bloque Base)`,
        promptEs: step.blockPromptEs,
        targetDe: step.blockTargetDe,
        de: step.blockTargetDe,
        es: step.blockPromptEs,
        tipEs: null,
        pauseSec: 4,
        classId: step.classId,
        classTitle: step.classTitle,
        level: step.level,
        wave: 1,
        waveLabel: "OLA 1/4 • BLOQUES Y REGLAS"
      });
    }

    finalQueue.push({
      ...step,
      de: step.targetDe || step.de,
      es: step.promptEs || step.es,
      suppressTip: false,
      wave: 1,
      waveLabel: "OLA 1/4 • BLOQUES Y REGLAS"
    });
  }

  // =========================================================================
  // OLA 2: REPETICIÓN ESPACIADA INTRA-TRAYECTO (ALGORITMO +2 / +5)
  // =========================================================================
  const drillsOnly = interleavedSteps.filter((s) => s.stepType === "drill");
  const wave2Buffer = [];

  drillsOnly.forEach((drill, idx) => {
    // Inserción principal
    wave2Buffer.push({
      ...drill,
      de: drill.targetDe || drill.de,
      es: drill.promptEs || drill.es,
      title: `${drill.title} • Fijación #1`,
      suppressTip: false,
      wave: 2,
      waveLabel: "OLA 2/4 • REPETICIÓN ESPACIADA"
    });

    // Repetición +2 (del ítem de hace 2 posiciones)
    if (idx >= 2) {
      const prev2 = drillsOnly[idx - 2];
      wave2Buffer.push({
        ...prev2,
        de: prev2.targetDe || prev2.de,
        es: prev2.promptEs || prev2.es,
        title: `${prev2.title} • Refuerzo Corto (+2)`,
        suppressTip: true,
        pauseSec: Math.max(4, (prev2.pauseSec || 5) - 1),
        wave: 2,
        waveLabel: "OLA 2/4 • REPETICIÓN ESPACIADA"
      });
    }

    // Repetición +5 (del ítem de hace 5 posiciones)
    if (idx >= 5) {
      const prev5 = drillsOnly[idx - 5];
      wave2Buffer.push({
        ...prev5,
        de: prev5.targetDe || prev5.de,
        es: prev5.promptEs || prev5.es,
        title: `${prev5.title} • Refuerzo Medio (+5)`,
        suppressTip: true,
        pauseSec: Math.max(4, (prev5.pauseSec || 5) - 1),
        wave: 2,
        waveLabel: "OLA 2/4 • REPETICIÓN ESPACIADA"
      });
    }
  });

  finalQueue.push(...wave2Buffer);

  // =========================================================================
  // OLA 3: RECUERDO ACTIVO RÁPIDO (ORDEN INVERTIDO/INTERCALADO, SIN PISTAS)
  // =========================================================================
  const activeRecallSteps = interleavedSteps.filter(
    (s) => s.stepType === "drill" || s.stepType === "pingpong"
  );
  // Orden alternado par/impar determinista para romper la memoria secuencial
  const reorderedWave3 = [
    ...activeRecallSteps.filter((_, i) => i % 2 === 1),
    ...activeRecallSteps.filter((_, i) => i % 2 === 0).reverse()
  ];

  for (const step of reorderedWave3) {
    finalQueue.push({
      ...step,
      de: step.targetDe || step.de,
      es: step.promptEs || step.es,
      title: `⚡ Reto Rápido: ${step.title}`,
      suppressTip: true,
      pauseSec: Math.max(3, Math.round((step.pauseSec || 5) * 0.75)),
      wave: 3,
      waveLabel: "OLA 3/4 • FUEGO RÁPIDO SIN PISTAS"
    });
  }

  // =========================================================================
  // OLA 4: PING-PONG CONVERSACIONAL + REPASO FINAL DE CONSOLIDACIÓN
  // =========================================================================
  const pingpongs = interleavedSteps.filter((s) => s.stepType === "pingpong");
  for (const pp of pingpongs) {
    finalQueue.push({
      ...pp,
      de: pp.targetDe || pp.de,
      es: pp.promptEs || pp.es,
      title: `🗣️ Conversación Real: ${pp.title}`,
      suppressTip: true,
      wave: 4,
      waveLabel: "OLA 4/4 • SIMULACIÓN Y SELLADO"
    });
  }

  for (const drill of drillsOnly) {
    finalQueue.push({
      ...drill,
      de: drill.targetDe || drill.de,
      es: drill.promptEs || drill.es,
      title: `🏁 Sellado Final: ${drill.title}`,
      suppressTip: true,
      pauseSec: 4,
      wave: 4,
      waveLabel: "OLA 4/4 • SIMULACIÓN Y SELLADO"
    });
  }

  return finalQueue.map((item, index) => ({
    ...item,
    queueKey: `hw_${index}`
  }));
}

