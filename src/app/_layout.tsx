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

WebBrowser.maybeCompleteAuthSession({
  skipRedirectCheck: false,
});

import "expo-router/entry";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
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
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="rooms/index" />
        <Stack.Screen name="(auth)/login" />
      </Stack>
    </Providers>
  );
}
