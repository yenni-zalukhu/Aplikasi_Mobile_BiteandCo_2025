import { Stack } from "expo-router";
import { ToastProvider } from './components/ToastProvider';
import ErrorBoundary from './components/ErrorBoundary';
import { notificationService } from './services/NotificationService';
import { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Initialize app services
  useEffect(() => {
    async function initializeApp() {
      try {
        console.log('Initializing BiteAndCo app services...');
        
        // Initialize services directly without AppConfigManager
        console.log('✓ App configuration initialized (removed AppConfigManager)');

        // Initialize notification service
        await notificationService.initialize();
        await notificationService.setupNotificationCategories();
        console.log('✓ Notification service initialized');

        setAppIsReady(true);
        console.log('🚀 All services initialized successfully');
      } catch (error) {
        console.error('❌ Error initializing app services:', error);
        // Still mark app as ready to prevent infinite loading
        setAppIsReady(true);
      }
    }

    if (loaded) {
      initializeApp();
    }
  }, [loaded]);

  // Handle app state changes
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground');
        
        // Clear notification badge
        notificationService.clearBadge();
      } else if (nextAppState.match(/inactive|background/)) {
        console.log('App has gone to the background');
      }
      
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription?.remove();
  }, [appState]);

  // Setup notification listeners
  useEffect(() => {
    const handleNotificationReceived = (notification) => {
      console.log('Notification received:', notification);
    };

    const handleNotificationTapped = (response) => {
      console.log('Notification tapped:', response);
      
      const action = notificationService.handleNotificationAction(response.notification);
      if (action) {
        console.log('Navigate to:', action);
      }
    };

    notificationService.setupListeners(
      handleNotificationReceived,
      handleNotificationTapped
    );

    return () => {
      notificationService.removeListeners();
    };
  }, []);

  // Hide splash screen when app is ready
  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <ErrorBoundary>
      <ToastProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="started" options={{ headerShown: false }} />
          <Stack.Screen name="seller/SellerIndex" options={{ headerShown: false }} />
          <Stack.Screen name="seller/DetailUsaha" options={{ headerShown: false }} />
          <Stack.Screen name="seller/(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="seller/pelanggan" options={{ headerShown: false }} />
          <Stack.Screen name="seller/pelangganDetails" options={{ headerShown: false }} />
          <Stack.Screen name="seller/notifikasi" options={{ headerShown: false }} />
          <Stack.Screen name="seller/menu" options={{ headerShown: false }} />
          <Stack.Screen name="seller/menu/add" options={{ headerShown: false }} />
          <Stack.Screen name="seller/daftarmenu" options={{ headerShown: false }} />
          <Stack.Screen name="seller/Laporan" options={{ headerShown: false }} />
          <Stack.Screen name="seller/riwayat" options={{ headerShown: false }} />
          <Stack.Screen name="seller/gizipro" options={{ headerShown: false }} />
          <Stack.Screen name="seller/biteeco" options={{ headerShown: false }} />
          <Stack.Screen name="seller/ulasan" options={{ headerShown: false }} />
          <Stack.Screen name="seller/bantuan" options={{ headerShown: false }} />
          <Stack.Screen name="seller/settings" options={{ headerShown: false }} />
          <Stack.Screen name="seller/JadwalPengantaran" options={{ headerShown: false }} />
          <Stack.Screen name="seller/DetailPengantaran" options={{ headerShown: false }} />
          <Stack.Screen name="seller/DetailOrder" options={{ headerShown: false }} />
          <Stack.Screen name="seller/Pengantaran" options={{ headerShown: false }} />
          <Stack.Screen name="buyer/BuyerIndex" options={{ headerShown: false }} />
          <Stack.Screen name="buyer/BuyerRegister" options={{ headerShown: false }} />
          <Stack.Screen name="buyer/BuyerOTPVerification" options={{ headerShown: false }} />
          <Stack.Screen name="buyer/(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="buyer/CateringList" options={{ headerShown: false }} />
          <Stack.Screen name="buyer/StatusOrder" options={{ headerShown: false }} />
          <Stack.Screen name="buyer/DetailOrder" options={{ headerShown: false }} />
          <Stack.Screen name="buyer/CateringDetail" options={{ headerShown: false }} />
          <Stack.Screen name="buyer/Pembayaran" options={{ headerShown: false }} />
          <Stack.Screen name="buyer/RiwayatDetail" options={{ headerShown: false }} />
          <Stack.Screen name="buyer/ChatRoom" options={{ headerShown: false }} />
          <Stack.Screen name="buyer/SearchScreen" options={{ headerShown: false }} />
          <Stack.Screen name="buyer/OrderTrackingScreen" options={{ headerShown: false }} />
          <Stack.Screen name="buyer/RantanganDetail" options={{ headerShown: false }} />
          <Stack.Screen name="components/AnalyticsDashboard" options={{ headerShown: false }} />
        </Stack>
      </ToastProvider>
    </ErrorBoundary>
  );
}
