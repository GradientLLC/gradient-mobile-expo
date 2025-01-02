// app/_layout.tsx
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useSelector } from 'react-redux';
import { GradientBackground } from '../assets/icons/Index';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/Store';
import Splash from './index';

// Initialize push notifications
const initPushNotifications = async () => {
  // We'll implement this later
};

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    initPushNotifications();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
      </PersistGate>
    </Provider>
  );
}