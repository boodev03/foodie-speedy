export interface AddToBasketPayload {
  product_id: string;
  quantity: number;
  toppings: string[];
  toppings_price: number[];
  price: number;
}

export interface ShoppingSessionPayload {
  user_email: string;
  total: number;
}
