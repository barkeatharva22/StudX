export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  trending?: boolean;
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}
