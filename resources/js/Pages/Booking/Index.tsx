// Pages/Booking/Index.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Input } from "@/Components/ui/input";
import {
    ArrowLeft,
    Calendar,
    Car as CarIcon,
    Clock,
    CheckCircle,
    AlertCircle,
    CreditCard,
    Search,
    Filter,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { Link, router } from "@inertiajs/react";
import Navbar from "@/Components/NavBar";
import { Booking } from "@/types/booking";

interface BookingIndexProps {
    bookings: {
        data: Booking[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function BookingIndex({ bookings }: BookingIndexProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const formatRupiah = (amount: number): string => {
        return "Rp " + amount.toLocaleString("id-ID");
    };

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            pending: {
                bg: "bg-yellow-500/20",
                text: "text-yellow-400",
                label: "Menunggu Pembayaran",
                icon: AlertCircle,
            },
            confirmed: {
                bg: "bg-green-500/20",
                text: "text-green-400",
                label: "Dikonfirmasi",
                icon: CheckCircle,
            },
            active: {
                bg: "bg-blue-500/20",
                text: "text-blue-400",
                label: "Sedang Berlangsung",
                icon: Clock,
            },
            completed: {
                bg: "bg-gray-500/20",
                text: "text-gray-300",
                label: "Selesai",
                icon: CheckCircle,
            },
            cancelled: {
                bg: "bg-red-500/20",
                text: "text-red-400",
                label: "Dibatalkan",
                icon: AlertCircle,
            },
        } as const;

        const config =
            statusConfig[status as keyof typeof statusConfig] ||
            statusConfig.pending;
        const Icon = config.icon;

        return (
            <Badge
                className={`${config.bg} ${config.text} border-none flex items-center space-x-1`}
            >
                <Icon className="h-3 w-3" />
                <span>{config.label}</span>
            </Badge>
        );
    };

    const handleContinuePayment = (bookingId: number) => {
        router.visit(route("booking.payment", bookingId));
    };

    const filteredBookings = bookings.data.filter((booking) => {
        const matchesSearch =
            booking.car?.brand
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            booking.car?.model
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            booking.car?.license_plate
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "all" || booking.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-800">
            <Navbar />

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                        <Link href={route("home")}>
                            <Button
                                variant="outline"
                                className="bg-transparent border-zinc-600 text-white hover:bg-zinc-700"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Home
                            </Button>
                        </Link>
                        <h1 className="text-3xl font-bold text-white">
                            My Bookings
                        </h1>
                    </div>

                    <div className="text-zinc-400">
                        Total: {bookings.total} bookings
                    </div>
                </div>

                {/* Filters */}
                <Card className="bg-zinc-800/60 backdrop-blur-sm border-zinc-700 mb-6">
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                                    <Input
                                        placeholder="Search by car brand, model, or license plate..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className="pl-10 bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400 focus:border-amber-500 focus:ring-amber-500"
                                    />
                                </div>
                            </div>

                            {/* Status Filter */}
                            <div className="md:w-48">
                                <select
                                    value={statusFilter}
                                    onChange={(e) =>
                                        setStatusFilter(e.target.value)
                                    }
                                    className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white focus:border-amber-500 focus:ring-amber-500"
                                >
                                    <option value="all">All Status</option>
                                    <option value="pending">
                                        Menunggu Pembayaran
                                    </option>
                                    <option value="confirmed">
                                        Dikonfirmasi
                                    </option>
                                    <option value="active">
                                        Sedang Berlangsung
                                    </option>
                                    <option value="completed">Selesai</option>
                                    <option value="cancelled">
                                        Dibatalkan
                                    </option>
                                </select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Booking List */}
                {filteredBookings.length === 0 ? (
                    <Card className="bg-zinc-800/60 backdrop-blur-sm border-zinc-700">
                        <CardContent className="p-12 text-center">
                            <CarIcon className="h-16 w-16 text-zinc-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">
                                No Bookings Found
                            </h3>
                            <p className="text-zinc-400 mb-6">
                                {searchTerm || statusFilter !== "all"
                                    ? "No bookings match your search criteria."
                                    : "You haven't made any bookings yet."}
                            </p>
                            <Link href={route("home")}>
                                <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white">
                                    Browse Cars
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {filteredBookings.map((booking) => (
                            <Card
                                key={booking.id}
                                className="bg-zinc-800/60 backdrop-blur-sm border-zinc-700 hover:border-zinc-600 transition-colors"
                            >
                                <CardContent className="p-6">
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        {/* Car Image */}
                                        <div className="lg:w-48 flex-shrink-0">
                                            <img
                                                src={
                                                    booking.car?.image ||
                                                    "/placeholder-car.svg"
                                                }
                                                alt={`${booking.car?.brand} ${booking.car?.model}`}
                                                className="w-full h-32 lg:h-36 object-cover rounded-lg"
                                                onError={(e) => {
                                                    const target =
                                                        e.target as HTMLImageElement;
                                                    target.src =
                                                        "/placeholder-car.svg";
                                                }}
                                            />
                                        </div>

                                        {/* Booking Details */}
                                        <div className="flex-1 space-y-4">
                                            {/* Header */}
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-white">
                                                        {booking.car?.brand}{" "}
                                                        {booking.car?.model}
                                                    </h3>
                                                    <p className="text-zinc-400 text-sm">
                                                        Booking #{booking.id} •{" "}
                                                        {
                                                            booking.car
                                                                ?.license_plate
                                                        }
                                                    </p>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    {getStatusBadge(
                                                        booking.status
                                                    )}
                                                </div>
                                            </div>

                                            {/* Booking Info */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                                <div className="flex items-center space-x-2">
                                                    <Calendar className="h-4 w-4 text-amber-400" />
                                                    <div>
                                                        <p className="text-zinc-400">
                                                            Check-in
                                                        </p>
                                                        <p className="text-white font-medium">
                                                            {new Date(
                                                                booking.start_date
                                                            ).toLocaleDateString(
                                                                "id-ID"
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-2">
                                                    <Calendar className="h-4 w-4 text-amber-400" />
                                                    <div>
                                                        <p className="text-zinc-400">
                                                            Check-out
                                                        </p>
                                                        <p className="text-white font-medium">
                                                            {new Date(
                                                                booking.end_date
                                                            ).toLocaleDateString(
                                                                "id-ID"
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-2">
                                                    <Clock className="h-4 w-4 text-amber-400" />
                                                    <div>
                                                        <p className="text-zinc-400">
                                                            Duration
                                                        </p>
                                                        <p className="text-white font-medium">
                                                            {booking.total_days}{" "}
                                                            days
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center space-x-2">
                                                    <CreditCard className="h-4 w-4 text-amber-400" />
                                                    <div>
                                                        <p className="text-zinc-400">
                                                            Total
                                                        </p>
                                                        <p className="text-white font-medium">
                                                            {formatRupiah(
                                                                Number(
                                                                    booking.total_amount
                                                                )
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Payment Status */}
                                            {booking.payment && (
                                                <div className="flex items-center space-x-2 text-sm">
                                                    <div
                                                        className={`w-2 h-2 rounded-full ${
                                                            booking.payment
                                                                .payment_status ===
                                                            "paid"
                                                                ? "bg-green-500"
                                                                : booking
                                                                      .payment
                                                                      .payment_status ===
                                                                  "pending"
                                                                ? "bg-yellow-500"
                                                                : "bg-red-500"
                                                        }`}
                                                    ></div>
                                                    <span className="text-zinc-400">
                                                        Payment:
                                                    </span>
                                                    <span
                                                        className={`font-medium ${
                                                            booking.payment
                                                                .payment_status ===
                                                            "paid"
                                                                ? "text-green-400"
                                                                : booking
                                                                      .payment
                                                                      .payment_status ===
                                                                  "pending"
                                                                ? "text-yellow-400"
                                                                : "text-red-400"
                                                        }`}
                                                    >
                                                        {booking.payment
                                                            .payment_status ===
                                                        "paid"
                                                            ? "Paid"
                                                            : booking.payment
                                                                  .payment_status ===
                                                              "pending"
                                                            ? "Pending"
                                                            : "Failed"}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="lg:w-48 flex flex-col space-y-3">
                                            {/* View Details Button */}
                                            <Link
                                                href={route(
                                                    "bookings.show",
                                                    booking.id
                                                )}
                                            >
                                                <Button
                                                    variant="outline"
                                                    className="w-full bg-transparent border-zinc-600 text-white hover:bg-zinc-700"
                                                >
                                                    View Details
                                                </Button>
                                            </Link>

                                            {/* Continue Payment Button */}
                                            {booking.status === "pending" &&
                                                booking.payment
                                                    ?.payment_status ===
                                                    "pending" && (
                                                    <Button
                                                        onClick={() =>
                                                            handleContinuePayment(
                                                                booking.id
                                                            )
                                                        }
                                                        className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
                                                    >
                                                        <CreditCard className="h-4 w-4 mr-2" />
                                                        Continue Payment
                                                    </Button>
                                                )}

                                            {/* Status-specific actions */}
                                            {booking.status === "confirmed" && (
                                                <div className="text-center">
                                                    <p className="text-xs text-green-400 font-medium">
                                                        Ready for pickup!
                                                    </p>
                                                </div>
                                            )}

                                            {booking.status === "active" && (
                                                <div className="text-center">
                                                    <p className="text-xs text-blue-400 font-medium">
                                                        Rental in progress
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {bookings.last_page > 1 && (
                    <Card className="bg-zinc-800/60 backdrop-blur-sm border-zinc-700 mt-6">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-zinc-400">
                                    Showing{" "}
                                    {(bookings.current_page - 1) *
                                        bookings.per_page +
                                        1}{" "}
                                    to{" "}
                                    {Math.min(
                                        bookings.current_page *
                                            bookings.per_page,
                                        bookings.total
                                    )}{" "}
                                    of {bookings.total} results
                                </div>

                                <div className="flex items-center space-x-2">
                                    {bookings.current_page > 1 && (
                                        <Link
                                            href={route("bookings.index", {
                                                page: bookings.current_page - 1,
                                            })}
                                        >
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="bg-transparent border-zinc-600 text-white hover:bg-zinc-700"
                                            >
                                                <ChevronLeft className="h-4 w-4 mr-1" />
                                                Previous
                                            </Button>
                                        </Link>
                                    )}

                                    <div className="flex items-center space-x-1">
                                        {Array.from(
                                            {
                                                length: Math.min(
                                                    5,
                                                    bookings.last_page
                                                ),
                                            },
                                            (_, i) => {
                                                const pageNum = Math.max(
                                                    1,
                                                    Math.min(
                                                        bookings.current_page -
                                                            2 +
                                                            i,
                                                        bookings.last_page -
                                                            4 +
                                                            i
                                                    )
                                                );

                                                if (
                                                    pageNum > bookings.last_page
                                                )
                                                    return null;

                                                return (
                                                    <Link
                                                        key={pageNum}
                                                        href={route(
                                                            "bookings.index",
                                                            { page: pageNum }
                                                        )}
                                                    >
                                                        <Button
                                                            variant={
                                                                pageNum ===
                                                                bookings.current_page
                                                                    ? "default"
                                                                    : "outline"
                                                            }
                                                            size="sm"
                                                            className={
                                                                pageNum ===
                                                                bookings.current_page
                                                                    ? "bg-amber-600 hover:bg-amber-700 text-white"
                                                                    : "bg-transparent border-zinc-600 text-white hover:bg-zinc-700"
                                                            }
                                                        >
                                                            {pageNum}
                                                        </Button>
                                                    </Link>
                                                );
                                            }
                                        )}
                                    </div>

                                    {bookings.current_page <
                                        bookings.last_page && (
                                        <Link
                                            href={route("bookings.index", {
                                                page: bookings.current_page + 1,
                                            })}
                                        >
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="bg-transparent border-zinc-600 text-white hover:bg-zinc-700"
                                            >
                                                Next
                                                <ChevronRight className="h-4 w-4 ml-1" />
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Empty State */}
                {bookings.data.length === 0 && (
                    <Card className="bg-zinc-800/60 backdrop-blur-sm border-zinc-700">
                        <CardContent className="p-12 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-700/50 rounded-full mb-4">
                                <CarIcon className="h-8 w-8 text-zinc-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">
                                No Bookings Found
                            </h3>
                            <p className="text-zinc-400 mb-6">
                                {searchTerm || statusFilter !== "all"
                                    ? "No bookings match your current filters."
                                    : "You haven't made any car rental bookings yet."}
                            </p>
                            <div className="space-y-3">
                                {(searchTerm || statusFilter !== "all") && (
                                    <Button
                                        onClick={() => {
                                            setSearchTerm("");
                                            setStatusFilter("all");
                                            router.get(route("bookings.index"));
                                        }}
                                        variant="outline"
                                        className="bg-transparent border-zinc-600 text-white hover:bg-zinc-700"
                                    >
                                        Clear Filters
                                    </Button>
                                )}
                                <Link href={route("home")}>
                                    <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
                                        Browse Cars
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
