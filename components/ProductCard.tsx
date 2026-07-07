import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import GlassCard from "./GlassCard";
import FavoriteButton from "./FavoriteButton";
import { colors, radii } from "@/theme/colors";
import { Product } from "@/types/product";
import { useFavorites } from "@/context/FavoritesContext";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  index?: number;
  variant?: "horizontal" | "grid";
  onPress?: () => void;
}

export default function ProductCard({
  product,
  index = 0,
  variant = "grid",
  onPress,
}: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const active = isFavorite(product.id);

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.85, translateY: 20 }}
      animate={{ opacity: 1, scale: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 450, delay: index * 90 }}
      style={variant === "horizontal" ? styles.horizontalWrap : styles.gridWrap}
    >
      <Pressable onPress={onPress} style={{ flex: 1 }}>
        <GlassCard style={styles.card} radius={radii.md}>
          <View style={styles.imageWrap}>
            <Image source={{ uri: product.image }} style={styles.image} />
            {product.trending && (
              <View style={styles.trendingBadge}>
                <Ionicons name="flame" size={11} color={colors.black} />
                <Text style={styles.trendingText}>TRENDING</Text>
              </View>
            )}
            <View style={styles.favWrap}>
              <FavoriteButton active={active} onToggle={() => toggleFavorite(product.id)} />
            </View>
          </View>

          <View style={styles.info}>
            <Text style={styles.brand} numberOfLines={1}>
              {product.brand}
            </Text>
            <Text style={styles.name} numberOfLines={1}>
              {product.name}
            </Text>
            <View style={styles.row}>
              <Ionicons name="star" size={12} color={colors.gold} />
              <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
            </View>

            <View style={styles.footerRow}>
              <View>
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                {product.originalPrice && (
                  <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
                )}
              </View>
              <Pressable style={styles.addBtn} onPress={() => addToCart(product)} hitSlop={8}>
                <Ionicons name="add" size={18} color={colors.black} />
              </Pressable>
            </View>
          </View>
        </GlassCard>
      </Pressable>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  horizontalWrap: {
    width: 172,
    marginRight: 14,
  },
  gridWrap: {
    width: "48%",
    marginBottom: 16,
  },
  card: {
    flex: 1,
  },
  imageWrap: {
    width: "100%",
    height: 130,
    backgroundColor: colors.surfaceAlt,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  trendingBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.neon,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: radii.pill,
    gap: 3,
  },
  trendingText: {
    fontSize: 8,
    fontWeight: "800",
    color: colors.black,
    letterSpacing: 0.3,
  },
  favWrap: {
    position: "absolute",
    top: 6,
    right: 6,
  },
  info: {
    padding: 10,
  },
  brand: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 3,
  },
  rating: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: "600",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 8,
  },
  price: {
    color: colors.neon,
    fontSize: 15,
    fontWeight: "800",
  },
  originalPrice: {
    color: colors.textMuted,
    fontSize: 10,
    textDecorationLine: "line-through",
  },
  addBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.neon,
    alignItems: "center",
    justifyContent: "center",
  },
});
