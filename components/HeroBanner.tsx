import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { MotiView } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import { colors, radii } from "@/theme/colors";

export default function HeroBanner() {
  return (
    <MotiView
      from={{ opacity: 0, translateY: -16 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 500 }}
      style={styles.container}
    >
      <LinearGradient
        colors={["#0F1F0C", colors.black]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.content}>
        <Text style={styles.eyebrow}>NEW COLLECTION</Text>
        <Text style={styles.title}>Own the{"\n"}Pitch.</Text>
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "timing", duration: 500, delay: 200 }}
          style={styles.cta}
        >
          <Text style={styles.ctaText}>Shop Studs →</Text>
        </MotiView>
      </View>

      <MotiView
        from={{ translateY: 0 }}
        animate={{ translateY: -10 }}
        transition={{
          type: "timing",
          duration: 1800,
          loop: true,
          repeatReverse: true,
        }}
        style={styles.imageWrap}
      >
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1511886929837-354d827aae26?w=600&q=80",
          }}
          style={styles.image}
        />
      </MotiView>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 190,
    borderRadius: radii.xl,
    overflow: "hidden",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  eyebrow: {
    color: colors.neon,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: "900",
    marginTop: 6,
    lineHeight: 32,
  },
  cta: {
    marginTop: 14,
    alignSelf: "flex-start",
    backgroundColor: colors.neon,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radii.pill,
  },
  ctaText: {
    color: colors.black,
    fontWeight: "800",
    fontSize: 12,
  },
  imageWrap: {
    width: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 160,
    height: 160,
    resizeMode: "contain",
    transform: [{ rotate: "-18deg" }],
  },
});
