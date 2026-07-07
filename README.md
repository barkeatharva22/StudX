# StudX ⚡

Premium football studs e-commerce app — Expo SDK 54, Expo Router, TypeScript,
black + neon-green glassmorphism UI in a Nike/Dribbble-inspired style.

## Stack

- **Expo SDK 54** + **Expo Router** (file-based navigation)
- **TypeScript**
- **Moti** + **React Native Reanimated** for all animation (fade, scale, float, spring)
- **expo-blur** + **expo-linear-gradient** for glassmorphism & gradients
- **React Context** for Cart, Favorites/Saved list, and Products state (no external state lib needed)

## Getting started

```bash
npm install
npx expo install --fix   # aligns native module versions to your exact SDK 54 build
npx expo start
```

Scan the QR code with Expo Go (SDK 54 build), or press `i` / `a` for simulators.

## Project structure

```
app/
  _layout.tsx            Root layout — providers, stack, status bar
  (tabs)/
    _layout.tsx           Tab navigator using the custom FloatingTabBar
    index.tsx             Home — hero banner, trending studs, FAB, add-product modal
    explore.tsx           Explore — search, filter chips, grid
    cart.tsx              Cart — quantity steppers, order summary, checkout
    profile.tsx           Profile — avatar, stats, account menu

components/
  GradientBackground.tsx  Black gradient + soft neon glow blobs
  GlassCard.tsx           Reusable frosted-glass panel (BlurView based)
  ProductCard.tsx         Animated product card (grid + horizontal variants)
  HeroBanner.tsx          Home hero banner with floating boot image
  FavoriteButton.tsx      Heart button with spring "pop" animation
  FAB.tsx                 Floating, gently bobbing Add Product button
  AddProductModal.tsx     Blur-backdrop modal + form, saves via ProductsContext
  SearchBar.tsx           Glass search input
  FilterChips.tsx         Animated category chip selector
  QuantityStepper.tsx     +/- quantity control used in Cart
  FloatingTabBar.tsx      Custom floating glass tab bar with animated active pill

context/
  CartContext.tsx         Cart items, quantities, subtotal
  FavoritesContext.tsx    Saved/wishlist product ids
  ProductsContext.tsx     Product catalogue + addProduct()

data/products.ts          Seed catalogue of football studs
theme/colors.ts           Black + neon-green design tokens, radii, shadows
types/product.ts          Product & CartItem types
```

## Notes

- Images are pulled from Unsplash URLs — swap in your own product photography before shipping.
- The "Save product to list" action in Home/Explore is powered by `FavoritesContext` (heart icon on every card).
- All animation timings live inline in each component so they're easy to tune per-screen.
- Run `npx expo install --fix` after cloning — dependency versions above are targeted at SDK 54 but Expo will pin exact patch versions for your environment.
