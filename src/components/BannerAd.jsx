import React, { useEffect, useState } from 'react';
import { AdMob, BannerAdSize, BannerAdPosition, BannerAdPluginEvents } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

const BannerAd = () => {
  const [bannerHeight, setBannerHeight] = useState(0);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    let loadedListener = null;
    let sizeChangedListener = null;

    const setupBanner = async () => {
      try {
        loadedListener = await AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
          console.log('Banner Ad loaded');
        });

        sizeChangedListener = await AdMob.addListener(BannerAdPluginEvents.SizeChanged, (info) => {
          setBannerHeight(info.height);
        });

        await AdMob.showBanner({
          adId: 'ca-app-pub-3940256099942544/6300978111', // Test Ad Unit ID
          adSize: BannerAdSize.ADAPTIVE_BANNER,
          position: BannerAdPosition.BOTTOM_CENTER,
          margin: 0,
          isTesting: true,
        });
      } catch (err) {
        console.warn('Failed to show Banner Ad:', err);
      }
    };

    setupBanner();

    return () => {
      if (Capacitor.isNativePlatform()) {
        AdMob.hideBanner().catch(() => {});
        AdMob.removeBanner().catch(() => {});
      }
      if (loadedListener) loadedListener.remove();
      if (sizeChangedListener) sizeChangedListener.remove();
    };
  }, []);

  // En Capacitor, el banner flota por encima del WebView nativamente.
  // Renderizamos un espaciador vacío en el DOM para evitar que el banner tape la UI (el input de chat).
  if (bannerHeight === 0 && Capacitor.isNativePlatform()) {
     return <div style={{ height: '60px' }} className="w-full shrink-0" />; // Espaciador por defecto
  }

  return (
    <div style={{ height: `${bannerHeight}px` }} className="w-full shrink-0" />
  );
};

export default BannerAd;
