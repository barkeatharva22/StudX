import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MotiView } from "moti";
import GradientBackground from "@/components/GradientBackground";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import FAB from "@/components/FAB";
import AddProductModal from "@/components/AddProductModal";
import { colors } from "@/theme/colors";
import { useProducts } from "@/context/ProductsContext";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { products } = useProducts();
  const [modalVisible, setModalVisible] = useState(false);

  const trending = products.filter((p) => p.trending);
  const justIn = products.slice(0, 4);

  return (
    <GradientBackground>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 16, paddingBottom: 160 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "timing", duration: 400 }}
          style={styles.headerRow}
        >
          <View>
            <Text style={styles.greeting}>Welcome back 👋</Text>
            <Text style={styles.appName}>StudX</Text>
          </View>
        </MotiView>

        <HeroBanner />

        <Text style={styles.sectionTitle}>Trending Studs</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 8, paddingVertical: 4 }}
        >
          {trending.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} variant="horizontal" />
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Just In</Text>
        <View style={styles.grid}>
          {justIn.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} variant="grid" />
          ))}
        </View>
      </ScrollView>

      <FAB onPress={() => setModalVisible(true)} />
      <AddProductModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
  },
  headerRow: {
    marginBottom: 18,
  },
  greeting: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: "500",
  },
  appName: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: "900",
    marginTop: 2,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 26,
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
