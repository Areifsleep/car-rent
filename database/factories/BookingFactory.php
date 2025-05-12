<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\User;
use App\Models\Car;
use Illuminate\Database\Eloquent\Factories\Factory;

class BookingFactory extends Factory
{
    protected $model = Booking::class;

    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()?->id, // generates a random user
            'car_id' => Car::inRandomOrder()->first()?->id,  // generates a random car
            'start_date' => $this->faker->date(),
            'end_date' => $this->faker->date(),
            'total_price' => $this->faker->randomFloat(2, 50, 500),
            'status' => $this->faker->randomElement(['pending', 'confirmed', 'cancelled']),
        ];
    }
}

