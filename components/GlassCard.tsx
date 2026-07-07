import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { BlurView } from "expo-blur";
import { colors, radii } from "@/theme/colors";

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  intensity?: number;
  radius?: number;
  neonBorder?: boolean;
}

export default function GlassCard({
  children,
  style,
  intensity = 40,
  radius = radii.lg,
  neonBorder = false,
}: GlassCardProps) {
  return (
    <View style={[{ borderRadius: radius, overflow: "hidden" }, style]}>
      <BlurView intensity={intensity} tint="dark" style={StyleSheet.absoluteFill} />
      <View
        style={[
          styles.overlay,
          {
            borderRadius: radius,
            borderColor: neonBorder ? colors.neonBorder : colors.glassBorder,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.glass,
    borderWidth: 1,
  },
});
