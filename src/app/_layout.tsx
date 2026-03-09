import { Stack } from "expo-router";
import {
  useFonts,
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";
import { Providers } from "@/src/providers/Providers";
import * as WebBrowser from "expo-web-browser";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

WebBrowser.maybeCompleteAuthSession({
  skipRedirectCheck: false,
});

import "expo-router/entry";
import ChatbotButton from "@/src/features/chatbot/components/ChatbotButton";
import { useState } from "react";
import ChatbotModal from "@/src/features/chatbot/components/ChatbotModal";
import { useAuth } from "@/src/auth/useAuth";
import {
  registerForPushNotificationsAsync,
  schedulePushNotification,
} from "@/src/features/notifications/utils/notificationsHelper";
import { Platform } from "react-native";

export default function RootLayout() {
  useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
  });

  return (
    <Providers>
      <RootLayoutContent />
    </Providers>
  );
}

function RootLayoutContent() {
  const [showChat, setShowChat] = useState(false);
  const { state } = useAuth(); // to be able to use it, the wrapper should be around this component
  const { isSignedIn } = state;
  const [expoPushToken, setExpoPushToken] = useState("");
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
    [],
  ); // for android only
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);

  useEffect(() => {
    if (!isSignedIn) {
      return;
    }

    registerForPushNotificationsAsync().then(
      (token) => token && setExpoPushToken(token),
    );

    if (Platform.OS === "android") {
      Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? []),
      );
    }

    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      },
    );

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      }); // this is how apps navigate to a screen after tapping a notification

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, [isSignedIn]);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="rooms/index" />
        <Stack.Screen name="(auth)/login" />
      </Stack>

      {isSignedIn && (
        <>
          <ChatbotButton onPress={() => setShowChat(true)} />
          {/*<ChatbotButton*/}
          {/*  onPress={async () => await schedulePushNotification()}*/}
          {/*/>*/}
          <ChatbotModal isVisible={showChat} setIsVisible={setShowChat} />
        </>
      )}
    </>
  );
}
