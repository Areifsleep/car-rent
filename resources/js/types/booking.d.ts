import { User } from "./user";
import { Car } from "./car";
import { Payment } from "./payment";

export interface Booking {
    id: number;
    user_id: number;
    car_id: number;
    start_date: string; // Format ISO "YYYY-MM-DD"
    end_date: string; // Format ISO "YYYY-MM-DD"
    total_price: number;
    status: "pending" | "confirmed" | "cancelled";
    created_at: string;
    updated_at: string;

    // Relasi
    user?: User;
    car?: Car;
    payment?: Payment;
}
