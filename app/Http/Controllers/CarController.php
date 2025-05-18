<?php

namespace App\Http\Controllers;

use App\Http\Resources\CarResource;
use App\Models\Car;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CarController extends Controller
{
    // GET /cars
    public function index()
    {
        $cars = Car::query()
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString(); // keeps filters if using

        return Inertia::render('Cars/Index', [
            
            'cars' => CarResource::collection($cars),
        ]);
    }

    public function create()
    {
        //
    }

    // POST /cars
    public function store(Request $request)
    {
        $validated = $request->validate([
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'license_plate' => 'required|string|max:20|unique:cars',
            'year' => 'required|integer|between:1900,' . now()->year,
            'rental_price_per_day' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'is_available' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('car_images', 'public');
        }

        Car::create($validated);

        return redirect()->route('cars.index')->with('success', 'Car created successfully.');
    }

    // GET /cars/{car}
    public function show(Car $car): Response
    {
        return Inertia::render('Cars/Show', [
            'car' => new CarResource($car),
        ]);
    }

    // PUT/PATCH /cars/{car}
    public function update(Request $request, Car $car)
    {
        $validated = $request->validate([
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'license_plate' => 'required|string|max:20|unique:cars,license_plate,' . $car->id,
            'year' => 'required|integer|between:1900,' . now()->year,
            'rental_price_per_day' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'is_available' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('car_images', 'public');
        }

        $car->update($validated);

        return redirect()->route('cars.index')->with('success', 'Car updated successfully.');
    }

    // DELETE /cars/{car}
    public function destroy(Car $car)
    {
        $car->delete();

        return redirect()->route('cars.index')->with('success', 'Car deleted successfully.');
    }
}
