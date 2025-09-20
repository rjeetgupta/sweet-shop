import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SweetList from "@/components/SweetList.jsx";
import AddSweetModal from "@/components/AddSweetModal.jsx";
import UpdateSweetModal from "@/components/UpdateSweetModal.jsx";
import {
    fetchSweets,
    addSweet,
    updateSweet,
    deleteSweet,
    purchaseSweet,
    restockSweet
} from "@/store/sweetStore.js";

export default function AdminDashboard() {
    const dispatch = useDispatch();
    const { sweets, loading, error } = useSelector(state => state.sweets);

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedSweet, setSelectedSweet] = useState(null);

    useEffect(() => {
        dispatch(fetchSweets());
    }, [dispatch]);

    const handleAddSweet = async (sweetData) => {
        await dispatch(addSweet(sweetData));
        setAddModalOpen(false);
    };

    const handleUpdateSweet = async (sweetData) => {
        await dispatch(updateSweet({ id: selectedSweet._id, data: sweetData }));
        setUpdateModalOpen(false);
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this sweet?")) {
            await dispatch(deleteSweet(id));
        }
    };

    const handleRestock = async (id, qty) => {
        await dispatch(restockSweet({ id, quantity: qty }));
    };

    const handlePurchase = async (id, qty) => {
        await dispatch(purchaseSweet({ id, quantity: qty }));
    };

    const openUpdateModal = (sweet) => {
        setSelectedSweet(sweet);
        setUpdateModalOpen(true);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <button
                    onClick={() => setAddModalOpen(true)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Add Sweet
                </button>
            </div>

            {loading && <p>Loading sweets...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <SweetList
                sweets={sweets}
                isAdmin={true}
                onDelete={handleDelete}
                onEdit={openUpdateModal}
                onRestock={handleRestock}
                onPurchase={handlePurchase}
            />

            {/* Modals */}
            <AddSweetModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} onSubmit={handleAddSweet} />
            {selectedSweet && (
                <UpdateSweetModal
                    isOpen={updateModalOpen}
                    onClose={() => setUpdateModalOpen(false)}
                    sweet={selectedSweet}
                    onSubmit={handleUpdateSweet}
                />
            )}
        </div>
    );
}
