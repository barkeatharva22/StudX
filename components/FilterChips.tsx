import React from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { MotiView } from "moti";
import { colors, radii } from "@/theme/colors";

interface FilterChipsProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export default function FilterChips({ categories, selected, onSelect }: FilterChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((cat, index) => {
        const active = cat === selected;
        return (
          <Pressable key={cat} onPress={() => onSelect(cat)}>
            <MotiView
              animate={{
                backgroundColor: active ? colors.neon : "rgba(255,255,255,0.05)",
                scale: active ? 1.04 : 1,
              }}
              transition={{ type: "timing", duration: 250 }}
              style={[
                styles.chip,
                { borderColor: active ? colors.neon : colors.glassBorder },
              ]}
            >
              <Text style={[styles.text, { color: active ? colors.black : colors.textSecondary }]}>
                {cat}
              </Text>
            </MotiView>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingVertical: 4,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: radii.pill,
    borderWidth: 1,
  },
  text: {
    fontSize: 13,
    fontWeight: "700",
  },
});
