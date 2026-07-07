import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import GradientBackground from "@/components/GradientBackground";
import GlassCard from "@/components/GlassCard";
import { colors, radii } from "@/theme/colors";
import { useFavorites } from "@/context/FavoritesContext";
import { useCart } from "@/context/CartContext";

const MENU_ITEMS: { icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { icon: "receipt-outline", label: "Order History" },
  { icon: "location-outline", label: "Shipping Addresses" },
  { icon: "card-outline", label: "Payment Methods" },
  { icon: "notifications-outline", label: "Notifications" },
  { icon: "shield-checkmark-outline", label: "Privacy & Security" },
  { icon: "help-circle-outline", label: "Help & Support" },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { favoriteIds } = useFavorites();
  const { totalItems } = useCart();

  return (
    <GradientBackground>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 16, paddingBottom: 160 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Profile</Text>

        <MotiView
          from={{ opacity: 0, translateY: 16 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 450 }}
        >
          <GlassCard radius={radii.xl} neonBorder style={styles.profileCard}>
            <View style={styles.avatarWrap}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=300&q=80",
                }}
                style={styles.avatar}
              />
              <View style={styles.editBadge}>
                <Ionicons name="camera" size={12} color={colors.black} />
              </View>
            </View>
            <Text style={styles.name}>Fyntrix</Text>
            <Text style={styles.email}>fyntrix.designs@studx.app</Text>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{favoriteIds.length}</Text>
                <Text style={styles.statLabel}>Saved</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{totalItems}</Text>
                <Text style={styles.statLabel}>In Cart</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Orders</Text>
              </View>
            </View>
          </GlassCard>
        </MotiView>

        <Text style={styles.sectionLabel}>Account</Text>
        <GlassCard radius={radii.lg} style={styles.menuCard}>
          {MENU_ITEMS.map((item, index) => (
            <MotiView
              key={item.label}
              from={{ opacity: 0, translateX: -12 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: "timing", duration: 300, delay: index * 60 }}
            >
              <Pressable
                style={[
                  styles.menuRow,
                  index !== MENU_ITEMS.length - 1 && styles.menuRowBorder,
                ]}
              >
                <View style={styles.menuIconWrap}>
                  <Ionicons name={item.icon} size={17} color={colors.neon} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
              </Pressable>
            </MotiView>
          ))}
        </GlassCard>

        <Pressable style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={18} color={colors.danger} />
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
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
    marginBottom: 18,
  },
  profileCard: {
    alignItems: "center",
    padding: 24,
  },
  avatarWrap: {
    position: "relative",
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 2,
    borderColor: colors.neon,
  },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.neon,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.black,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 19,
    fontWeight: "800",
    marginTop: 14,
  },
  email: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    color: colors.neon,
    fontSize: 18,
    fontWeight: "900",
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: colors.glassBorder,
  },
  sectionLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 26,
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  menuCard: {
    paddingHorizontal: 6,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 10,
    gap: 12,
  },
  menuRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.glassBorder,
  },
  menuIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: colors.neonSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "600",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: "rgba(255,71,87,0.35)",
  },
  logoutText: {
    color: colors.danger,
    fontWeight: "700",
    fontSize: 14,
  },
});
