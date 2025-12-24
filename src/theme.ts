import { StyleSheet, TextStyle, Platform } from "react-native";

type HeadingVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type TextVariant =
  | "body"
  | "bodySecondary"
  | "emphasis"
  | "bodyWhite"
  | "bodySmallWhite";

export const colors = {
  primary: {
    25: "#fafaff",
    50: "#EFF4FF",
    100: "#D1E0FF",
    200: "#B2CCFF",
    300: "#84ADFF",
    400: "#528BFF",
    500: "#2970FF",
    600: "#155EEF",
    700: "#004EEB",
    800: "#0040C1",
    900: "#00359E",
    950: "#002266",
  },
  secondary: {
    25: "#FFF9E6",
    50: "#FFF2CC",
    100: "#FFE699",
    200: "#FFD966",
    300: "#FFCC33",
    400: "#FFC233",
    500: "#FFB829",
    600: "#E6A326",
    700: "#CC8F22",
    800: "#B37B1E",
    900: "#99671A",
  },
  text: "#202020",
  background: "#fff",
  gray: {
    25: "#FCFCFC",
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#E5E5E5",
    300: "#D4D4D4",
    400: "#A3A3A3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
  },
  status: {
    fail: "#da2f2f",
    success: "#6bcb6f",
  },
};

export const fontStyle: TextStyle = {
  fontFamily: Platform.select({
    ios: "System",
    android: "Roboto",
    default: "System",
  }),
};

export const headings = StyleSheet.create<Record<HeadingVariant, TextStyle>>({
  h1: { fontSize: 32, fontWeight: "700", color: colors.text },
  h2: { fontSize: 28, fontWeight: "600", color: colors.text },
  h3: { fontSize: 22, fontWeight: "600", color: colors.text },
  h4: { fontSize: 18, fontWeight: "600", color: colors.text },
  h5: { fontSize: 16, fontWeight: "600", color: colors.text },
  h6: { fontSize: 14, fontWeight: "600", color: colors.text },
});

export const text = StyleSheet.create<Record<TextVariant, TextStyle>>({
  body: { fontSize: 16, fontWeight: "500", color: colors.text },
  bodyWhite: { fontSize: 16, fontWeight: "500", color: "white" },
  bodySmallWhite: { fontSize: 13, fontWeight: "400", color: "white" },
  bodySecondary: { fontSize: 16, fontWeight: "400", color: colors.gray[500] },
  emphasis: { fontSize: 16, fontWeight: "400", color: colors.primary[500] },
});

export const borderRadius = {
  sm: 5,
  md: 10,
  lg: 15,
};

export const spaces = {
  xxxs: 2,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,
};
export type Space = keyof typeof spaces;

export const paddings = {
  page: 16,
};

export const boxShadow = {
  normal: {
    shadowColor: "rgba(0,0,0,0.2)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2,
  },
};
