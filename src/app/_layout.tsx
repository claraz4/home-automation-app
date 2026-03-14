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
import NetInfo from "@react-native-community/netinfo";

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
  sendToken,
} from "@/src/features/notifications/utils/notificationsHelper";
import { detectBackend } from "@/src/api/backendUtils";

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

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async () => {
      await detectBackend();
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isSignedIn) {
      return;
    }

    void registerForPushNotificationsAsync();

    const pushTokenListener = Notifications.addPushTokenListener(({ data }) => {
      void sendToken(data);
    });

    return () => {
      pushTokenListener.remove();
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
          <ChatbotModal isVisible={showChat} setIsVisible={setShowChat} />
        </>
      )}
    </>
  );
}
