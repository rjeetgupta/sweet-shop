import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

export default function UpdateSweetModal({ isOpen, onClose, sweet, onSubmit }) {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        quantity: ""
    });

    useEffect(() => {
        if (sweet) {
            setFormData({
                name: sweet.name,
                category: sweet.category,
                price: sweet.price,
                quantity: sweet.quantity
            });
        }
    }, [sweet]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            price: parseFloat(formData.price),
            quantity: parseInt(formData.quantity, 10)
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Sweet</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <Input placeholder="Name" name="name" value={formData.name} onChange={handleChange} required />
                    <Input placeholder="Category" name="category" value={formData.category} onChange={handleChange} required />
                    <Input placeholder="Price" name="price" type="number" value={formData.price} onChange={handleChange} required />
                    <Input placeholder="Quantity" name="quantity" type="number" value={formData.quantity} onChange={handleChange} required />
                    <DialogFooter>
                        <Button type="submit">Update Sweet</Button>
                        <Button variant="outline" onClick={onClose}>Cancel</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
