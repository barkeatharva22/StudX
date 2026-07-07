import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import { colors, radii, shadows } from "@/theme/colors";

const ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: "home",
  explore: "grid",
  cart: "bag",
  profile: "person",
};

const LABELS: Record<string, string> = {
  index: "Home",
  explore: "Explore",
  cart: "Cart",
  profile: "Profile",
};

export default function FloatingTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.wrap}>
      <View style={[styles.bar, shadows.card]}>
        <BlurView intensity={55} tint="dark" style={StyleSheet.absoluteFill} />
        <View style={styles.overlay} />
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const iconName = ICONS[route.name] ?? "ellipse";
          const label = LABELS[route.name] ?? route.name;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable key={route.key} onPress={onPress} style={styles.tab}>
              <MotiView
                animate={{
                  scale: focused ? 1 : 0.9,
                  translateY: focused ? -4 : 0,
                }}
                transition={{ type: "spring", damping: 12 }}
                style={styles.tabInner}
              >
                {focused && (
                  <MotiView
                    from={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "timing", duration: 250 }}
                    style={styles.activePill}
                  />
                )}
                <Ionicons
                  name={focused ? iconName : (`${iconName}-outline` as keyof typeof Ionicons.glyphMap)}
                  size={20}
                  color={focused ? colors.black : colors.textSecondary}
                  style={focused ? styles.iconOnActive : undefined}
                />
                {focused && <Text style={styles.label}>{label}</Text>}
              </MotiView>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    bottom: 24,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  bar: {
    flexDirection: "row",
    width: "100%",
    height: 68,
    borderRadius: radii.xl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10,10,10,0.55)",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  activePill: {
    position: "absolute",
    width: 64,
    height: 40,
    borderRadius: radii.pill,
    backgroundColor: colors.neon,
  },
  iconOnActive: {
    zIndex: 2,
  },
  label: {
    color: colors.black,
    fontWeight: "800",
    fontSize: 12,
    zIndex: 2,
  },
});
