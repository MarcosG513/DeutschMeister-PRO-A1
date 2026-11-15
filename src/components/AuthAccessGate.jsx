import { useState } from 'react';
import {
  ShieldCheck,
  Clock,
  Ban,
  RefreshCw,
  LogOut,
  Loader2,
  AlertCircle,
  GraduationCap,
  WifiOff
} from 'lucide-react';
import { signInWithGoogleUnified, signOutUnified } from '../services/authService';

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
  const [isBusy, setIsBusy] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [imgError, setImgError] = useState(false);

  const isChecking = accessStatus === 'checking';
  const isUnauthenticated = !user || user.isAnonymous || accessStatus === 'unauthenticated';
  const isRevoked = accessStatus === 'revoked';
  const isPending = accessStatus === 'pending' || (!isChecking && !isUnauthenticated && !isRevoked);

  const combinedError = localError || verificationError;

  const handleGoogleSignIn = async () => {
    setIsBusy(true);
    setLocalError(null);
    try {
      await signInWithGoogleUnified({
        authInstance: auth,
        isLoginMode: true,
        allowAnonymousLink: false
      });
    } catch (err) {
      setLocalError(err?.message || 'No se pudo iniciar sesión con Google.');
    } finally {
      setIsBusy(false);
    }
  };

  const handleVerifyNow = async () => {
    if (typeof onRecheckAccess !== 'function') return;
    setIsBusy(true);
    setLocalError(null);
    try {
      await onRecheckAccess();
    } catch (err) {
      setLocalError(err?.message || 'Error al verificar tu autorización.');
    } finally {
      setIsBusy(false);
    }
  };

  const handleSwitchAccount = async () => {
    setIsBusy(true);
    setLocalError(null);
    try {
      await signOutUnified({ authInstance: auth });
    } catch (err) {
      setLocalError(err?.message || 'No se pudo cerrar sesión.');
    } finally {
      setIsBusy(false);
    }
  };

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Estudiante';
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <div className="min-h-[100dvh] w-full bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
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
            <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-2.5 text-rose-700 text-xs sm:text-sm font-medium">
              {String(combinedError).toLowerCase().includes('conexión') ? (
                <WifiOff size={18} className="shrink-0 mt-0.5 text-rose-500" />
              ) : (
                <AlertCircle size={18} className="shrink-0 mt-0.5 text-rose-500" />
              )}
              <span>{combinedError}</span>
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
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-100 border border-indigo-200/70 flex items-center justify-center mb-4 shadow-sm">
                <ShieldCheck size={32} className="text-indigo-600" />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Acceso Autorizado Requerido
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Aplicación privada. Inicia sesión con tu cuenta de Google autorizada para acceder al contenido.
              </p>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isBusy || !auth}
                className="mt-6 w-full bg-white hover:bg-slate-50 text-slate-800 font-bold py-3.5 px-6 rounded-2xl border-2 border-slate-200 shadow-sm hover:shadow-md active:scale-[0.98] transition flex items-center justify-center gap-3 text-sm cursor-pointer disabled:opacity-50"
              >
                {isBusy ? (
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

              {!auth && (
                <p className="text-xs text-rose-600 mt-3 font-medium">
                  Configuración de Firebase no disponible en este entorno.
                </p>
              )}

              <p className="text-[11px] text-slate-400 mt-5 leading-relaxed">
                Si es tu primera vez ingresando, tu correo quedará registrado automáticamente para aprobación del administrador.
              </p>
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
                    <RefreshCw size={16} className={isBusy ? 'animate-spin' : ''} />
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
    </div>
  );
};

export default AuthAccessGate;
