import { useState, useEffect, useCallback } from 'react';
import { Capacitor } from '@capacitor/core';

/**
 * Encapsulates PWA standalone detection, beforeinstallprompt handling,
 * and fallback install instructions modal state.
 */
export function usePWAInstall({
  initialCanInstall = false,
  onInstallOverride = null,
  showCardOverride = undefined,
} = {}) {
  const isNativeApp = Capacitor.isNativePlatform();

  const [isStandalonePWA, setIsStandalonePWA] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia?.('(display-mode: standalone)')?.matches ||
      window.navigator?.standalone === true
    );
  });

  const [canInstallPWA, setCanInstallPWA] = useState(() => {
    if (typeof window === 'undefined') return Boolean(initialCanInstall);
    return Boolean(window.deferredPrompt) || Boolean(initialCanInstall);
  });

  const [showInstallInstructionsModal, setShowInstallInstructionsModal] = useState(false);

  const showWebInstallCard =
    showCardOverride !== undefined ? showCardOverride : !isNativeApp && !isStandalonePWA;

  useEffect(() => {
    if (typeof window !== 'undefined' && window.deferredPrompt) {
      setCanInstallPWA(true);
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      window.deferredPrompt = e;
      setCanInstallPWA(true);
    };

    const handlePwaAvailable = () => {
      setCanInstallPWA(true);
    };

    const handleAppInstalled = () => {
      window.deferredPrompt = null;
      setCanInstallPWA(false);
      setIsStandalonePWA(true);
      setShowInstallInstructionsModal(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('pwa-install-available', handlePwaAvailable);
    window.addEventListener('appinstalled', handleAppInstalled);

    const mql =
      typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia('(display-mode: standalone)')
        : null;
    const handleDisplayChange = (e) => {
      if (e.matches) setIsStandalonePWA(true);
    };
    mql?.addEventListener?.('change', handleDisplayChange);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('pwa-install-available', handlePwaAvailable);
      window.removeEventListener('appinstalled', handleAppInstalled);
      mql?.removeEventListener?.('change', handleDisplayChange);
    };
  }, []);

  const handleInstallApp = useCallback(async () => {
    if (typeof onInstallOverride === 'function') {
      await onInstallOverride();
      return;
    }

    const promptEvent = typeof window !== 'undefined' ? window.deferredPrompt : null;
    if (promptEvent && typeof promptEvent.prompt === 'function') {
      // El evento beforeinstallprompt es de un solo uso: limpiarlo antes de esperar la elección
      window.deferredPrompt = null;
      setCanInstallPWA(false);
      try {
        await promptEvent.prompt();
        const choice = await promptEvent.userChoice;
        if (choice?.outcome === 'accepted') {
          setIsStandalonePWA(true);
        }
      } catch (err) {
        console.warn('[PWA] Error invocando prompt:', err);
        setShowInstallInstructionsModal(true);
      }
    } else {
      setShowInstallInstructionsModal(true);
    }
  }, [onInstallOverride]);

  return {
    isNativeApp,
    isStandalonePWA,
    canInstallPWA,
    showWebInstallCard,
    showInstallInstructionsModal,
    setShowInstallInstructionsModal,
    handleInstallApp,
  };
}
