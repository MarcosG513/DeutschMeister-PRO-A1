import { AdMob } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

const REWARDED_AD_ID = 'ca-app-pub-3940256099942544/5224354917'; // Test ID
const INTERSTITIAL_AD_ID = 'ca-app-pub-3940256099942544/1033173712'; // Test ID

export const initializeAdMob = async () => {
  if (Capacitor.isNativePlatform()) {
    try {
      await AdMob.initialize({});
      console.log('AdMob initialized');
    } catch (e) {
      console.error('Failed to initialize AdMob', e);
    }
  } else {
    console.log('AdMob initialization skipped (Web)');
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

    const cleanup = () => {
      if (rewardListener) rewardListener.remove();
      if (dismissListener) dismissListener.remove();
      if (failListener) failListener.remove();
    };

    try {
      rewardListener = await AdMob.addListener('onRewardedVideoAdReward', () => {
        rewarded = true;
      });

      dismissListener = await AdMob.addListener('onRewardedVideoAdDismissed', () => {
        cleanup();
        resolve(rewarded);
      });

      failListener = await AdMob.addListener('onRewardedVideoAdFailedToLoad', (err) => {
        console.error('Reward Video failed to load', err);
        alert('AdMob Error: No se pudo cargar el video promocional. Revisa tu conexión a internet.');
        cleanup();
        resolve(true); // Don't block the user if ads fail to load
      });

      await AdMob.prepareRewardVideoAd({
        adId: REWARDED_AD_ID,
        isTesting: true,
      });

      await AdMob.showRewardVideoAd();
    } catch (e) {
      console.error('Error showing Reward Video', e);
      alert('AdMob Error: ' + e.message);
      cleanup();
      resolve(true); // Don't block
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
