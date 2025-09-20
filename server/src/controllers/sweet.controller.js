import Sweet from "../models/Sweet.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// Only for admin
const addSweet = asyncHandler(async (req, res) => {
    const { name, category, price, quantity } = req.body;
    if (!name || !category || !price) {
        throw new ApiError(400, "Name, category, and price are required");
    }

    const sweet = await Sweet.create({
        name,
        category,
        price,
        quantity: quantity || 0,
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            sweet,
            "Sweet added successfully"
        )
    );
});

const getAllSweets = asyncHandler(async (req, res) => {
    const sweets = await Sweet.find();

    return res.status(200).json(
        new ApiResponse(
            200,
            {sweets},
            "Fetched all sweets successfully"
        )
    );
});

const searchSweets = asyncHandler(async (req, res) => {
    const { name, category, minPrice, maxPrice } = req.query;

    const query = {};
    if (name) query.name = { $regex: new RegExp(name, "i") };
    if (category) {
        query.category = category;
    }
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(query);

    return res.status(200).json(
        new ApiResponse(
            200,
            sweets,
            "Sweets search results"
        )
    );
});


// Only for admin
const updateSweet = asyncHandler(async (req, res) => {

    const sweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    if (!sweet) {
        throw new ApiError(404, "Sweet not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            sweet,
            "Sweet updated successfully"
        )
    );
});

// only for admin
const deleteSweet = asyncHandler(async (req, res) => {
    const sweet = await Sweet.findByIdAndDelete(req.params.id);

    if (!sweet) {
        throw new ApiError(404, "Sweet not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Sweet deleted successfully")
    );
});

// Any logged-in user
const purchaseSweet = asyncHandler(async (req, res) => {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) {
        throw new ApiError(404, "Sweet not found");
    }

    const { quantity } = req.body;
    if (!quantity || quantity <= 0) {
        throw new ApiError(400, "Quantity must be greater than 0");
    }

    if (sweet.quantity < quantity) {
        throw new ApiError(400, "Not enough stock available");
    }

    sweet.quantity -= quantity;
    await sweet.save();

    const purchase = await Purchase.create({
        user: req.user.id,
        sweet: sweet._id,
        quantity,
        totalPrice: sweet.price * quantity,
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            purchase,
            "Purchase successful"
        )
    );
});

// Only for admin
const restockSweet = asyncHandler(async (req, res) => {

    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) {
        throw new ApiError(404, "Sweet not found");
    }

    const { quantity } = req.body;
    if (!quantity || quantity <= 0) {
        throw new ApiError(400, "Quantity must be greater than 0");
    }

    sweet.quantity += quantity;
    await sweet.save();

    return res.status(200).json(
        new ApiResponse(200, sweet, "Sweet restocked successfully")
    );
});



export {
    addSweet,
    getAllSweets,
    searchSweets,
    updateSweet,
    deleteSweet,
    purchaseSweet,
    restockSweet,
};