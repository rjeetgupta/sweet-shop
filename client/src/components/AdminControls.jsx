import { useEffect, useState } from "react";
import SweetList from "./SweetList.jsx";
import SearchBar from "./SearchBar.jsx";
import api from "../services/api.js";

export default function Dashboard() {
    const [sweets, setSweets] = useState([]);
    const [isAdmin] = useState(localStorage.getItem("role") === "admin");

    const fetchSweets = async (filters = {}) => {
        const params = new URLSearchParams(filters).toString();
        const res = await api.get(`/sweets${params ? `/search?${params}` : ""}`);
        setSweets(res.data.data);
    };

    useEffect(() => { fetchSweets(); }, []);

    const handlePurchase = async id => {
        await api.post(`/sweets/${id}/purchase`, { quantity: 1 });
        fetchSweets();
    };

    const handleDelete = async id => {
        await api.delete(`/sweets/${id}`);
        fetchSweets();
    };

    const handleEdit = sweet => {
        // Open modal or navigate to edit form
        console.log("Hi")
    };

    return (
        <div className="p-6">
            <SearchBar onSearch={fetchSweets} />
            <SweetList
                sweets={sweets}
                onPurchase={handlePurchase}
                isAdmin={isAdmin}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />
        </div>
    );
}
