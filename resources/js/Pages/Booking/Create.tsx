// Pages/Booking/Create.tsx - Updated version
"use client";

import { useState } from "react";
import { useForm, router } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { ArrowLeft, CreditCard } from "lucide-react";
import { Link } from "@inertiajs/react";
import Navbar from "@/Components/NavBar";
import { Car } from "@/types/car";

interface BookingCreateProps {
    car: Car;
    unavailableDates: string[];
}

export default function BookingCreate({
    car,
    unavailableDates,
}: BookingCreateProps) {
    const [totalDays, setTotalDays] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [taxAmount, setTaxAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    const { data, setData, post, processing, errors } = useForm({
        car_id: car.id,
        start_date: "",
        end_date: "",
        notes: "",
    });

    const formatRupiah = (amount: number): string => {
        return "Rp " + amount.toLocaleString("id-ID");
    };

    const calculateTotal = (startDate: string, endDate: string) => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            if (end > start) {
                const diffTime = Math.abs(end.getTime() - start.getTime());
                const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                const dailyRate = parseFloat(
                    car.rental_price_per_day.toString()
                );
                const sub = dailyRate * days;
                const tax = Math.round(sub * 0.12); // PPN 12%
                const total = sub + tax;

                setTotalDays(days);
                setSubtotal(sub);
                setTaxAmount(tax);
                setTotalAmount(total);
            } else {
                setTotalDays(0);
                setSubtotal(0);
                setTaxAmount(0);
                setTotalAmount(0);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Submit akan create booking dan redirect ke payment page
        post(route("bookings.store"), {
            onSuccess: (page) => {
                // BookingController akan redirect ke payment page
                console.log("Booking created, redirecting to payment...");
            },
            onError: (errors) => {
                console.log("Booking creation failed:", errors);
            },
        });
    };

    const today = new Date().toISOString().split("T")[0];

    const getTomorrowDate = (startDate: string) => {
        if (!startDate) return today;
        const date = new Date(startDate);
        date.setDate(date.getDate() + 1);
        return date.toISOString().split("T")[0];
    };

    // Validation: Can't proceed without dates
    const canProceed = data.start_date && data.end_date && totalDays > 0;

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-800">
            <Navbar />

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Back Button */}
                <div className="mb-6">
                    <Link href={route("home")}>
                        <Button
                            variant="outline"
                            className="bg-transparent border-zinc-600 text-white hover:bg-zinc-700"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Cars
                        </Button>
                    </Link>
                </div>

                <h1 className="text-3xl font-bold text-white mb-8 text-center">
                    Book Your Car
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Car Info - Same as before */}
                    <Card className="bg-zinc-800/60 backdrop-blur-sm border-zinc-700">
                        <CardHeader>
                            <CardTitle className="text-white text-xl">
                                {car.brand} {car.model}
                            </CardTitle>
                            <p className="text-zinc-400">{car.year}</p>
                        </CardHeader>
                        <CardContent>
                            {/* Car details same as before */}
                            <div className="relative mb-6">
                                <img
                                    src={car.image || "/placeholder-car.svg"}
                                    alt={`${car.brand} ${car.model}`}
                                    className="w-full h-64 object-cover rounded-lg"
                                />
                                <div className="absolute top-3 right-3">
                                    <span className="bg-green-500/90 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                                        Available
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3 text-zinc-300">
                                <div className="flex justify-between">
                                    <span>License Plate:</span>
                                    <span className="font-medium">
                                        {car.license_plate}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Seats:</span>
                                    <span className="font-medium">
                                        {car.seats} passengers
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Daily Rate:</span>
                                    <span className="font-bold text-amber-400">
                                        {formatRupiah(
                                            parseFloat(car.rental_price_per_day)
                                        )}
                                    </span>
                                </div>
                            </div>

                            {car.description && (
                                <div className="mt-4 p-4 bg-zinc-700/50 rounded-lg">
                                    <h4 className="text-white font-medium mb-2">
                                        Description
                                    </h4>
                                    <p className="text-zinc-300 text-sm">
                                        {car.description}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Booking Form */}
                    <Card className="bg-zinc-800/60 backdrop-blur-sm border-zinc-700">
                        <CardHeader>
                            <CardTitle className="text-white text-xl">
                                Booking Details
                            </CardTitle>
                            <p className="text-zinc-400">
                                Select your rental dates
                            </p>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Date Range - In One Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Start Date */}
                                    <div>
                                        <Label
                                            htmlFor="start_date"
                                            className="text-white text-sm font-medium"
                                        >
                                            Tanggal Ambil
                                        </Label>
                                        <Input
                                            type="date"
                                            id="start_date"
                                            className="mt-1 bg-zinc-700 border-zinc-600 text-white focus:border-amber-500 focus:ring-amber-500"
                                            value={data.start_date}
                                            min={today}
                                            onChange={(e) => {
                                                setData(
                                                    "start_date",
                                                    e.target.value
                                                );
                                                calculateTotal(
                                                    e.target.value,
                                                    data.end_date
                                                );
                                            }}
                                        />
                                        {errors.start_date && (
                                            <p className="text-red-400 text-sm mt-1">
                                                {errors.start_date}
                                            </p>
                                        )}
                                    </div>

                                    {/* End Date */}
                                    <div>
                                        <Label
                                            htmlFor="end_date"
                                            className="text-white text-sm font-medium"
                                        >
                                            Tanggal Kembali
                                        </Label>
                                        <Input
                                            type="date"
                                            id="end_date"
                                            className="mt-1 bg-zinc-700 border-zinc-600 text-white focus:border-amber-500 focus:ring-amber-500"
                                            value={data.end_date}
                                            min={getTomorrowDate(
                                                data.start_date
                                            )}
                                            onChange={(e) => {
                                                setData(
                                                    "end_date",
                                                    e.target.value
                                                );
                                                calculateTotal(
                                                    data.start_date,
                                                    e.target.value
                                                );
                                            }}
                                        />
                                        {errors.end_date && (
                                            <p className="text-red-400 text-sm mt-1">
                                                {errors.end_date}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Notes */}
                                <div>
                                    <Label
                                        htmlFor="notes"
                                        className="text-white text-sm font-medium"
                                    >
                                        Catatan Khusus (Opsional)
                                    </Label>
                                    <Textarea
                                        id="notes"
                                        className="mt-1 bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400 focus:border-amber-500 focus:ring-amber-500"
                                        placeholder="Permintaan khusus atau catatan..."
                                        rows={3}
                                        value={data.notes}
                                        onChange={(e) =>
                                            setData("notes", e.target.value)
                                        }
                                    />
                                    {errors.notes && (
                                        <p className="text-red-400 text-sm mt-1">
                                            {errors.notes}
                                        </p>
                                    )}
                                </div>

                                {/* Booking Summary */}
                                {totalDays > 0 && (
                                    <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-4 rounded-lg">
                                        <h3 className="text-white font-semibold mb-3">
                                            Ringkasan Booking
                                        </h3>
                                        <div className="space-y-2 text-zinc-300">
                                            <div className="flex justify-between">
                                                <span>Periode Sewa:</span>
                                                <span className="font-medium">
                                                    {totalDays}{" "}
                                                    {totalDays === 1
                                                        ? "hari"
                                                        : "hari"}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Tarif Harian:</span>
                                                <span className="font-medium">
                                                    {formatRupiah(
                                                        parseFloat(
                                                            car.rental_price_per_day
                                                        )
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Subtotal:</span>
                                                <span className="font-medium">
                                                    {formatRupiah(subtotal)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span>PPN (12%):</span>
                                                <span>
                                                    {formatRupiah(taxAmount)}
                                                </span>
                                            </div>
                                            <hr className="border-zinc-600" />
                                            <div className="flex justify-between text-lg">
                                                <span className="font-semibold text-white">
                                                    Total Bayar:
                                                </span>
                                                <span className="font-bold text-amber-400">
                                                    {formatRupiah(totalAmount)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Submit Button - Updated */}
                                <Button
                                    type="submit"
                                    disabled={processing || !canProceed}
                                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold h-12"
                                >
                                    {processing ? (
                                        <div className="flex items-center space-x-2">
                                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                            <span>Processing...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center space-x-2">
                                            <CreditCard className="h-5 w-5" />
                                            <span>
                                                {canProceed
                                                    ? `Proceed to Payment ${formatRupiah(
                                                          totalAmount
                                                      )}`
                                                    : "Select Dates to Continue"}
                                            </span>
                                        </div>
                                    )}
                                </Button>

                                {!canProceed &&
                                    data.start_date &&
                                    data.end_date && (
                                        <p className="text-red-400 text-sm text-center">
                                            Tanggal kembali harus setelah
                                            tanggal ambil
                                        </p>
                                    )}
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Payment Flow Info */}
                <div className="mt-8 text-center">
                    <div className="inline-flex items-center space-x-4 text-zinc-400 text-sm">
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                1
                            </div>
                            <span>Select Dates</span>
                        </div>
                        <div className="w-8 h-px bg-zinc-600"></div>
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-zinc-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                2
                            </div>
                            <span>Payment</span>
                        </div>
                        <div className="w-8 h-px bg-zinc-600"></div>
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-zinc-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                3
                            </div>
                            <span>Confirmation</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
