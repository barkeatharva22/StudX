import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MotiView, AnimatePresence } from "moti";
import { Ionicons } from "@expo/vector-icons";
import GradientBackground from "@/components/GradientBackground";
import GlassCard from "@/components/GlassCard";
import QuantityStepper from "@/components/QuantityStepper";
import { colors, radii } from "@/theme/colors";
import { useCart } from "@/context/CartContext";

export default function CartScreen() {
  const insets = useSafeAreaInsets();
  const { items, incrementQty, decrementQty, removeFromCart, subtotal, totalItems } = useCart();

  const shipping = items.length > 0 ? 9.99 : 0;
  const total = subtotal + shipping;

  return (
    <GradientBackground>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 16, paddingBottom: 220 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Your Cart</Text>
        <Text style={styles.subtitle}>{totalItems} item{totalItems !== 1 ? "s" : ""}</Text>

        <AnimatePresence>
          {items.map((item, index) => (
            <MotiView
              key={item.product.id}
              from={{ opacity: 0, translateX: -30 }}
              animate={{ opacity: 1, translateX: 0 }}
              exit={{ opacity: 0, translateX: 30, scale: 0.9 }}
              transition={{ type: "timing", duration: 350, delay: index * 60 }}
            >
              <GlassCard style={styles.itemCard} radius={radii.md}>
                <View style={styles.itemRow}>
                  <Image source={{ uri: item.product.image }} style={styles.itemImage} />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemBrand}>{item.product.brand}</Text>
                    <Text style={styles.itemName} numberOfLines={1}>
                      {item.product.name}
                    </Text>
                    <Text style={styles.itemPrice}>${item.product.price.toFixed(2)}</Text>
                    <View style={styles.itemFooter}>
                      <QuantityStepper
                        quantity={item.quantity}
                        onIncrement={() => incrementQty(item.product.id)}
                        onDecrement={() => decrementQty(item.product.id)}
                      />
                      <Pressable
                        onPress={() => removeFromCart(item.product.id)}
                        hitSlop={8}
                      >
                        <Ionicons name="trash-outline" size={18} color={colors.danger} />
                      </Pressable>
                    </View>
                  </View>
                </View>
              </GlassCard>
            </MotiView>
          ))}
        </AnimatePresence>

        {items.length === 0 && (
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 400 }}
            style={styles.emptyWrap}
          >
            <Ionicons name="bag-outline" size={48} color={colors.textMuted} />
            <Text style={styles.emptyText}>Your cart is empty.</Text>
            <Text style={styles.emptySub}>Add some studs from Home or Explore.</Text>
          </MotiView>
        )}

        {items.length > 0 && (
          <GlassCard radius={radii.lg} style={styles.summaryCard} neonBorder>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
          </GlassCard>
        )}
      </ScrollView>

      {items.length > 0 && (
        <View style={[styles.checkoutWrap, { paddingBottom: insets.bottom + 100 }]}>
          <Pressable style={styles.checkoutBtn}>
            <Ionicons name="lock-closed" size={16} color={colors.black} />
            <Text style={styles.checkoutText}>Checkout · ${total.toFixed(2)}</Text>
          </Pressable>
        </View>
      )}
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
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 4,
    marginBottom: 18,
  },
  itemCard: {
    marginBottom: 14,
  },
  itemRow: {
    flexDirection: "row",
    padding: 12,
  },
  itemImage: {
    width: 78,
    height: 78,
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceAlt,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemBrand: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  itemName: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 2,
  },
  itemPrice: {
    color: colors.neon,
    fontSize: 14,
    fontWeight: "800",
    marginTop: 4,
  },
  itemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  emptyWrap: {
    alignItems: "center",
    paddingVertical: 60,
    gap: 6,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: "700",
    marginTop: 10,
  },
  emptySub: {
    color: colors.textMuted,
    fontSize: 12,
  },
  summaryCard: {
    padding: 18,
    marginTop: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryLabel: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  summaryValue: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "600",
  },
  totalRow: {
    marginTop: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.glassBorder,
    marginBottom: 0,
  },
  totalLabel: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "800",
  },
  totalValue: {
    color: colors.neon,
    fontSize: 17,
    fontWeight: "900",
  },
  checkoutWrap: {
    position: "absolute",
    bottom: 0,
    left: 20,
    right: 20,
  },
  checkoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.neon,
    borderRadius: radii.pill,
    paddingVertical: 16,
  },
  checkoutText: {
    color: colors.black,
    fontWeight: "800",
    fontSize: 15,
  },
});
