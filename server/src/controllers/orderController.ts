import { Request, Response } from "express";
import Order from "../models/orderModel.js";
import { Cart } from "../models/cartModel.js";
import Address from "../models/addressModel.js";
import Product from "../models/productModel.js";
import BuyNow from "../models/buyNowModel.js";
import Checkout from "../models/checkoutModel.js";



const getSellerOrder = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({
            seller: req.user.id,

        })
        console.log("products", products)

        if (products.length == 0) {
            return res.status(200).json({
                success: false,
                message: "Pending Product Not found",

            });
        }
        const productId = products.map(prod => prod._id)
        console.log("ProductId", productId)
        const pendingOrder = await Order.find({
            "items.product": {
                "$in": productId
            }
        }).populate({
            path: "buyer",
            select: "name email"
        }).populate({
            path: "shippingAddress",
            select: "state district city street"
        })
        console.log("Pending Order", pendingOrder)
        res.status(200).json({
            success: true,
            data: pendingOrder
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const getMyOrder = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({
            buyer: req.user.id
        }).populate({
            path: "items",
            select: " price ",
            populate: {
                path: "product",
                select: "name thumbnails price",
            }
        }).populate({
            path: "shippingAddress",
            select: "state district city street"
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
        console.log("Request here")
        const orderId = req.params.id;
        const orders = await Order.findById(orderId).populate({
            path: "items",
            select: " price ",
            populate: {
                path: "product",
                select: "name thumbnails price",
            }
        }).populate({
            path: "shippingAddress",
            select: "state district city street"
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
        const buyNowData = await BuyNow.findOne({ userId: buyer });
        if (buyNowData) {
            const { productId, quantity } = buyNowData;
            const product = await Product.findById(productId);

            const shippingAddress = await Address.findOne({ user: buyer });
            if (!shippingAddress) {
                return res.status(400).json({
                    success: false,
                    message: "Shipping address not found",
                });
            }

            const order = await Order.create({
                buyer,
                items: [{
                    product: product?._id,
                    quantity,
                    price: product?.price,

                }],
                totalPrice: quantity * product?.price!,
                paymentMethod: req.body.paymentMethod,
                shippingAddress: shippingAddress._id,
                orderStatus: "Pending",
                paymentStatus: "Pending",
            });
            await BuyNow.deleteOne({ userId: buyer });
            return res.status(201).json({
                success: true,
                data: order,
            });
        }

        const checkout = await Checkout.findOne({ user: buyer }).populate("coupon");

        if (!checkout || checkout.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Checkout session is empty",
            });
        }

        const shippingAddress = await Address.findOne({ user: buyer });

        if (!shippingAddress) {
            return res.status(400).json({
                success: false,
                message: "Shipping address not found",
            });
        }

        const productIds = checkout.items.map((p) => p.product);

        const allProducts = await Product.find({
            _id: { $in: productIds },
        }).select("name price");

        if (!allProducts.length) {
            return res.status(400).json({
                success: false,
                message: "Products not found",
            });
        }

        const items = checkout.items.map((item) => {
            const product = allProducts.find(
                (p) => p._id.toString() === item.product.toString()
            );

            if (!product) {
                throw new Error("Product not found");
            }

            return {
                product: item.product,
                quantity: item.quantity,
                price: product.price * item.quantity,
            };
        });
        const subTotal = items.reduce((acc, item) => acc + item.price, 0);

        const tax = subTotal * 0.13;
        const shipping = 10;

        const totalBeforeDiscount = subTotal + tax + shipping;

        let totalDiscountRate = 0;
        let discount = 0;

        if (checkout.coupon.length > 0) {
            totalDiscountRate = checkout.coupon.reduce(
                (acc: number, c: any) => acc + c.discountRate,
                0
            );

            discount = (totalBeforeDiscount * totalDiscountRate) / 100;
        }

        const totalPrice = totalBeforeDiscount - discount;

        const order = await Order.create({
            buyer,
            items,
            totalPrice,

            discountAmount: discount,
            paymentMethod: req.body.paymentMethod,
            shippingAddress: shippingAddress._id,
            orderStatus: "Pending",
        });

        await Checkout.deleteOne({ user: buyer });

        return res.status(201).json({
            success: true,
            data: order,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getPendingOrders = async (req: Request, res: Response) => {

    try {
        const products = await Product.find({
            seller: req.user.id,

        })
        console.log("products", products)

        if (products.length == 0) {
            return res.status(200).json({
                success: false,
                message: "Pending Product Not found",

            });
        }
        const productId = products.map(prod => prod._id)
        console.log("ProductId", productId)
        const pendingOrder = await Order.find({
            "items.product": {
                "$in": productId
            },
            orderStatus: "Pending"
        }).populate({
            path: "buyer",
            select: "name email"
        }).populate({
            path: "shippingAddress",
            select: "state district city street"
        })
        console.log("Pending Order", pendingOrder)
        res.status(200).json({
            success: true,
            data: pendingOrder
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateOrderStatus = async (req: Request, res: Response) => {
    const orderId = req.params.id;
    const { status } = req.body;
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }
        order.orderStatus = status;
        await order.save();
        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            orderId: order._id
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getPurchasedProduct = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const purchasedItem = await Order.find({
            buyer: userId,
            orderStatus: "Delivered"
        }).populate({
            path: "items",
            populate: {
                path: "product",
                select: "name thumbnails"
            }
        })
        res.status(200).json({
            success: true,
            data: purchasedItem
        })

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export {
    getMyOrder,
    getOrder,
    createOrder,
    getPendingOrders,
    updateOrderStatus,
    getSellerOrder,
    getPurchasedProduct
}