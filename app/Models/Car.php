<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand',
        'model',
        'license_plate',
        'year',
        'rental_price_per_day',
        'description',
        'image',
        'is_available',
        'seats',
    ];

    protected $casts = [
        // 'rental_price_per_day' => 'decimal:2',
        // 'is_available' => 'boolean',
        'seats' => 'integer',
        // 'year' => 'integer',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
