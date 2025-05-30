<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'car_id', 
        'start_date',
        'end_date',
        'total_price',
        'status',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'total_price' => 'decimal:2',
    ];

    // Relations
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function car()
    {
        return $this->belongsTo(Car::class);
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
    
    // Business Logic Methods
    public function getDurationDays()
    {
        return $this->start_date->diffInDays($this->end_date);
    }
    
    public function getStatusLabel()
    {
        return match($this->status) {
            'pending' => 'Menunggu Konfirmasi',
            'confirmed' => 'Dikonfirmasi',
            'cancelled' => 'Dibatalkan',
            default => 'Unknown'
        };
    }
    
    public function canBeCancelled()
    {
        return $this->status === 'pending' && 
               $this->start_date->isAfter(now()->addDays(1));
    }
    
    public function isActive()
    {
        return $this->status === 'confirmed' && 
               $this->start_date->isToday() || 
               ($this->start_date->isPast() && $this->end_date->isFuture());
    }
    
    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'confirmed')
                    ->where('start_date', '<=', now())
                    ->where('end_date', '>=', now());
    }
    
    public function scopeUpcoming($query)
    {
        return $query->where('status', 'confirmed')
                    ->where('start_date', '>', now());
    }
    
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }
}