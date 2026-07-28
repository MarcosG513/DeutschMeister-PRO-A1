import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import { 
  User, Mail, Lock, RefreshCw, Crown, CheckCircle2, Flame, Coins, 
  Layers, Trophy, Volume2, ShieldCheck, FileText, ChevronRight, 
  ArrowLeft, Edit3, Trash2, ExternalLink, LogOut, Check, AlertCircle 
} from 'lucide-react';
import { EmailAuthProvider, GoogleAuthProvider, linkWithCredential, linkWithPopup, signInWithEmailAndPassword, signInWithPopup, signOut, deleteUser } from 'firebase/auth';

const AVATARS = ['🦊', '🦉', '🐼', '🦁', '🐯', '🐸', '🦄', '🦖', '🚀', '👑', '⚡', '🎓'];

const Profile = ({ onExit, user, auth, unlockedCardsCount = 45, totalCardsCount = 1089 }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(() => {
    return localStorage.getItem('dm_user_avatar') || '🦊';
  });
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);
  const [voiceSpeed, setVoiceSpeed] = useState(() => {
    return localStorage.getItem('dm_voice_speed') || '0.7x';
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [streak, setStreak] = useState(0);
  const [coins, setCoins] = useState(0);

  const isRegistered = user && user.isAnonymous === false;

  useEffect(() => {
    const loadGamificationData = async () => {
      try {
        const savedStreak = await localforage.getItem('dm_user_streak');
        const savedCoins = await localforage.getItem('dm_user_coins');
        const fallbackStreak = parseInt(localStorage.getItem('dm_quiz_streak') || '0', 10);
        setStreak(savedStreak !== null && savedStreak !== undefined ? savedStreak : fallbackStreak);
        setCoins(savedCoins !== null && savedCoins !== undefined ? savedCoins : 0);
      } catch (error) {
        console.error("Error cargando datos de gamificación:", error);
      }
    };
    loadGamificationData();
    window.addEventListener('coinsUpdated', loadGamificationData);
    return () => {
      window.removeEventListener('coinsUpdated', loadGamificationData);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('dm_voice_speed', voiceSpeed);
  }, [voiceSpeed]);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setIsLoading(true);
    setError(null);
    setMessage(null);

    const targetAuth = auth || (user && user.auth);
    const currentUser = targetAuth?.currentUser || user;

    if (isLoginMode) {
      // MODO INICIAR SESIÓN (Recupera sesión existente)
      try {
        if (!targetAuth) throw new Error("Servicio de autenticación no disponible");
        await signInWithEmailAndPassword(targetAuth, email, password);
        setMessage("¡Sesión iniciada con éxito! Tu progreso ha sido restaurado.");
      } catch (err) {
        console.warn("Error iniciando sesión:", err);
        if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
          setError("Correo o contraseña incorrectos. Por favor verifica tus credenciales.");
        } else {
          setError(err.message || "Error al iniciar sesión. Por favor intenta de nuevo.");
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      // MODO VINCULAR CUENTA (Upgrade de anónimo a permanente)
      try {
        const credential = EmailAuthProvider.credential(email, password);
        if (currentUser && currentUser.isAnonymous) {
          await linkWithCredential(currentUser, credential);
          setMessage("¡Cuenta vinculada con éxito! Tu progreso ahora está guardado en la nube.");
        } else if (targetAuth) {
          await signInWithEmailAndPassword(targetAuth, email, password);
          setMessage("¡Sesión iniciada con éxito!");
        }
      } catch (err) {
        console.warn("Error vinculando credencial:", err);
        if ((err.code === 'auth/credential-already-in-use' || err.code === 'auth/email-already-in-use') && targetAuth) {
          try {
            await signInWithEmailAndPassword(targetAuth, email, password);
            setMessage("¡Esta cuenta ya existía y tu sesión fue restaurada con éxito!");
          } catch (signInErr) {
            setError("Esta cuenta ya existe. La contraseña ingresada no coincide.");
          }
        } else {
          setError(err.message || "No se pudo vincular la cuenta. Revisa tus datos e inténtalo de nuevo.");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    const targetAuth = auth || (user && user.auth);
    const currentUser = targetAuth?.currentUser || user;

    try {
      const provider = new GoogleAuthProvider();
      if (isLoginMode && targetAuth) {
        await signInWithPopup(targetAuth, provider);
        setMessage("¡Sesión iniciada con Google!");
      } else if (currentUser && currentUser.isAnonymous) {
        await linkWithPopup(currentUser, provider);
        setMessage("¡Cuenta vinculada con éxito mediante tu cuenta de Google!");
      } else if (targetAuth) {
        await signInWithPopup(targetAuth, provider);
        setMessage("¡Sesión iniciada con Google!");
      }
    } catch (err) {
      console.warn("Error en login/link con Google:", err);
      if ((err.code === 'auth/credential-already-in-use' || err.code === 'auth/email-already-in-use') && targetAuth) {
        try {
          const provider = new GoogleAuthProvider();
          await signInWithPopup(targetAuth, provider);
          setMessage("¡Sesión iniciada con tu cuenta de Google existente!");
        } catch (popupErr) {
          if (popupErr.code === 'auth/popup-closed-by-user' || popupErr.code === 'auth/user-cancelled') {
            setError("Autenticación cancelada por el usuario.");
          } else {
            setError("No se pudo iniciar sesión con la cuenta de Google.");
          }
        }
      } else if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/user-cancelled') {
        setError("Autenticación cancelada por el usuario.");
      } else {
        setError("Ocurrió un error. Verifica tus credenciales e intenta de nuevo.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    const targetAuth = auth || (user && user.auth);
    if (!targetAuth) return;
    setIsLoading(true);
    setError(null);
    try {
      await signOut(targetAuth);
      setMessage("Sesión cerrada.");
    } catch (err) {
      setError("Error al cerrar sesión.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    const targetAuth = auth || (user && user.auth);
    const currentUser = targetAuth?.currentUser || user;
    if (!currentUser) return;
    
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar permanentemente tu cuenta? Esta acción borrará todo tu progreso de forma irreversible.");
    if (!confirmDelete) return;

    setIsLoading(true);
    setError(null);
    try {
      await deleteUser(currentUser);
      setMessage("Cuenta eliminada correctamente.");
    } catch (err) {
      if (err.code === 'auth/requires-recent-login') {
        setError("Por seguridad, debes volver a iniciar sesión antes de eliminar tu cuenta.");
      } else {
        setError("Error al eliminar la cuenta. Inténtalo de nuevo.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[100svh] w-full bg-[#f7f9fb] text-slate-900 pb-24 md:pb-12 animate-in fade-in duration-300">
      {/* Header Bar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm px-4 py-3 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={onExit} 
            className="p-2 rounded-full hover:bg-slate-100 text-slate-700 transition active:scale-95 cursor-pointer"
            aria-label="Volver"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <User className="text-blue-600" size={22} /> Perfil y Configuración
          </h1>
        </div>
        <span className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-200">
          Goethe A1
        </span>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Auth & PRO Panel */}
          <div className="col-span-1 lg:col-span-7 space-y-6">
            
            {/* Identity & Auth Card */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-200 flex flex-col items-center text-center">
              
              {/* Avatar Selector Gamificado */}
              <div className="relative mb-4 flex flex-col items-center">
                <div 
                  onClick={() => setIsAvatarPickerOpen(prev => !prev)}
                  className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-md flex items-center justify-center text-5xl select-none cursor-pointer hover:bg-slate-200/60 transition active:scale-95 relative"
                  title="Cambiar avatar"
                >
                  <span>{selectedAvatar}</span>
                  <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setIsAvatarPickerOpen(prev => !prev); }}
                    className="absolute bottom-0 right-0 bg-slate-800 text-white p-2 rounded-full shadow hover:bg-slate-900 transition active:scale-95 cursor-pointer border-2 border-white"
                    aria-label="Seleccionar avatar"
                  >
                    <Edit3 size={14} />
                  </button>
                </div>

                {/* Dropdown de Avatares Gamificados */}
                {isAvatarPickerOpen && (
                  <div className="mt-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-xl animate-in zoom-in-95 duration-200 z-20 max-w-xs">
                    <p className="text-xs font-bold text-slate-500 mb-2 text-center">Elige tu Avatar Gamificado</p>
                    <div className="grid grid-cols-4 gap-2">
                      {AVATARS.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => {
                            setSelectedAvatar(emoji);
                            localStorage.setItem('dm_user_avatar', emoji);
                            setIsAvatarPickerOpen(false);
                          }}
                          className={`text-2xl p-2 rounded-xl hover:bg-blue-50 transition active:scale-90 cursor-pointer ${
                            selectedAvatar === emoji ? 'bg-blue-100 border-2 border-blue-500' : 'bg-slate-50 border border-slate-100'
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Status Badge */}
              <div className="mb-3">
                {isRegistered ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    <Check size={14} /> Estudiante Registrado
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    Usuario Invitado
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-1">
                {isRegistered && user?.email ? user.email : 'Usuario Invitado'}
              </h2>
              <p className="text-sm font-medium text-slate-500 mb-6">
                {isRegistered ? 'Cuenta sincronizada en la nube de Firebase.' : 'Guarda tu progreso antes de que se pierda.'}
              </p>

              {/* Mensajes de Alerta */}
              {error && (
                <div className="w-full max-w-md mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2 text-left">
                  <AlertCircle size={16} className="shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}
              {message && (
                <div className="w-full max-w-md mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 text-left">
                  <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
                  <span>{message}</span>
                </div>
              )}

              {/* Formulario & Google Auth (Visible solo para Anónimos) */}
              {!isRegistered ? (
                <div className="w-full max-w-md space-y-5 mb-6">
                  {/* Botón de Google OAuth */}
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold py-3.5 px-6 rounded-2xl border border-slate-200 shadow-sm active:scale-[0.98] transition flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 text-sm"
                  >
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continuar con Google</span>
                  </button>

                  {/* Divisor estético O */}
                  <div className="relative flex items-center justify-center my-4">
                    <div className="border-t border-slate-200 w-full" />
                    <span className="bg-white px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider absolute">
                      o con email
                    </span>
                  </div>

                  {/* Formulario clásico de Email/Contraseña */}
                  <form onSubmit={handleAuthSubmit} className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Correo electrónico"
                        required
                        className="w-full bg-slate-50 pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none text-slate-900 placeholder-slate-400 transition text-sm"
                      />
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        required
                        className="w-full bg-slate-50 pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 focus:outline-none text-slate-900 placeholder-slate-400 transition text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl shadow-md hover:shadow-lg active:scale-[0.98] transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm"
                    >
                      <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
                      <span>
                        {isLoading 
                          ? (isLoginMode ? "Iniciando sesión..." : "Vinculando...") 
                          : (isLoginMode ? "Iniciar Sesión" : "Vincular Cuenta / Guardar Progreso")
                        }
                      </span>
                    </button>

                    {/* Alternar Modo Iniciar Sesión vs Vincular Cuenta */}
                    <div className="text-center pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsLoginMode(prev => !prev);
                          setError(null);
                          setMessage(null);
                        }}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline transition cursor-pointer"
                      >
                        {isLoginMode ? "¿No tienes cuenta? Guarda tu progreso" : "¿Ya tienes cuenta? Inicia sesión"}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* Acciones para Usuarios Registrados */
                <div className="w-full max-w-md flex flex-col sm:flex-row items-center gap-3 mb-6">
                  <button
                    onClick={handleSignOut}
                    disabled={isLoading}
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-6 rounded-xl shadow transition flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50"
                  >
                    <LogOut size={16} />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              )}

              {/* Acción de eliminación de cuenta */}
              <button 
                onClick={handleDeleteUser}
                disabled={isLoading}
                className="text-rose-600 hover:text-rose-700 text-xs font-semibold hover:underline transition flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <Trash2 size={14} /> Eliminar cuenta permanentemente
              </button>
            </section>

            {/* Premium RevenueCat PRO Card */}
            <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-8 shadow-xl text-white relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 border border-indigo-400/30">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />
              
              <div className="z-10 flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                  <Crown className="text-amber-300" size={28} />
                  <h3 className="text-2xl font-bold text-white tracking-wide">DeutschMeister PRO</h3>
                </div>
                <ul className="space-y-2 font-medium text-sm text-indigo-100">
                  <li className="flex items-center justify-center sm:justify-start gap-2">
                    <CheckCircle2 size={16} className="text-amber-300 shrink-0" />
                    <span>Tutor IA Ilimitado & Explicaciones Socráticas</span>
                  </li>
                  <li className="flex items-center justify-center sm:justify-start gap-2">
                    <CheckCircle2 size={16} className="text-amber-300 shrink-0" />
                    <span>Cero Anuncios & Experiencia Fluida</span>
                  </li>
                  <li className="flex items-center justify-center sm:justify-start gap-2">
                    <CheckCircle2 size={16} className="text-amber-300 shrink-0" />
                    <span>Audios Nativos & Tarjetas Infinitas</span>
                  </li>
                </ul>
              </div>

              <div className="z-10 flex flex-col items-center gap-3 w-full sm:w-auto">
                <button 
                  onClick={() => alert('Próximamente suscripciones RevenueCat PRO')}
                  className="w-full sm:w-auto bg-white text-indigo-900 font-bold px-8 py-3.5 rounded-xl shadow-lg hover:bg-slate-50 active:scale-[0.98] transition whitespace-nowrap cursor-pointer text-sm"
                >
                  Actualizar a PRO
                </button>
                <button 
                  onClick={() => alert('Restaurando compras de la tienda...')}
                  className="text-indigo-200 text-xs font-semibold hover:text-white transition underline-offset-4 hover:underline cursor-pointer"
                >
                  Restaurar compras
                </button>
              </div>
            </section>
          </div>

          {/* Right Column: Stats & Settings */}
          <div className="col-span-1 lg:col-span-5 space-y-6">
            
            {/* Gamification Grid (2x2) */}
            <section className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col items-center text-center">
                <span className="text-3xl mb-2">🔥</span>
                <p className="text-lg font-bold text-slate-900">{streak} {streak === 1 ? 'Día' : 'Días'}</p>
                <p className="text-xs font-medium text-slate-500">Racha Actual</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col items-center text-center">
                <span className="text-3xl mb-2">🪙</span>
                <p className="text-lg font-bold text-slate-900">{coins}</p>
                <p className="text-xs font-medium text-slate-500">Monedas</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col items-center text-center">
                <span className="text-3xl mb-2">🗂️</span>
                <p className="text-lg font-bold text-slate-900">{unlockedCardsCount}/{totalCardsCount}</p>
                <p className="text-xs font-medium text-slate-500">Cartas Desbloqueadas</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col items-center text-center">
                <span className="text-3xl mb-2">🏆</span>
                <p className="text-lg font-bold text-slate-900">A1</p>
                <p className="text-xs font-medium text-slate-500">Nivel Goethe</p>
              </div>
            </section>

            {/* iOS-Style Settings & Voice Speed Control */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
              
              {/* Speed Segment Control */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Volume2 className="text-blue-600" size={20} />
                  <span className="font-semibold text-slate-800 text-sm">Velocidad de Pronunciación</span>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-xl gap-1 border border-slate-200/60">
                  {['1.0x', '0.7x', '0.5x'].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setVoiceSpeed(speed)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        voiceSpeed === speed
                          ? 'bg-white text-blue-700 shadow-sm'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {speed}
                    </button>
                  ))}
                </div>
              </div>

              {/* Legal & Help Links */}
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); alert("DeutschMeister PRO A1 respeta tu privacidad. Ningún dato personal es vendido a terceros."); }}
                className="flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50 transition group"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck size={18} className="text-slate-400 group-hover:text-blue-600 transition" />
                  <span className="text-sm font-medium text-slate-800 group-hover:text-blue-600 transition">Política de Privacidad</span>
                </div>
                <ExternalLink size={16} className="text-slate-400 group-hover:text-blue-600 transition" />
              </a>

              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); alert("Términos y Condiciones del Servicio DeutschMeister PRO A1."); }}
                className="flex items-center justify-between p-4 hover:bg-slate-50 transition group"
              >
                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-slate-400 group-hover:text-blue-600 transition" />
                  <span className="text-sm font-medium text-slate-800 group-hover:text-blue-600 transition">Términos y Condiciones</span>
                </div>
                <ExternalLink size={16} className="text-slate-400 group-hover:text-blue-600 transition" />
              </a>
            </section>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Profile;
