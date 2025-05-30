<?php

use App\Http\Controllers\CarController;
use App\Http\Controllers\AdminCarController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BookingController;



Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');;



Route::get('/cars', [CarController::class, 'index'])->name('cars.index');



// Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
//     Route::get('/dashboard', function () {
//         return Inertia::render('Admin/Dashboard');
//     })->name('admin.dashboard');
// });


Route::middleware(['auth'])->group(function () {
    Route::redirect("dashboard", "/");
    Route::get('/bookings', [BookingController::class, 'index'])->name('bookings.index');
    Route::get('/bookings/create/{car}', [BookingController::class, 'create'])->name('bookings.create');
    Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');
    Route::get('/bookings/{booking}', [BookingController::class, 'show'])->name('bookings.show');
    Route::patch('/bookings/{booking}/cancel', [BookingController::class, 'cancel'])->name('bookings.cancel');
});
// Route::middleware(['auth'])->group(function () {
//     Route::get('/dashboard', function () {
//         return Inertia::render('Dashboard');
//     })->name('dashboard');
// });
// Route::get('/admin/cars', [AdminCarController::class, 'index'])->middleware(['auth', 'verified', 'role:admin'])->name('admin.cars');
// Route::get('/admin/dashboard', function () {
//     return Inertia::render('Admin/AdminDashboard');
// })->middleware(['auth', 'verified', 'role:admin'])->name('admin.dashboard');
Route::get('/admin/users', function () {
    return Inertia::render('Admin/Users');
})->middleware(['auth', 'verified', 'role:admin'])->name('admin.users');
// Route::get('/admin/cars', function () {
//     return Inertia::render('Admin/Cars');
// })->middleware(['auth', 'verified', 'role:admin'])->name('admin.cars');
// Route::get('/admin/bookings', function () {
//     return Inertia::render('Admin/Bookings');
// })->middleware(['auth', 'verified', 'role:admin'])->name('admin.bookings');
Route::get('/admin/payments', function () {
    return Inertia::render('Admin/Payments');
})->middleware(['auth', 'verified', 'role:admin'])->name('admin.payments');


// Route::get('/cars', function () {
//     return Inertia::render('Cars/Index');
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__.'/auth.php';
require __DIR__ . '/admin.php';