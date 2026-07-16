import { Request, Response } from "express";
import Order from "../models/orderModel.js";
import { Cart } from "../models/cartModel.js";
import Address from "../models/addressModel.js";



const getMyOrder = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({
            user: req.user?.id
        })
        res.status(200).json({
            success: true,
            data: orders
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const getOrder = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({
            user: req.user?.id
        })
        res.status(200).json({
            success: true,
            data: orders
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const createOrder = async (req: Request, res: Response) => {
    try {
        const buyer = req.user?.id;

        // Get cart items
        const cart = await Cart.findOne({ userId: buyer });

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }

        // Get shipping address (assuming it's populated or passed)
        // For simplicity, you might want to populate it or expect it in the request
        const shippingAddress = await Address.findOne({ user: buyer });

        if (!shippingAddress) {
            return res.status(400).json({
                success: false,
                message: "Shipping address not found"
            });
        }

        const order = await Order.create({
            buyer: buyer,
            items: cart.products.map(p => p.productId),
            totalPrice: req.body.totalPrice,
            paymentMethod: req.body.paymentMethod,
            shippingAddress: shippingAddress._id,
            orderStatus: "Pending"
        });

        // Clear cart
        await Cart.deleteOne({ userId: buyer });

        res.status(201).json({
            success: true,
            data: order
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


export {
    getMyOrder,
    getOrder,
    createOrder
}