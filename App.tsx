import { useRef, useEffect } from 'react';
import { StatusBar } from 'react-native';

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter'
import { Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';

import { Routes } from './src/routes'
import { Loading } from './src/components/Loading';
import { Background } from './src/components/Background';

import './src/services/notificationsConfigs'
import { getPushNotificationToken } from './src/services/getPushNotificationToken';

export default function App() {
  const getNotificationListerner = useRef<Subscription>();
  const responseNotificationListerner = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  }, [])

  useEffect(() => {
    getNotificationListerner.current = Notifications
      .addNotificationReceivedListener(notification => {
        console.log(notification);
      });
    responseNotificationListerner.current = Notifications
      .addNotificationResponseReceivedListener(response => {
        console.log(response);
      });

    return () => {
      if(getNotificationListerner.current && responseNotificationListerner.current) {
        Notifications.removeNotificationSubscription(getNotificationListerner.current);
        Notifications.removeNotificationSubscription(responseNotificationListerner.current);
      }
    }
  }, [])
  
  const [fonstLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      { fonstLoaded ? <Routes /> : <Loading /> }
    </Background>
  );
}
