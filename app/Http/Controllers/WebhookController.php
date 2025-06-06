<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Webhook;
use App\Models\Payment;
use App\Models\Booking;
use Illuminate\Support\Facades\Log;

class WebhookController extends Controller
{
    public function stripeWebhook(Request $request)
    {
        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');
        $endpointSecret = config('stripe.webhook_secret');

        try {
            $event = Webhook::constructEvent(
                $payload, $sigHeader, $endpointSecret
            );
        } catch (\Exception $e) {
            Log::error('Webhook signature verification failed: ' . $e->getMessage());
            return response('Invalid signature', 400);
        }

        // Handle the event
        switch ($event['type']) {
            case 'checkout.session.completed':
                $session = $event['data']['object'];
                $this->handleSuccessfulPayment($session);
                break;
            
            case 'checkout.session.expired':
                $session = $event['data']['object'];
                $this->handleExpiredPayment($session);
                break;
                
            default:
                Log::info('Received unknown event type: ' . $event['type']);
        }

        return response('Success', 200);
    }

    private function handleSuccessfulPayment($session)
    {
        $bookingId = $session['metadata']['booking_id'] ?? null;
        
        if ($bookingId) {
            $booking = Booking::find($bookingId);
            if ($booking && $booking->payment) {
                $booking->payment->update([
                    'payment_status' => 'paid',
                    'paid_at' => now(),
                    'gateway_response' => $session,
                ]);
                
                $booking->update(['status' => 'confirmed']);
                
                Log::info("Payment confirmed for booking: {$bookingId}");
            }
        }
    }

    private function handleExpiredPayment($session)
    {
        $bookingId = $session['metadata']['booking_id'] ?? null;
        
        if ($bookingId) {
            $booking = Booking::find($bookingId);
            if ($booking && $booking->payment) {
                $booking->payment->update([
                    'payment_status' => 'expired',
                    'gateway_response' => $session,
                ]);
                
                Log::info("Payment expired for booking: {$bookingId}");
            }
        }
    }
}