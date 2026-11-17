import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

test('functions/index.js enforces assertApprovedUser, magic bytes, sharp memory sanitization, and ephemeral TTS isolation', () => {
  const fnSource = fs.readFileSync(path.join(ROOT, 'functions', 'index.js'), 'utf-8');

  // 1. analyzePhotoDescription exige assertApprovedUser(request) al inicio del handler
  const photoFnStart = fnSource.indexOf('export const analyzePhotoDescription = onCall(');
  assert.ok(photoFnStart > -1, 'Missing analyzePhotoDescription Cloud Function');
  const photoFnSnippet = fnSource.slice(photoFnStart, photoFnStart + 900);
  assert.match(photoFnSnippet, /async\s*\(request\)\s*=>\s*\{\s*const\s+authUser\s*=\s*await\s+assertApprovedUser\(request\);/);

  // 2. Validación de magic bytes JPEG / PNG / WebP y cota <= 512 KB + sharp en memoria sin Cloud Storage
  assert.match(fnSource, /0xff\s*&&\s*buffer\[1\]\s*===\s*0xd8/);
  assert.match(fnSource, /0x89\s*&&\s*buffer\[1\]\s*===\s*0x50/);
  assert.match(fnSource, /toString\("ascii",\s*0,\s*4\)\s*===\s*"RIFF"/);
  assert.match(fnSource, /524_288/);
  assert.match(fnSource, /sharp\(rawBuffer,\s*\{\s*limitInputPixels:\s*25_000_000\s*\}\)/);
  assert.ok(!fnSource.slice(photoFnStart).includes('bucket.file('), 'analyzePhotoDescription must never write user photos to Cloud Storage');

  // 3. synthesizeGermanSpeech modo efímero retorna audioBase64 sin persistir en Storage/Firestore
  const synthStart = fnSource.indexOf('export const synthesizeGermanSpeech = onCall(');
  const synthEnd = fnSource.indexOf('function isVerbItem(');
  const synthBody = fnSource.slice(synthStart, synthEnd);
  assert.match(synthBody, /const\s+isEphemeral\s*=/);
  const ephemeralIdx = synthBody.indexOf('if (isEphemeral)');
  const bucketSaveIdx = synthBody.indexOf('await file.save(');
  assert.ok(ephemeralIdx > -1 && ephemeralIdx < bucketSaveIdx, 'Ephemeral return must short-circuit before file.save/Firestore write');
});

test('Phase 3 frontend components expose call and photo sub-modes safely without Storage/Firestore pollution', () => {
  const audioService = fs.readFileSync(path.join(ROOT, 'src', 'services', 'aiAudioService.js'), 'utf-8');
  assert.match(audioService, /export function createPrewarmedCallAudioElement/);
  assert.match(audioService, /export async function playTextOnPrewarmedAudio/);
  assert.match(audioService, /ephemeral:\s*true/);

  const callHook = fs.readFileSync(path.join(ROOT, 'src', 'hooks', 'useCallSpeechCapture.js'), 'utf-8');
  assert.match(callHook, /popup:\s*false/);
  assert.match(callHook, /partialResults:\s*true/);
  assert.match(callHook, /MediaRecorder/);
  assert.match(callHook, /AnalyserNode|createAnalyser/);
  assert.match(callHook, /track\.stop\(\)/);

  const callStage = fs.readFileSync(path.join(ROOT, 'src', 'components', 'chat', 'CallModeStage.jsx'), 'utf-8');
  assert.match(callStage, /,\s*300\)/);
  assert.match(callStage, /Iniciar Llamada/);
  assert.match(callStage, /Colgar y Evaluar/);

  const homeDash = fs.readFileSync(path.join(ROOT, 'src', 'components', 'HomeDashboard.jsx'), 'utf-8');
  assert.ok(!/Fase 3\s*·/.test(homeDash), 'HomeDashboard must not show Fase 3 pending labels anymore');

  const appSource = fs.readFileSync(path.join(ROOT, 'src', 'App.jsx'), 'utf-8');
  assert.match(appSource, /initialMode=\{viewMode === "call" \? "call" : "roleplay"\}/);
  assert.match(appSource, /initialMode=\{tutorInitialMode\}/);
});
