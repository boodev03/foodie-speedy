export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  toppings: string[];
  toppings_price: number[];
  price: number;
  session_id: string;
}

export interface ShoppingSession {
  id: string;
  user_email: string;
  total: number;
  cartItems: CartItem[];
}
