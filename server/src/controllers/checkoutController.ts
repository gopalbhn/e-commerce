import { Request, Response } from 'express'
import Checkout from '../models/checkoutModel.js';
import { check } from 'zod';

const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        //get the product item from the user
        const products = req.body.items;
        console.log(products)
        //check if the product item is empty

        if (!products) {
            return res.status(400).json({
                success: false,
                message: "Product  is empty"
            })
        }
        //find the user checkout session if exist
        const existingCheckout = await Checkout.findOne({
            user: req.user.id
        })

        //if the checkout session is exist
        if (existingCheckout) {
            //find the user requested product is in existing checkout session or not 
            const productIds = products.map((item: any) => item.id.toString());
            const existingProductIds = existingCheckout.items.map((item: any) => item.product.toString());
            const commonProducts = productIds.filter((id: any) => existingProductIds.includes(id))
            if (commonProducts.length > 0) {
                return res.status(200).json({
                    success: true,
                    data: existingCheckout
                })
            }
            // if user requested product is not in existing checkout session then add the product in checkout session along with previous checkout items
            //bug : Not able to add  product if user selects multiple product, one or more of them are already in session  
            const checkout = await Checkout.findOneAndUpdate({
                user: req.user.id
            }, {
                $push: {
                    items: products.map((item: any) => ({
                        product: item.id,
                        quantity: item.quantity
                    }))
                }
            }, {
                new: true
            })


            if (!checkout) {
                return res.status(400).json({
                    success: false,
                    message: "Failed to create checkout session"
                })
            }
            await checkout.save();
            return res.status(200).json({
                success: true,
                data: checkout
            })
        }
        const checkout = await Checkout.create({
            user: req.user.id,
            items: products.map((item: any) => ({
                product: item.id,
                quantity: item.quantity,
            })),
        })

        if (!checkout) {
            return res.status(400).json({
                success: false,
                message: "Failed to create checkout session"
            })
        }
        await checkout.save();
        return res.status(200).json({
            success: true,
            data: checkout
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
        const checkoutSession = await Checkout.findOne({
            user: req.user.id
        }).populate("items.product", "name price thumbnails");


        if (checkoutSession?.coupon?.length !== 0) {
            await checkoutSession?.populate({
                path: "coupon",
                select: "code discountRate"
            })
        }

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