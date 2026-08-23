import { Request, Response } from 'express'
import Checkout from '../models/checkoutModel.js';

const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        const { items } = req.body;
        if (!items) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            })
        }

        const lineItems = items.map(async (item: any) => {
            const check = await Checkout.create({
                user: req.user.id,
                items: {
                    product: item.productId,
                    quantity: item.quantity,
                }

            })
            if (!check) {
                return res.status(400).json({
                    success: false,
                    message: "Failed to create checkout session"
                })
            }
            check.save();
            return check;

        })



    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getCheckoutSession = async (req: Request, res: Response) => {
    try {
        const checkoutSession = await Checkout.find({
            user: req.user.id
        }).populate("items.product", "name price thumbnails");

        return res.status(200).json({
            success: true,
            data: checkoutSession
        })

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export {
    createCheckoutSession,
    getCheckoutSession
}