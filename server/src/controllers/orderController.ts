import { Request, Response } from "express";
import Order from "../models/orderModel.js";
import { Cart } from "../models/cartModel.js";
import Address from "../models/addressModel.js";
import Product from "../models/productModel.js";



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

        const cart = await Cart.findOne({ userId: buyer }).populate("coupon");

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty",
            });
        }

        const shippingAddress = await Address.findOne({ user: buyer });

        if (!shippingAddress) {
            return res.status(400).json({
                success: false,
                message: "Shipping address not found",
            });
        }

        const productIds = cart.products.map((p) => p.productId);

        const allProducts = await Product.find({
            _id: { $in: productIds },
        }).select("name price");

        if (!allProducts.length) {
            return res.status(400).json({
                success: false,
                message: "Products not found",
            });
        }

        const items = cart.products.map((cartItem) => {
            const product = allProducts.find(
                (p) => p._id.toString() === cartItem.productId.toString()
            );

            if (!product) {
                throw new Error("Product not found");
            }

            return {
                product: cartItem.productId,
                quantity: cartItem.quantity,
                price: product.price * cartItem.quantity,
            };
        });
        const subTotal = items.reduce((acc, item) => acc + item.price, 0);

        const tax = subTotal * 0.13;
        const shipping = 10;

        const totalBeforeDiscount = subTotal + tax + shipping;

        let totalDiscountRate = 0;
        let discount = 0;

        if (cart.couponApplied && Array.isArray(cart.coupon)) {
            totalDiscountRate = cart.coupon.reduce(
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
            couponApplied: cart.couponApplied,
            discountAmount: discount,
            paymentMethod: req.body.paymentMethod,
            shippingAddress: shippingAddress._id,
            orderStatus: "Pending",
        });

        await Cart.deleteOne({ userId: buyer });

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