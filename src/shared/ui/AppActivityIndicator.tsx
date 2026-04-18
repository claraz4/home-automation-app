import { colors } from "@/src/theme";
import { ActivityIndicator } from "react-native";

export default function AppActivityIndicator() {
  return <ActivityIndicator color={colors.primary[500]} size="large" />;
}
