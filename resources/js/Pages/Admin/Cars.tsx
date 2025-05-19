"use client";

import { useState } from "react";
import { Link } from "@inertiajs/react";
import {
    Plus,
    Pencil,
    Trash2,
    Search,
    Filter,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import AdminLayout from "@/Layouts/AdminLayout";
import { Car } from "@/types/car";

interface CarsGridProps {
    cars: { data: Car[] };
}

export default function AdminCarsPage({ cars }: CarsGridProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState<string | null>(null);

    const filteredCars = cars?.data?.filter((car) =>
        car.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log(cars);

    const handleDeleteClick = (carId: string) => {
        setSelectedCar(carId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        // In a real app, you would delete the car here
        console.log(`Deleting car with ID: ${selectedCar}`);
        setDeleteDialogOpen(false);
        setSelectedCar(null);
    };

    return (
        <AdminLayout>
            <div>
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Manajemen Mobil</h1>
                    <Link href="/admin/cars/add">
                        <Button variant="default">
                            <Plus className="mr-2 h-4 w-4" /> Tambah Mobil
                        </Button>
                    </Link>
                </div>

                {/* Filters */}
                <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                        <Input
                            placeholder="Cari mobil..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Semua Status
                                </SelectItem>
                                <SelectItem value="available">
                                    Tersedia
                                </SelectItem>
                                <SelectItem value="booked">Terpesan</SelectItem>
                                <SelectItem value="maintenance">
                                    Maintenance
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" className="flex items-center">
                            <Filter className="mr-2 h-4 w-4" /> Filter
                        </Button>
                    </div>
                </div>

                {/* Cars Table */}
                <div className="rounded-md border border-zinc-700">
                    <Table>
                        <TableHeader className="bg-zinc-800">
                            <TableRow className="border-zinc-700">
                                <TableHead className="text-zinc-300">
                                    Mobil
                                </TableHead>
                                <TableHead className="text-zinc-300">
                                    Harga/Hari
                                </TableHead>
                                <TableHead className="text-zinc-300">
                                    Status
                                </TableHead>
                                <TableHead className="text-zinc-300">
                                    Nomor Plat
                                </TableHead>
                                <TableHead className="text-zinc-300">
                                    Tahun
                                </TableHead>
                                <TableHead className="text-right text-zinc-300">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCars?.map((car) => (
                                <TableRow
                                    key={car.id}
                                    className="border-zinc-700 hover:bg-zinc-800"
                                >
                                    <TableCell className="font-medium text-white">
                                        <div className="flex items-center space-x-3">
                                            <div className="relative h-10 w-10 overflow-hidden rounded-md">
                                                <img
                                                    src={
                                                        car.image ||
                                                        "/placeholder.svg"
                                                    }
                                                    alt={car.brand}
                                                    className="object-cover absolute w-full h-full"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium">
                                                    {car.model}
                                                </p>
                                                <p className="text-xs text-zinc-500">
                                                    {car.brand}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium text-amber-500">
                                        ${car.rental_price_per_day}
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                car.is_available
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {car.is_available
                                                ? "Tersedia"
                                                : "Tidak Tersedia"}
                                        </span>
                                    </TableCell>
                                    <TableCell>{car.license_plate}</TableCell>
                                    <TableCell>{car.year}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end space-x-2">
                                            <Link
                                                href={`/admin/cars/edit/${car.id}`}
                                            >
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-red-500 hover:bg-red-50 hover:text-red-600"
                                                onClick={() =>
                                                    handleDeleteClick(
                                                        String(car.id)
                                                    )
                                                }
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-zinc-500">
                        Showing 1-{filteredCars?.length} of{" "}
                        {filteredCars?.length} cars
                    </p>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled
                            className="border-zinc-700 text-zinc-500"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="default" size="sm">
                            1
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-zinc-700 text-zinc-300 hover:bg-zinc-700"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Delete Confirmation Dialog */}
                <Dialog
                    open={deleteDialogOpen}
                    onOpenChange={setDeleteDialogOpen}
                >
                    <DialogContent className="bg-zinc-800 text-white border-zinc-700">
                        <DialogHeader>
                            <DialogTitle>Konfirmasi Hapus</DialogTitle>
                            <DialogDescription className="text-zinc-400">
                                Apakah Anda yakin ingin menghapus mobil ini?
                                Tindakan ini tidak dapat dibatalkan.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setDeleteDialogOpen(false)}
                                className="border-zinc-700 text-zinc-300 hover:bg-zinc-700"
                            >
                                Batal
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDeleteConfirm}
                            >
                                Hapus
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AdminLayout>
    );
}
