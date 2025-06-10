<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     */
    protected $except = [
        'api/webhooks/stripe',        // Add this
        'api/webhooks/*',             // Or use wildcard
        '/api/webhooks/stripe',       // Try with leading slash
        'webhooks/stripe',            // Also try without api prefix
        '/webhooks/stripe',           // And with leading slash
        'api/stripe/webhook',        // If you have a different route
        '/api/stripe/webhook',        // If you have a different route
        'api/stripe/*',
        '/api/stripe/*',
        
    ];
}