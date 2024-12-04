export type OrderStatus = "active" | "completed" | "cancelled";

export interface OrderDetail {
    product_name: string;
    quantity: number;
    price: number;
    product_image: string;
}

export interface Payment {
    payment_method_status: string;
    amount: number;
    currency: string;
    payment_method_types: string[];
}

export interface Order {
    id: string;
    user_email: string;
    sub_total: number;
    discounted: number;
    payment: Payment;
    order_details: OrderDetail[];

} 