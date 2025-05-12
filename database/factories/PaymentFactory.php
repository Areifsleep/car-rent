<?php

namespace Database\Factories;

use App\Models\Payment;
use App\Models\Booking;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaymentFactory extends Factory
{
    protected $model = Payment::class;

    public function definition(): array
    {
        return [
            'booking_id' => Booking::inRandomOrder()->first()?->id, // generates a random booking
            'amount' => $this->faker->randomFloat(2, 50, 500),
            'payment_method' => $this->faker->randomElement(['credit_card', 'bank_transfer', 'paypal']),
            'payment_status' => $this->faker->randomElement(['pending', 'completed', 'failed']),
        ];
    }
}

