import { Router } from "express";
import { addSweet, deleteSweet, getAllSweets, purchaseSweet, restockSweet, searchSweets, updateSweet } from "../controllers/sweet.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";
import isAdmin from "../middleware/checkRole.middleware.js";

const router = Router()

router.route("/").get(verifyJWT, getAllSweets);
router.route("/search").get(verifyJWT, searchSweets);
router.route("/:id/purchase").post(verifyJWT, purchaseSweet);

// Admin related routes
router.route("/").post(verifyJWT, isAdmin, addSweet);
router.route("/:id")
.put(verifyJWT, isAdmin, updateSweet)
.delete(verifyJWT, isAdmin, deleteSweet);
router.route("/:id/restock").post(verifyJWT, isAdmin, restockSweet);

export default router;