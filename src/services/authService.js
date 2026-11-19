import { Capacitor } from '@capacitor/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getRedirectResult,
  linkWithCredential,
  linkWithPopup,
  linkWithRedirect,
  sendPasswordResetEmail,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  updateProfile
} from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { auth as defaultAuth, functions as defaultFunctions } from '../config/firebase';
import { resetLocalUserCaches } from '../utils/helpers';
import { resetSrsLocalCache } from './srsBridgeService';

export const ACCESS_CACHE_PREFIX = 'dm_access_approved_';
export const ACCESS_ROLE_PREFIX = 'dm_access_role_';

export function getCachedAccessDecision(uid) {
  if (!uid) return { approved: false, role: 'user' };
  try {
    const approved = localStorage.getItem(`${ACCESS_CACHE_PREFIX}${uid}`) === 'approved';
    const role = localStorage.getItem(`${ACCESS_ROLE_PREFIX}${uid}`) === 'admin' ? 'admin' : 'user';
    return { approved, role };
  } catch {
    return { approved: false, role: 'user' };
  }
}

export function setCachedAccessDecision(uid, status, role = 'user') {
  if (!uid) return;
  try {
    if (status === 'approved') {
      localStorage.setItem(`${ACCESS_CACHE_PREFIX}${uid}`, 'approved');
      localStorage.setItem(`${ACCESS_ROLE_PREFIX}${uid}`, role === 'admin' ? 'admin' : 'user');
    } else {
      localStorage.removeItem(`${ACCESS_CACHE_PREFIX}${uid}`);
      localStorage.removeItem(`${ACCESS_ROLE_PREFIX}${uid}`);
    }
  } catch {
    // Ignorar errores de cuota en storage privado
    return;
  }
}

export function isOfflineOrTransientNetworkError(err) {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return true;
  }
  const code = String(err?.code || '').toLowerCase();
  const msg = String(err?.message || err || '').toLowerCase();
  if (code.includes('permission-denied') || code.includes('unauthenticated')) {
    return false;
  }
  return (
    code.includes('unavailable') ||
    code.includes('network-request-failed') ||
    code.includes('deadline-exceeded') ||
    msg.includes('network') ||
    msg.includes('failed to fetch') ||
    msg.includes('offline') ||
    msg.includes('unavailable')
  );
}

/**
 * Traduce códigos de error de Firebase Auth a mensajes claros en español.
 */
export function mapFirebaseAuthError(err, fallbackMessage = 'Ocurrió un error. Verifica tus credenciales e intenta de nuevo.') {
  const code = String(err?.code || '').toLowerCase();
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
    case 'auth/invalid-login-credentials':
      return 'Correo o contraseña incorrectos.';
    case 'auth/email-already-in-use':
      return 'Este correo ya está registrado; cambia a la pestaña Iniciar sesión.';
    case 'auth/weak-password':
      return 'La contraseña debe tener al menos 6 caracteres.';
    case 'auth/invalid-email':
      return 'El formato del correo electrónico no es válido.';
    case 'auth/missing-password':
      return 'Ingresa tu contraseña.';
    case 'auth/too-many-requests':
      return 'Demasiados intentos fallidos. Espera unos minutos e inténtalo de nuevo.';
    case 'auth/user-disabled':
      return 'Esta cuenta ha sido deshabilitada en el sistema.';
    case 'auth/network-request-failed':
      return 'Error de conexión. Verifica tu internet e inténtalo de nuevo.';
    case 'auth/popup-closed-by-user':
    case 'auth/user-cancelled':
    case 'auth/cancelled-popup-request':
      return 'Autenticación cancelada por el usuario.';
    case 'auth/operation-not-allowed':
      return 'Este método de acceso no está habilitado actualmente en Firebase Authentication.';
    default:
      return err?.message || fallbackMessage;
  }
}

/**
 * Procesa el resultado pendiente de signInWithRedirect al iniciar la app en Web.
 */
export async function processAuthRedirectResult(authInstance = defaultAuth) {
  const targetAuth = authInstance || defaultAuth;
  if (!targetAuth || Capacitor.isNativePlatform()) {
    return null;
  }
  try {
    const result = await getRedirectResult(targetAuth);
    return result?.user || null;
  } catch (err) {
    console.warn('[Auth Redirect Result Error]:', err?.code || err?.message);
    throw new Error(mapFirebaseAuthError(err, 'No se pudo completar el inicio de sesión con Google.'), {
      cause: err
    });
  }
}

async function syncAccessRecordAfterAuth(user, functionsInstance = defaultFunctions) {
  const targetFunctions = functionsInstance || defaultFunctions;
  if (!user || !targetFunctions) return null;
  try {
    const verifyFn = httpsCallable(targetFunctions, 'verifyOrRequestAccess');
    const res = await verifyFn({});
    const data = res?.data || null;
    if (data && (data.needsTokenRefresh || data.status === 'approved')) {
      await user.getIdToken(true).catch(() => {});
    }
    return data;
  } catch (err) {
    if (isOfflineOrTransientNetworkError(err)) {
      return null;
    }
    throw err;
  }
}

/**
 * Flujo unificado de inicio de sesión con Google compatible con Android APK (@capacitor-firebase/authentication)
 * y Web/PWA (signInWithPopup + fallback a signInWithRedirect si hay bloqueo de popups).
 */
export async function signInWithGoogleUnified({
  authInstance = defaultAuth,
  isLoginMode = true,
  allowAnonymousLink = false
} = {}) {
  const targetAuth = authInstance || defaultAuth;
  if (!targetAuth) {
    throw new Error('Servicio de autenticación no disponible.');
  }

  const currentUser = targetAuth.currentUser;
  const shouldLinkAnon = Boolean(allowAnonymousLink && !isLoginMode && currentUser?.isAnonymous);

  // ── MODO NATIVO ANDROID (Capacitor) ──
  // Usa Credential Manager / Play Services nativo con skipNativeAuth: true y autentica Firebase JS con idToken
  if (Capacitor.isNativePlatform()) {
    try {
      const result = await FirebaseAuthentication.signInWithGoogle({
        skipNativeAuth: true
      });
      const idToken = result?.credential?.idToken;
      if (!idToken) {
        throw new Error(
          'No se pudo obtener el token de Google en el dispositivo. Inicia sesión con tu correo y contraseña en el formulario inferior.'
        );
      }

      const credential = GoogleAuthProvider.credential(idToken);

      if (shouldLinkAnon) {
        try {
          const linked = await linkWithCredential(currentUser, credential);
          return {
            user: linked.user,
            message: '¡Cuenta vinculada con éxito mediante tu cuenta de Google!'
          };
        } catch (linkErr) {
          if (
            linkErr?.code === 'auth/credential-already-in-use' ||
            linkErr?.code === 'auth/email-already-in-use'
          ) {
            const signed = await signInWithCredential(targetAuth, credential);
            return {
              user: signed.user,
              message: '¡Esta cuenta ya existía y tu sesión fue restaurada con éxito!'
            };
          }
          throw linkErr;
        }
      }

      const signed = await signInWithCredential(targetAuth, credential);
      return {
        user: signed.user,
        message: '¡Sesión iniciada con Google!'
      };
    } catch (nativeErr) {
      console.warn('[GoogleAuth Native Error]:', nativeErr);
      const errMsg = String(nativeErr?.message || nativeErr || '');
      const errLower = errMsg.toLowerCase();
      if (
        errLower.includes('cancel') ||
        errMsg.includes('12501') ||
        nativeErr?.code === 16 ||
        nativeErr?.code === 12501 ||
        nativeErr?.code === '16' ||
        nativeErr?.code === '12501'
      ) {
        throw new Error('Autenticación cancelada por el usuario.', { cause: nativeErr });
      }
      throw new Error(
        'No se pudo iniciar sesión con Google en este dispositivo (verifica Google Play Services o tu conexión). También puedes iniciar sesión o solicitar acceso con tu correo y contraseña abajo.',
        { cause: nativeErr }
      );
    }
  }

  // ── MODO WEB / PWA ──
  // Usa directamente el SDK web de Firebase con el authDomain estándar (*.firebaseapp.com)
  const isIOS =
    typeof navigator !== 'undefined' &&
    (/iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));
  const isIOSStandalone =
    isIOS &&
    typeof window !== 'undefined' &&
    (window.navigator?.standalone === true ||
      window.matchMedia?.('(display-mode: standalone)')?.matches);

  let timeoutId = null;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error('auth_timeout'));
    }, 45000);
  });

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  try {
    const authAction = async () => {
      if (shouldLinkAnon) {
        try {
          const linked = await linkWithPopup(currentUser, provider);
          return {
            user: linked.user,
            message: '¡Cuenta vinculada con éxito mediante tu cuenta de Google!'
          };
        } catch (linkErr) {
          if (
            linkErr?.code === 'auth/credential-already-in-use' ||
            linkErr?.code === 'auth/email-already-in-use'
          ) {
            const signed = await signInWithPopup(targetAuth, provider);
            return {
              user: signed.user,
              message: '¡Sesión iniciada con tu cuenta de Google existente!'
            };
          }
          throw linkErr;
        }
      }

      const signed = await signInWithPopup(targetAuth, provider);
      return {
        user: signed.user,
        message: '¡Sesión iniciada con Google!'
      };
    };

    return await Promise.race([authAction(), timeoutPromise]);
  } catch (err) {
    const errCode = String(err?.code || '').toLowerCase();
    const shouldFallbackToRedirect =
      errCode === 'auth/popup-blocked' ||
      (isIOSStandalone &&
        (err?.message === 'auth_timeout' ||
          errCode === 'auth/operation-not-supported-in-this-environment' ||
          errCode === 'auth/internal-error' ||
          errCode === 'auth/cancelled-popup-request'));

    if (shouldFallbackToRedirect) {
      try {
        if (shouldLinkAnon) {
          await linkWithRedirect(currentUser, provider);
        } else {
          await signInWithRedirect(targetAuth, provider);
        }
        return {
          user: null,
          redirecting: true,
          message: 'Redirigiendo a Google para completar el inicio de sesión...'
        };
      } catch (redirectErr) {
        if (isIOSStandalone) {
          throw new Error(
            'El acceso con Google fue bloqueado en la PWA de iPhone/iPad. Puedes entrar directamente con tu Correo y Contraseña en el formulario inferior.',
            { cause: redirectErr }
          );
        }
        throw new Error(mapFirebaseAuthError(redirectErr), { cause: redirectErr });
      }
    }

    console.warn('Error en login/link con Google:', err);
    if (isIOSStandalone && errCode === 'auth/popup-closed-by-user') {
      throw new Error(
        'No se completó el acceso con Google en la app instalada de iOS. También puedes entrar con tu Correo y Contraseña en el formulario inferior.',
        { cause: err }
      );
    }
    if (err?.message === 'auth_timeout') {
      throw new Error(
        isIOSStandalone
          ? 'El acceso con Google tardó demasiado en iOS PWA. También puedes usar tu Correo y Contraseña en el formulario inferior.'
          : 'El inicio de sesión tomó demasiado tiempo o la ventana fue cerrada.',
        { cause: err }
      );
    }
    throw new Error(mapFirebaseAuthError(err), { cause: err });
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

/**
 * Inicia sesión con correo electrónico y contraseña y verifica el acceso Zero-Trust en el backend.
 */
export async function signInWithEmailUnified(
  email,
  password,
  { authInstance = defaultAuth, functionsInstance = defaultFunctions } = {}
) {
  const targetAuth = authInstance || defaultAuth;
  if (!targetAuth) {
    throw new Error('Servicio de autenticación no disponible.');
  }

  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  if (!normalizedEmail || !normalizedEmail.includes('@')) {
    throw new Error('Ingresa un correo electrónico válido.');
  }
  if (!password) {
    throw new Error('Ingresa tu contraseña.');
  }

  try {
    const cred = await signInWithEmailAndPassword(targetAuth, normalizedEmail, password);
    const access = await syncAccessRecordAfterAuth(cred.user, functionsInstance);
    return {
      user: cred.user,
      access,
      message: '¡Sesión iniciada correctamente!'
    };
  } catch (err) {
    throw new Error(mapFirebaseAuthError(err, 'No se pudo iniciar sesión con correo.'), { cause: err });
  }
}

/**
 * Registra un nuevo usuario con correo y contraseña, guarda su displayName y registra la solicitud/acceso Zero-Trust.
 */
export async function registerWithEmailUnified(
  email,
  password,
  displayName = '',
  { authInstance = defaultAuth, functionsInstance = defaultFunctions } = {}
) {
  const targetAuth = authInstance || defaultAuth;
  if (!targetAuth) {
    throw new Error('Servicio de autenticación no disponible.');
  }

  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  const cleanName = typeof displayName === 'string' ? displayName.trim() : '';

  if (!normalizedEmail || !normalizedEmail.includes('@')) {
    throw new Error('Ingresa un correo electrónico válido.');
  }
  if (!password || password.length < 6) {
    throw new Error('La contraseña debe tener al menos 6 caracteres.');
  }

  try {
    const cred = await createUserWithEmailAndPassword(targetAuth, normalizedEmail, password);
    if (cleanName) {
      await updateProfile(cred.user, { displayName: cleanName }).catch(() => {});
      await cred.user.reload().catch(() => {});
    }
    const access = await syncAccessRecordAfterAuth(cred.user, functionsInstance);
    return {
      user: cred.user,
      access,
      message:
        access?.status === 'approved'
          ? '¡Cuenta creada y aprobada automáticamente!'
          : '¡Cuenta registrada! Tu solicitud de acceso ha sido enviada al administrador.'
    };
  } catch (err) {
    throw new Error(mapFirebaseAuthError(err, 'No se pudo registrar el correo.'), { cause: err });
  }
}

/**
 * Envía un correo oficial de recuperación de contraseña de Firebase Auth.
 */
export async function resetPasswordUnified(email, { authInstance = defaultAuth } = {}) {
  const targetAuth = authInstance || defaultAuth;
  if (!targetAuth) {
    throw new Error('Servicio de autenticación no disponible.');
  }

  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  if (!normalizedEmail || !normalizedEmail.includes('@')) {
    throw new Error('Escribe tu correo electrónico arriba antes de solicitar el restablecimiento.');
  }

  try {
    await sendPasswordResetEmail(targetAuth, normalizedEmail);
    return {
      email: normalizedEmail,
      message: `Te enviamos un enlace a ${normalizedEmail} para restablecer tu contraseña. Revisa también tu carpeta de spam.`
    };
  } catch (err) {
    throw new Error(mapFirebaseAuthError(err, 'No se pudo enviar el correo de recuperación.'), { cause: err });
  }
}

export async function signOutUnified({ authInstance = defaultAuth } = {}) {
  const targetAuth = authInstance || defaultAuth;
  try {
    await Promise.all([
      resetSrsLocalCache().catch(() => {}),
      resetLocalUserCaches().catch(() => {}),
    ]);
  } catch {
    // Continuar con el cierre de sesión aunque falle la limpieza local
  }
  if (Capacitor.isNativePlatform()) {
    await FirebaseAuthentication.signOut().catch(() => {});
  }
  if (targetAuth) {
    await signOut(targetAuth);
  }
}
