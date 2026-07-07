import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { colors } from "@/theme/colors";

interface FavoriteButtonProps {
  active: boolean;
  onToggle: () => void;
  size?: number;
}

export default function FavoriteButton({ active, onToggle, size = 20 }: FavoriteButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSequence(withSpring(1.4, { damping: 4 }), withSpring(1));
    onToggle();
  };

  return (
    <Pressable onPress={handlePress} hitSlop={12} style={styles.pressable}>
      <BlurView intensity={50} tint="dark" style={styles.blur}>
        <Animated.View style={animatedStyle}>
          <Ionicons
            name={active ? "heart" : "heart-outline"}
            size={size}
            color={active ? colors.neon : colors.textPrimary}
          />
        </Animated.View>
      </BlurView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 999,
    overflow: "hidden",
  },
  blur: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
  },
});
