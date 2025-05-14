"use client";

import { useState } from "react";
import {
    Search,
    Filter,
    Eye,
    ChevronLeft,
    ChevronRight,
    Calendar,
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
import { carData } from "@/Data/Cars";

// Sample booking data
const bookings = [
    {
        id: "B-1234",
        customer: {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+971 52-123-4567",
        },
        car: carData[0],
        startDate: "2025-05-15",
        endDate: "2025-05-18",
        totalDays: 3,
        totalAmount: 2250,
        status: "Pending",
        paymentStatus: "Paid",
        createdAt: "2025-05-12T10:30:00Z",
    },
    {
        id: "B-1233",
        customer: {
            name: "Jane Smith",
            email: "jane.smith@example.com",
            phone: "+971 52-987-6543",
        },
        car: carData[1],
        startDate: "2025-05-20",
        endDate: "2025-05-25",
        totalDays: 5,
        totalAmount: 2500,
        status: "Confirmed",
        paymentStatus: "Paid",
        createdAt: "2025-05-11T14:45:00Z",
    },
    {
        id: "B-1232",
        customer: {
            name: "Robert Johnson",
            email: "robert.johnson@example.com",
            phone: "+971 52-456-7890",
        },
        car: carData[4],
        startDate: "2025-05-10",
        endDate: "2025-05-12",
        totalDays: 2,
        totalAmount: 1700,
        status: "Completed",
        paymentStatus: "Paid",
        createdAt: "2025-05-10T09:15:00Z",
    },
    {
        id: "B-1231",
        customer: {
            name: "Emily Davis",
            email: "emily.davis@example.com",
            phone: "+971 52-321-6547",
        },
        car: carData[2],
        startDate: "2025-05-08",
        endDate: "2025-05-10",
        totalDays: 2,
        totalAmount: 1200,
        status: "Cancelled",
        paymentStatus: "Refunded",
        createdAt: "2025-05-07T16:20:00Z",
    },
    {
        id: "B-1230",
        customer: {
            name: "Michael Wilson",
            email: "michael.wilson@example.com",
            phone: "+971 52-789-0123",
        },
        car: carData[3],
        startDate: "2025-05-25",
        endDate: "2025-05-28",
        totalDays: 3,
        totalAmount: 2700,
        status: "Pending",
        paymentStatus: "Unpaid",
        createdAt: "2025-05-06T11:10:00Z",
    },
];

export default function AdminBookingsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

    const filteredBookings = bookings.filter(
        (booking) =>
            booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.customer.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            booking.car.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleViewDetails = (booking: any) => {
        setSelectedBooking(booking);
        setDetailsDialogOpen(true);
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Manajemen Booking</h1>
                <Button variant="default">
                    <Calendar className="mr-2 h-4 w-4" /> Lihat Kalender
                </Button>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                    <Input
                        placeholder="Cari booking, pelanggan, atau mobil..."
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
                            <SelectItem value="all">Semua Status</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" className="flex items-center">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                </div>
            </div>

            {/* Bookings Table */}
            <div className="rounded-md border border-zinc-700">
                <Table>
                    <TableHeader className="bg-zinc-800">
                        <TableRow className="border-zinc-700">
                            <TableHead className="text-zinc-300">
                                ID Booking
                            </TableHead>
                            <TableHead className="text-zinc-300">
                                Pelanggan
                            </TableHead>
                            <TableHead className="text-zinc-300">
                                Mobil
                            </TableHead>
                            <TableHead className="text-zinc-300">
                                Tanggal
                            </TableHead>
                            <TableHead className="text-zinc-300">
                                Total
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
                        {filteredBookings.map((booking) => (
                            <TableRow
                                key={booking.id}
                                className="border-zinc-700 hover:bg-zinc-800"
                            >
                                <TableCell className="font-medium text-white">
                                    {booking.id}
                                </TableCell>
                                <TableCell className="text-white">
                                    <div>
                                        <p>{booking.customer.name}</p>
                                        <p className="text-xs text-zinc-400">
                                            {booking.customer.email}
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-3">
                                        <div className="relative h-10 w-10 overflow-hidden rounded-md">
                                            <img
                                                src={
                                                    booking.car.image ||
                                                    "/placeholder.svg"
                                                }
                                                alt={booking.car.name}
                                                className="object-cover absolut w-full h-full"
                                            />
                                        </div>
                                        <span>{booking.car.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div>
                                        <p className="text-xs text-zinc-500">
                                            {formatDate(booking.startDate)} -{" "}
                                            {formatDate(booking.endDate)}
                                        </p>
                                        <p className="text-xs font-medium">
                                            {booking.totalDays} hari
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell className="text-amber-500">
                                    ${booking.totalAmount}
                                </TableCell>
                                <TableCell>
                                    <span
                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                            booking.status === "Pending"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : booking.status === "Confirmed"
                                                ? "bg-blue-100 text-blue-800"
                                                : booking.status === "Completed"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {booking.status}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            handleViewDetails(booking)
                                        }
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-zinc-500">
                    Showing 1-{filteredBookings.length} of{" "}
                    {filteredBookings.length} bookings
                </p>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" disabled>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="bg-zinc-900 text-white hover:bg-zinc-800"
                    >
                        1
                    </Button>
                    <Button variant="outline" size="sm">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Booking Details Dialog */}
            {selectedBooking && (
                <Dialog
                    open={detailsDialogOpen}
                    onOpenChange={setDetailsDialogOpen}
                >
                    <DialogContent className="max-w-3xl bg-zinc-800 text-white border-zinc-700">
                        <DialogHeader>
                            <DialogTitle>
                                Detail Booking #{selectedBooking.id}
                            </DialogTitle>
                            <DialogDescription className="text-zinc-400">
                                Dibuat pada{" "}
                                {new Date(
                                    selectedBooking.createdAt
                                ).toLocaleString()}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Customer Information */}
                            <div>
                                <h3 className="mb-2 text-lg font-semibold">
                                    Informasi Pelanggan
                                </h3>
                                <div className="rounded-md border border-zinc-700 p-4 bg-zinc-800">
                                    <p className="font-medium text-white">
                                        {selectedBooking.customer.name}
                                    </p>
                                    <p className="text-sm text-zinc-400">
                                        {selectedBooking.customer.email}
                                    </p>
                                    <p className="text-sm text-zinc-400">
                                        {selectedBooking.customer.phone}
                                    </p>
                                </div>
                            </div>

                            {/* Booking Status */}
                            <div>
                                <h3 className="mb-2 text-lg font-semibold">
                                    Status Booking
                                </h3>
                                <div className="rounded-md border p-4">
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-sm text-zinc-500">
                                            Status Booking:
                                        </span>
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                selectedBooking.status ===
                                                "Pending"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : selectedBooking.status ===
                                                      "Confirmed"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : selectedBooking.status ===
                                                      "Completed"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {selectedBooking.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-zinc-500">
                                            Status Pembayaran:
                                        </span>
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                selectedBooking.paymentStatus ===
                                                "Paid"
                                                    ? "bg-green-100 text-green-800"
                                                    : selectedBooking.paymentStatus ===
                                                      "Unpaid"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-blue-100 text-blue-800"
                                            }`}
                                        >
                                            {selectedBooking.paymentStatus}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Car Details */}
                            <div className="md:col-span-2">
                                <h3 className="mb-2 text-lg font-semibold">
                                    Detail Mobil
                                </h3>
                                <div className="flex rounded-md border p-4">
                                    <div className="relative h-20 w-20 overflow-hidden rounded-md">
                                        <img
                                            src={
                                                selectedBooking.car.image ||
                                                "/placeholder.svg"
                                            }
                                            alt={selectedBooking.car.name}
                                            className="object-cover absolut w-full h-full"
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <p className="font-medium">
                                            {selectedBooking.car.name}
                                        </p>
                                        <p className="text-sm text-zinc-500">
                                            {selectedBooking.car.engine}
                                        </p>
                                        <div className="mt-1 flex items-center space-x-4 text-sm">
                                            <span>
                                                {selectedBooking.car.seats}{" "}
                                                Seats
                                            </span>
                                            <span>
                                                {
                                                    selectedBooking.car
                                                        .transmission
                                                }
                                            </span>
                                            <span>
                                                {selectedBooking.car.bags} Bags
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Booking Details */}
                            <div>
                                <h3 className="mb-2 text-lg font-semibold">
                                    Detail Booking
                                </h3>
                                <div className="rounded-md border p-4">
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-sm text-zinc-500">
                                            Tanggal Mulai:
                                        </span>
                                        <span className="font-medium">
                                            {formatDate(
                                                selectedBooking.startDate
                                            )}
                                        </span>
                                    </div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-sm text-zinc-500">
                                            Tanggal Selesai:
                                        </span>
                                        <span className="font-medium">
                                            {formatDate(
                                                selectedBooking.endDate
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-zinc-500">
                                            Total Hari:
                                        </span>
                                        <span className="font-medium">
                                            {selectedBooking.totalDays} hari
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Details */}
                            <div>
                                <h3 className="mb-2 text-lg font-semibold">
                                    Detail Pembayaran
                                </h3>
                                <div className="rounded-md border p-4">
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-sm text-zinc-500">
                                            Harga per Hari:
                                        </span>
                                        <span className="font-medium">
                                            ${selectedBooking.car.price}
                                        </span>
                                    </div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-sm text-zinc-500">
                                            Total Hari:
                                        </span>
                                        <span className="font-medium">
                                            {selectedBooking.totalDays} hari
                                        </span>
                                    </div>
                                    <div className="border-t border-zinc-200 pt-2">
                                        <div className="flex items-center justify-between font-medium">
                                            <span>Total:</span>
                                            <span>
                                                ${selectedBooking.totalAmount}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-x-2 sm:space-y-0">
                            <div className="flex flex-1 space-x-2">
                                <Select
                                    defaultValue={selectedBooking.status.toLowerCase()}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Ubah Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending">
                                            Pending
                                        </SelectItem>
                                        <SelectItem value="confirmed">
                                            Confirmed
                                        </SelectItem>
                                        <SelectItem value="completed">
                                            Completed
                                        </SelectItem>
                                        <SelectItem value="cancelled">
                                            Cancelled
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button className="flex-1" variant="default">
                                    Update Status
                                </Button>
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => setDetailsDialogOpen(false)}
                            >
                                Tutup
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
