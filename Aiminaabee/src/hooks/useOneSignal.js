import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useOneSignal = async () => {

  console.log('useOneSignal called :>> ');
  /* O N E S I G N A L   S E T U P */
  // Use this ONESIGNAL_KEY from env
  const ONESIGNAL_KEY = 'a49a8d0a-8626-4460-b8bc-b6576750701c';
  OneSignal.setAppId(ONESIGNAL_KEY);
  OneSignal.setLogLevel(6, 0);
  OneSignal.setRequiresUserPrivacyConsent(false);
  OneSignal.promptForPushNotificationsWithUserResponse(response => {
    console.log('Prompt response:', response);
  });

  /* O N E S I G N A L  H A N D L E R S */
  OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
    console.log(
      'OneSignal: notification will show in foreground:',
      notifReceivedEvent,
    );
    // notifReceivedEvent.complete();
    let notif = notifReceivedEvent.getNotification();
    setTimeout(() => notifReceivedEvent.complete(notif), 0);
  });

  OneSignal.setNotificationOpenedHandler(notification => {
    console.log('OneSignal: notification opened:', notification);
  });

  const deviceState = await OneSignal.getDeviceState();

  if (deviceState) {
    await AsyncStorage.setItem('@oneSignalPlayerId', deviceState.userId);
  }
};
