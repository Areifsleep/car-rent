// "use client";

// import { useState } from "react";
// import { Link } from "@inertiajs/react";
// import {
//     Plus,
//     Pencil,
//     Trash2,
//     Search,
//     Filter,
//     ChevronLeft,
//     ChevronRight,
// } from "lucide-react";
// import { Button } from "@/Components/ui/button";
// import { Input } from "@/Components/ui/input";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/Components/ui/select";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/Components/ui/table";
// import {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
// } from "@/Components/ui/dialog";
// import AdminLayout from "@/Layouts/AdminLayout";
// import { Car } from "@/types/car";

// interface CarsGridProps {
//     cars: { data: Car[] };
// }

// export default function AdminCarsPage({ cars }: CarsGridProps) {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//     const [selectedCar, setSelectedCar] = useState<string | null>(null);

//     const filteredCars = cars.data.filter((car) =>
//         car.brand.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     console.log(cars);

//     const handleDeleteClick = (carId: string) => {
//         setSelectedCar(carId);
//         setDeleteDialogOpen(true);
//     };

//     const handleDeleteConfirm = () => {
//         // In a real app, you would delete the car here
//         console.log(`Deleting car with ID: ${selectedCar}`);
//         setDeleteDialogOpen(false);
//         setSelectedCar(null);
//     };

//     return (
//         <AdminLayout>
//             <div>
//                 <div className="mb-6 flex items-center justify-between">
//                     <h1 className="text-2xl font-bold">Manajemen Mobil</h1>
//                     <Link href={route("admin.addcar")}>
//                         <Button variant="default">
//                             <Plus className="mr-2 h-4 w-4" /> Tambah Mobil
//                         </Button>
//                     </Link>
//                 </div>

//                 {/* Filters */}
//                 <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
//                     <div className="relative flex-1">
//                         <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
//                         <Input
//                             placeholder="Cari mobil..."
//                             className="pl-10"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                     </div>
//                     <div className="flex items-center space-x-4">
//                         <Select defaultValue="all">
//                             <SelectTrigger className="w-[180px]">
//                                 <SelectValue placeholder="Filter Status" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="all">
//                                     Semua Status
//                                 </SelectItem>
//                                 <SelectItem value="available">
//                                     Tersedia
//                                 </SelectItem>
//                                 <SelectItem value="booked">Terpesan</SelectItem>
//                                 <SelectItem value="maintenance">
//                                     Maintenance
//                                 </SelectItem>
//                             </SelectContent>
//                         </Select>
//                         <Button
//                             variant="outline"
//                             className="flex items-center bg-transparent "
//                         >
//                             <Filter className="mr-2 h-4 w-4" /> Filter
//                         </Button>
//                     </div>
//                 </div>

//                 {/* Cars Table */}
//                 <div className="rounded-md border border-zinc-700">
//                     <Table>
//                         <TableHeader className="bg-zinc-800">
//                             <TableRow className="border-zinc-700">
//                                 <TableHead className="text-zinc-300">
//                                     Mobil
//                                 </TableHead>
//                                 <TableHead className="text-zinc-300">
//                                     Harga/Hari
//                                 </TableHead>
//                                 <TableHead className="text-zinc-300">
//                                     Status
//                                 </TableHead>
//                                 <TableHead className="text-zinc-300">
//                                     Nomor Plat
//                                 </TableHead>
//                                 <TableHead className="text-zinc-300">
//                                     Tahun
//                                 </TableHead>
//                                 <TableHead className="text-right text-zinc-300">
//                                     Aksi
//                                 </TableHead>
//                             </TableRow>
//                         </TableHeader>
//                         <TableBody>
//                             {filteredCars?.map((car) => (
//                                 <TableRow
//                                     key={car.id}
//                                     className="border-zinc-700 hover:bg-zinc-800"
//                                 >
//                                     <TableCell className="font-medium text-white">
//                                         <div className="flex items-center space-x-3">
//                                             <div className="relative h-10 w-10 overflow-hidden rounded-md">
//                                                 <img
//                                                     src={
//                                                         car.image ||
//                                                         "/placeholder.svg"
//                                                     }
//                                                     alt={car.brand}
//                                                     className="object-cover absolute w-full h-full"
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <p className="font-medium">
//                                                     {car.model}
//                                                 </p>
//                                                 <p className="text-xs text-zinc-500">
//                                                     {car.brand}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </TableCell>
//                                     <TableCell className="font-medium text-amber-500">
//                                         ${car.rental_price_per_day}
//                                     </TableCell>
//                                     <TableCell>
//                                         <div className="flex justify-center sm:justify-start">
//                                             <span
//                                                 className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium
//                 ${
//                     car.is_available
//                         ? "bg-green-100 text-green-800 border border-green-300"
//                         : "bg-red-100 text-red-800 border border-red-300"
//                 }
//                 sm:min-w-[93px]
//                 max-sm:w-8 max-sm:h-8 max-sm:rounded-full max-sm:p-0 max-sm:min-w-0
//                 `}
//                                             >
//                                                 <span className="hidden sm:inline-block">
//                                                     {car.is_available
//                                                         ? "Tersedia"
//                                                         : "Tidak Tersedia"}
//                                                 </span>
//                                                 <svg
//                                                     xmlns="http://www.w3.org/2000/svg"
//                                                     className="sm:hidden w-4 h-4"
//                                                     viewBox="0 0 20 20"
//                                                     fill="currentColor"
//                                                 >
//                                                     {car.is_available ? (
//                                                         // Checkmark icon untuk "Tersedia"
//                                                         <path
//                                                             fillRule="evenodd"
//                                                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                                                             clipRule="evenodd"
//                                                         />
//                                                     ) : (
//                                                         // X icon untuk "Tidak Tersedia"
//                                                         <path
//                                                             fillRule="evenodd"
//                                                             d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                                                             clipRule="evenodd"
//                                                         />
//                                                     )}
//                                                 </svg>
//                                             </span>
//                                         </div>
//                                     </TableCell>
//                                     <TableCell>{car.license_plate}</TableCell>
//                                     <TableCell>{car.year}</TableCell>
//                                     <TableCell className="text-right">
//                                         <div className="flex justify-end space-x-2">
//                                             <Link
//                                                 href={`/admin/cars/edit/${car.id}`}
//                                             >
//                                                 <Button
//                                                     className="bg-transparent"
//                                                     variant="outline"
//                                                     size="sm"
//                                                 >
//                                                     <Pencil className="h-4 w-4" />
//                                                 </Button>
//                                             </Link>
//                                             <Button
//                                                 variant="outline"
//                                                 size="sm"
//                                                 className="text-red-500 bg-transparent hover:bg-red-50 hover:text-red-600"
//                                                 onClick={() =>
//                                                     handleDeleteClick(
//                                                         String(car.id)
//                                                     )
//                                                 }
//                                             >
//                                                 <Trash2 className="h-4 w-4" />
//                                             </Button>
//                                         </div>
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </div>

//                 {/* Pagination */}
//                 <div className="mt-4 flex items-center justify-between">
//                     <p className="text-sm text-zinc-500">
//                         Showing 1-{filteredCars?.length} of{" "}
//                         {filteredCars?.length} cars
//                     </p>
//                     <div className="flex items-center space-x-2">
//                         <Button
//                             variant="outline"
//                             size="sm"
//                             disabled
//                             className="border-zinc-700 text-zinc-500"
//                         >
//                             <ChevronLeft className="h-4 w-4" />
//                         </Button>
//                         <Button variant="default" size="sm">
//                             1
//                         </Button>
//                         <Button
//                             variant="outline"
//                             size="sm"
//                             className="border-zinc-700 text-zinc-300 hover:bg-zinc-700"
//                         >
//                             <ChevronRight className="h-4 w-4" />
//                         </Button>
//                     </div>
//                 </div>

//                 {/* Delete Confirmation Dialog */}
//                 <Dialog
//                     open={deleteDialogOpen}
//                     onOpenChange={setDeleteDialogOpen}
//                 >
//                     <DialogContent className="bg-zinc-800 text-white border-zinc-700">
//                         <DialogHeader>
//                             <DialogTitle>Konfirmasi Hapus</DialogTitle>
//                             <DialogDescription className="text-zinc-400">
//                                 Apakah Anda yakin ingin menghapus mobil ini?
//                                 Tindakan ini tidak dapat dibatalkan.
//                             </DialogDescription>
//                         </DialogHeader>
//                         <DialogFooter>
//                             <Button
//                                 variant="outline"
//                                 onClick={() => setDeleteDialogOpen(false)}
//                                 className="border-zinc-700 text-zinc-300 hover:bg-zinc-700"
//                             >
//                                 Batal
//                             </Button>
//                             <Button
//                                 variant="destructive"
//                                 onClick={handleDeleteConfirm}
//                             >
//                                 Hapus
//                             </Button>
//                         </DialogFooter>
//                     </DialogContent>
//                 </Dialog>
//             </div>
//         </AdminLayout>
//     );
// }
"use client";

import { useState, useEffect } from "react";
import { Link, router } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import AdminLayout from "@/Layouts/AdminLayout";
import CarTable from "@/Components/Admin/CarTable";
import { Car } from "@/types/car";
import { useToast } from "@/Hooks/use-toast";

interface CarsGridProps {
    cars: {
        // Objek 'cars' ini adalah objek paginator dari Laravel
        data: Car[];
        current_page: number;
        from: number | null; // 'from' bisa null jika tidak ada data
        last_page: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        path: string;
        per_page: number;
        to: number | null; // 'to' bisa null jika tidak ada data
        total: number;
        // Anda mungkin juga memiliki next_page_url, prev_page_url, dll.
    };
    filters: {
        search: string; // Untuk menyimpan nilai filter pencarian
    };
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function AdminCarsPage({ cars, filters, flash }: CarsGridProps) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const { toast } = useToast();
    console.log(cars.links);

    const handleDeleteClick = (car: Car) => {
        setSelectedCar(car);
        setDeleteDialogOpen(true);
    };

    useEffect(() => {
        if (flash?.success) {
            toast({
                title: "Success",
                description: flash.success,
            });
        }

        if (flash?.error) {
            toast({
                title: "Error",
                description: flash.error,
                variant: "destructive",
            });
        }
    }, [flash, toast]);

    const handleDeleteConfirm = () => {
        if (selectedCar && !isDeleting) {
            setIsDeleting(true);

            router.delete(route("admin.cars.destroy", selectedCar.id), {
                preserveScroll: true,
                onSuccess: () => {
                    setDeleteDialogOpen(false);
                    setSelectedCar(null);
                    setIsDeleting(false);
                    // Flash message ditangani oleh useEffect
                },
                onError: (errors) => {
                    setIsDeleting(false);
                    setDeleteDialogOpen(false);

                    if (errors.delete) {
                        toast({
                            title: "Cannot Delete Car",
                            description: errors.delete,
                            variant: "destructive",
                        });
                    } else {
                        toast({
                            title: "Error",
                            description:
                                "There was an error deleting the car. Please try again.",
                            variant: "destructive",
                        });
                    }
                },
                onFinish: () => {
                    setIsDeleting(false);
                },
            });
        }
    };

    return (
        <AdminLayout>
            <div>
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Manajemen Mobil</h1>
                    <Link href={route("admin.cars.create")}>
                        <Button variant="default">
                            <Plus className="mr-2 h-4 w-4" /> Tambah Mobil
                        </Button>
                    </Link>
                </div>

                <CarTable
                    cars={cars}
                    filters={filters}
                    onDeleteClick={handleDeleteClick}
                />

                {/* Delete Confirmation Dialog */}
                <Dialog
                    open={deleteDialogOpen}
                    onOpenChange={setDeleteDialogOpen}
                >
                    <DialogContent className="bg-zinc-800 text-white border-zinc-700">
                        <DialogHeader>
                            <DialogTitle>Konfirmasi Hapus Mobil</DialogTitle>
                            <DialogDescription className="text-zinc-400">
                                Apakah Anda yakin ingin menghapus{" "}
                                {selectedCar?.brand} {selectedCar?.model}?
                                Tindakan ini tidak dapat dibatalkan.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="flex space-x-2 justify-end">
                            <Button
                                variant="outline"
                                onClick={() => setDeleteDialogOpen(false)}
                                className="bg-transparent border-zinc-600"
                            >
                                Batal
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDeleteConfirm}
                            >
                                Hapus Mobil
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AdminLayout>
    );
}
