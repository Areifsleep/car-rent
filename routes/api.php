<?php
// routes/api.php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WebhookController;
Route::post('/webhooks/stripe', [WebhookController::class, 'stripeWebhook']);