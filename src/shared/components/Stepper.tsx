import { View, StyleSheet, Pressable } from "react-native";
import { borderRadius, colors, fontWeight, spaces } from "@/src/theme";
import { AppText } from "@/src/shared/ui/AppText";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface StepperProps {
  max: number;
  min: number;
  current: number;
  setCurrent: Dispatch<SetStateAction<number>>;
  step?: number;
  title?: string;
  padStart?: number;
}

export default function Stepper({
  max,
  min,
  step = 1,
  current,
  setCurrent,
  title,
  padStart = 1,
}: StepperProps) {
  const [isAddDisabled, setIsAddDisabled] = useState(false);
  const [isMinusDisabled, setIsMinusDisabled] = useState(false);

  // Disable buttons when no longer possible
  useEffect(() => {
    setIsMinusDisabled(current - step < min);
    setIsAddDisabled(current + step > max);
  }, [current]);

  // Logic for the pressable buttons
  const increaseCurrent = () => {
    if (current + step <= max) {
      setCurrent((prevState) => prevState + step);
    }
  };

  const decreaseCurrent = () => {
    if (current - step >= min) {
      setCurrent((prevState) => prevState - step);
    }
  };

  return (
    <View style={styles.fullContainer}>
      <View style={styles.container}>
        <Pressable
          disabled={isAddDisabled}
          onPress={increaseCurrent}
          style={[
            styles.controlContainer,
            isAddDisabled && styles.disabledControl,
          ]}
        >
          <AppText
            style={[styles.controlText, isAddDisabled && styles.disabledText]}
          >
            +
          </AppText>
        </Pressable>
        <AppText style={styles.textValue}>
          {String(current).padStart(padStart, "0")}
        </AppText>
        <Pressable
          disabled={isMinusDisabled}
          onPress={decreaseCurrent}
          style={[
            styles.controlContainer,
            isMinusDisabled && styles.disabledControl,
          ]}
        >
          <AppText
            style={[styles.controlText, isMinusDisabled && styles.disabledText]}
          >
            -
          </AppText>
        </Pressable>
      </View>
      {title && <AppText style={styles.stepperTitle}>{title}</AppText>}
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    rowGap: spaces.xs,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  container: {
    backgroundColor: colors.primary[100],
    padding: spaces.xxs + spaces.xxxs,
    borderRadius: borderRadius.sm,
    justifyContent: "center",
    alignItems: "center",
    rowGap: spaces.xs,
  },
  controlContainer: {
    backgroundColor: "white",
    paddingHorizontal: spaces.sm + spaces.xxs,
    borderRadius: borderRadius.sm,
  },
  controlText: {
    color: colors.primary[500],
    fontSize: 25,
    fontFamily: fontWeight[500],
    marginVertical: -spaces.xxxs,
  },
  textValue: {
    fontFamily: fontWeight[600],
    fontSize: 25,
  },
  stepperTitle: {
    fontFamily: fontWeight[500],
    fontSize: 18,
  },
  disabledControl: {
    opacity: 0.8,
  },
  disabledText: {
    color: colors.gray[400],
  },
});
