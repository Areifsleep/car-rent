"use client";

import { useState } from "react";
import { Link } from "@inertiajs/react";
import { ArrowLeft, Upload, X, Plus } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Card, CardContent } from "@/Components/ui/card";

export default function AddCarPage() {
    const [features, setFeatures] = useState<string[]>([
        "All-Wheel Drive",
        "Leather Seats",
        "Navigation System",
    ]);
    const [newFeature, setNewFeature] = useState("");

    const addFeature = () => {
        if (newFeature.trim() !== "") {
            setFeatures([...features, newFeature.trim()]);
            setNewFeature("");
        }
    };

    const removeFeature = (index: number) => {
        setFeatures(features.filter((_, i) => i !== index));
    };

    return (
        <div>
            <div className="mb-6 flex items-center">
                <Link href="/admin/cars">
                    <Button variant="outline" size="sm" className="mr-4">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold">Tambah Mobil Baru</h1>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Main Form */}
                <div className="lg:col-span-2">
                    <Card className="bg-zinc-800 border-zinc-700 text-white">
                        <CardContent className="p-6">
                            <div className="space-y-6">
                                <div>
                                    <h2 className="mb-4 text-xl font-semibold text-amber-500">
                                        Informasi Dasar
                                    </h2>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="name"
                                                className="text-zinc-300"
                                            >
                                                Nama Mobil
                                            </Label>
                                            <Input
                                                id="name"
                                                placeholder="Contoh: Lamborghini Urus"
                                                className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="price"
                                                className="text-zinc-300"
                                            >
                                                Harga per Hari ($)
                                            </Label>
                                            <Input
                                                id="price"
                                                type="number"
                                                placeholder="500"
                                                className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="year"
                                                className="text-zinc-300"
                                            >
                                                Tahun
                                            </Label>
                                            <Input
                                                id="year"
                                                placeholder="2023"
                                                className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="location"
                                                className="text-zinc-300"
                                            >
                                                Lokasi
                                            </Label>
                                            <Input
                                                id="location"
                                                placeholder="Dubai"
                                                className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="mb-4 text-xl font-semibold text-amber-500">
                                        Spesifikasi
                                    </h2>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="engine"
                                                className="text-zinc-300"
                                            >
                                                Mesin
                                            </Label>
                                            <Input
                                                id="engine"
                                                placeholder="4.0L Twin-Turbo V8"
                                                className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="power"
                                                className="text-zinc-300"
                                            >
                                                Tenaga
                                            </Label>
                                            <Input
                                                id="power"
                                                placeholder="650 HP / 627 lb-ft"
                                                className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="acceleration"
                                                className="text-zinc-300"
                                            >
                                                0-60 mph
                                            </Label>
                                            <Input
                                                id="acceleration"
                                                placeholder="3.6 seconds"
                                                className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="topSpeed"
                                                className="text-zinc-300"
                                            >
                                                Kecepatan Maksimum
                                            </Label>
                                            <Input
                                                id="topSpeed"
                                                placeholder="190 mph"
                                                className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="seats"
                                                className="text-zinc-300"
                                            >
                                                Jumlah Kursi
                                            </Label>
                                            <Select defaultValue="4">
                                                <SelectTrigger
                                                    id="seats"
                                                    className="bg-zinc-700 border-zinc-600 text-white"
                                                >
                                                    <SelectValue placeholder="Pilih jumlah kursi" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-zinc-700 border-zinc-600 text-white">
                                                    <SelectItem value="2">
                                                        2
                                                    </SelectItem>
                                                    <SelectItem value="4">
                                                        4
                                                    </SelectItem>
                                                    <SelectItem value="5">
                                                        5
                                                    </SelectItem>
                                                    <SelectItem value="7">
                                                        7
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="bags"
                                                className="text-zinc-300"
                                            >
                                                Kapasitas Bagasi
                                            </Label>
                                            <Select defaultValue="2">
                                                <SelectTrigger
                                                    id="bags"
                                                    className="bg-zinc-700 border-zinc-600 text-white"
                                                >
                                                    <SelectValue placeholder="Pilih kapasitas bagasi" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-zinc-700 border-zinc-600 text-white">
                                                    <SelectItem value="1">
                                                        1
                                                    </SelectItem>
                                                    <SelectItem value="2">
                                                        2
                                                    </SelectItem>
                                                    <SelectItem value="3">
                                                        3
                                                    </SelectItem>
                                                    <SelectItem value="4">
                                                        4
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="transmission"
                                                className="text-zinc-300"
                                            >
                                                Transmisi
                                            </Label>
                                            <Select defaultValue="Auto">
                                                <SelectTrigger
                                                    id="transmission"
                                                    className="bg-zinc-700 border-zinc-600 text-white"
                                                >
                                                    <SelectValue placeholder="Pilih jenis transmisi" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-zinc-700 border-zinc-600 text-white">
                                                    <SelectItem value="Auto">
                                                        Automatic
                                                    </SelectItem>
                                                    <SelectItem value="Manual">
                                                        Manual
                                                    </SelectItem>
                                                    <SelectItem value="Semi-Auto">
                                                        Semi-Automatic
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="status"
                                                className="text-zinc-300"
                                            >
                                                Status
                                            </Label>
                                            <Select defaultValue="available">
                                                <SelectTrigger
                                                    id="status"
                                                    className="bg-zinc-700 border-zinc-600 text-white"
                                                >
                                                    <SelectValue placeholder="Pilih status" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-zinc-700 border-zinc-600 text-white">
                                                    <SelectItem value="available">
                                                        Tersedia
                                                    </SelectItem>
                                                    <SelectItem value="booked">
                                                        Terpesan
                                                    </SelectItem>
                                                    <SelectItem value="maintenance">
                                                        Maintenance
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="mb-4 text-xl font-semibold text-amber-500">
                                        Deskripsi
                                    </h2>
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="description"
                                            className="text-zinc-300"
                                        >
                                            Deskripsi Mobil
                                        </Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Masukkan deskripsi lengkap tentang mobil ini..."
                                            rows={5}
                                            className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h2 className="mb-4 text-xl font-semibold text-amber-500">
                                        Fitur
                                    </h2>
                                    <div className="mb-4 flex flex-wrap gap-2">
                                        {features.map((feature, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center rounded-full bg-zinc-100 px-3 py-1 text-sm"
                                            >
                                                <span>{feature}</span>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeFeature(index)
                                                    }
                                                    className="ml-2 rounded-full p-1 hover:bg-zinc-200"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Input
                                            placeholder="Tambah fitur baru"
                                            value={newFeature}
                                            onChange={(e) =>
                                                setNewFeature(e.target.value)
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    addFeature();
                                                }
                                            }}
                                            className="bg-zinc-700 border-zinc-600 text-white placeholder:text-zinc-400"
                                        />
                                        <Button
                                            type="button"
                                            onClick={addFeature}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Image Upload */}
                    <Card className="bg-zinc-800 border-zinc-700 text-white">
                        <CardContent className="p-6">
                            <h2 className="mb-4 text-xl font-semibold text-amber-500">
                                Foto Utama
                            </h2>
                            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-600 bg-zinc-800 p-6 text-center">
                                <Upload className="mb-2 h-8 w-8 text-zinc-400" />
                                <p className="mb-2 text-sm font-medium text-zinc-300">
                                    Drag & drop atau klik untuk upload
                                </p>
                                <p className="text-xs text-zinc-400">
                                    PNG, JPG, atau WEBP (maks. 5MB)
                                </p>
                                <Button className="mt-4" variant="default">
                                    Upload Foto
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Gallery Images */}
                    <Card className="bg-zinc-800 border-zinc-700 text-white">
                        <CardContent className="p-6">
                            <h2 className="mb-4 text-xl font-semibold text-amber-500">
                                Galeri Foto
                            </h2>
                            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-600 bg-zinc-800 p-6 text-center">
                                <Upload className="mb-2 h-8 w-8 text-zinc-400" />
                                <p className="mb-2 text-sm font-medium text-zinc-300">
                                    Upload foto tambahan
                                </p>
                                <p className="text-xs text-zinc-400">
                                    Hingga 5 foto (maks. 5MB per foto)
                                </p>
                                <Button variant="default">Upload Foto</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Save Actions */}
                    <Card className="bg-zinc-800 border-zinc-700 text-white">
                        <CardContent className="p-6">
                            <h2 className="mb-4 text-xl font-semibold text-amber-500">
                                Tindakan
                            </h2>
                            <div className="space-y-3">
                                <Button variant="default">Simpan Mobil</Button>
                                <Button variant="outline" className="w-full">
                                    Simpan sebagai Draft
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="w-full"
                                >
                                    Batal
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
