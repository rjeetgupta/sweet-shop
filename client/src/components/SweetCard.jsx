import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SweetCard({ sweet, onPurchase, isAdmin, onEdit, onDelete }) {
    return (
        <Card className="w-64">
            <CardHeader>
                <CardTitle>{sweet.name}</CardTitle>
                <CardDescription>{sweet.category}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Price: ${sweet.price}</p>
                <p>Stock: {sweet.quantity}</p>
                <div className="mt-2 flex space-x-2">
                    <Button
                        disabled={sweet.quantity === 0}
                        onClick={() => onPurchase(sweet._id)}
                    >
                        Purchase
                    </Button>
                    {isAdmin && (
                        <>
                            <Button variant="secondary" onClick={() => onEdit(sweet)}>Edit</Button>
                            <Button variant="destructive" onClick={() => onDelete(sweet._id)}>Delete</Button>
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
