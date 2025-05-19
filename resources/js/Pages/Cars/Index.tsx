// import { Link } from "@inertiajs/react";
// import { Briefcase, Users } from "lucide-react";
// import { Button } from "@/Components/ui/button";
// import Navbar from "@/Components/NavBar";
// import ScrollToTop from "@/Components/ScrollToTop";
// import { carData } from "@/Data/Cars";
// import { usePage } from "@inertiajs/react";
// import { Car } from "@/types/car";

// export default function CarGridPage({ cars }: { cars: Car[] }) {
//     console.log(cars);
//     return (
//         <div className="flex min-h-screen flex-col bg-zinc-900">
//             <Navbar />
//             <main className="flex-1">
//                 {/* Page Header */}
//                 <section className="relative py-20 bg-zinc-800">
//                     <div className="absolute inset-0 z-0 opacity-30">
//                         <img
//                             src="/placeholder.svg?height=400&width=1920"
//                             alt="Cars background"
//                             className="object-cover absolut w-full h-full"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/70 to-zinc-800/90"></div>
//                     </div>

//                     <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
//                         <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//                             Our Luxury Fleet
//                         </h1>
//                         <p className="text-zinc-300 max-w-2xl mx-auto">
//                             Explore our collection of premium vehicles available
//                             for rent. Experience luxury and performance.
//                         </p>
//                     </div>
//                 </section>

//                 {/* Car Grid */}
//                 <section className="py-16">
//                     <div className="container mx-auto px-4 md:px-6">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                             {carData.map((car) => (
//                                 <div
//                                     key={car.id}
//                                     className="relative rounded-xl overflow-hidden bg-zinc-800"
//                                 >
//                                     <div className="relative aspect-[4/3] overflow-hidden">
//                                         <img
//                                             src={
//                                                 car.image || "/placeholder.svg"
//                                             }
//                                             alt={car.name}
//                                             className="absolut w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//                                         />
//                                     </div>

//                                     <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
//                                         <div>
//                                             <h2 className="text-2xl font-bold text-white mb-2">
//                                                 {car.name}
//                                             </h2>
//                                             <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-300">
//                                                 <div className="flex items-center">
//                                                     <Users className="h-4 w-4 text-amber-500 mr-1" />
//                                                     <span>
//                                                         {car.seats} Seats
//                                                     </span>
//                                                 </div>
//                                                 <div>
//                                                     <span className="text-zinc-400">
//                                                         {car.transmission}
//                                                     </span>
//                                                 </div>
//                                                 <div className="flex items-center">
//                                                     <Briefcase className="h-4 w-4 text-amber-500 mr-1" />
//                                                     <span>{car.bags} Bags</span>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="mt-4 md:mt-0 flex items-center gap-4">
//                                             <div className="text-right">
//                                                 <span className="text-amber-500 text-2xl font-bold">
//                                                     ${car.price}
//                                                 </span>
//                                                 <span className="text-xs text-zinc-400 block">
//                                                     /day
//                                                 </span>
//                                             </div>
//                                             <Link href={`/cars/${car.id}`}>
//                                                 <Button className="bg-amber-500 hover:bg-amber-600 text-zinc-900">
//                                                     Details
//                                                 </Button>
//                                             </Link>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </section>
//             </main>
//             <ScrollToTop />
//         </div>
//     );
// }

"use client";

import { useState, useEffect } from "react";

import { Search, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import Navbar from "@/Components/NavBar";
import ScrollToTop from "@/Components/ScrollToTop";
import { Badge } from "@/Components/ui/badge";
import { CarCard } from "@/Components/CarCard";
import { Car } from "@/types/car";

// Props interface for the component
interface CarsGridProps {
    cars: { data: Car[] };
}

export default function CarsGrid({ cars }: CarsGridProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("all");
    const [selectedYear, setSelectedYear] = useState("all");
    const [availableOnly, setAvailableOnly] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const carsPerPage = 6;

    // Extract unique brands for filtering
    const uniqueBrands = ["all", ...new Set(cars.data.map((car) => car.brand))];

    // Extract unique years for filtering
    const uniqueYears = [
        "all",
        ...new Set(cars.data.map((car) => car.year.toString())),
    ];

    // Filter cars based on search term and filters
    const filteredCars = cars.data.filter((car) => {
        const fullName = `${car.brand} ${car.model}`.toLowerCase();
        const matchesSearch = fullName.includes(searchTerm.toLowerCase());
        const matchesBrand =
            selectedBrand === "all" || car.brand === selectedBrand;
        const matchesYear =
            selectedYear === "all" || car.year.toString() === selectedYear;
        const matchesAvailability = !availableOnly || car.is_available;

        return (
            matchesSearch && matchesBrand && matchesYear && matchesAvailability
        );
    });

    // Calculate pagination
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
    const totalPages = Math.ceil(filteredCars.length / carsPerPage);

    // Handle page change
    const paginate = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // Update active filters when filters change
    useEffect(() => {
        const newFilters: string[] = [];

        if (selectedBrand !== "all") {
            newFilters.push(selectedBrand);
        }

        if (selectedYear !== "all") {
            newFilters.push(`Year: ${selectedYear}`);
        }

        if (availableOnly) {
            newFilters.push("Available Only");
        }

        setActiveFilters(newFilters);
    }, [selectedBrand, selectedYear, availableOnly]);

    // Reset filters
    const resetFilters = () => {
        setSearchTerm("");
        setSelectedBrand("all");
        setSelectedYear("all");
        setAvailableOnly(false);
        setCurrentPage(1);
    };

    // Remove a specific filter
    const removeFilter = (filter: string) => {
        if (filter === "Available Only") {
            setAvailableOnly(false);
        } else if (filter.startsWith("Year:")) {
            setSelectedYear("all");
        } else {
            setSelectedBrand("all");
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-zinc-900">
            <Navbar />
            <main className="flex-1">
                {/* Page Header */}
                <section className="relative py-20 bg-zinc-800">
                    <div className="absolute inset-0 z-0 opacity-30">
                        <img
                            src="/placeholder.svg?height=400&width=1920"
                            alt="Cars background"
                            className="object-cover w-full h-full absolute"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/70 to-zinc-800/90"></div>
                    </div>

                    <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Our Luxury Fleet
                        </h1>
                        <p className="text-zinc-300 max-w-2xl mx-auto">
                            Explore our collection of premium vehicles available
                            for rent. Experience luxury and performance.
                        </p>
                    </div>
                </section>

                {/* Search and Filters */}
                <section className="py-8 bg-zinc-800 border-b border-zinc-700">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col space-y-4">
                            {/* Search Bar */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                                <Input
                                    type="text"
                                    placeholder="Search by brand or model..."
                                    className="pl-10 bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400 h-12 text-base"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                            </div>

                            {/* Filters */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Select
                                    value={selectedBrand}
                                    onValueChange={setSelectedBrand}
                                >
                                    <SelectTrigger className="bg-zinc-700 border-zinc-600 text-white h-12">
                                        <SelectValue placeholder="Select Brand" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                                        {uniqueBrands.map((brand) => (
                                            <SelectItem
                                                key={brand}
                                                value={brand}
                                                className="text-white focus:bg-zinc-700 focus:text-white"
                                            >
                                                {brand === "all"
                                                    ? "All Brands"
                                                    : brand}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select
                                    value={selectedYear}
                                    onValueChange={setSelectedYear}
                                >
                                    <SelectTrigger className="bg-zinc-700 border-zinc-600 text-white h-12">
                                        <SelectValue placeholder="Select Year" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                                        {uniqueYears.map((year) => (
                                            <SelectItem
                                                key={year}
                                                value={year}
                                                className="text-white focus:bg-zinc-700 focus:text-white"
                                            >
                                                {year === "all"
                                                    ? "All Years"
                                                    : year}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <div className="flex items-center space-x-4">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={availableOnly}
                                            onChange={() =>
                                                setAvailableOnly(!availableOnly)
                                            }
                                            className="rounded border-zinc-600 bg-zinc-700 text-amber-500 focus:ring-amber-500"
                                        />
                                        <span className="text-white">
                                            Available Only
                                        </span>
                                    </label>

                                    <Button
                                        variant="outline"
                                        onClick={resetFilters}
                                        className="ml-auto"
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

                            {/* Active Filters */}
                            {activeFilters.length > 0 && (
                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                    <span className="text-zinc-400">
                                        Active Filters:
                                    </span>
                                    {activeFilters.map((filter) => (
                                        <Badge
                                            key={filter}
                                            className="bg-zinc-700 text-white hover:bg-zinc-600 px-3 py-1"
                                        >
                                            {filter}
                                            <button
                                                onClick={() =>
                                                    removeFilter(filter)
                                                }
                                                className="ml-2 text-zinc-400 hover:text-white"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Car Grid */}
                <section className="py-16">
                    <div className="container mx-auto px-4 md:px-6">
                        {/* Results Count */}
                        <div className="mb-6 text-zinc-400">
                            Showing{" "}
                            {filteredCars.length > 0 ? indexOfFirstCar + 1 : 0}-
                            {Math.min(indexOfLastCar, filteredCars.length)} of{" "}
                            {filteredCars.length} cars
                        </div>

                        {filteredCars.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {currentCars.map((car) => (
                                        <CarCard key={car.id} car={car} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="mt-12 flex justify-center">
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    paginate(currentPage - 1)
                                                }
                                                disabled={currentPage === 1}
                                                className="border-zinc-700 text-zinc-300 hover:bg-zinc-700"
                                            >
                                                <ChevronLeft className="h-4 w-4" />
                                            </Button>

                                            {Array.from({
                                                length: totalPages,
                                            }).map((_, index) => (
                                                <Button
                                                    key={index}
                                                    variant={
                                                        currentPage ===
                                                        index + 1
                                                            ? "default"
                                                            : "outline"
                                                    }
                                                    size="sm"
                                                    onClick={() =>
                                                        paginate(index + 1)
                                                    }
                                                    className={
                                                        currentPage ===
                                                        index + 1
                                                            ? ""
                                                            : "border-zinc-700 text-zinc-300 hover:bg-zinc-700"
                                                    }
                                                >
                                                    {index + 1}
                                                </Button>
                                            ))}

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    paginate(currentPage + 1)
                                                }
                                                disabled={
                                                    currentPage === totalPages
                                                }
                                                className="border-zinc-700 text-zinc-300 hover:bg-zinc-700"
                                            >
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="rounded-full bg-zinc-800 p-6 mb-4">
                                    <Search className="h-10 w-10 text-zinc-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    No cars found
                                </h3>
                                <p className="text-zinc-400 max-w-md mb-6">
                                    We couldn't find any cars matching your
                                    search criteria. Try adjusting your filters
                                    or search term.
                                </p>
                                <Button
                                    variant="default"
                                    onClick={resetFilters}
                                >
                                    Reset Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <ScrollToTop />
        </div>
    );
}
