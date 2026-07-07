import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { ProductsProvider } from "@/context/ProductsContext";
import { colors } from "@/theme/colors";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ProductsProvider>
          <FavoritesProvider>
            <CartProvider>
              <StatusBar style="light" />
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: colors.black },
                }}
              >
                <Stack.Screen name="(tabs)" />
              </Stack>
            </CartProvider>
          </FavoritesProvider>
        </ProductsProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
