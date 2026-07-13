import { Request, Response } from "express";
import { Cart } from "../models/cartModel.js";
import Product from "../models/productModel.js";

const getAllCartItem = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.find({ userId })

        if (cart.length == 0) {
            return res.status(400).json({
                success: true,
                message: "Cart is empty",
                data: []
            })
        }


        return res.status(200).json({
            success: true,
            message: "Cart fetched successfully",
            data: cart
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const addToCart = async (req: Request, res: Response) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: "Out of stock"
            })
        }

        const cart = await Cart.findOne({ userId })
        if (cart) {
            const existingProduct = cart.products.find((item) => item.productId.toString() === productId)
            if (existingProduct) {
                existingProduct.quantity += quantity
            } else {
                cart.products.push({ productId, quantity })
            }
        } else {
            const newCart = new Cart({
                userId,
                products: [{ productId, quantity }]
            })
            await newCart.save()
        }

        return res.status(200).json({
            success: true,
            message: "Product added to cart successfully"
        })

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const removeFromCart = async (req: Request, res: Response) => {
    try {

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateCart = async (req: Request, res: Response) => {
    try {

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export { getAllCartItem, addToCart, removeFromCart, updateCart }