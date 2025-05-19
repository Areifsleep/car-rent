<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', "role:admin"])->prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/AdminDashboard');
    })->name('admin.dashboard');
    // Route::redirect("/admin", "/admin/dashboard");
    Route::get('/users', function () {
        return Inertia::render('Admin/Users');
    })->name('admin.users');

    Route::get('/cars', [\App\Http\Controllers\AdminCarController::class, 'index'])->name('admin.cars');

    Route::get('/bookings', function () {
        return Inertia::render('Admin/Bookings');
    })->name('admin.bookings');
    Route::get('/payments', function () {
        return Inertia::render('Admin/Bookings');
    })->name('admin.payments');
});

Route::middleware(["auth","verified","role:admin"])->group(function () {
    Route::redirect("/admin", "/admin/dashboard");
});