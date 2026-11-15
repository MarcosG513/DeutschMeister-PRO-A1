import { useState } from 'react';
import {
  ShieldCheck,
  Clock,
  Ban,
  RefreshCw,
  LogOut,
  Loader2,
  AlertCircle,
  CheckCircle2,
  GraduationCap,
  WifiOff,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Download
} from 'lucide-react';
import InstallInstructionsModal from './InstallInstructionsModal';
import { usePWAInstall } from '../hooks/usePWAInstall';
import {
  signInWithGoogleUnified,
  signInWithEmailUnified,
  registerWithEmailUnified,
  resetPasswordUnified,
  signOutUnified
} from '../services/authService';

const GoogleLogo = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
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
);

const AuthAccessGate = ({
  user,
  auth,
  accessStatus = 'checking',
  verificationError = null,
  onRecheckAccess
}) => {
  const [busyAction, setBusyAction] = useState(null);
  const [localError, setLocalError] = useState(null);
  const [localSuccess, setLocalSuccess] = useState(null);
  const [imgError, setImgError] = useState(false);

  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {
    showWebInstallCard,
    showInstallInstructionsModal,
    setShowInstallInstructionsModal,
    handleInstallApp
  } = usePWAInstall();

  const isBusy = busyAction !== null;
  const isChecking = accessStatus === 'checking';
  const isUnauthenticated = !user || user.isAnonymous || accessStatus === 'unauthenticated';
  const isRevoked = accessStatus === 'revoked';
  const isPending = accessStatus === 'pending' || (!isChecking && !isUnauthenticated && !isRevoked);

  const combinedError = localError || verificationError;

  const switchAuthMode = (nextMode) => {
    setAuthMode(nextMode);
    setLocalError(null);
    setLocalSuccess(null);
  };

  const handleGoogleSignIn = async () => {
    setBusyAction('google');
    setLocalError(null);
    setLocalSuccess(null);
    try {
      const res = await signInWithGoogleUnified({
        authInstance: auth,
        isLoginMode: true,
        allowAnonymousLink: false
      });
      if (res?.redirecting && res?.message) {
        setLocalSuccess(res.message);
      }
    } catch (err) {
      setLocalError(err?.message || 'No se pudo iniciar sesión con Google.');
    } finally {
      setBusyAction(null);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    setLocalSuccess(null);

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !normalizedEmail.includes('@')) {
      setLocalError('Ingresa un correo electrónico válido.');
      return;
    }
    if (!password || password.length < 6) {
      setLocalError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setBusyAction('email');
    try {
      if (authMode === 'register') {
        const res = await registerWithEmailUnified(normalizedEmail, password, fullName, {
          authInstance: auth
        });
        if (res?.message) {
          setLocalSuccess(res.message);
        }
      } else {
        await signInWithEmailUnified(normalizedEmail, password, {
          authInstance: auth
        });
      }
    } catch (err) {
      setLocalError(
        err?.message ||
          (authMode === 'register'
            ? 'No se pudo registrar el correo.'
            : 'No se pudo iniciar sesión con correo.')
      );
    } finally {
      setBusyAction(null);
    }
  };

  const handleForgotPassword = async () => {
    setLocalError(null);
    setLocalSuccess(null);
    setBusyAction('reset');
    try {
      const res = await resetPasswordUnified(email, { authInstance: auth });
      setLocalSuccess(res?.message || 'Correo de recuperación enviado.');
    } catch (err) {
      setLocalError(err?.message || 'No se pudo enviar el enlace de recuperación.');
    } finally {
      setBusyAction(null);
    }
  };

  const handleVerifyNow = async () => {
    if (typeof onRecheckAccess !== 'function') return;
    setBusyAction('recheck');
    setLocalError(null);
    setLocalSuccess(null);
    try {
      await onRecheckAccess();
    } catch (err) {
      setLocalError(err?.message || 'Error al verificar tu autorización.');
    } finally {
      setBusyAction(null);
    }
  };

  const handleSwitchAccount = async () => {
    setBusyAction('signout');
    setLocalError(null);
    setLocalSuccess(null);
    try {
      await signOutUnified({ authInstance: auth });
    } catch (err) {
      setLocalError(err?.message || 'No se pudo cerrar sesión.');
    } finally {
      setBusyAction(null);
    }
  };

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Estudiante';
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <div className="min-h-[100dvh] w-full bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100 flex flex-col items-center justify-center px-4 pb-4 sm:px-6 sm:pb-6 pt-[max(0.75rem,env(safe-area-inset-top))] relative overflow-hidden">
      {/* Decoración sutil de fondo */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white text-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-300">
        {/* Cabecera de marca */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="bg-amber-400 text-slate-950 p-2 rounded-xl shadow-md">
              <GraduationCap size={24} />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-wide leading-tight">
                DeutschMeister <span className="text-amber-400">PRO A1</span>
              </h1>
              <p className="text-[11px] text-slate-400 font-medium">
                Acceso Privado · Protección Zero-Trust
              </p>
            </div>
          </div>
          <div className="p-2 rounded-full bg-slate-800 text-emerald-400" title="Acceso Protegido">
            <ShieldCheck size={18} />
          </div>
        </div>

        <div className="p-6 sm:p-7">
          {combinedError && (
            <div className="mb-4 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-2.5 text-rose-700 text-xs sm:text-sm font-medium">
              {String(combinedError).toLowerCase().includes('conexión') ? (
                <WifiOff size={18} className="shrink-0 mt-0.5 text-rose-500" />
              ) : (
                <AlertCircle size={18} className="shrink-0 mt-0.5 text-rose-500" />
              )}
              <span>{combinedError}</span>
            </div>
          )}

          {localSuccess && (
            <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-2.5 text-emerald-800 text-xs sm:text-sm font-medium">
              <CheckCircle2 size={18} className="shrink-0 mt-0.5 text-emerald-600" />
              <span>{localSuccess}</span>
            </div>
          )}

          {isChecking ? (
            <div className="py-10 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <Loader2 size={28} className="animate-spin" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Verificando autorización...</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-xs">
                Comprobando tus credenciales de acceso con el servidor de DeutschMeister PRO.
              </p>
            </div>
          ) : isUnauthenticated ? (
            /* ESTADO A: NO AUTENTICADO */
            <div className="flex flex-col items-center text-center">
              <h2 className="text-xl font-extrabold text-slate-900">
                Acceso Autorizado Requerido
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                Aplicación privada. Inicia sesión con Google o con cualquier correo electrónico para entrar o solicitar acceso.
              </p>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isBusy || !auth}
                className="mt-5 w-full bg-white hover:bg-slate-50 text-slate-800 font-bold py-3 px-5 rounded-2xl border-2 border-slate-200 shadow-sm hover:shadow-md active:scale-[0.98] transition flex items-center justify-center gap-3 text-sm cursor-pointer disabled:opacity-50"
              >
                {busyAction === 'google' ? (
                  <>
                    <Loader2 size={18} className="animate-spin text-indigo-600" />
                    <span>Conectando con Google...</span>
                  </>
                ) : (
                  <>
                    <GoogleLogo />
                    <span>Continuar con Google</span>
                  </>
                )}
              </button>

              {/* Divisor */}
              <div className="relative w-full my-5 flex items-center">
                <div className="flex-grow border-t border-slate-200" />
                <span className="shrink-0 mx-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  o ingresa con tu correo
                </span>
                <div className="flex-grow border-t border-slate-200" />
              </div>

              {/* Pestañas: Iniciar sesión | Solicitar acceso / Registrarse */}
              <div className="w-full grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-xl mb-4">
                <button
                  type="button"
                  onClick={() => switchAuthMode('login')}
                  disabled={isBusy}
                  className={`py-2 px-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                    authMode === 'login'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Iniciar sesión
                </button>
                <button
                  type="button"
                  onClick={() => switchAuthMode('register')}
                  disabled={isBusy}
                  className={`py-2 px-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                    authMode === 'register'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Solicitar acceso / Registrarse
                </button>
              </div>

              {/* Formulario Email/Password */}
              <form onSubmit={handleEmailSubmit} className="w-full space-y-3 text-left">
                {authMode === 'register' && (
                  <div>
                    <label
                      htmlFor="auth-fullname"
                      className="block text-[11px] font-bold text-slate-600 mb-1"
                    >
                      Nombre
                    </label>
                    <div className="relative">
                      <User
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      />
                      <input
                        id="auth-fullname"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Tu nombre completo"
                        autoComplete="name"
                        disabled={isBusy}
                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="auth-email"
                    className="block text-[11px] font-bold text-slate-600 mb-1"
                  >
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                    <input
                      id="auth-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nombre@hotmail.com"
                      autoComplete="email"
                      required
                      disabled={isBusy}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="auth-password"
                    className="block text-[11px] font-bold text-slate-600 mb-1"
                  >
                    Contraseña <span className="font-normal text-slate-400">(mín. 6 caracteres)</span>
                  </label>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    />
                    <input
                      id="auth-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      minLength={6}
                      autoComplete={authMode === 'register' ? 'new-password' : 'current-password'}
                      required
                      disabled={isBusy}
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      tabIndex={-1}
                      aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {authMode === 'login' && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      disabled={isBusy || !auth}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer disabled:opacity-50"
                    >
                      {busyAction === 'reset' ? 'Enviando enlace...' : '¿Olvidaste tu contraseña?'}
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isBusy || !auth}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-2xl shadow-sm hover:shadow active:scale-[0.98] transition flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50"
                >
                  {busyAction === 'email' ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      <span>
                        {authMode === 'register' ? 'Registrando solicitud...' : 'Verificando credenciales...'}
                      </span>
                    </>
                  ) : (
                    <span>
                      {authMode === 'register'
                        ? 'Registrar correo y solicitar acceso'
                        : 'Entrar con correo'}
                    </span>
                  )}
                </button>
              </form>

              {!auth && (
                <p className="text-xs text-rose-600 mt-3 font-medium">
                  Configuración de Firebase no disponible en este entorno.
                </p>
              )}

              <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
                Si tu correo ya fue autorizado o es administrador, entrarás de inmediato; de lo contrario, quedará en espera de aprobación.
              </p>

              {showWebInstallCard && (
                <div className="w-full mt-5 pt-4 border-t border-slate-200/80 text-center">
                  <button
                    type="button"
                    onClick={handleInstallApp}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-2xl shadow-sm shadow-emerald-600/20 active:scale-[0.98] transition flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
                  >
                    <Download size={16} className="shrink-0" />
                    <span>📲 Instalar App en tu Teléfono (Android / iPhone)</span>
                  </button>
                  <p className="text-[11px] text-slate-500 mt-2 leading-snug">
                    Tip iPhone: Agrégala a tu pantalla de inicio primero y luego inicia sesión desde el icono instalado.
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* ESTADO B: AUTENTICADO PERO PENDING O REVOKED */
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 rounded-2xl p-3 w-full mb-5 text-left">
                {user?.photoURL && !imgError ? (
                  <img
                    src={user.photoURL}
                    alt={displayName}
                    onError={() => setImgError(true)}
                    className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold text-lg flex items-center justify-center shrink-0">
                    {userInitial}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-900 truncate">{displayName}</p>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                </div>
              </div>

              {isRevoked ? (
                <div className="w-full bg-rose-50 border border-rose-200 rounded-2xl p-4 sm:p-5 text-left">
                  <div className="flex items-start gap-3">
                    <Ban size={22} className="text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-extrabold text-rose-900">
                        🚫 Acceso Restringido
                      </h3>
                      <p className="text-xs sm:text-sm text-rose-800/90 mt-1.5 leading-relaxed">
                        Tu cuenta no tiene permisos activos para acceder a la aplicación. Contacta con el administrador si necesitas rehabilitarla.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full bg-amber-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 text-left">
                  <div className="flex items-start gap-3">
                    <Clock size={22} className="text-amber-600 shrink-0 mt-0.5 animate-pulse" />
                    <div>
                      <h3 className="text-sm font-extrabold text-amber-950">
                        ⏳ Solicitud de Acceso Pendiente
                      </h3>
                      <p className="text-xs sm:text-sm text-amber-900/90 mt-1.5 leading-relaxed">
                        Tu correo (<strong className="font-bold">{user?.email}</strong>) ha sido registrado. El administrador debe autorizar tu cuenta antes de que puedas ingresar.
                      </p>
                      <p className="text-[11px] text-amber-700 font-semibold mt-2.5 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping inline-block" />
                        <span>Esta pantalla se desbloqueará automáticamente en cuanto seas aprobado.</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="w-full space-y-2.5 mt-5">
                {isPending && (
                  <button
                    type="button"
                    onClick={handleVerifyNow}
                    disabled={isBusy}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-sm transition flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw size={16} className={busyAction === 'recheck' ? 'animate-spin' : ''} />
                    <span>🔄 Verificar autorización ahora</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleSwitchAccount}
                  disabled={isBusy}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer disabled:opacity-50"
                >
                  <LogOut size={16} />
                  <span>Cambiar de cuenta / Cerrar sesión</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <InstallInstructionsModal
        isOpen={showInstallInstructionsModal}
        onClose={() => setShowInstallInstructionsModal(false)}
      />
    </div>
  );
};

export default AuthAccessGate;
