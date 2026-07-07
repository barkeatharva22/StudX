import React, { useState } from "react";
import {
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { BlurView } from "expo-blur";
import { MotiView } from "moti";
import { Ionicons } from "@expo/vector-icons";
import GlassCard from "./GlassCard";
import { colors, radii } from "@/theme/colors";
import { useProducts } from "@/context/ProductsContext";
import { CATEGORIES } from "@/data/products";

interface AddProductModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function AddProductModal({ visible, onClose }: AddProductModalProps) {
  const { addProduct } = useProducts();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const reset = () => {
    setName("");
    setBrand("");
    setPrice("");
    setImage("");
  };

  const handleSave = () => {
    if (!name.trim() || !price.trim()) return;
    addProduct({
      name: name.trim(),
      brand: brand.trim() || "StudX",
      price: parseFloat(price) || 0,
      image:
        image.trim() ||
        "https://images.unsplash.com/photo-1511886929837-354d827aae26?w=800&q=80",
      category: CATEGORIES[1],
      rating: 4.5,
      trending: false,
    });
    reset();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.backdrop}>
          <BlurView intensity={60} tint="dark" style={StyleSheet.absoluteFill} />
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

          <MotiView
            from={{ opacity: 0, translateY: 60, scale: 0.92 }}
            animate={{ opacity: 1, translateY: 0, scale: 1 }}
            exit={{ opacity: 0, translateY: 60, scale: 0.92 }}
            transition={{ type: "timing", duration: 350 }}
            style={styles.sheetWrap}
          >
            <GlassCard radius={radii.xl} neonBorder style={styles.sheet}>
              <View style={styles.header}>
                <Text style={styles.title}>Add New Product</Text>
                <Pressable onPress={onClose} hitSlop={10}>
                  <Ionicons name="close" size={22} color={colors.textSecondary} />
                </Pressable>
              </View>

              <Text style={styles.label}>Product Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Phantom GX Elite"
                placeholderTextColor={colors.textMuted}
                value={name}
                onChangeText={setName}
              />

              <Text style={styles.label}>Brand</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. StudX Pro"
                placeholderTextColor={colors.textMuted}
                value={brand}
                onChangeText={setBrand}
              />

              <Text style={styles.label}>Price (USD)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 189.99"
                placeholderTextColor={colors.textMuted}
                value={price}
                onChangeText={setPrice}
                keyboardType="decimal-pad"
              />

              <Text style={styles.label}>Image URL (optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="https://..."
                placeholderTextColor={colors.textMuted}
                value={image}
                onChangeText={setImage}
                autoCapitalize="none"
              />

              <Pressable style={styles.saveBtn} onPress={handleSave}>
                <Ionicons name="checkmark-circle" size={18} color={colors.black} />
                <Text style={styles.saveText}>Save Product</Text>
              </Pressable>
            </GlassCard>
          </MotiView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
  },
  sheetWrap: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  sheet: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "800",
  },
  label: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: radii.sm,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.textPrimary,
    fontSize: 14,
  },
  saveBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.neon,
    borderRadius: radii.pill,
    paddingVertical: 14,
    marginTop: 22,
  },
  saveText: {
    color: colors.black,
    fontWeight: "800",
    fontSize: 14,
  },
});
