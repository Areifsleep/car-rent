<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\OnlyGuestAllowedMiddleware;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');;



Route::get('/cars', function () {
    return Inertia::render('Cars/Index');
});

// Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
//     Route::get('/dashboard', function () {
//         return Inertia::render('Admin/Dashboard');
//     })->name('admin.dashboard');
// });

Route::middleware(['auth'])->group(function () {
    Route::redirect("dashboard", "/");
});
// Route::middleware(['auth'])->group(function () {
//     Route::get('/dashboard', function () {
//         return Inertia::render('Dashboard');
//     })->name('dashboard');
// });
Route::get('/admin/dashboard', function () {
    return Inertia::render('Admin/AdminDashboard');
})->middleware(['auth', 'verified'])->name('admin.dashboard');


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