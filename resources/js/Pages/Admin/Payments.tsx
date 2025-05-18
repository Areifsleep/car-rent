"use client";

import { useState } from "react";
import { Link } from "@inertiajs/react";
import {
    Search,
    Filter,
    Eye,
    ChevronLeft,
    ChevronRight,
    CheckCircle,
    XCircle,
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

// Sample payment data
const payments = [
    {
        id: "P-1234",
        bookingId: "B-1234",
        customer: "John Doe",
        amount: 2250,
        method: "Credit Card",
        cardLast4: "4242",
        status: "Successful",
        date: "2025-05-12T10:35:00Z",
        gatewayReference: "ch_3NJkLm2eZvKYlo2C1MFgBn7q",
    },
    {
        id: "P-1233",
        bookingId: "B-1233",
        customer: "Jane Smith",
        amount: 2500,
        method: "Credit Card",
        cardLast4: "1234",
        status: "Successful",
        date: "2025-05-11T14:50:00Z",
        gatewayReference: "ch_3NJkLm2eZvKYlo2C1MFgBn7r",
    },
    {
        id: "P-1232",
        bookingId: "B-1232",
        customer: "Robert Johnson",
        amount: 1700,
        method: "PayPal",
        status: "Successful",
        date: "2025-05-10T09:20:00Z",
        gatewayReference: "PAYID-MNGHE4A79D12345A",
    },
    {
        id: "P-1231",
        bookingId: "B-1231",
        customer: "Emily Davis",
        amount: 1200,
        method: "Credit Card",
        cardLast4: "5678",
        status: "Refunded",
        date: "2025-05-07T16:25:00Z",
        gatewayReference: "ch_3NJkLm2eZvKYlo2C1MFgBn7s",
    },
    {
        id: "P-1230",
        bookingId: "B-1230",
        customer: "Michael Wilson",
        amount: 2700,
        method: "Credit Card",
        cardLast4: "9012",
        status: "Failed",
        date: "2025-05-06T11:15:00Z",
        gatewayReference: "ch_3NJkLm2eZvKYlo2C1MFgBn7t",
    },
];

export default function AdminPaymentsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<any | null>(null);

    const filteredPayments = payments.filter(
        (payment) =>
            payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.bookingId
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            payment.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleViewDetails = (payment: any) => {
        setSelectedPayment(payment);
        setDetailsDialogOpen(true);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <AdminLayout>
            <div>
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Manajemen Pembayaran</h1>
                </div>

                {/* Filters */}
                <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                        <Input
                            placeholder="Cari ID pembayaran, booking, atau pelanggan..."
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
                                <SelectItem value="successful">
                                    Successful
                                </SelectItem>
                                <SelectItem value="failed">Failed</SelectItem>
                                <SelectItem value="refunded">
                                    Refunded
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" className="flex items-center">
                            <Filter className="mr-2 h-4 w-4" /> Filter
                        </Button>
                    </div>
                </div>

                {/* Payments Table */}
                <div className="rounded-md border border-zinc-700">
                    <Table>
                        <TableHeader className="bg-zinc-800">
                            <TableRow className="border-zinc-700">
                                <TableHead className="text-zinc-300">
                                    ID Pembayaran
                                </TableHead>
                                <TableHead className="text-zinc-300">
                                    ID Booking
                                </TableHead>
                                <TableHead className="text-zinc-300">
                                    Pelanggan
                                </TableHead>
                                <TableHead className="text-zinc-300">
                                    Jumlah
                                </TableHead>
                                <TableHead className="text-zinc-300">
                                    Metode
                                </TableHead>
                                <TableHead className="text-zinc-300">
                                    Status
                                </TableHead>
                                <TableHead className="text-zinc-300">
                                    Tanggal
                                </TableHead>
                                <TableHead className="text-right text-zinc-300">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPayments.map((payment) => (
                                <TableRow
                                    key={payment.id}
                                    className="border-zinc-700 hover:bg-zinc-800"
                                >
                                    <TableCell className="font-medium text-white">
                                        {payment.id}
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            href={`/admin/bookings?id=${payment.bookingId}`}
                                            className="text-amber-400 hover:underline"
                                        >
                                            {payment.bookingId}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="text-white">
                                        {payment.customer}
                                    </TableCell>
                                    <TableCell className="text-amber-500">
                                        ${payment.amount}
                                    </TableCell>
                                    <TableCell>
                                        {payment.method}
                                        {payment.cardLast4 && (
                                            <span className="text-xs text-zinc-500">
                                                {" "}
                                                •••• {payment.cardLast4}
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                payment.status === "Successful"
                                                    ? "bg-green-100 text-green-800"
                                                    : payment.status ===
                                                      "Failed"
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-blue-100 text-blue-800"
                                            }`}
                                        >
                                            {payment.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {formatDate(payment.date)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                handleViewDetails(payment)
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
                        Showing 1-{filteredPayments.length} of{" "}
                        {filteredPayments.length} payments
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

                {/* Payment Details Dialog */}
                {selectedPayment && (
                    <Dialog
                        open={detailsDialogOpen}
                        onOpenChange={setDetailsDialogOpen}
                    >
                        <DialogContent className="max-w-md bg-zinc-800 text-white border-zinc-700">
                            <DialogHeader>
                                <DialogTitle>
                                    Detail Pembayaran #{selectedPayment.id}
                                </DialogTitle>
                                <DialogDescription className="text-zinc-400">
                                    Pembayaran untuk booking{" "}
                                    {selectedPayment.bookingId}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4">
                                <div className="rounded-md border border-zinc-700 p-4 bg-zinc-800">
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-sm text-zinc-400">
                                            Status:
                                        </span>
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                selectedPayment.status ===
                                                "Successful"
                                                    ? "bg-green-100 text-green-800"
                                                    : selectedPayment.status ===
                                                      "Failed"
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-blue-100 text-blue-800"
                                            }`}
                                        >
                                            {selectedPayment.status}
                                        </span>
                                    </div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-sm text-zinc-400">
                                            Jumlah:
                                        </span>
                                        <span className="font-medium text-amber-500">
                                            ${selectedPayment.amount}
                                        </span>
                                    </div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-sm text-zinc-400">
                                            Metode:
                                        </span>
                                        <span className="font-medium">
                                            {selectedPayment.method}
                                            {selectedPayment.cardLast4 && (
                                                <span className="text-xs text-zinc-500">
                                                    {" "}
                                                    ••••{" "}
                                                    {selectedPayment.cardLast4}
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-sm text-zinc-400">
                                            Tanggal:
                                        </span>
                                        <span className="font-medium">
                                            {formatDate(selectedPayment.date)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-zinc-400">
                                            Referensi Gateway:
                                        </span>
                                        <span className="font-medium text-xs">
                                            {selectedPayment.gatewayReference}
                                        </span>
                                    </div>
                                </div>

                                <div className="rounded-md border p-4">
                                    <h3 className="mb-2 text-sm font-semibold">
                                        Detail Pelanggan
                                    </h3>
                                    <p className="font-medium">
                                        {selectedPayment.customer}
                                    </p>
                                </div>
                            </div>

                            <DialogFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-x-2 sm:space-y-0">
                                {selectedPayment.status === "Failed" && (
                                    <Button
                                        className="flex-1"
                                        variant="default"
                                    >
                                        <CheckCircle className="mr-2 h-4 w-4" />{" "}
                                        Verifikasi Manual
                                    </Button>
                                )}
                                {selectedPayment.status === "Successful" && (
                                    <Button
                                        variant="destructive"
                                        className="flex-1"
                                    >
                                        <XCircle className="mr-2 h-4 w-4" />{" "}
                                        Refund Pembayaran
                                    </Button>
                                )}
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
        </AdminLayout>
    );
}
