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
            'image' => "https://img.jba.co.id/news/20240919140521coverxHB26en9.webp",
            'is_available' => $this->faker->boolean,
        ];
    }
}

