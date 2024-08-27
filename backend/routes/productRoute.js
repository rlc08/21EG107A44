import express from "express";

import { getProductsByCategory } from "../controllers/productController.js";

const router = express.Router();

// Route to get products by category
router.get("/categories/:categoryname/products", getProductsByCategory);

export default router;
