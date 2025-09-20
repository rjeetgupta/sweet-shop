import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBar({ onSearch }) {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        onSearch({ name, category, minPrice, maxPrice });
    };

    return (
        <form className="flex flex-wrap gap-2 items-end mb-4" onSubmit={handleSubmit}>
            <Input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <Input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
            <Input placeholder="Min Price" type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
            <Input placeholder="Max Price" type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
            <Button type="submit">Search</Button>
        </form>
    );
}
