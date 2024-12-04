export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  toppings: string[];
  toppings_price: number[];
  price: number;
  session_id: string;
  product_name: string;
  product_image: string;
  price_original: number;
}

export interface ShoppingSession {
  id: string;
  user_email: string;
  total: number;
  cartItems: CartItem[];
}
