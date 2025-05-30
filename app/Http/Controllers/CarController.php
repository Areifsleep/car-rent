<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\CarResource;

class CarController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $brand = $request->input('brand');
        $year = $request->input('year');
        $available_only = $request->boolean('available_only');
        
        $query = Car::query()->where('is_available', true); // Only available cars for users
        
        // Apply filters
        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('brand', 'like', "%{$search}%")
                  ->orWhere('model', 'like', "%{$search}%")
                  ->orWhere('license_plate', 'like', "%{$search}%");
            });
        }
        
        if ($brand && $brand !== 'all') {
            $query->where('brand', $brand);
        }
        
        if ($year && $year !== 'all') {
            $query->where('year', $year);
        }
        
        // Get unique brands and years for filters - PERBAIKAN DI SINI
        $brands = Car::where('is_available', true)
                     ->distinct()
                     ->pluck('brand')
                     ->filter() // Remove null values
                     ->sort() // Sort tanpa parameter
                     ->values() // Reset keys
                     ->toArray(); // Convert to array
        
        $years = Car::where('is_available', true)
                    ->distinct()
                    ->pluck('year')
                    ->filter() // Remove null values
                    ->sortDesc() // Sort descending
                    ->values() // Reset keys
                    ->toArray(); // Convert to array
        
        $cars = $query->orderBy('created_at', 'desc')
                     ->paginate(12) // 12 cards per page
                     ->withQueryString();
        
        return Inertia::render('Cars/Index', [
            'cars' => $cars,
            'filters' => [
                'search' => $search,
                'brand' => $brand,
                'year' => $year,
                'available_only' => $available_only,
            ],
            'filterOptions' => [
                'brands' => $brands,
                'years' => $years,
            ]
        ]);
    }
    
    public function show(Car $car)
    {
        return Inertia::render('Cars/Show', [
            'car' => new CarResource($car)
        ]);
    }
}