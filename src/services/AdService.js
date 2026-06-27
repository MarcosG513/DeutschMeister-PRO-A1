import { AdMob, RewardAdPluginEvents } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

const REWARDED_AD_ID = 'ca-app-pub-3940256099942544/5224354917'; // Test ID
const INTERSTITIAL_AD_ID = 'ca-app-pub-3940256099942544/1033173712'; // Test ID

// Función de precarga silente
const preloadRewardVideo = async () => {
  if (!Capacitor.isNativePlatform()) return;
  try {
    await AdMob.prepareRewardVideoAd({
      adId: REWARDED_AD_ID,
      isTesting: true,
    });
    console.log('Reward Video Pre-loaded successfully');
  } catch (e) {
    console.warn('Silent Warning: Failed to pre-load Reward Video (could be offline or AdBlocker)', e);
  }
};

export const initializeAdMob = async () => {
  if (Capacitor.isNativePlatform()) {
    try {
      await AdMob.initialize({});
      console.log('AdMob initialized');
      // Iniciar la precarga inmediatamente después del arranque exitoso
      preloadRewardVideo();
      return true; // Éxito
    } catch (e) {
      console.error('Failed to initialize AdMob (Possible AdBlocker)', e);
      return false; // Fallo (posible bloqueador activo)
    }
  } else {
    console.log('AdMob initialization skipped (Web)');
    return true; // Web siempre "exitoso" para propósitos de UI
  }
};

export const showRewardVideo = () => {
  return new Promise(async (resolve) => {
    if (!Capacitor.isNativePlatform()) {
      console.log('Mock: Rewarded Video watched (Web)');
      return resolve(true);
    }

    let rewarded = false;
    let rewardListener = null;
    let dismissListener = null;
    let failListener = null;
    let failShowListener = null;

    const cleanup = () => {
      if (rewardListener) rewardListener.remove();
      if (dismissListener) dismissListener.remove();
      if (failListener) failListener.remove();
      if (failShowListener) failShowListener.remove();
    };

    try {
      rewardListener = await AdMob.addListener(RewardAdPluginEvents.Rewarded, () => {
        rewarded = true;
      });

      dismissListener = await AdMob.addListener(RewardAdPluginEvents.Dismissed, () => {
        cleanup();
        resolve(rewarded);
        // BUCLE: Precargar el siguiente video automáticamente tras cerrar
        preloadRewardVideo();
      });

      failListener = await AdMob.addListener(RewardAdPluginEvents.FailedToLoad, (err) => {
        console.error('Reward Video failed to load', err);
        cleanup();
        resolve(false); 
        // BUCLE: Intentar precargar de nuevo para el próximo intento
        preloadRewardVideo();
      });

      failShowListener = await AdMob.addListener(RewardAdPluginEvents.FailedToShow, (err) => {
        console.error('Reward Video failed to show', err);
        cleanup();
        resolve(false);
        preloadRewardVideo();
      });

      // Ya no preparamos aquí, asumimos que preloadRewardVideo lo hizo.
      // Si por alguna razón no está listo, showRewardVideoAd lanzará excepción al catch.
      await AdMob.showRewardVideoAd();
    } catch (e) {
      console.error('Error showing Reward Video', e);
      // Si la precarga falló y llegamos aquí, mostramos error
      alert('El anuncio de prueba está cargando, por favor intenta de nuevo en unos segundos');
      cleanup();
      resolve(false); // No se otorga crédito si hay excepción
      
      // Intentar precargar de nuevo
      preloadRewardVideo();
    }
  });
};

export const showInterstitial = async () => {
  if (!Capacitor.isNativePlatform()) {
    console.log('Mock: Interstitial Ad shown (Web)');
    return;
  }
  
  try {
    await AdMob.prepareInterstitial({
      adId: INTERSTITIAL_AD_ID,
      isTesting: true,
    });
    await AdMob.showInterstitial();
  } catch (e) {
    console.error('Error showing Interstitial', e);
  }
};
