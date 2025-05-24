<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Car;
use App\Http\Resources\CarResource;
use Inertia\Inertia;

class AdminCarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cars = Car::query()
            ->paginate(10)
            ->withQueryString(); // keeps filters if using

        return Inertia::render("Admin/Cars", [
            
            'cars' => CarResource::collection($cars),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    
/**
 * Show the form for creating a new resource.
 */
    public function create()
    {
        return Inertia::render('Admin/AddCar', [
            'car' => new Car(),
        ]);
    }

/**
 * Store a newly created resource in storage.
 */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'license_plate' => 'required|string|max:20|unique:cars,license_plate',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'rental_price_per_day' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'is_available' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('cars', 'public');
            $validated['image'] = $imagePath;
        }

        // Set default availability if not provided
        if (!isset($validated['is_available'])) {
            $validated['is_available'] = true;
        }

        // Create the car
        Car::create($validated);

        // Return a response
        return redirect()->route('admin.cars')->with('success', 'Mobil berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
