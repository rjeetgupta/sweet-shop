import mongoose, { Schema, model } from "mongoose";

const purchaseSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        sweet: {
            type: Schema.Types.ObjectId,
            ref: "Sweet",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const Purchase = model("Purchase", purchaseSchema);

export default Purchase;