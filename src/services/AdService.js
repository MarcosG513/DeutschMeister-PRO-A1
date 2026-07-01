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
  console.log('AdMob initialization skipped (Testing Phase)');
  return true; 
};

export const showRewardVideo = () => {
  return new Promise((resolve) => {
    console.log('Mock: Rewarded Video watched (Testing Phase)');
    return resolve(true);
  });
};

export const showInterstitial = async () => {
  console.log('Mock: Interstitial Ad shown (Testing Phase)');
  return;
};
