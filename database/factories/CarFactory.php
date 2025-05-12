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
            'license_plate' => strtoupper($this->faker->bothify('??-###-??')),
            'year' => $this->faker->year,
            'rental_price_per_day' => $this->faker->randomFloat(2, 30, 300),
            'description' => $this->faker->text(100),
            'image' => $this->faker->imageUrl(),
            'is_available' => $this->faker->boolean,
        ];
    }
}

