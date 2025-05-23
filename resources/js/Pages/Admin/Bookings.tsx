"use client";

import { useState, useMemo } from "react";
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
import AdminLayout from "@/Layouts/AdminLayout";
import { Booking } from "@/types/booking";
import {
    formatDate,
    formatCurrency,
    calculateDurationInDays,
} from "@/lib/utils";

interface BookingsProps {
    bookings: {
        data: Booking[];
        meta: {
            current_page: number;
            last_page: number;
            total: number;
        };
    };
}

export default function AdminBookingsPage({ bookings }: BookingsProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(
        null
    );
    console.log(bookings);

    // Filter bookings based on search term and status filter
    const filteredBookings = useMemo(() => {
        return bookings.data.filter((booking) => {
            // Search filter
            const matchesSearch =
                booking.id.toString().includes(searchTerm.toLowerCase()) ||
                (booking.user?.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ??
                    false) ||
                (booking.car?.brand
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ??
                    false) ||
                (booking.car?.model
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ??
                    false);

            // Status filter
            const matchesStatus =
                statusFilter === "all" || booking.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [bookings.data, searchTerm, statusFilter]);

    const handleViewDetails = (booking: Booking) => {
        setSelectedBooking(booking);
        setDetailsDialogOpen(true);
    };

    // Menghitung jumlah hari dari tanggal mulai hingga selesai
    const calculateDuration = (startDate: string, endDate: string): number => {
        return calculateDurationInDays(new Date(startDate), new Date(endDate));
    };

    return (
        <AdminLayout>
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
                        <Select
                            value={statusFilter}
                            onValueChange={setStatusFilter}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Semua Status
                                </SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">
                                    Confirmed
                                </SelectItem>
                                <SelectItem value="cancelled">
                                    Cancelled
                                </SelectItem>
                            </SelectContent>
                        </Select>
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
                                        #{booking.id}
                                    </TableCell>
                                    <TableCell className="text-white">
                                        <div>
                                            <p>{booking.user?.name}</p>
                                            <p className="text-xs text-zinc-400">
                                                {booking.user?.email}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-3">
                                            <div className="relative h-10 w-10 overflow-hidden rounded-md">
                                                <img
                                                    src={
                                                        booking.car?.image ||
                                                        "/placeholder-car.svg"
                                                    }
                                                    alt={`${booking.car?.brand} ${booking.car?.model}`}
                                                    className="object-cover absolute w-full h-full"
                                                />
                                            </div>
                                            <span>
                                                {booking.car?.brand}{" "}
                                                {booking.car?.model}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <p className="text-xs text-zinc-500">
                                                {formatDate(booking.start_date)}{" "}
                                                - {formatDate(booking.end_date)}
                                            </p>
                                            <p className="text-xs font-medium">
                                                {calculateDuration(
                                                    booking.start_date,
                                                    booking.end_date
                                                )}{" "}
                                                hari
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-amber-500">
                                        {formatCurrency(booking.total_price)}
                                    </TableCell>
                                    <TableCell>
                                        <StatusBadge status={booking.status} />
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

                            {filteredBookings.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="text-center h-24 text-zinc-500"
                                    >
                                        Tidak ada booking yang ditemukan
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-zinc-500">
                        Showing {filteredBookings.length} of{" "}
                        {bookings.meta.total} bookings
                    </p>
                    <Pagination
                        currentPage={bookings.meta.current_page}
                        lastPage={bookings.meta.last_page}
                    />
                </div>

                {/* Booking Details Dialog */}
                {selectedBooking && (
                    <BookingDetailsDialog
                        booking={selectedBooking}
                        open={detailsDialogOpen}
                        onOpenChange={setDetailsDialogOpen}
                    />
                )}
            </div>
        </AdminLayout>
    );
}

// Komponen untuk Status Badge
function StatusBadge({ status }: { status: Booking["status"] }) {
    const statusConfig = {
        pending: {
            bgColor: "bg-yellow-100",
            textColor: "text-yellow-800",
            label: "Menunggu",
        },
        confirmed: {
            bgColor: "bg-blue-100",
            textColor: "text-blue-800",
            label: "Terkonfirmasi",
        },
        cancelled: {
            bgColor: "bg-red-100",
            textColor: "text-red-800",
            label: "Dibatalkan",
        },
    };

    const config = statusConfig[status];

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                ${config.bgColor} ${config.textColor}`}
        >
            {config.label}
        </span>
    );
}

// Komponen untuk Pagination
function Pagination({
    currentPage,
    lastPage,
}: {
    currentPage: number;
    lastPage: number;
}) {
    return (
        <div className="flex items-center space-x-2">
            <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => {
                    // Navigasi ke halaman sebelumnya
                }}
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Render page numbers */}
            {/* ... */}

            <Button
                variant="outline"
                size="sm"
                disabled={currentPage === lastPage}
                onClick={() => {
                    // Navigasi ke halaman berikutnya
                }}
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}

// Komponen Dialog Detail Booking
function BookingDetailsDialog({
    booking,
    open,
    onOpenChange,
}: {
    booking: Booking;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const [updateStatus, setUpdateStatus] = useState(booking.status);

    const handleStatusUpdate = () => {
        // Implementasikan logika update status booking
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl bg-zinc-800 text-white border-zinc-700">
                <DialogHeader>
                    <DialogTitle>Detail Booking #{booking.id}</DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        Dibuat pada{" "}
                        {new Date(booking.created_at).toLocaleString()}
                    </DialogDescription>
                </DialogHeader>

                {/* Konten detail booking */}
                {/* ... */}

                <DialogFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-x-2 sm:space-y-0">
                    <div className="flex flex-1 space-x-2">
                        <Select
                            value={updateStatus}
                            onValueChange={(value) =>
                                setUpdateStatus(
                                    value as
                                        | "pending"
                                        | "confirmed"
                                        | "cancelled"
                                )
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Ubah Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">
                                    Confirmed
                                </SelectItem>
                                <SelectItem value="cancelled">
                                    Cancelled
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            className="flex-1"
                            variant="default"
                            onClick={handleStatusUpdate}
                        >
                            Update Status
                        </Button>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Tutup
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
