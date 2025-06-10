# 🚗 Car Rental Management System

A comprehensive car rental management system built with Laravel, designed to handle vehicle management, user bookings, and secure payments through Stripe.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![PHP Version](https://img.shields.io/badge/php-%3E%3D8.2-blue.svg)
![Laravel](https://img.shields.io/badge/laravel-11.x-orange.svg)

---

## 📋 Table of Contents

-   [Prerequisites](#-prerequisites)
-   [🚀 Installation and Setup](#-installation-and-setup)
-   [💳 Stripe Configuration](#-stripe-configuration)
-   [🔗 Webhook Setup with Ngrok](#-webhook-setup-with-ngrok)
-   [🛠️ Usage](#️-usage)
-   [🧪 Testing](#-testing)

---

## ✅ Prerequisites

Before you begin, ensure you have the following software installed on your machine:

-   **PHP:** >= 8.2
-   **Composer:** >= 2.0
-   **Node.js:** >= 18.x
-   **Package Manager:** npm or yarn
-   **Database:** MySQL >= 8.0
-   **Version Control:** Git
-   **Tunneling:** `ngrok` (for webhook development)

---

## 🚀 Installation and Setup

Follow these steps to get your development environment set up and running.

1.  **Clone the Repository**

    ```bash
    # Clone this repository to your local machine
    git clone [https://github.com/your-username/car-rental-system.git](https://github.com/your-username/car-rental-system.git)

    # Navigate into the project directory
    cd car-rental-system
    ```

2.  **Install Dependencies**

    ```bash
    # Install PHP dependencies with Composer
    composer install

    # Install JavaScript dependencies with npm
    npm install
    ```

3.  **Configure Environment**

    ```bash
    # Create your environment file from the example
    cp .env.example .env

    # Generate a new application key
    php artisan key:generate
    ```

4.  **Setup Database**

    -   Open the `.env` file in your code editor.
    -   Locate the `DB_*` variables and update them with your MySQL database credentials (e.g., `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`).

5.  **Run Migrations & Seed Data**
    This command will create all the necessary tables and populate them with sample data, including user accounts.
    ```bash
    php artisan migrate:fresh --seed
    ```

---

## 💳 Stripe Configuration

This application uses Stripe for payment processing. You must configure your API keys to handle payments.

1.  **Get Your Stripe Keys:**

    -   Log in to your [Stripe Dashboard](https://dashboard.stripe.com/).
    -   Navigate to **Developers → API Keys**.
    -   Copy your **Publishable key** (`pk_test_...`) and **Secret key** (`sk_test_...`).

2.  **Add Keys to `.env` File:**

    -   Open your `.env` file and add the following lines, replacing the placeholder values with your actual keys.
    -   _Note: `STRIPE_WEBHOOK_SECRET` will be configured in the next section._

    ```ini
    # Stripe API Configuration
    STRIPE_KEY=pk_test_your_publishable_key_here
    STRIPE_SECRET=sk_test_your_secret_key_here
    STRIPE_WEBHOOK_SECRET=

    # Optional: Set APP_URL to your ngrok URL for webhook testing
    APP_URL=[https://your-ngrok-url.ngrok.io](https://your-ngrok-url.ngrok.io)
    ```

---

## 🔗 Webhook Setup with Ngrok

To test payment confirmations and other Stripe events locally, you need to expose your local server to the internet using `ngrok`.

1.  **Start Your Local Servers**

    ```bash
    # Terminal 1: Start the Laravel server
    php artisan serve
    ```

2.  **Start Ngrok Tunnel**

    ```bash
    # Terminal 2: Start an ngrok tunnel pointing to your Laravel port (default 8000)
    ngrok http 8000
    ```

    -   Copy the **HTTPS** URL provided by `ngrok` (e.g., `https://random-string.ngrok.io`).

3.  **Configure Stripe Webhook Endpoint**

    -   Go to your **Stripe Dashboard → Developers → Webhooks**.
    -   Click **"Add endpoint"**.
    -   **Endpoint URL:** Paste your `ngrok` HTTPS URL and append your webhook route: `https://random-string.ngrok.io/api/stripe/webhook`
    -   **Events to send:** Click "Select events" and choose at least the following:
        -   `✅ checkout.session.completed`
        -   `✅ checkout.session.expired`
    -   Click **"Add endpoint"**.

4.  **Add Webhook Secret to `.env`**
    -   After creating the endpoint, Stripe will show a **"Signing secret"** (it looks like `whsec_...`).
    -   Copy this secret.
    -   Paste it into the `STRIPE_WEBHOOK_SECRET` variable in your `.env` file.

---

## 🛠️ Usage

Once everything is set up, you can run the application for development or build it for production.

-   **For Development (with Hot Module Replacement):**
    This command will start the Vite development server, allowing for live updates as you code.

    ```bash
    npm run dev
    ```

-   **For Production:**
    This command will compile and bundle your frontend assets for optimal performance.
    ```bash
    npm run build
    ```

---

## 🧪 Testing

The system is seeded with two sample users and you can use Stripe's test cards to simulate the booking process.

-   **Sample User Accounts:**

    -   **Admin:**
        -   **Email:** `admin@example.com`
        -   **Password:** `password`
    -   **User:**
        -   **Email:** `user@example.com`
        -   **Password:** `password`

-   **Stripe Test Cards:**
    | Card Number | Status |
    | ------------------------- | --------------- |
    | `4242 4242 4242 4242` | ✅ Success |
    | `4000 0000 0000 0002` | ❌ Decline |
    | `4000 0027 6000 3184` | 🔒 3D Secure |
    _(Use any valid future date and any 3-digit CVC)_

-   **Test Booking Flow:**
    1.  Register or log in as a user.
    2.  Browse the available cars and select one.
    3.  Choose your desired booking dates.
    4.  Proceed to the payment page.
    5.  Use one of Stripe's test cards to complete the checkout.
    6.  Check your terminal (where `ngrok` is running) and the Ngrok Web Interface (`http://127.0.0.1:4040`) to see the webhook confirmation from Stripe.
