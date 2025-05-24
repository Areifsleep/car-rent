import { useMemo, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import Pagination from "@/Components/Admin/Pagination";
import SearchBox from "@/Components/Admin/SearchBox";
import { Car } from "@/types/car";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { router } from "@inertiajs/react";

interface CarTableProps {
    cars: {
        data: Car[];
        meta: {
            current_page: number;
            from: number;
            last_page: number;
            links: Array<{
                url: string | null;
                label: string;
                active: boolean;
            }>;
            path: string;
            per_page: number;
            to: number;
            total: number;
        };
    };
    onDeleteClick: (car: Car) => void;
}

export default function CarTable({ cars, onDeleteClick }: CarTableProps) {
    const [searchTerm, setSearchTerm] = useState("");

    // Client-side filtering for the current page only
    const filteredCars = useMemo(() => {
        return cars.data.filter(
            (car) =>
                car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                car.license_plate
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        );
    }, [cars.data, searchTerm]);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        // Optional: If you want server-side filtering, uncomment this:
        // router.get(
        //   route('admin.cars'),
        //   { search: value, page: 1 },
        //   { preserveState: true }
        // );
    };

    const handlePageChange = (page: number) => {
        router.get(
            route("admin.cars"),
            { page, search: searchTerm },
            { preserveState: true }
        );
    };

    return (
        <div className="space-y-4">
            <div className="flex space-x-4">
                <SearchBox
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Cari mobil..."
                />
            </div>

            <div className="rounded-md border border-zinc-700">
                <Table>
                    <TableHeader className="bg-zinc-800">
                        <TableRow className="border-zinc-700">
                            <TableHead className="text-zinc-300">
                                Mobil
                            </TableHead>
                            <TableHead className="text-zinc-300">
                                Plat Nomor
                            </TableHead>
                            <TableHead className="text-zinc-300">
                                Harga/Hari
                            </TableHead>
                            <TableHead className="text-zinc-300">
                                Status
                            </TableHead>
                            <TableHead className="text-right text-zinc-300">
                                Aksi
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCars.length > 0 ? (
                            filteredCars.map((car) => (
                                <TableRow
                                    key={car.id}
                                    className="border-zinc-700 hover:bg-zinc-800"
                                >
                                    <TableCell>
                                        <div className="flex items-center space-x-3">
                                            <div className="relative h-10 w-10 overflow-hidden rounded-md">
                                                {car.image ? (
                                                    <img
                                                        src={car.image}
                                                        alt={`${car.brand} ${car.model}`}
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center bg-zinc-700 text-zinc-500">
                                                        No img
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">
                                                    {car.brand} {car.model}
                                                </p>
                                                <p className="text-xs text-zinc-500">
                                                    {car.year}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {car.license_plate}
                                    </TableCell>
                                    <TableCell className="font-medium text-amber-500">
                                        ${car.rental_price_per_day}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-center sm:justify-start">
                                            <span
                                                className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                          ${
                              car.is_available
                                  ? "bg-green-100 text-green-800 border border-green-300"
                                  : "bg-red-100 text-red-800 border border-red-300"
                          }
                          sm:min-w-[93px]
                          max-sm:w-8 max-sm:h-8 max-sm:rounded-full max-sm:p-0 max-sm:min-w-0
                          `}
                                            >
                                                <span className="hidden sm:inline-block">
                                                    {car.is_available
                                                        ? "Tersedia"
                                                        : "Tidak Tersedia"}
                                                </span>
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 w-8 p-0 bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
                                                onClick={() =>
                                                    router.visit(
                                                        route(
                                                            "admin.cars.edit",
                                                            car.id
                                                        )
                                                    )
                                                }
                                            >
                                                <Pencil className="h-4 w-4" />
                                                <span className="sr-only">
                                                    Edit
                                                </span>
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="h-8 w-8 p-0 bg-zinc-800 border-red-500 hover:bg-red-500 hover:text-white"
                                                onClick={() =>
                                                    onDeleteClick(car)
                                                }
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">
                                                    Delete
                                                </span>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="h-24 text-center"
                                >
                                    No cars found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Pagination meta={cars.meta} onPageChange={handlePageChange} />
        </div>
    );
}
