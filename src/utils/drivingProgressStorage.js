import localforage from "localforage";

const STORAGE_KEY = "dm_driving_progress_v1";

function readAllSync() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeAllSync(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    localforage.setItem(STORAGE_KEY, data).catch(() => {});
  } catch {
    // Ignorar errores de cuota o almacenamiento privado
  }
}

/**
 * Construye una clave canónica para una sesión de 1 o 2 clases o una ruta de vocabulario
 */
export function buildSessionStorageKey({ tabMode, workoutMode, selectedClassIds = [], selectedRoute }) {
  if (tabMode === "vocab") {
    return `vocab__${selectedRoute || "active"}`;
  }
  const sortedIds = [...selectedClassIds].filter(Boolean).sort().join("+");
  return `academy__${workoutMode || "highway"}__${sortedIds || "default"}`;
}

/**
 * Guarda la posición actual tanto en la clave de la sesión activa como en cada clase individual
 */
export function saveDrivingCheckpoint({
  sessionKey,
  classIds = [],
  workoutMode = "highway",
  currentIndex = 0,
  totalItems = 0,
  currentItem = null
}) {
  if (!sessionKey || totalItems <= 0) return;

  const all = readAllSync();
  const payload = {
    currentIndex,
    totalItems,
    queueKey: currentItem?.queueKey || null,
    wave: currentItem?.wave || 1,
    title: currentItem?.title || currentItem?.es || "",
    workoutMode,
    updatedAt: Date.now()
  };

  all[sessionKey] = payload;

  // Si hay una sola clase seleccionada, guardamos también su marcador directo por classId
  if (classIds.length === 1 && classIds[0]) {
    all[`class__${workoutMode}__${classIds[0]}`] = payload;
    all[`class__last__${classIds[0]}`] = payload;
  }

  writeAllSync(all);
}

/**
 * Obtiene el último punto guardado para una sesión
 */
export function getDrivingCheckpoint(sessionKey) {
  if (!sessionKey) return null;
  const all = readAllSync();
  return all[sessionKey] || null;
}

/**
 * Obtiene el último punto guardado para mostrarlo en la tarjeta de una clase individual
 */
export function getClassCheckpointSummary(classId, workoutMode = "highway") {
  if (!classId) return null;
  const all = readAllSync();
  return all[`class__${workoutMode}__${classId}`] || all[`class__last__${classId}`] || null;
}

/**
 * Reinicia el marcador de una sesión a 0
 */
export function clearDrivingCheckpoint(sessionKey, classIds = [], workoutMode = "highway") {
  const all = readAllSync();
  if (sessionKey) delete all[sessionKey];
  if (classIds.length === 1 && classIds[0]) {
    delete all[`class__${workoutMode}__${classIds[0]}`];
    delete all[`class__last__${classIds[0]}`];
  }
  writeAllSync(all);
}

