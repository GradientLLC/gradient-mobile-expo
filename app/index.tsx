// app/index.tsx
import { View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { SvgXml } from 'react-native-svg';
import { GradientBackground } from '../assets/icons/Index';
import { AllPosts, SelectedMedia, setLoading } from '../redux/Actions';
import { DEFAULT_GALLERY } from '../interfaces/IGallery';
import * as Notifications from 'expo-notifications';

export default function Splash() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loggedInUserDetails } = useSelector(({ auth }) => auth);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        dispatch(setLoading(false));
        dispatch(SelectedMedia(DEFAULT_GALLERY));
        dispatch(AllPosts([]));

        // Request notification permissions using Expo's API
        await Notifications.requestPermissionsAsync();

        // Get FCM token (if needed)
        // const token = await Notifications.getExpoPushTokenAsync();

        //TODO: Implement Sign In
        // if (loggedInUserDetails) {
        //   // await handleGetMyProfile();
        //   setTimeout(() => {
        //     router.replace('/(tabs)');
        //   }, 1500);
        // } else {
        //   setTimeout(() => {
        //     router.replace('/onboard');
        //   }, 1500);
        // }

        if (true) {
          // await handleGetMyProfile();
          setTimeout(() => {
            router.replace('/(tabs)');
          }, 1500);
        } else {
          setTimeout(() => {
            router.replace('/onboard');
          }, 1500);
        }
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };

    initializeApp();
  }, []);

  return (
    <View style={styles.container}>
      <SvgXml
        xml={GradientBackground}
        width="100%"
        height="100%"
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});