import { Capacitor } from '@capacitor/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import {
  GoogleAuthProvider,
  linkWithCredential,
  linkWithPopup,
  signInWithCredential,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { auth as defaultAuth } from '../config/firebase';

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
 * Flujo unificado de inicio de sesión con Google compatible con Android APK (@capacitor-firebase/authentication)
 * y Web/PWA (signInWithPopup). Garantiza comportamiento idéntico entre AuthAccessGate y Profile.
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
  // Evita abrir ventanas emergentes web que se quedan en blanco en Chrome / WebView
  if (Capacitor.isNativePlatform()) {
    try {
      const result = await FirebaseAuthentication.signInWithGoogle();
      const idToken = result?.credential?.idToken;
      if (!idToken) {
        throw new Error('No se pudo obtener el token de Google del dispositivo.');
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
      if (
        errMsg.includes('cancel') ||
        errMsg.includes('12501') ||
        nativeErr?.code === 16 ||
        nativeErr?.code === 12501 ||
        nativeErr?.code === '16' ||
        nativeErr?.code === '12501'
      ) {
        throw new Error('Autenticación cancelada por el usuario.', { cause: nativeErr });
      }
      throw new Error(
        nativeErr?.message || 'No se pudo completar el inicio de sesión con Google en el dispositivo.',
        { cause: nativeErr }
      );
    }
  }

  // ── MODO WEB / PWA ──
  // Se utiliza signInWithPopup con temporizador de seguridad de 45s para evitar bloqueos
  let timeoutId = null;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error('auth_timeout'));
    }, 45000);
  });

  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

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
    console.warn('Error en login/link con Google:', err);
    if (err?.message === 'auth_timeout') {
      throw new Error('El inicio de sesión tomó demasiado tiempo o la ventana fue cerrada.', { cause: err });
    }
    if (
      err?.code === 'auth/popup-closed-by-user' ||
      err?.code === 'auth/user-cancelled' ||
      err?.code === 'auth/cancelled-popup-request'
    ) {
      throw new Error('Autenticación cancelada por el usuario.', { cause: err });
    }
    if (err?.code === 'auth/popup-blocked') {
      throw new Error(
        'Tu navegador bloqueó la ventana emergente de Google. Permite ventanas emergentes para este sitio.',
        { cause: err }
      );
    }
    throw new Error(err?.message || 'Ocurrió un error. Verifica tus credenciales e intenta de nuevo.', {
      cause: err
    });
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

export async function signOutUnified({ authInstance = defaultAuth } = {}) {
  const targetAuth = authInstance || defaultAuth;
  if (Capacitor.isNativePlatform()) {
    await FirebaseAuthentication.signOut().catch(() => {});
  }
  if (targetAuth) {
    await signOut(targetAuth);
  }
}
