export interface AddToBasketPayload {
  product_id: string;
  quantity: number;
  toppings: string[];
  toppings_price: number[];
  price: number;
  product_name: string;
  product_image: string;
}

export interface ShoppingSessionPayload {
  user_email: string;
  total: number;
}
