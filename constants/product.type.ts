export interface Topping {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  currency: "VND";
  description: string;
  price_discounted: number;
  price_original: number;
  rating_count: number;
  rating_score: number;
  thumbnail: string;
  total_sales: number;
  category_id: string;
  available_toppings: Topping[];
}
