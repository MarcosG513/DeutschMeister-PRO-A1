import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, ClipboardCheck, Sparkles, X } from 'lucide-react';
import { getAuth } from 'firebase/auth';
import ConversationThread from './chat/ConversationThread';
import ComposerBar from './chat/ComposerBar';
import SessionDiagnosticCard from './chat/SessionDiagnosticCard';
import { playGermanAudio, stopCurrentAudio } from '../services/aiAudioService';
import { API_ENDPOINTS } from '../config/apiEndpoints';
import { recordDailyStudyActivity, recordSkillActivity, scrollInputIntoView } from '../utils/helpers';
import { captureConversationBundle } from '../services/srsBridgeService';

const DEFAULT_MISSIONS = [
  { id: 'm1', titleEs: 'Saludar y abrir la conversación en alemán' },
  { id: 'm2', titleEs: 'Responder con una estructura A1 completa' },
  { id: 'm3', titleEs: 'Confirmar el cierre o despedirte con cortesía' },
];

const DEFAULT_SUGGESTIONS = [
  { de: 'Guten Tag! Wie geht es Ihnen?', es: '¡Buenos días! ¿Cómo está usted?', grammarTag: 'Sie' },
  { de: 'Können Sie das bitte wiederholen?', es: '¿Puede repetir eso, por favor?', grammarTag: 'A1' },
  { de: 'Vielen Dank und auf Wiedersehen!', es: '¡Muchas gracias y hasta la vista!', grammarTag: 'Cierre' },
];

const RoleplaySimulator = ({
  onExit,
  initialMode = 'roleplay',
}) => {
  const [scenario, setScenario] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isBlurting, setIsBlurting] = useState(false);
  const [blurtInput, setBlurtInput] = useState('');
  const [playingMsgIndex, setPlayingMsgIndex] = useState(null);
  const [playingSuggestionText, setPlayingSuggestionText] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [missionsStatus, setMissionsStatus] = useState([]);
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [isAnalyzingDiagnostic, setIsAnalyzingDiagnostic] = useState(false);
  const [diagnosticData, setDiagnosticData] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    return () => {
      stopCurrentAudio();
    };
  }, []);

  const handlePlayAudio = (text, idx) => {
    if (playingMsgIndex === idx) {
      stopCurrentAudio();
      setPlayingMsgIndex(null);
      return;
    }
    if (!text) return;
    setPlayingMsgIndex(idx);
    setPlayingSuggestionText(null);
    recordSkillActivity('listening', 1).catch(() => {});
    playGermanAudio(text, {
      type: 'dialogue',
      voice: 'Charon',
      onEnd: () => setPlayingMsgIndex(null),
      onError: () => setPlayingMsgIndex(null),
    });
  };

  const handlePlaySuggestionAudio = (textDe) => {
    if (!textDe) return;
    if (playingSuggestionText === textDe) {
      stopCurrentAudio();
      setPlayingSuggestionText(null);
      return;
    }
    setPlayingMsgIndex(null);
    setPlayingSuggestionText(textDe);
    playGermanAudio(textDe, {
      type: 'dialogue',
      voice: 'Charon',
      onEnd: () => setPlayingSuggestionText(null),
      onError: () => setPlayingSuggestionText(null),
    });
  };

  const scenarios = [
    {
      id: 'restaurant',
      title: 'En el Restaurante',
      axis: 'general',
      icon: '🍽️',
      desc: 'Pide comida y bebida.',
      blurtHint: 'Essen, Trinken, Kellner',
      missions: [
        { id: 'm1', titleEs: 'Saludar y pedir bebida' },
        { id: 'm2', titleEs: 'Pedir un plato o pastel con möchte' },
        { id: 'm3', titleEs: 'Pedir la cuenta y pagar' },
      ],
      starterSuggestions: [
        { de: 'Guten Tag! Ich möchte einen Kaffee, bitte.', es: '¡Buenos días! Quiero un café, por favor.', grammarTag: 'Akk' },
        { de: 'Haben Sie auch eine Speisekarte?', es: '¿Tienen también carta?', grammarTag: 'Sie' },
        { de: 'Ich möchte bitte zahlen.', es: 'Quisiera pagar, por favor.', grammarTag: 'V2' },
      ],
      prompt:
        'Eres un camarero muy amable en un restaurante en Múnich. El usuario es un cliente de nivel A1 de alemán. Empieza saludando y preguntando qué desea beber. Usa oraciones muy cortas y vocabulario A1. Responde SOLO en alemán.',
    },
    {
      id: 'station',
      title: 'Estación de Tren',
      axis: 'survival',
      icon: '🚆',
      desc: 'Compra un billete.',
      blurtHint: 'Zug, Ticket, Gleis',
      missions: [
        { id: 'm1', titleEs: 'Indicar destino con nach' },
        { id: 'm2', titleEs: 'Preguntar hora de salida o precio' },
        { id: 'm3', titleEs: 'Preguntar de qué andén (Gleis) sale' },
      ],
      starterSuggestions: [
        { de: 'Guten Tag, ich möchte eine Fahrkarte nach Frankfurt.', es: 'Buenos días, quiero un billete a Fráncfort.', grammarTag: 'Akk' },
        { de: 'Wann fährt der nächste Zug ab?', es: '¿Cuándo sale el próximo tren?', grammarTag: 'Trennb.' },
        { de: 'Von welchem Gleis fährt der Zug?', es: '¿De qué andén sale el tren?', grammarTag: 'Dativ' },
      ],
      prompt:
        'Eres un vendedor de billetes en la estación de tren de Berlín. El usuario es un viajero nivel A1 que quiere ir a Fráncfort. Empieza diciendo "Guten Tag, wohin möchten Sie fahren?". Usa oraciones cortas A1. Responde SOLO en alemán.',
    },
    {
      id: 'shopping',
      title: 'Tienda de Ropa',
      axis: 'general',
      icon: '👕',
      desc: 'Busca una chaqueta.',
      blurtHint: 'Jacke, Größe, kaufen',
      missions: [
        { id: 'm1', titleEs: 'Pedir la prenda y talla o color' },
        { id: 'm2', titleEs: 'Preguntar cuánto cuesta' },
        { id: 'm3', titleEs: 'Decidir compra y despedirse' },
      ],
      starterSuggestions: [
        { de: 'Ich suche eine blaue Jacke in Größe M.', es: 'Busco una chaqueta azul en talla M.', grammarTag: 'Akk' },
        { de: 'Kann ich die Jacke bitte anprobieren?', es: '¿Puedo probarme la chaqueta, por favor?', grammarTag: 'Modal' },
        { de: 'Wie viel kostet diese Jacke?', es: '¿Cuánto cuesta esta chaqueta?', grammarTag: 'W-Frage' },
      ],
      prompt:
        'Eres un vendedor en una tienda de ropa en Viena. El usuario busca una chaqueta. Empieza diciendo "Guten Tag, kann ich Ihnen helfen?". Usa vocabulario A1. Responde SOLO en alemán.',
    },
    {
      id: 'hotel',
      title: 'Recepción de Hotel',
      axis: 'survival',
      icon: '🏨',
      desc: 'Haz el check-in y pide la llave.',
      blurtHint: 'Zimmer, Schlüssel, Nacht',
      missions: [
        { id: 'm1', titleEs: 'Confirmar reserva con nombre' },
        { id: 'm2', titleEs: 'Preguntar hora del desayuno o Wi-Fi' },
        { id: 'm3', titleEs: 'Pedir la llave y agradecer' },
      ],
      starterSuggestions: [
        { de: 'Guten Abend! Ich habe ein Zimmer reserviert.', es: '¡Buenas noches! Tengo una habitación reservada.', grammarTag: 'Perfekt' },
        { de: 'Wann gibt es morgens Frühstück?', es: '¿A qué hora es el desayuno por la mañana?', grammarTag: 'V2' },
        { de: 'Danke schön! Wo ist der Aufzug bitte?', es: '¡Muchas gracias! ¿Dónde está el ascensor?', grammarTag: 'W-Frage' },
      ],
      prompt:
        'Eres el recepcionista de un hotel en Berlín. El usuario tiene una reserva. Empieza diciendo "Herzlich willkommen! Haben Sie eine Reservierung?". Responde SOLO en alemán nivel A1.',
    },
    {
      id: 'doctor',
      title: 'En el Médico',
      axis: 'survival',
      icon: '🩺',
      desc: 'Explica que te sientes mal.',
      blurtHint: 'Kopf, Schmerzen, Fieber',
      missions: [
        { id: 'm1', titleEs: 'Describir al menos 1 síntoma' },
        { id: 'm2', titleEs: 'Indicar desde cuándo (seit gestern)' },
        { id: 'm3', titleEs: 'Pedir justificante o receta (Rezept/Attest)' },
      ],
      starterSuggestions: [
        { de: 'Guten Tag! Ich habe seit gestern Fieber und Kopfschmerzen.', es: '¡Buenos días! Tengo fiebre y dolor de cabeza desde ayer.', grammarTag: 'Dativ' },
        { de: 'Ich brauche bitte eine Krankschreibung für die Arbeit.', es: 'Necesito por favor una baja médica para el trabajo.', grammarTag: 'Akk' },
        { de: 'Wie oft muss ich die Tabletten nehmen?', es: '¿Cuántas veces debo tomar las pastillas?', grammarTag: 'Modal' },
      ],
      prompt:
        'Eres un médico en Alemania. El usuario es tu paciente. Empieza diciendo "Guten Tag! Was fehlt Ihnen?". Responde SOLO en alemán nivel A1.',
    },
    {
      id: 'party',
      title: 'Fiesta de Intercambio',
      axis: 'general',
      icon: '👋',
      desc: 'Preséntate a un desconocido.',
      blurtHint: 'Hallo, Name, kommen',
      missions: [
        { id: 'm1', titleEs: 'Presentarte con nombre y país' },
        { id: 'm2', titleEs: 'Hablar de tu trabajo o aficiones' },
        { id: 'm3', titleEs: 'Hacer una pregunta usando du' },
      ],
      starterSuggestions: [
        { de: 'Hallo! Ich heiße Marcos und komme aus Spanien.', es: '¡Hola! Me llamo Marcos y vengo de España.', grammarTag: 'du' },
        { de: 'Ich wohne jetzt in Deutschland und arbeite als Techniker.', es: 'Ahora vivo en Alemania y trabajo como técnico.', grammarTag: 'V2' },
        { de: 'Was sind deine Hobbys in deiner Freizeit?', es: '¿Cuáles son tus aficiones en tu tiempo libre?', grammarTag: 'du' },
      ],
      prompt:
        'Eres un estudiante de intercambio en una fiesta en Múnich. Quieres conocer al usuario. Empieza diciendo "Hallo! Ich bin Max. Wie heißt du?". Responde SOLO en alemán nivel A1.',
    },
    {
      id: 'police_roadside',
      title: 'Polizeikontrolle & Pannenhilfe',
      axis: 'survival',
      badge: 'Cap. 13 & 21 • StVO',
      icon: '🚔',
      desc: 'Control policial y avería en carretera (Führerschein, Warnweste).',
      blurtHint: 'Führerschein, Fahrzeugschein, Warndreieck, Warnweste',
      missions: [
        { id: 'm1', titleEs: 'Entregar carnet y permiso (Führerschein)' },
        { id: 'm2', titleEs: 'Confirmar chaleco y triángulo (Warnweste/Warndreieck)' },
        { id: 'm3', titleEs: 'Explicar motivo o avería cortésmente' },
      ],
      starterSuggestions: [
        { de: 'Guten Tag! Hier sind mein Führerschein und der Fahrzeugschein.', es: '¡Buenos días! Aquí están mi carnet y el permiso del coche.', grammarTag: 'Sie' },
        { de: 'Die Warnweste und das Warndreieck sind im Kofferraum.', es: 'El chaleco y el triángulo están en el maletero.', grammarTag: 'Dativ' },
        { de: 'Mein Auto hat eine Panne am Motor.', es: 'Mi coche tiene una avería en el motor.', grammarTag: 'Akk' },
      ],
      prompt:
        'Eres un agente de policía amable en un control de tráfico o ayuda en carretera en Alemania. El usuario es un conductor de nivel A1 de alemán. Empieza diciendo "Guten Tag! Allgemeine Verkehrskontrolle. Führerschein und Fahrzeugschein, bitte." Usa oraciones cortas A1 y vocabulario de seguridad vial (Führerschein, Fahrzeugschein, Warndreieck, Warnweste). Responde SOLO en alemán.',
    },
    {
      id: 'solar_construction',
      title: 'Baustelle & Photovoltaik-Sicherheit',
      axis: 'work',
      badge: 'Cap. 18 & 20 • Enpal / VDE',
      icon: '☀️',
      desc: 'Seguridad en obra y montaje solar (Helm, Stromkreis, Wechselrichter).',
      blurtHint: 'Helm, Stromkreis, Wechselrichter, Spannungsprüfer',
      missions: [
        { id: 'm1', titleEs: 'Confirmar EPP (Helm, Schutzbrille, Schuhe)' },
        { id: 'm2', titleEs: 'Confirmar circuito sin tensión (freischalten / Duspol)' },
        { id: 'm3', titleEs: 'Reportar estado de montaje del Wechselrichter' },
      ],
      starterSuggestions: [
        { de: 'Ja, ich trage meinen Helm, die Schutzbrille und Isolierhandschuhe.', es: 'Sí, llevo mi casco, gafas protectoras y guantes aislantes.', grammarTag: 'Akk' },
        { de: 'Der Stromkreis ist freigeschaltet und mit dem Duspol geprüft.', es: 'El circuito está desconectado y verificado con el Duspol.', grammarTag: 'VDE' },
        { de: 'Wir montieren jetzt den Wechselrichter im Technikraum.', es: 'Ahora montamos el inversor en el cuarto técnico.', grammarTag: 'V2' },
      ],
      prompt:
        'Eres el jefe de obra (Bauleiter) en una instalación fotovoltaica en Alemania (solo interiores: Keller/Technikraum/Zählerschrank). El usuario es técnico de nivel A1. Empieza saludando y revisando la seguridad eléctrica: "Guten Morgen! Hast du deinen Helm dabei? Ist der Stromkreis am Wechselrichter sicher unterbrochen?" Usa oraciones cortas A1 y vocabulario técnico (Helm, Stromkreis, Wechselrichter, Spannungsprüfer). Responde SOLO en alemán.',
    },
    {
      id: 'it_helpdesk',
      title: 'IT-Helpdesk im Büro',
      axis: 'work',
      badge: 'Cap. 17 • IT & Software',
      icon: '💻',
      desc: 'Soporte técnico en la oficina (Passwort, WLAN, Drucker).',
      blurtHint: 'Passwort, WLAN, Bildschirm, Drucker',
      missions: [
        { id: 'm1', titleEs: 'Explicar el problema técnico (WLAN/Drucker)' },
        { id: 'm2', titleEs: 'Seguir una instrucción del técnico' },
        { id: 'm3', titleEs: 'Confirmar que funciona y agradecer' },
      ],
      starterSuggestions: [
        { de: 'Hallo! Mein Laptop hat keine Verbindung zum WLAN.', es: '¡Hola! Mi portátil no tiene conexión al Wi-Fi.', grammarTag: 'Akk' },
        { de: 'Ich habe mein Passwort vergessen und brauche Hilfe.', es: 'He olvidado mi contraseña y necesito ayuda.', grammarTag: 'Perfekt' },
        { de: 'Jetzt funktioniert der Drucker wieder. Vielen Dank!', es: 'Ahora la impresora vuelve a funcionar. ¡Muchas gracias!', grammarTag: 'V2' },
      ],
      prompt:
        'Eres un técnico de soporte (IT-Helpdesk) en una oficina en Alemania. El usuario es un empleado de nivel A1 con un fallo técnico. Empieza diciendo "Hallo, IT-Helpdesk! Was funktioniert nicht? Das WLAN, der Drucker oder dein Passwort?" Usa oraciones cortas A1 con vocabulario de oficina y TI (Passwort, WLAN, Bildschirm, Drucker). Responde SOLO en alemán.',
    },
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSelectScenario = (scen) => {
    stopCurrentAudio();
    setPlayingMsgIndex(null);
    setPlayingSuggestionText(null);
    setScenario(scen);
    setMissionsStatus(
      (scen.missions || DEFAULT_MISSIONS).map((m) => ({
        id: m.id,
        titleEs: m.titleEs,
        completed: false,
        evidenceDe: '',
      }))
    );
    setSuggestions(scen.starterSuggestions || DEFAULT_SUGGESTIONS);
    setShowSuggestions(true);
    setIsDiagnosticOpen(false);
    setDiagnosticData(null);

    if (initialMode === 'phrase') {
      setIsBlurting(false);
      startScenario(scen);
    } else {
      setIsBlurting(true);
      setBlurtInput('');
    }
  };

  const submitBlurting = () => {
    if (blurtInput.trim().split(/[\s,;]+/).filter((w) => w.length >= 2).length < 2) return;
    setIsBlurting(false);
    recordSkillActivity('writing', 3).catch(() => {});
    startScenario(scenario);
  };

  const streamRoleplayTurn = async (conversationHistory, scen, prevMissions) => {
    const currentUser = getAuth().currentUser;
    const idToken = currentUser ? await currentUser.getIdToken().catch(() => '') : '';
    const response = await fetch(API_ENDPOINTS.ROLEPLAY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
      },
      body: JSON.stringify({
        historialConversacion: conversationHistory,
        escenario: scen.prompt,
        responseFormat: 'roleplay_v2',
        action: 'turn',
        missions: scen.missions || DEFAULT_MISSIONS,
        previousMissionsStatus: prevMissions,
      }),
    });
    if (!response.ok) throw new Error('Failed to connect to Roleplay');

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let legacyText = '';

    setMessages((prev) => [
      ...prev,
      { role: 'model', parts: [{ text: '' }], structuredMeta: null },
    ]);
    setLoading(false);

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');
      for (const line of lines) {
        if (!line.startsWith('data: ') || line.includes('[DONE]')) continue;
        try {
          const data = JSON.parse(line.substring(6));
          if (data.type === 'reply_de_ready' && data.replyDe) {
            setMessages((prev) => {
              const updated = [...prev];
              const lastIdx = updated.length - 1;
              if (lastIdx >= 0) {
                updated[lastIdx] = {
                  role: 'model',
                  parts: [{ text: data.replyDe }],
                  structuredMeta: { ...(updated[lastIdx].structuredMeta || {}), replyDe: data.replyDe },
                };
              }
              return updated;
            });
          } else if (data.type === 'roleplay_turn_v2' && data.payload) {
            const p = data.payload;
            const replyText = (p.replyDe || '').replace(/\*\*/g, '');
            setMessages((prev) => {
              const updated = [...prev];
              const lastIdx = updated.length - 1;
              if (lastIdx >= 0) {
                updated[lastIdx] = {
                  role: 'model',
                  parts: [{ text: replyText }],
                  structuredMeta: {
                    replyDe: replyText,
                    translationEs: p.translationEs || '',
                    grammarCorrections: Array.isArray(p.grammarCorrections) ? p.grammarCorrections : [],
                    suggestedReplies: Array.isArray(p.suggestedReplies) ? p.suggestedReplies : [],
                  },
                };
              }
              return updated;
            });
            if (Array.isArray(p.suggestedReplies) && p.suggestedReplies.length > 0) {
              setSuggestions(p.suggestedReplies);
            }
            if (Array.isArray(p.missionsStatus) && p.missionsStatus.length > 0) {
              setMissionsStatus((prev) =>
                (scen.missions || DEFAULT_MISSIONS).map((m, i) => {
                  const found = p.missionsStatus.find((ms) => ms.id === m.id) || p.missionsStatus[i];
                  const old = prev.find((om) => om.id === m.id);
                  return {
                    id: m.id,
                    titleEs: m.titleEs,
                    completed: Boolean(old?.completed) || Boolean(found?.completed),
                    evidenceDe: found?.evidenceDe || old?.evidenceDe || '',
                  };
                })
              );
            }
          } else if (data.text) {
            legacyText += data.text;
            const cleanedText = legacyText.replace(/\*\*/g, '');
            setMessages((prev) => {
              const updated = [...prev];
              const lastIdx = updated.length - 1;
              if (lastIdx >= 0) {
                updated[lastIdx] = {
                  role: 'model',
                  parts: [{ text: cleanedText }],
                };
              }
              return updated;
            });
          }
        } catch {
          // Ignorar fragmento SSE parcial
        }
      }
    }
  };

  const startScenario = async (scen) => {
    stopCurrentAudio();
    setPlayingMsgIndex(null);
    setScenario(scen);
    setMessages([]);
    setLoading(true);
    const initialMsgs = [
      {
        role: 'user',
        parts: [{ text: 'Hola, inicia la simulación según las instrucciones.' }],
      },
    ];
    try {
      await streamRoleplayTurn(initialMsgs, scen, []);
    } catch {
      setMessages([
        {
          role: 'model',
          parts: [{ text: 'Entschuldigung, es gibt ein Verbindungsproblem. (Error de conexión).' }],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !scenario || loading) return;
    stopCurrentAudio();
    setPlayingMsgIndex(null);
    setPlayingSuggestionText(null);

    const newMsgs = [
      ...messages,
      { role: 'user', parts: [{ text: input.trim() }] },
    ];
    setMessages(newMsgs);
    setInput('');
    recordDailyStudyActivity().catch(() => {});
    recordSkillActivity('writing', 4).catch(() => {});
    setLoading(true);
    try {
      await streamRoleplayTurn(newMsgs, scenario, missionsStatus);
    } catch (e) {
      console.error(e);
      setMessages([
        ...newMsgs,
        {
          role: 'model',
          parts: [{ text: 'Entschuldigung, es gibt ein Verbindungsproblem. (Error de conexión).' }],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const buildLocalRoleplayDiagnostic = () => {
    const collectedErrors = [];
    messages.forEach((m, idx) => {
      const corrs = m?.structuredMeta?.grammarCorrections || [];
      corrs.forEach((c, cIdx) => {
        collectedErrors.push({
          id: `rp_loc_${idx}_${cIdx}`,
          userAttempt: c.original || '',
          correctedDe: c.corrected || '',
          explanationEs: c.explanationEs || '',
          category: c.category || 'vocab',
        });
      });
    });
    const completed = missionsStatus.filter((m) => m.completed).length;
    return {
      sessionId: `rp_${scenario?.id || 'scen'}_${Date.now()}`,
      mode: initialMode === 'phrase' ? 'phrase' : 'roleplay',
      title: scenario?.title || 'Roleplay A1',
      fluencyScore: Math.round(55 + (completed / Math.max(1, missionsStatus.length)) * 40),
      summaryEs: `Completaste ${completed} de ${missionsStatus.length} misiones en "${scenario?.title}".`,
      missions: missionsStatus,
      errors: collectedErrors,
      vocabulary: [],
    };
  };

  const handleEvaluateAndFinish = async () => {
    if (!scenario) return;
    stopCurrentAudio();
    setPlayingMsgIndex(null);
    setIsDiagnosticOpen(true);
    setIsAnalyzingDiagnostic(true);

    try {
      const currentUser = getAuth().currentUser;
      const idToken = currentUser ? await currentUser.getIdToken().catch(() => '') : '';
      const response = await fetch(API_ENDPOINTS.ROLEPLAY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(idToken ? { Authorization: `Bearer ${idToken}` } : {}),
        },
        body: JSON.stringify({
          historialConversacion: messages,
          escenario: scenario.prompt,
          responseFormat: 'roleplay_v2',
          action: 'evaluate_final',
          missions: scenario.missions || DEFAULT_MISSIONS,
          previousMissionsStatus: missionsStatus,
        }),
      });
      if (!response.ok) throw new Error('Roleplay eval error');
      const data = await response.json();
      setDiagnosticData({
        sessionId: `rp_${scenario.id}_${Date.now()}`,
        mode: initialMode === 'phrase' ? 'phrase' : 'roleplay',
        title: scenario.title,
        fluencyScore: data.fluencyScore ?? 75,
        summaryEs: data.summaryEs,
        nextStepTipEs: data.nextStepTipEs,
        missions: data.missionsStatus || missionsStatus,
        errors: (data.errorsSummary || []).map((err, i) => ({
          id: err.id || `rp_err_${i}`,
          userAttempt: err.userSaid || '',
          correctedDe: err.correctedDe || '',
          translationEs: err.translationEs || '',
          explanationEs: err.explanationEs || '',
          category: err.category || 'vocab',
        })),
        vocabulary: data.vocabularyExtracted || [],
      });
      recordSkillActivity('speaking', 5).catch(() => {});
    } catch {
      setDiagnosticData(buildLocalRoleplayDiagnostic());
    } finally {
      setIsAnalyzingDiagnostic(false);
    }
  };

  const userTurnsCount = messages.filter(
    (m) => m.role === 'user' && m?.parts?.[0]?.text !== 'Hola, inicia la simulación según las instrucciones.'
  ).length;

  const completedMissionsCount = missionsStatus.filter((m) => m.completed).length;

  if (!scenario) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8 max-w-3xl mx-auto mt-4 sm:mt-8 animate-in fade-in zoom-in duration-300 relative">
        <button
          type="button"
          onClick={() => {
            stopCurrentAudio();
            onExit();
          }}
          className="absolute top-4 right-4 flex items-center gap-2 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-lg transition font-bold shadow-sm cursor-pointer"
        >
          <X size={18} /> Salir
        </button>
        <div className="text-center mb-8 mt-6 sm:mt-4">
          <div className="inline-flex bg-purple-100 text-purple-600 p-3 rounded-full mb-4 shadow-sm">
            <Sparkles size={32} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800">Simulador de Rol A1</h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Practica situaciones reales con 3 misiones, micrófono en alemán, sugerencias A1 y diagnóstico SRS.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {scenarios.map((scen) => (
            <button
              key={scen.id}
              type="button"
              onClick={() => handleSelectScenario(scen)}
              className="flex flex-col items-center p-5 bg-slate-50 border-2 border-slate-200 hover:border-purple-400 hover:bg-purple-50 rounded-xl transition-all text-center group cursor-pointer shadow-sm"
            >
              <span className="text-4xl sm:text-5xl mb-3 group-hover:scale-110 transition-transform">
                {scen.icon}
              </span>
              {scen.badge && (
                <span className="mb-2 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-700 border border-purple-200">
                  {scen.badge}
                </span>
              )}
              <h3 className="font-bold text-slate-800 text-base sm:text-lg">{scen.title}</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5">{scen.desc}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (scenario && isBlurting) {
    return (
      <div className="relative bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8 max-w-xl mx-auto mt-6 sm:mt-10 animate-in fade-in zoom-in duration-300 text-center">
        <button
          type="button"
          onClick={() => {
            stopCurrentAudio();
            setScenario(null);
            setIsBlurting(false);
          }}
          className="absolute top-4 right-4 flex items-center gap-2 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-lg transition font-bold shadow-sm cursor-pointer"
        >
          <X size={18} /> Salir
        </button>
        <div className="inline-flex bg-amber-100 text-amber-600 p-4 rounded-full mb-5 shadow-sm mt-4 sm:mt-0">
          <span className="text-4xl">🧠</span>
        </div>
        <h2 className="text-2xl font-black text-slate-800 mb-2">Calentamiento Cognitivo</h2>
        <p className="text-slate-500 mb-6 leading-relaxed text-sm sm:text-base">
          Antes de entrar al escenario <span className="font-bold text-purple-600">{scenario.title}</span>, escribe rápido{' '}
          <span className="font-bold">3 palabras en alemán</span> que recuerdes sobre este tema.
        </p>
        <div className="relative mb-5">
          <input
            type="text"
            autoFocus
            className="w-full bg-slate-100 border-2 border-slate-200 focus:border-purple-400 focus:bg-white rounded-xl py-3.5 px-5 text-sm text-slate-800 outline-none transition shadow-inner placeholder:text-slate-400"
            placeholder={`Ej: ${scenario.blurtHint || 'Hallo, Name, kommen'}...`}
            value={blurtInput}
            onChange={(e) => setBlurtInput(e.target.value)}
            onFocus={scrollInputIntoView}
            onKeyDown={(e) => e.key === 'Enter' && submitBlurting()}
          />
        </div>
        <button
          type="button"
          onClick={submitBlurting}
          disabled={blurtInput.trim().length < 3}
          className="w-full min-h-[44px] py-3.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl transition shadow-md text-base cursor-pointer"
        >
          Comenzar Rol ✨
        </button>
        <p className="text-xs text-slate-400 mt-4">Pulsa Enter o haz clic para continuar</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 flex flex-col min-h-[460px] h-[calc(100dvh-9.5rem)] sm:h-[720px] sm:max-h-[85vh] max-w-3xl mx-auto sm:mt-4 overflow-hidden animate-in slide-in-from-bottom-4">
        {/* Cabecera + tracker de 3 misiones */}
        <div className="bg-purple-700 text-white px-4 py-3 shadow-md z-10 flex-shrink-0 space-y-2.5">
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="text-2xl shrink-0">{scenario.icon}</span>
              <div className="min-w-0">
                <h3 className="font-bold text-base sm:text-lg leading-tight truncate">{scenario.title}</h3>
                <p className="text-purple-200 text-xs">
                  Misiones: {completedMissionsCount}/{missionsStatus.length || 3}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {userTurnsCount >= 1 && (
                <button
                  type="button"
                  onClick={handleEvaluateAndFinish}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-3 py-1.5 rounded-lg transition text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <ClipboardCheck size={15} />
                  <span>Finalizar y Evaluar</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  stopCurrentAudio();
                  setPlayingMsgIndex(null);
                  setScenario(null);
                }}
                className="text-purple-100 hover:text-white hover:bg-purple-800 px-2.5 py-1.5 rounded-lg transition text-xs sm:text-sm font-bold flex items-center gap-1 cursor-pointer"
              >
                <X size={16} />
                <span className="hidden sm:inline">Cambiar</span>
              </button>
            </div>
          </div>

          {/* Tira compacta de 3 misiones */}
          <div className="flex flex-nowrap gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {missionsStatus.map((m, idx) => (
              <div
                key={m.id || idx}
                className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition ${
                  m.completed
                    ? 'bg-emerald-400/25 border-emerald-300/60 text-white'
                    : 'bg-purple-900/50 border-purple-400/30 text-purple-100'
                }`}
              >
                <CheckCircle2
                  size={12}
                  className={m.completed ? 'text-emerald-300' : 'text-purple-300/50'}
                />
                <span>{m.titleEs}</span>
              </div>
            ))}
          </div>
        </div>

        <ConversationThread
          messages={messages}
          theme="purple"
          botLabel="Interlocutor IA"
          isLoading={loading}
          loadingLabel="El personaje está respondiendo..."
          playingMsgIndex={playingMsgIndex}
          onPlayAudio={handlePlayAudio}
          skipInitialSeed={true}
          chatEndRef={chatEndRef}
        />

        <ComposerBar
          value={input}
          onChange={setInput}
          onSend={sendMessage}
          placeholder="Responde en alemán o usa el micrófono..."
          disabled={loading}
          accent="purple"
          suggestions={suggestions}
          showSuggestions={showSuggestions}
          onToggleSuggestions={() => setShowSuggestions((v) => !v)}
          onSelectSuggestion={(item) => item?.de && setInput(item.de)}
          onPlaySuggestionAudio={handlePlaySuggestionAudio}
          playingSuggestionText={playingSuggestionText}
        />
      </div>

      {isDiagnosticOpen && (
        <SessionDiagnosticCard
          key={diagnosticData?.sessionId || 'roleplay_eval'}
          isOpen={isDiagnosticOpen}
          isAnalyzing={isAnalyzingDiagnostic}
          diagnostic={diagnosticData}
          onPlayCorrectionAudio={(textDe) => playGermanAudio(textDe, { type: 'dialogue', voice: 'Charon' })}
          onSaveToSrs={({ errors, vocabulary }) =>
            captureConversationBundle({
              vocabItems: vocabulary,
              grammarErrors: errors,
              axis: scenario?.axis || 'general',
              source: initialMode === 'phrase' ? 'dialogue' : 'roleplay',
              sourceRef: scenario?.id || 'roleplay',
            })
          }
          onContinue={() => setIsDiagnosticOpen(false)}
          onExit={() => {
            setIsDiagnosticOpen(false);
            setScenario(null);
            onExit?.();
          }}
        />
      )}
    </>
  );
};

export default RoleplaySimulator;
