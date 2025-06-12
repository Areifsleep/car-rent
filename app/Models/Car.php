<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Storage;

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
        'rental_price_per_day' => 'decimal:0', // Rupiah tanpa desimal
        'is_available' => 'boolean',
        'seats' => 'integer',
        'year' => 'integer',
    ];

    // Add this to automatically append image_url to JSON
    protected $appends = ['image_url'];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function getFormattedRentalPriceAttribute()
    {
        return 'Rp ' . number_format($this->rental_price_per_day, 0, ',', '.');
    }

    /**
     * Get the image URL - prioritize local storage over internet URLs
     */
    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }

        // Check if it's already a full URL (starts with http/https)
        if (filter_var($this->image, FILTER_VALIDATE_URL)) {
            // It's an internet URL, but check if we have a local version
            $localImagePath = $this->getLocalImagePath();
            if ($localImagePath && Storage::disk('public')->exists($localImagePath)) {
                return Storage::url($localImagePath);
            }
            // Return the internet URL as fallback
            return $this->image;
        }

        // It's a local path
        if (Storage::disk('public')->exists($this->image)) {
            return Storage::url($this->image);
        }

        // File doesn't exist, return null or a default image
        return null;
    }

    /**
     * Check if the car has a local image file
     */
    public function hasLocalImage()
    {
        if (!$this->image) {
            return false;
        }

        // If it's not a URL, check if local file exists
        if (!filter_var($this->image, FILTER_VALIDATE_URL)) {
            return Storage::disk('public')->exists($this->image);
        }

        // If it's a URL, check if we have a local version
        $localImagePath = $this->getLocalImagePath();
        return $localImagePath && Storage::disk('public')->exists($localImagePath);
    }

    /**
     * Get the local image path based on car ID (for migrating from URLs)
     */
    private function getLocalImagePath()
    {
        return "cars/car-{$this->id}.jpg"; // or .png, .jpeg based on your preference
    }

    /**
     * Helper method to delete old image when updating
     */
    public function deleteImage()
    {
        if ($this->image && !filter_var($this->image, FILTER_VALIDATE_URL)) {
            if (Storage::disk('public')->exists($this->image)) {
                Storage::disk('public')->delete($this->image);
            }
        }
    }

    /**
     * Check if image is from internet (URL)
     */
    public function isImageFromInternet()
    {
        return $this->image && filter_var($this->image, FILTER_VALIDATE_URL);
    }

    /**
     * Get image type (local or internet)
     */
    public function getImageTypeAttribute()
    {
        if (!$this->image) {
            return 'none';
        }
        
        return filter_var($this->image, FILTER_VALIDATE_URL) ? 'internet' : 'local';
    }

    public function getTotalEarningsAttribute()
    {
        return $this->bookings()
                    ->whereHas('payment', function($q) {
                        $q->where('payment_status', 'paid');
                    })
                    ->sum('total_amount');
    }

    public function getBookingCountAttribute()
    {
        return $this->bookings()->where('status', '!=', 'cancelled')->count();
    }

    public function isCurrentlyBooked()
    {
        return $this->bookings()
                    ->active()
                    ->exists();
    }
}