// types/payment.d.ts
export interface Payment {
    id: number;
    booking_id: number;
    amount: number;
    payment_method: string;
    payment_status: "pending" | "paid" | "failed" | "refunded" | "cancelled";
    transaction_id?: string;
    paid_at?: string | null; // ISO datetime string atau null
    gateway_response?: any; // JSON response dari payment gateway
    created_at: string;
    updated_at: string;

    // Relations (optional, loaded when included)
    booking?: import("./booking").Booking;

    // Computed properties dari PaymentResource
    is_paid: boolean;
    is_pending: boolean;
    can_be_refunded: boolean;
    status_label: string;
    payment_method_label: string;
}

// Type untuk payment status yang lebih spesifik
export type PaymentStatus =
    | "pending"
    | "paid"
    | "failed"
    | "refunded"
    | "cancelled";

// Type untuk payment method yang umum digunakan
export type PaymentMethod =
    | "credit_card"
    | "bank_transfer"
    | "e_wallet"
    | "cash"
    | "pending"
    | string; // Allow other custom methods

// Interface untuk form data saat membuat/update payment
export interface PaymentFormData {
    booking_id: number;
    amount: number;
    payment_method: PaymentMethod;
    payment_status?: PaymentStatus;
    transaction_id?: string;
}

// Interface untuk payment update (admin)
export interface PaymentUpdateData {
    payment_status: PaymentStatus;
    transaction_id?: string;
    paid_at?: string;
    gateway_response?: any;
}

// Interface untuk gateway response (bisa disesuaikan dengan gateway yang digunakan)
export interface PaymentGatewayResponse {
    transaction_id: string;
    status: string;
    message?: string;
    gateway: string; // 'midtrans', 'stripe', 'xendit', etc.
    raw_response: any;
}
