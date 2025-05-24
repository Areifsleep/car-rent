import { Search } from "lucide-react";
import { Input } from "@/Components/ui/input";

interface SearchBoxProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function SearchBox({
    value,
    onChange,
    placeholder = "Search...",
}: SearchBoxProps) {
    return (
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <Input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="pl-10 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400"
            />
        </div>
    );
}
