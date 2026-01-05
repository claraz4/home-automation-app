import { Href, Link } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { colors, fontStyle } from "@/src/theme";

interface AppLinkProps {
  href: Href;
  children: React.ReactNode;
}

export default function AppLink({ href, children }: AppLinkProps) {
  return (
    <Link href={href} style={[styles.link, fontStyle]}>
      {children}
    </Link>
  );
}

const styles = StyleSheet.create({
  link: {
    color: colors.primary[500],
  },
});
