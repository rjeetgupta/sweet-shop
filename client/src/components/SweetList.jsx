import SweetCard from "./SweetCard";

export default function SweetList({ sweets, isAdmin, onDelete, onEdit, onRestock, onPurchase }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sweets.map(sweet => (
                <div key={sweet._id} className="border p-4 rounded shadow">
                    <h2 className="text-lg font-semibold">{sweet.name}</h2>
                    <p>Category: {sweet.category}</p>
                    <p>Price: ₹{sweet.price}</p>
                    <p>Quantity: {sweet.quantity}</p>

                    {isAdmin && (
                        <div className="flex flex-col gap-2 mt-2">
                            <button
                                className="bg-blue-500 text-white px-2 py-1 rounded"
                                onClick={() => onEdit(sweet)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 text-white px-2 py-1 rounded"
                                onClick={() => onDelete(sweet._id)}
                            >
                                Delete
                            </button>
                            <button
                                className="bg-yellow-400 text-black px-2 py-1 rounded"
                                onClick={() => {
                                    const qty = parseInt(prompt("Enter restock quantity"), 10);
                                    if (!isNaN(qty)) onRestock(sweet._id, qty);
                                }}
                            >
                                Restock
                            </button>
                            <button
                                className="bg-green-500 text-white px-2 py-1 rounded"
                                onClick={() => {
                                    const qty = parseInt(prompt("Enter purchase quantity"), 10);
                                    if (!isNaN(qty)) onPurchase(sweet._id, qty);
                                }}
                            >
                                Purchase
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
