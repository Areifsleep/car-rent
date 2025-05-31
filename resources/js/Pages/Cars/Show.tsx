// Pages/Cars/Show.tsx
"use client";

import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import {
    ArrowLeft,
    Star,
    MapPin,
    Calendar,
    Users,
    Fuel,
    Settings,
    Share2,
    Heart,
    ShieldCheck,
    Clock,
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Separator } from "@/Components/ui/separator";
import Navbar from "@/Components/NavBar";
import ScrollToTop from "@/Components/ScrollToTop";
import { Car } from "@/types/car";
import { formatCurrency } from "@/lib/utils";

interface CarShowProps {
    car: Car;
    similarCars: Car[];
    isAvailable: boolean;
    upcomingBookings: number;
}

export default function CarShowPage({
    car,
    similarCars,
    isAvailable,
    upcomingBookings,
}: CarShowProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [selectedImage, setSelectedImage] = useState(car.image);

    const handleBookNow = () => {
        if (isAvailable) {
            router.visit(route("bookings.create", car.id));
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${car.brand} ${car.model}`,
                    text: `Check out this ${car.brand} ${car.model} for rent!`,
                    url: window.location.href,
                });
            } catch (err) {
                console.log("Error sharing:", err);
            }
        } else {
            // Fallback - copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    // Sample images for carousel (you can modify based on your data structure)
    const carImages = [
        car.image,
        car.image, // You might have multiple images in the future
        car.image,
    ].filter(Boolean);

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-800">
            <Navbar />

            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-6">
                <nav className="flex items-center space-x-2 text-sm text-zinc-400">
                    <Link
                        href={route("home")}
                        className="hover:text-amber-400 transition-colors"
                    >
                        Home
                    </Link>
                    <span>/</span>
                    <Link
                        href={route("home")}
                        className="hover:text-amber-400 transition-colors"
                    >
                        Cars
                    </Link>
                    <span>/</span>
                    <span className="text-white">
                        {car.brand} {car.model}
                    </span>
                </nav>
            </div>

            <div className="container mx-auto px-4 pb-12">
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Car Images & Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Car Images */}
                        <Card className="bg-zinc-800/60 backdrop-blur-sm border-zinc-700 overflow-hidden">
                            <div className="relative">
                                <img
                                    src={
                                        selectedImage || "/placeholder-car.svg"
                                    }
                                    alt={`${car.brand} ${car.model}`}
                                    className="w-full h-96 object-cover"
                                />
                                <div className="absolute top-4 right-4 flex space-x-2">
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className="bg-black/50 backdrop-blur-sm border-0 hover:bg-black/70"
                                        onClick={() => setIsLiked(!isLiked)}
                                    >
                                        <Heart
                                            className={`h-4 w-4 ${
                                                isLiked
                                                    ? "fill-red-500 text-red-500"
                                                    : "text-white"
                                            }`}
                                        />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className="bg-black/50 backdrop-blur-sm border-0 hover:bg-black/70"
                                        onClick={handleShare}
                                    >
                                        <Share2 className="h-4 w-4 text-white" />
                                    </Button>
                                </div>
                                <div className="absolute bottom-4 left-4">
                                    <Badge
                                        className={`${
                                            isAvailable
                                                ? "bg-green-500/90"
                                                : "bg-red-500/90"
                                        } text-white backdrop-blur-sm`}
                                    >
                                        {isAvailable
                                            ? "Available"
                                            : "Not Available"}
                                    </Badge>
                                </div>
                            </div>

                            {/* Image Thumbnails */}
                            {carImages.length > 1 && (
                                <div className="p-4">
                                    <div className="flex space-x-2 overflow-x-auto">
                                        {carImages.map((image, index) => (
                                            <button
                                                key={index}
                                                onClick={() =>
                                                    setSelectedImage(image)
                                                }
                                                className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                                                    selectedImage === image
                                                        ? "border-amber-500"
                                                        : "border-zinc-600 hover:border-zinc-500"
                                                }`}
                                            >
                                                <img
                                                    src={
                                                        image ||
                                                        "/placeholder-car.svg"
                                                    }
                                                    alt={`${car.brand} ${
                                                        car.model
                                                    } view ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Card>

                        {/* Car Details */}
                        <Card className="bg-zinc-800/60 backdrop-blur-sm border-zinc-700">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <h1 className="text-3xl font-bold text-white mb-2">
                                            {car.brand} {car.model}
                                        </h1>
                                        <div className="flex items-center space-x-4 text-zinc-400">
                                            <span>{car.year}</span>
                                            <span>•</span>
                                            <span>{car.license_plate}</span>
                                            <span>•</span>
                                            <div className="flex items-center">
                                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                                                <span>4.0 (15 reviews)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text">
                                            {formatCurrency(
                                                Number(car.rental_price_per_day)
                                            )}
                                        </div>
                                        <div className="text-zinc-400 text-sm">
                                            per day
                                        </div>
                                    </div>
                                </div>

                                <Separator className="my-6 bg-zinc-700" />

                                {/* Car Features */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    <div className="flex items-center space-x-2 text-zinc-300">
                                        <Users className="h-5 w-5 text-amber-400" />
                                        <span>5 Seats</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-zinc-300">
                                        <Settings className="h-5 w-5 text-amber-400" />
                                        <span>Automatic</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-zinc-300">
                                        <Fuel className="h-5 w-5 text-amber-400" />
                                        <span>Gasoline</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-zinc-300">
                                        <ShieldCheck className="h-5 w-5 text-amber-400" />
                                        <span>Insured</span>
                                    </div>
                                </div>

                                <Separator className="my-6 bg-zinc-700" />

                                {/* Description */}
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-3">
                                        Description
                                    </h3>
                                    <p className="text-zinc-300 leading-relaxed">
                                        {car.description ||
                                            `Experience luxury and performance with this premium ${car.brand} ${car.model}. Perfect for business trips, special occasions, or when you simply want to travel in style and comfort.`}
                                    </p>
                                </div>

                                {upcomingBookings > 0 && (
                                    <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                                        <div className="flex items-center text-amber-400">
                                            <Clock className="h-4 w-4 mr-2" />
                                            <span className="text-sm">
                                                This car has {upcomingBookings}{" "}
                                                upcoming booking
                                                {upcomingBookings > 1
                                                    ? "s"
                                                    : ""}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6">
                            <Card className="bg-zinc-800/60 backdrop-blur-sm border-zinc-700">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-semibold text-white mb-4">
                                        Book This Car
                                    </h3>

                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between items-center">
                                            <span className="text-zinc-400">
                                                Daily Rate
                                            </span>
                                            <span className="font-semibold text-white">
                                                {formatCurrency(
                                                    Number(
                                                        car.rental_price_per_day
                                                    )
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-zinc-400">
                                                Status
                                            </span>
                                            <Badge
                                                className={
                                                    isAvailable
                                                        ? "bg-green-500"
                                                        : "bg-red-500"
                                                }
                                            >
                                                {isAvailable
                                                    ? "Available"
                                                    : "Not Available"}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {isAvailable ? (
                                            <Button
                                                onClick={handleBookNow}
                                                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white border-0"
                                                size="lg"
                                            >
                                                Book Now
                                            </Button>
                                        ) : (
                                            <Button
                                                disabled
                                                className="w-full"
                                                size="lg"
                                            >
                                                Not Available
                                            </Button>
                                        )}

                                        <Button
                                            variant="outline"
                                            className="w-full bg-transparent border-zinc-600 text-white hover:bg-zinc-700"
                                            size="lg"
                                        >
                                            Contact Owner
                                        </Button>
                                    </div>

                                    <div className="mt-6 text-center">
                                        <p className="text-xs text-zinc-500">
                                            By booking, you agree to our{" "}
                                            <Link
                                                href="#"
                                                className="text-amber-400 hover:underline"
                                            >
                                                Terms & Conditions
                                            </Link>
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Similar Cars Section */}
                {similarCars.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-white mb-6">
                            Similar Cars
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {similarCars.map((similarCar) => (
                                <SimilarCarCard
                                    key={similarCar.id}
                                    car={similarCar}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <ScrollToTop />
        </div>
    );
}

// Similar Car Card Component
function SimilarCarCard({ car }: { car: Car }) {
    return (
        <Card className="bg-zinc-800/60 backdrop-blur-sm border-zinc-700 hover:border-zinc-600 transition-all duration-300 hover:shadow-lg group">
            <div className="relative overflow-hidden rounded-t-lg">
                <img
                    src={car.image || "/placeholder-car.svg"}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                    <Badge
                        className={`${
                            car.is_available
                                ? "bg-green-500/90"
                                : "bg-red-500/90"
                        } text-white backdrop-blur-sm`}
                    >
                        {car.is_available ? "Available" : "Unavailable"}
                    </Badge>
                </div>
            </div>

            <CardContent className="p-4 text-white">
                <h3 className="font-bold text-white group-hover:text-amber-400 transition-colors">
                    {car.brand} {car.model}
                </h3>
                <p className="text-zinc-400 text-sm mb-3">{car.year}</p>

                <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-amber-400">
                        {formatCurrency(Number(car.rental_price_per_day))}
                        <span className="text-xs text-zinc-400 font-normal">
                            /day
                        </span>
                    </div>
                    <Link href={route("cars.show", car.id)}>
                        <Button
                            size="sm"
                            variant="outline"
                            className="bg-transparent border-zinc-600 text-white hover:bg-zinc-700"
                        >
                            View
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
