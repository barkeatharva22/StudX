import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { colors, shadows } from "@/theme/colors";

interface FABProps {
  onPress: () => void;
}

export default function FAB({ onPress }: FABProps) {
  const scale = useSharedValue(1);
  const float = useSharedValue(0);

  React.useEffect(() => {
    float.value = withRepeat(
      withSequence(
        withTiming(-6, { duration: 1400 }),
        withTiming(0, { duration: 1400 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: float.value }],
  }));

  const handlePress = () => {
    scale.value = withSequence(withSpring(0.85), withSpring(1));
    onPress();
  };

  return (
    <Animated.View style={[styles.wrap, shadows.neonGlow, animatedStyle]}>
      <Pressable onPress={handlePress} style={styles.button}>
        <Ionicons name="add" size={28} color={colors.black} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    right: 20,
    bottom: 118,
    borderRadius: 30,
  },
  button: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.neon,
    alignItems: "center",
    justifyContent: "center",
  },
});
