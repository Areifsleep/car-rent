<?php

namespace Database\Seeders;

use App\Models\Payment;
use App\Models\Booking;
use Illuminate\Database\Seeder;

class PaymentSeeder extends Seeder
{
    public function run(): void
    {
        // Get existing bookings
        $bookings = Booking::all();
        
        foreach ($bookings as $booking) {
            Payment::create([
                'booking_id' => $booking->id,
                'amount' => $booking->total_price,
                'payment_method' => fake()->randomElement(['credit_card', 'bank_transfer', 'e_wallet', 'cash']),
                'payment_status' => fake()->randomElement(['pending', 'paid', 'failed']),
                'transaction_id' => fake()->uuid(),
                'paid_at' => fake()->boolean(70) ? fake()->dateTimeBetween('-1 month', 'now') : null,
                'gateway_response' => [
                    'gateway' => 'midtrans',
                    'status' => 'success',
                    'message' => 'Payment processed successfully'
                ]
            ]);
        }
    }
}