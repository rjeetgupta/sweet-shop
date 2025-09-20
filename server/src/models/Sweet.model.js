import { Schema, model } from "mongoose";


const sweetSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        quantity: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    { timestamps: true }
);

const Sweet = model("Sweet", sweetSchema);

export default Sweet;