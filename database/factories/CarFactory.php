<?php

namespace Database\Factories;

use App\Models\Car;
use Illuminate\Database\Eloquent\Factories\Factory;

class CarFactory extends Factory
{
    protected $model = Car::class;

    public function definition(): array
    {
        return [
            'brand' => $this->faker->company,
            'model' => $this->faker->word,
            'seats' => $this->faker->numberBetween(2, 7),
            'license_plate' => strtoupper($this->faker->bothify('??-###-??')),
            'year' => $this->faker->year,
            'rental_price_per_day' => $this->faker->randomFloat(2, 30, 300),
            'description' => $this->faker->text(100),
            'image' => 'https://picsum.photos/800/600?random=' . $this->faker->numberBetween(1, 1000),
            'is_available' => $this->faker->boolean,
        ];
    }
}

