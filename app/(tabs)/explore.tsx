import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GradientBackground from "@/components/GradientBackground";
import SearchBar from "@/components/SearchBar";
import FilterChips from "@/components/FilterChips";
import ProductCard from "@/components/ProductCard";
import { colors } from "@/theme/colors";
import { CATEGORIES } from "@/data/products";
import { useProducts } from "@/context/ProductsContext";

export default function ExploreScreen() {
  const insets = useSafeAreaInsets();
  const { products } = useProducts();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        query.trim().length === 0 ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [products, query, category]);

  return (
    <GradientBackground>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 16, paddingBottom: 160 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Explore</Text>
        <View style={styles.searchWrap}>
          <SearchBar value={query} onChangeText={setQuery} />
        </View>

        <FilterChips categories={CATEGORIES} selected={category} onSelect={setCategory} />

        <Text style={styles.resultCount}>{filtered.length} results</Text>

        <View style={styles.grid}>
          {filtered.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} variant="grid" />
          ))}
          {filtered.length === 0 && (
            <Text style={styles.empty}>No studs match your search.</Text>
          )}
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 16,
  },
  searchWrap: {
    marginBottom: 14,
  },
  resultCount: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  empty: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 30,
    textAlign: "center",
    width: "100%",
  },
});
