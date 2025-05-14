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
    Shield,
    User,
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

// Sample user data
const users = [
    {
        id: 1,
        name: "Admin User",
        email: "admin@renax.com",
        role: "admin",
        status: "active",
        createdAt: "2025-01-15T10:30:00Z",
    },
    {
        id: 2,
        name: "John Doe",
        email: "john.doe@example.com",
        role: "user",
        status: "active",
        createdAt: "2025-02-20T14:45:00Z",
    },
    {
        id: 3,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "user",
        status: "active",
        createdAt: "2025-03-10T09:15:00Z",
    },
    {
        id: 4,
        name: "Robert Johnson",
        email: "robert.johnson@example.com",
        role: "user",
        status: "inactive",
        createdAt: "2025-03-25T16:20:00Z",
    },
    {
        id: 5,
        name: "Emily Davis",
        email: "emily.davis@example.com",
        role: "user",
        status: "active",
        createdAt: "2025-04-05T11:10:00Z",
    },
];

export default function AdminUsersPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [roleDialogOpen, setRoleDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any | null>(null);
    const [selectedRole, setSelectedRole] = useState<string>("user");

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteClick = (user: any) => {
        setSelectedUser(user);
        setDeleteDialogOpen(true);
    };

    const handleRoleClick = (user: any) => {
        setSelectedUser(user);
        setSelectedRole(user.role);
        setRoleDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        // In a real app, you would delete the user here
        console.log(`Deleting user with ID: ${selectedUser?.id}`);
        setDeleteDialogOpen(false);
        setSelectedUser(null);
    };

    const handleRoleConfirm = () => {
        // In a real app, you would update the user's role here
        console.log(
            `Updating user ${selectedUser?.id} role to: ${selectedRole}`
        );
        setRoleDialogOpen(false);
        setSelectedUser(null);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Role & User Management</h1>
                <Link href="/admin/users/add">
                    <Button variant="default">
                        <Plus className="mr-2 h-4 w-4" /> Tambah User
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                    <Input
                        placeholder="Cari nama atau email..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Role</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" className="flex items-center">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                </div>
            </div>

            {/* Users Table */}
            <div className="rounded-md border border-zinc-700">
                <Table>
                    <TableHeader className="bg-zinc-800">
                        <TableRow className="border-zinc-700">
                            <TableHead className="text-zinc-300">
                                Nama
                            </TableHead>
                            <TableHead className="text-zinc-300">
                                Email
                            </TableHead>
                            <TableHead className="text-zinc-300">
                                Role
                            </TableHead>
                            <TableHead className="text-zinc-300">
                                Status
                            </TableHead>
                            <TableHead className="text-zinc-300">
                                Tanggal Dibuat
                            </TableHead>
                            <TableHead className="text-right text-zinc-300">
                                Aksi
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow
                                key={user.id}
                                className="border-zinc-700 hover:bg-zinc-800"
                            >
                                <TableCell className="font-medium text-white">
                                    {user.name}
                                </TableCell>
                                <TableCell className="text-white">
                                    {user.email}
                                </TableCell>
                                <TableCell>
                                    <span
                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                            user.role === "admin"
                                                ? "bg-purple-100 text-purple-800"
                                                : "bg-blue-100 text-blue-800"
                                        }`}
                                    >
                                        {user.role === "admin" ? (
                                            <>
                                                <Shield className="mr-1 h-3 w-3" />{" "}
                                                Admin
                                            </>
                                        ) : (
                                            <>
                                                <User className="mr-1 h-3 w-3" />{" "}
                                                User
                                            </>
                                        )}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span
                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                            user.status === "active"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {user.status === "active"
                                            ? "Active"
                                            : "Inactive"}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    {formatDate(user.createdAt)}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                handleRoleClick(user)
                                            }
                                        >
                                            <Shield className="h-4 w-4" />
                                        </Button>
                                        <Link
                                            href={`/admin/users/edit/${user.id}`}
                                        >
                                            <Button variant="outline" size="sm">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-red-500 hover:bg-red-50 hover:text-red-600"
                                            onClick={() =>
                                                handleDeleteClick(user)
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
                    Showing 1-{filteredUsers.length} of {filteredUsers.length}{" "}
                    users
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

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="bg-zinc-800 text-white border-zinc-700">
                    <DialogHeader>
                        <DialogTitle>Konfirmasi Hapus</DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            Apakah Anda yakin ingin menghapus user{" "}
                            <span className="font-medium text-white">
                                {selectedUser?.name}
                            </span>
                            ? Tindakan ini tidak dapat dibatalkan.
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

            {/* Role Assignment Dialog */}
            <Dialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
                <DialogContent className="bg-zinc-800 text-white border-zinc-700">
                    <DialogHeader>
                        <DialogTitle>Assign Role</DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            Ubah role untuk user{" "}
                            <span className="font-medium text-white">
                                {selectedUser?.name}
                            </span>
                            .
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Select
                            value={selectedRole}
                            onValueChange={setSelectedRole}
                        >
                            <SelectTrigger className="bg-zinc-700 border-zinc-600 text-white">
                                <SelectValue placeholder="Pilih Role" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                                <SelectItem
                                    value="admin"
                                    className="text-white focus:bg-zinc-700 focus:text-white"
                                >
                                    Admin
                                </SelectItem>
                                <SelectItem
                                    value="user"
                                    className="text-white focus:bg-zinc-700 focus:text-white"
                                >
                                    User
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setRoleDialogOpen(false)}
                            className="border-zinc-700 text-zinc-300 hover:bg-zinc-700"
                        >
                            Batal
                        </Button>
                        <Button variant="default" onClick={handleRoleConfirm}>
                            Simpan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
