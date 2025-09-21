import { Platform } from 'react-native';

// AdMob configuration with test IDs
// Replace these with your actual AdMob IDs from environment variables in production
export const ADMOB_IDS = {
  // Test IDs provided by Google for development
  // These are safe to use and will show test ads
  BANNER: Platform.select({
    ios: process.env.EXPO_PUBLIC_ADMOB_BANNER_IOS || 'ca-app-pub-3940256099942544/2435281174',
    android: process.env.EXPO_PUBLIC_ADMOB_BANNER_ANDROID || 'ca-app-pub-3940256099942544/6300978111',
    default: 'ca-app-pub-3940256099942544/6300978111',
  }),
  
  INTERSTITIAL: Platform.select({
    ios: process.env.EXPO_PUBLIC_ADMOB_INTERSTITIAL_IOS || 'ca-app-pub-3940256099942544/4411468910',
    android: process.env.EXPO_PUBLIC_ADMOB_INTERSTITIAL_ANDROID || 'ca-app-pub-3940256099942544/1033173712',
    default: 'ca-app-pub-3940256099942544/1033173712',
  }),
  
  REWARDED: Platform.select({
    ios: process.env.EXPO_PUBLIC_ADMOB_REWARDED_IOS || 'ca-app-pub-3940256099942544/1712485313',
    android: process.env.EXPO_PUBLIC_ADMOB_REWARDED_ANDROID || 'ca-app-pub-3940256099942544/5224354917',
    default: 'ca-app-pub-3940256099942544/5224354917',
  }),
};

// Check if we're using test IDs (for development)
export const isUsingTestIds = () => {
  const testIds = [
    'ca-app-pub-3940256099942544/2435281174',
    'ca-app-pub-3940256099942544/6300978111',
    'ca-app-pub-3940256099942544/4411468910',
    'ca-app-pub-3940256099942544/1033173712',
    'ca-app-pub-3940256099942544/1712485313',
    'ca-app-pub-3940256099942544/5224354917',
  ];
  
  return testIds.includes(ADMOB_IDS.BANNER || '') || 
         testIds.includes(ADMOB_IDS.INTERSTITIAL || '') ||
         testIds.includes(ADMOB_IDS.REWARDED || '');
};