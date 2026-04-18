import StatusBox from "@/src/shared/components/StatusBox";
import { useNetwork } from "@/src/hooks/useNetwork";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { borderRadius, spaces } from "@/src/theme";
import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

export default function OfflineBanner() {
  const { isOffline } = useNetwork();
  const insets = useSafeAreaInsets();
  const [showOnline, setShowOnline] = useState(false);
  const [prevOffline, setPrevOffline] = useState(false);

  useEffect(() => {
    if (isOffline) {
      setPrevOffline(true);
    }

    if (prevOffline && !isOffline) {
      setShowOnline(true);

      const timeout = setTimeout(() => {
        setShowOnline(false);
        setPrevOffline(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isOffline]);

  if (isOffline) {
    return (
      <StatusBox
        message="No connection. Some features may not work."
        icon={<MaterialIcons name="wifi-off" size={25} color="white" />}
        containerStyle={{
          ...styles.container,
          top: insets.top + spaces.sm,
        }}
        isError={true}
        showTitle={false}
      />
    );
  }

  if (showOnline) {
    return (
      <StatusBox
        message="Back online"
        icon={<MaterialIcons name="wifi" size={20} color="white" />}
        containerStyle={{
          ...styles.container,
          top: insets.top + spaces.sm,
        }}
        isError={false}
        showTitle={false}
      />
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: "2.5%",
    right: "2.5%",
    width: "95%",
    borderRadius: borderRadius.md,
    zIndex: 1000,
  },
});
