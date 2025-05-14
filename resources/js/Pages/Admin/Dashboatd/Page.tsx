import { Link } from "@inertiajs/react";
import {
    Car,
    Calendar,
    CreditCard,
    Users,
    TrendingUp,
    DollarSign,
    AlertCircle,
    CheckCircle,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";

export default function AdminDashboardPage() {
    return (
        <div>
            <h1 className="mb-6 text-2xl font-bold">Dashboard Admin</h1>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-zinc-800 border-zinc-700 text-white">
                    <CardContent className="flex flex-row items-center p-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-900">
                            <Car className="h-6 w-6 text-blue-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-zinc-400">
                                Total Mobil
                            </p>
                            <h3 className="text-2xl font-bold text-white">
                                24
                            </h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-800 border-zinc-700 text-white">
                    <CardContent className="flex flex-row items-center p-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-900">
                            <Calendar className="h-6 w-6 text-green-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-zinc-400">
                                Booking Aktif
                            </p>
                            <h3 className="text-2xl font-bold text-white">
                                18
                            </h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-800 border-zinc-700 text-white">
                    <CardContent className="flex flex-row items-center p-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-900">
                            <DollarSign className="h-6 w-6 text-amber-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-zinc-400">
                                Pendapatan
                            </p>
                            <h3 className="text-2xl font-bold text-white">
                                $12,450
                            </h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-800 border-zinc-700 text-white">
                    <CardContent className="flex flex-row items-center p-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-900">
                            <Users className="h-6 w-6 text-purple-400" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-zinc-400">
                                Total User
                            </p>
                            <h3 className="text-2xl font-bold text-white">
                                156
                            </h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Access */}
            <h2 className="mb-4 mt-8 text-xl font-bold">Akses Cepat</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Link href="/admin/cars">
                    <Card className="cursor-pointer transition-all hover:bg-zinc-700 bg-zinc-800 border-zinc-700 text-white">
                        <CardContent className="flex flex-col items-center p-6">
                            <Car className="mb-4 h-8 w-8 text-amber-500" />
                            <h3 className="text-center text-lg font-medium">
                                Manajemen Mobil
                            </h3>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/admin/bookings">
                    <Card className="cursor-pointer transition-all hover:bg-zinc-700 bg-zinc-800 border-zinc-700 text-white">
                        <CardContent className="flex flex-col items-center p-6">
                            <Calendar className="mb-4 h-8 w-8 text-amber-500" />
                            <h3 className="text-center text-lg font-medium">
                                Manajemen Booking
                            </h3>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/admin/payments">
                    <Card className="cursor-pointer transition-all hover:bg-zinc-700 bg-zinc-800 border-zinc-700 text-white">
                        <CardContent className="flex flex-col items-center p-6">
                            <CreditCard className="mb-4 h-8 w-8 text-amber-500" />
                            <h3 className="text-center text-lg font-medium">
                                Manajemen Pembayaran
                            </h3>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/admin/users">
                    <Card className="cursor-pointer transition-all hover:bg-zinc-700 bg-zinc-800 border-zinc-700 text-white">
                        <CardContent className="flex flex-col items-center p-6">
                            <Users className="mb-4 h-8 w-8 text-amber-500" />
                            <h3 className="text-center text-lg font-medium">
                                Manajemen User
                            </h3>
                        </CardContent>
                    </Card>
                </Link>
            </div>

            {/* Recent Activity and Alerts */}
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
                {/* Recent Bookings */}
                <Card className="bg-zinc-800 border-zinc-700 text-white">
                    <CardHeader>
                        <CardTitle>Booking Terbaru</CardTitle>
                        <CardDescription className="text-zinc-400">
                            Daftar booking yang baru masuk
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                {
                                    id: "B-1234",
                                    customer: "John Doe",
                                    car: "Lamborghini Urus",
                                    date: "12 May 2025",
                                    status: "Pending",
                                },
                                {
                                    id: "B-1233",
                                    customer: "Jane Smith",
                                    car: "Aston Martin DBX",
                                    date: "11 May 2025",
                                    status: "Confirmed",
                                },
                                {
                                    id: "B-1232",
                                    customer: "Robert Johnson",
                                    car: "Ferrari Purosangue",
                                    date: "10 May 2025",
                                    status: "Completed",
                                },
                                {
                                    id: "B-1231",
                                    customer: "Emily Davis",
                                    car: "Bentley Bentayga",
                                    date: "9 May 2025",
                                    status: "Cancelled",
                                },
                            ].map((booking) => (
                                <div
                                    key={booking.id}
                                    className="flex items-center justify-between rounded-md border border-zinc-700 p-3 bg-zinc-800"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {booking.customer}
                                        </p>
                                        <p className="text-sm text-zinc-500">
                                            {booking.car} • {booking.date}
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        <span
                                            className={cn(
                                                "inline-block rounded-full px-2 py-1 text-xs font-medium",
                                                booking.status === "Pending" &&
                                                    "bg-yellow-100 text-yellow-800",
                                                booking.status ===
                                                    "Confirmed" &&
                                                    "bg-blue-100 text-blue-800",
                                                booking.status ===
                                                    "Completed" &&
                                                    "bg-green-100 text-green-800",
                                                booking.status ===
                                                    "Cancelled" &&
                                                    "bg-red-100 text-red-800"
                                            )}
                                        >
                                            {booking.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-center">
                            <Link
                                href="/admin/bookings"
                                className="text-sm font-medium text-amber-500 hover:underline"
                            >
                                Lihat Semua Booking
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* System Alerts */}
                <Card className="bg-zinc-800 border-zinc-700 text-white">
                    <CardHeader>
                        <CardTitle>Notifikasi Sistem</CardTitle>
                        <CardDescription className="text-zinc-400">
                            Peringatan dan notifikasi penting
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-start rounded-md border border-red-200 bg-red-50 p-3">
                                <AlertCircle className="mr-3 h-5 w-5 text-red-500" />
                                <div>
                                    <p className="font-medium text-red-800">
                                        Pembayaran Gagal
                                    </p>
                                    <p className="text-sm text-red-700">
                                        Pembayaran untuk booking #B-1230 gagal
                                        diproses. Diperlukan verifikasi manual.
                                    </p>
                                    <p className="mt-1 text-xs text-red-600">
                                        2 jam yang lalu
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start rounded-md border border-yellow-200 bg-yellow-50 p-3">
                                <AlertCircle className="mr-3 h-5 w-5 text-yellow-500" />
                                <div>
                                    <p className="font-medium text-yellow-800">
                                        Stok Mobil Menipis
                                    </p>
                                    <p className="text-sm text-yellow-700">
                                        Beberapa mobil sudah hampir terpesan
                                        penuh untuk minggu depan.
                                    </p>
                                    <p className="mt-1 text-xs text-yellow-600">
                                        5 jam yang lalu
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start rounded-md border border-green-200 bg-green-50 p-3">
                                <CheckCircle className="mr-3 h-5 w-5 text-green-500" />
                                <div>
                                    <p className="font-medium text-green-800">
                                        Mobil Baru Ditambahkan
                                    </p>
                                    <p className="text-sm text-green-700">
                                        Porsche Cayenne Turbo GT berhasil
                                        ditambahkan ke inventaris.
                                    </p>
                                    <p className="mt-1 text-xs text-green-600">
                                        1 hari yang lalu
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 text-center">
                            <Link
                                href="#"
                                className="text-sm font-medium text-amber-500 hover:underline"
                            >
                                Lihat Semua Notifikasi
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Revenue Chart */}
            <Card className="mt-8 bg-zinc-800 border-zinc-700 text-white">
                <CardHeader>
                    <CardTitle>Grafik Pendapatan</CardTitle>
                    <CardDescription className="text-zinc-400">
                        Pendapatan 30 hari terakhir
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-80 w-full rounded-md border border-zinc-700 bg-zinc-900 p-4 flex items-center justify-center">
                        <div className="flex flex-col items-center text-zinc-500">
                            <TrendingUp className="h-12 w-12 mb-2" />
                            <p>Chart akan ditampilkan di sini</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}
