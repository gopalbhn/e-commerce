import { Request, Response } from "express";
import { Cart } from "../models/cartModel.js";
import Product from "../models/productModel.js";

const getAllCartItem = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId }).populate({
            path: "products.productId"
        });

        if (cart?.products?.length == 0) {
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
                existingProduct.quantity += quantity;
                await cart.save();
                return res.status(200).json({
                    success: true,
                    message: "Product added to cart successfully"
                })
            } else {
                cart.products.push({ productId, quantity });
                await cart.save();
                return res.status(200).json({
                    success: true,
                    message: "Product added to cart successfully"
                })
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
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Cart item id is required"
            })
        }
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            })
        }
        console.log("Cart", cart)
        console.log('cartItemid', productId)
        const existingProduct = cart.products.find((item) => item.productId.toString() === productId)
        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart"
            })
        }
        console.log("existingproduct", existingProduct)
        const result = await cart.updateOne(
            { userId: req.user.id },
            {
                $pull: { products: { productId: productId } }
            }
        )
        console.log("result", result)
        // const filtered = cart.products.filter((item) => item.productId.toString() !== cartItemId);
        // cart.products = filtered;
        // cart.products = cart.products.filter((item) => item.productId.toString() !== cartItemId);
        // await cart.save();
        return res.status(200).json({
            success: true,
            message: "Product removed from cart successfully"
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateCart = async (req: Request, res: Response) => {
    try {
        const { cartItemId } = req.params;
        const { quantity } = req.body;
        if (!cartItemId) {
            return res.status(400).json({
                success: false,
                message: "Cart item id is required"
            })
        }
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            })
        }
        const existingProduct = cart.products.find((item) => item.productId.toString() === cartItemId)
        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart"
            })
        }
        existingProduct.quantity = quantity;
        await cart.save();
        return res.status(200).json({
            success: true,
            message: "Cart updated successfully"
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export { getAllCartItem, addToCart, removeFromCart, updateCart }