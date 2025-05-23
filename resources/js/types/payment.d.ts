// payment.d.ts
export interface Payment {
    id: number;
    booking_id: number;
    amount: number;
    payment_method: string;
    payment_status: string;
    created_at: string;
    updated_at: string;
}
