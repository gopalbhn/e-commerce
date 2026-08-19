import { Request, Response } from "express";
import BuyNow from "../models/buyNowModel.js";
import Product from "../models/productModel.js";

export const createBuyNow = async (req: Request, res: Response) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user?.id;

        if (!userId || !productId || !quantity) {
            return res.status(400).json({
                success: false,
                message: "Product and quantity are required",
            });
        }

        if (quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be at least 1",
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock",
            });
        }

        // Remove previous active BuyNow session
        await BuyNow.deleteMany({
            userId,
            status: "active",
        });

        const buyNow = await BuyNow.create({
            userId,
            productId,
            quantity,
            expiresAt: new Date(Date.now() + 30 * 60 * 1000),
        });

        return res.status(201).json({
            success: true,
            message: "Buy now session created",
            data: buyNow,
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const getBuyNow = async (req: Request, res: Response) => {
    console.log("control here")
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const buyNow = await BuyNow.findOne({
            userId,
            status: "active",
        }).populate("productId");

        if (!buyNow) {
            return res.status(404).json({
                success: false,
                message: "Buy now session not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: buyNow,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};