import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { ScrollView, StyleSheet, View, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../theme";

interface ScreenViewProps extends ViewProps {
  safe?: boolean;
  scroll?: boolean;
  children?: React.ReactNode;
}

export type ScreenViewRef = {
  scrollToTop: () => void;
};

const ScreenView = forwardRef<ScreenViewRef, ScreenViewProps>(
  ({ style, safe = true, scroll = true, children, ...props }, ref) => {
    const Container = scroll ? ScrollView : View;
    const componentRef = useRef<ScrollView>(null);

    useImperativeHandle(ref, () => ({
      scrollToTop() {
        componentRef.current?.scrollTo({ y: 0, animated: true });
      },
    }));

    if (safe) {
      return (
        <SafeAreaView style={styles.safeArea}>
          <Container
            {...props}
            style={styles.common}
            contentContainerStyle={[scroll && styles.contentContainer, style]}
            ref={scroll ? componentRef : undefined}
          >
            {children}
          </Container>
        </SafeAreaView>
      );
    }

    return (
      <Container
        {...props}
        style={[styles.common]}
        contentContainerStyle={[scroll && styles.contentContainer, style]}
        ref={scroll ? componentRef : undefined}
      >
        {children}
      </Container>
    );
  },
);

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  common: {
    backgroundColor: colors.gray[150],
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
});

export default ScreenView;
