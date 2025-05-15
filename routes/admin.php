<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::middleware(['auth'])->prefix('admin')->group(function () {
//     Route::get('/admin/dashboard', function () {
//         return Inertia::render('Admin/AdminDashboard');
//     })->name('admin.dashboard');
// });

Route::middleware(["auth","role:admin"])->group(function () {
    Route::redirect("/admin", "/admin/dashboard");
});