import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { colors, radii } from "@/theme/colors";

interface QuantityStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

function StepperButton({
  icon,
  onPress,
}: {
  icon: "add" | "remove";
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPressIn={() => (scale.value = withSpring(0.85))}
      onPressOut={() => (scale.value = withSpring(1))}
      onPress={onPress}
      hitSlop={8}
    >
      <Animated.View style={[styles.stepBtn, animatedStyle]}>
        <Ionicons name={icon} size={14} color={colors.textPrimary} />
      </Animated.View>
    </Pressable>
  );
}

export default function QuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
}: QuantityStepperProps) {
  return (
    <View style={styles.row}>
      <StepperButton icon="remove" onPress={onDecrement} />
      <Text style={styles.qty}>{quantity}</Text>
      <StepperButton icon="add" onPress={onIncrement} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  stepBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  qty: {
    color: colors.textPrimary,
    fontWeight: "700",
    fontSize: 13,
    minWidth: 16,
    textAlign: "center",
  },
});
