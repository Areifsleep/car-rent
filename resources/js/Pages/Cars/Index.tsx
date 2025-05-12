import { Link } from "@inertiajs/react";
import { Briefcase, Users } from "lucide-react";
import { Button } from "@/Components/ui/button";
import Navbar from "@/Components/NavBar";
import ScrollToTop from "@/Components/ScrollToTop";
import { carData } from "@/Data/Cars";

export default function CarGridPage() {
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
                            className="object-cover absolut w-full h-full"
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

                {/* Car Grid */}
                <section className="py-16">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {carData.map((car) => (
                                <div
                                    key={car.id}
                                    className="relative rounded-xl overflow-hidden bg-zinc-800"
                                >
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={
                                                car.image || "/placeholder.svg"
                                            }
                                            alt={car.name}
                                            className="absolut w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>

                                    <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                                        <div>
                                            <h2 className="text-2xl font-bold text-white mb-2">
                                                {car.name}
                                            </h2>
                                            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-300">
                                                <div className="flex items-center">
                                                    <Users className="h-4 w-4 text-amber-500 mr-1" />
                                                    <span>
                                                        {car.seats} Seats
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-zinc-400">
                                                        {car.transmission}
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Briefcase className="h-4 w-4 text-amber-500 mr-1" />
                                                    <span>{car.bags} Bags</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 md:mt-0 flex items-center gap-4">
                                            <div className="text-right">
                                                <span className="text-amber-500 text-2xl font-bold">
                                                    ${car.price}
                                                </span>
                                                <span className="text-xs text-zinc-400 block">
                                                    /day
                                                </span>
                                            </div>
                                            <Link href={`/cars/${car.id}`}>
                                                <Button className="bg-amber-500 hover:bg-amber-600 text-zinc-900">
                                                    Details
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <ScrollToTop />
        </div>
    );
}
