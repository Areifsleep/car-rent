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
        $paymentStatus = $this->faker->randomElement(['pending', 'paid', 'failed', 'refunded', 'cancelled']);
        
        return [
            'booking_id' => Booking::factory(),
            'amount' => $this->faker->randomFloat(2, 50, 1000),
            'payment_method' => $this->faker->randomElement(['credit_card', 'bank_transfer', 'e_wallet', 'cash', 'pending']),
            'payment_status' => $paymentStatus,
            'transaction_id' => $paymentStatus !== 'pending' ? $this->faker->uuid() : null,
            'paid_at' => $paymentStatus === 'paid' ? $this->faker->dateTimeBetween('-1 month', 'now') : null,
            'gateway_response' => $paymentStatus !== 'pending' ? [
                'gateway' => $this->faker->randomElement(['midtrans', 'stripe', 'xendit']),
                'status' => $paymentStatus === 'paid' ? 'success' : 'failed',
                'message' => $paymentStatus === 'paid' ? 'Payment successful' : 'Payment failed',
                'transaction_time' => now()->toISOString(),
            ] : null,
        ];
    }

    public function paid(): static
    {
        return $this->state(fn (array $attributes) => [
            'payment_status' => 'paid',
            'paid_at' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'transaction_id' => $this->faker->uuid(),
            'gateway_response' => [
                'gateway' => 'midtrans',
                'status' => 'success',
                'message' => 'Payment successful'
            ]
        ]);
    }

    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'payment_status' => 'pending',
            'paid_at' => null,
            'transaction_id' => null,
            'gateway_response' => null
        ]);
    }
}