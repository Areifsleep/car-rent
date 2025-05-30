// Pages/Index.tsx
"use client";

import { useState, useEffect } from "react";
import { Link, router } from "@inertiajs/react";
import { Search, Filter, X, Star, MapPin, Calendar } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Card, CardContent } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import Navbar from "@/Components/NavBar";
import ScrollToTop from "@/Components/ScrollToTop";
import Pagination from "@/Components/Admin/Pagination";
import { Car } from "@/types/car";

interface IndexProps {
    cars: {
        data: Car[];
        current_page: number;
        from: number | null;
        last_page: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        path: string;
        per_page: number;
        to: number | null;
        total: number;
    };
    filters: {
        search?: string;
        brand?: string;
        year?: string;
        available_only?: boolean;
    };
    filterOptions: {
        brands: string[];
        years: number[];
    };
}

export default function Index({ cars, filters, filterOptions }: IndexProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || "");
    const [selectedBrand, setSelectedBrand] = useState(filters.brand || "all");
    const [selectedYear, setSelectedYear] = useState(filters.year || "all");
    const [availableOnly, setAvailableOnly] = useState(
        filters.available_only || false
    );
    const [activeFilters, setActiveFilters] = useState<string[]>([]);

    // Update active filters display
    useEffect(() => {
        const newFilters: string[] = [];

        if (searchTerm) {
            newFilters.push(`Search: ${searchTerm}`);
        }

        if (selectedBrand !== "all") {
            newFilters.push(`Brand: ${selectedBrand}`);
        }

        if (selectedYear !== "all") {
            newFilters.push(`Year: ${selectedYear}`);
        }

        if (availableOnly) {
            newFilters.push("Available Only");
        }

        setActiveFilters(newFilters);
    }, [searchTerm, selectedBrand, selectedYear, availableOnly]);

    const handleSearch = () => {
        router.get(
            route("home"),
            {
                search: searchTerm || undefined,
                brand: selectedBrand !== "all" ? selectedBrand : undefined,
                year: selectedYear !== "all" ? selectedYear : undefined,
                available_only: availableOnly || undefined,
                page: 1,
            },
            {
                preserveState: true,
            }
        );
    };

    const handlePageChange = (page: number) => {
        router.get(
            route("home"),
            {
                search: searchTerm || undefined,
                brand: selectedBrand !== "all" ? selectedBrand : undefined,
                year: selectedYear !== "all" ? selectedYear : undefined,
                available_only: availableOnly || undefined,
                page: page,
            },
            {
                preserveState: true,
                preserveScroll: false,
            }
        );
    };

    const resetFilters = () => {
        setSearchTerm("");
        setSelectedBrand("all");
        setSelectedYear("all");
        setAvailableOnly(false);

        router.get(
            route("home"),
            {},
            {
                preserveState: true,
            }
        );
    };

    const removeFilter = (filter: string) => {
        if (filter === "Available Only") {
            setAvailableOnly(false);
        } else if (filter.startsWith("Year:")) {
            setSelectedYear("all");
        } else if (filter.startsWith("Brand:")) {
            setSelectedBrand("all");
        } else if (filter.startsWith("Search:")) {
            setSearchTerm("");
        }

        setTimeout(handleSearch, 100);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-800">
            <Navbar />

            {/* Hero Section */}
            <div className="relative text-white">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative container mx-auto px-4 py-12">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent">
                            Find Your Perfect Ride
                        </h1>
                        <p className="text-xl md:text-2xl mb-6 opacity-90 max-w-2xl mx-auto">
                            Discover premium cars for every journey. From luxury
                            sedans to adventure SUVs.
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center text-sm">
                            <div className="flex items-center gap-2">
                                <Star className="h-4 w-4 text-yellow-400" />
                                <span>Premium Quality</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-green-400" />
                                <span>Multiple Locations</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-amber-400" />
                                <span>Flexible Booking</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Section */}
            <div className="container mx-auto px-4 py-8">
                <div className="bg-zinc-800/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 mb-8 border border-zinc-700">
                    <h2 className="text-xl font-bold text-white mb-4">
                        Find Your Car
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                            <Input
                                placeholder="Search cars..."
                                className="pl-10 bg-zinc-700/80 border-zinc-600 text-white placeholder:text-zinc-400 focus:border-amber-500 focus:ring-amber-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) =>
                                    e.key === "Enter" && handleSearch()
                                }
                            />
                        </div>

                        {/* Brand Filter */}
                        <Select
                            value={selectedBrand}
                            onValueChange={setSelectedBrand}
                        >
                            <SelectTrigger className="bg-zinc-700/80 border-zinc-600 text-white focus:border-amber-500">
                                <SelectValue placeholder="Select Brand" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                                <SelectItem
                                    value="all"
                                    className="text-white hover:bg-zinc-700"
                                >
                                    All Brands
                                </SelectItem>
                                {filterOptions.brands.map((brand) => (
                                    <SelectItem
                                        key={brand}
                                        value={brand}
                                        className="text-white hover:bg-zinc-700"
                                    >
                                        {brand}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Year Filter */}
                        <Select
                            value={selectedYear}
                            onValueChange={setSelectedYear}
                        >
                            <SelectTrigger className="bg-zinc-700/80 border-zinc-600 text-white focus:border-amber-500">
                                <SelectValue placeholder="Select Year" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                                <SelectItem
                                    value="all"
                                    className="text-white hover:bg-zinc-700"
                                >
                                    All Years
                                </SelectItem>
                                {filterOptions.years.map((year) => (
                                    <SelectItem
                                        key={year}
                                        value={year.toString()}
                                        className="text-white hover:bg-zinc-700"
                                    >
                                        {year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Actions */}
                        <div className="flex space-x-2">
                            <Button
                                onClick={handleSearch}
                                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                            >
                                <Search className="h-4 w-4 mr-2" />
                                Search
                            </Button>
                            <Button
                                variant="outline"
                                onClick={resetFilters}
                                className="bg-transparent border-zinc-600 text-white hover:bg-zinc-700"
                                disabled={
                                    !searchTerm &&
                                    selectedBrand === "all" &&
                                    selectedYear === "all" &&
                                    !availableOnly
                                }
                            >
                                Reset
                            </Button>
                        </div>
                    </div>

                    {/* Available Only Toggle */}
                    <div className="flex items-center space-x-2 mb-4">
                        <input
                            type="checkbox"
                            id="availableOnly"
                            checked={availableOnly}
                            onChange={(e) => setAvailableOnly(e.target.checked)}
                            className="rounded border-zinc-600 bg-zinc-700 text-amber-600 focus:ring-amber-500"
                        />
                        <label
                            htmlFor="availableOnly"
                            className="text-white text-sm"
                        >
                            Show only available cars
                        </label>
                    </div>

                    {/* Active Filters */}
                    {activeFilters.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-zinc-400 text-sm">
                                Active Filters:
                            </span>
                            {activeFilters.map((filter) => (
                                <Badge
                                    key={filter}
                                    className="bg-amber-600/80 text-white hover:bg-amber-700 cursor-pointer transition-colors"
                                    onClick={() => removeFilter(filter)}
                                >
                                    {filter}
                                    <X className="h-3 w-3 ml-1" />
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>

                {/* Results Summary */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">
                        Available Cars
                        <span className="text-amber-400 ml-2">
                            ({cars.total})
                        </span>
                    </h2>
                    <div className="text-sm text-zinc-400">
                        Showing {cars.from || 0} to {cars.to || 0} of{" "}
                        {cars.total} cars
                    </div>
                </div>

                {/* Cars Grid */}
                {cars.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                        {cars.data.map((car) => (
                            <EnhancedCarCard key={car.id} car={car} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="bg-zinc-800/60 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto border border-zinc-700">
                            <div className="text-zinc-400 text-xl mb-4">
                                🚗 No cars found
                            </div>
                            <p className="text-zinc-500 mb-6">
                                Try adjusting your search criteria or filters to
                                find more results.
                            </p>
                            <Button
                                onClick={resetFilters}
                                variant="outline"
                                className="bg-transparent border-zinc-600 text-white hover:bg-zinc-700"
                            >
                                Clear All Filters
                            </Button>
                        </div>
                    </div>
                )}

                {/* Pagination */}
                {cars.total > 0 && (
                    <div className="mt-8">
                        <Pagination
                            meta={{
                                current_page: cars.current_page,
                                from: cars.from,
                                last_page: cars.last_page,
                                links: cars.links,
                                path: cars.path,
                                per_page: cars.per_page,
                                to: cars.to,
                                total: cars.total,
                            }}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>

            <ScrollToTop />
        </div>
    );
}

// Enhanced Car Card Component dengan warna amber
function EnhancedCarCard({ car }: { car: Car }) {
    return (
        <Card className="bg-zinc-800/60 backdrop-blur-sm border-zinc-700 hover:border-zinc-600 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 group overflow-hidden">
            <div className="relative overflow-hidden">
                <img
                    src={car.image || "/placeholder-car.svg"}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute top-3 right-3">
                    <Badge
                        className={`${
                            car.is_available
                                ? "bg-green-500/90 hover:bg-green-600"
                                : "bg-red-500/90 hover:bg-red-600"
                        } text-white backdrop-blur-sm`}
                    >
                        {car.is_available ? "Available" : "Unavailable"}
                    </Badge>
                </div>
                <div className="absolute bottom-3 left-3">
                    <Badge
                        variant="secondary"
                        className="bg-black/70 text-white border-0 backdrop-blur-sm"
                    >
                        {car.year}
                    </Badge>
                </div>
            </div>

            <CardContent className="p-6 text-white">
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                        {car.brand} {car.model}
                    </h3>
                    <p className="text-zinc-400 text-sm">{car.license_plate}</p>
                </div>

                {car.description && (
                    <p className="text-zinc-300 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {car.description}
                    </p>
                )}

                <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text">
                            ${car.rental_price_per_day}
                        </div>
                        <div className="text-sm text-zinc-400">per day</div>
                    </div>
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <Star className="h-4 w-4 text-zinc-600" />
                        <span className="text-xs text-zinc-400 ml-1">
                            (4.0)
                        </span>
                    </div>
                </div>

                <div className="flex space-x-2">
                    <Link href={route("cars.show", car.id)} className="flex-1">
                        <Button
                            variant="outline"
                            className="w-full bg-transparent border-zinc-600 text-white hover:bg-zinc-700 hover:border-zinc-500"
                        >
                            View Details
                        </Button>
                    </Link>
                    {car.is_available && (
                        <Link
                            href={route("bookings.create", car.id)}
                            className="flex-1"
                        >
                            <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white border-0">
                                Book Now
                            </Button>
                        </Link>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
