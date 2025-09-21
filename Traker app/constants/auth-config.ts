// Google OAuth Configuration
// IMPORTANT: You need to create your own Google OAuth credentials
// The default Expo client ID is restricted and will show "Access blocked" error
//
// Setup Instructions:
// 1. Go to https://console.cloud.google.com/
// 2. Create a new project or select existing one
// 3. Enable Google+ API and Google Identity API
// 4. Create OAuth 2.0 credentials for each platform:
//    - Expo Go: Web application with redirect URI: https://auth.expo.io/@anonymous/study-tracker-planner-inic-et-neet-jap5czi2
//    - iOS: iOS application with Bundle ID: app.rork.study-tracker-planner-inic-et-neet-jap5czi2
//    - Android: Android application with Package name: app.rork.study-tracker-planner-inic-et-neet-jap5czi2
//    - Web: Web application with authorized origins
// 5. Add the client IDs to your environment variables

export const GOOGLE_AUTH_CONFIG = {
  // Get client IDs from environment variables
  // WARNING: Using default Expo client ID - this will cause "Access blocked" error
  // You MUST replace these with your own client IDs from Google Cloud Console
  expoClientId: process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID || null,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID || null,
  androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID || null,
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID || null,
  
  // Check if OAuth is properly configured
  isConfigured: !!(process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID || process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID),
  
  // Always use real Google Sign-In (no demo accounts)
  useRealGoogleAuth: true,
};

// Apple Sign-In Configuration
export const APPLE_AUTH_CONFIG = {
  // Apple Sign-In is automatically configured for iOS
  // No additional setup needed for development
  enabled: true,
};

// Demo accounts for development/testing
export const DEMO_ACCOUNTS = [
  {
    id: '1',
    email: 'student@example.com',
    name: 'Medical Student',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: '2', 
    email: 'doctor@example.com',
    name: 'Dr. Sarah Wilson',
    photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: '3',
    email: 'resident@example.com', 
    name: 'Dr. Alex Kumar',
    photoUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
  },
];