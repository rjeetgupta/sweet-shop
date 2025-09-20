import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SweetList from "../components/SweetList.jsx";
import SearchBar from "../components/SearchBar.jsx";
import {
    fetchSweets,
    searchSweets,
    purchaseSweet,
    deleteSweet
} from "@/store/sweetStore.js";

export default function Dashboard() {
    const dispatch = useDispatch();
    const sweetsState = useSelector((state) => state.sweets);
    const { sweets, loading, error } = sweetsState || { sweets: [], loading: false, error: null };
    const isAdmin = localStorage.getItem("role") === "admin";

    // Fetch all sweets on mount
    useEffect(() => {
        dispatch(fetchSweets());
    }, [dispatch]);

    // Search sweets
    const handleSearch = (filters) => {
        if (Object.keys(filters).length > 0) {
            dispatch(searchSweets(filters));
        } else {
            dispatch(fetchSweets());
        }
    };

    // Purchase sweet
    const handlePurchase = (id) => {
        dispatch(purchaseSweet({ id, quantity: 1 }));
    };

    // Delete sweet (Admin only)
    const handleDelete = (id) => {
        dispatch(deleteSweet(id));
    };

    // Edit sweet (Admin only)
    const handleEdit = (sweet) => {
        console.log("Edit sweet clicked:", sweet);
        // TODO: Open modal or navigate to edit form
    };

    return (
        <div className="p-6">
            <SearchBar onSearch={handleSearch} />

            {loading && <p className="text-center text-gray-500">Loading sweets...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            <SweetList
                sweets={sweets.map(item => item)} // sweets is already the array from Redux
                onPurchase={handlePurchase}
                isAdmin={isAdmin}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />
        </div>
    );
}
