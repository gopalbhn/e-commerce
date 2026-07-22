import { Request, Response } from "express"

import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import Coupon from "../models/couponModel.js";
import { use } from "react";


const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const now = new Date();
        const month = 30 * 24 * 60 * 60 * 1000;
        const startOfMonth = new Date(now.getTime() - month);
        const endOfMonth = now;

        const users = await User.find({
            createdAt: {
                $gte: startOfMonth,
                $lte: endOfMonth
            }
        })

        const userWeeklyCounts = {
            'Week 1': 0,
            'Week 2': 0,
            'Week 3': 0,
            'Week 4': 0
        };

        users.forEach(user => {
            const day = user.createdAt?.getUTCDate();
            if (!day) {
                return;
            }

            if (day <= 7) {
                userWeeklyCounts['Week 1']++;
            } else if (day <= 14) {
                userWeeklyCounts['Week 2']++;
            } else if (day <= 21) {
                userWeeklyCounts['Week 3']++;
            } else {
                userWeeklyCounts['Week 4']++;
            }
        });

        const products = await Product.find({
            createdAt: {
                $gte: startOfMonth,
                $lte: endOfMonth
            }
        })
        const productsWeeklyCount = {
            'Week 1': 0,
            'Week 2': 0,
            'Week 3': 0,
            'Week 4': 0
        };

        products.forEach(product => {
            const day = product.createdAt?.getUTCDate();
            if (!day) {
                return;
            }

            if (day <= 7) {
                productsWeeklyCount['Week 1']++;
            } else if (day <= 14) {
                productsWeeklyCount['Week 2']++;
            } else if (day <= 21) {
                productsWeeklyCount['Week 3']++;
            } else {
                productsWeeklyCount['Week 4']++;
            }
        });
        const order = await Order.find({
            createdAt: {
                $gte: startOfMonth,
                $lte: endOfMonth
            }
        })

        const orderWeeklyCounts = {
            'Week 1': 0,
            'Week 2': 0,
            'Week 3': 0,
            'Week 4': 0
        };

        order.forEach(order => {
            const day = order.createdAt?.getUTCDate();
            if (!day) {
                return;
            }

            if (day <= 7) {
                orderWeeklyCounts['Week 1']++;
            } else if (day <= 14) {
                orderWeeklyCounts['Week 2']++;
            } else if (day <= 21) {
                orderWeeklyCounts['Week 3']++;
            } else {
                orderWeeklyCounts['Week 4']++;
            }
        });

        const userDistribution = await User.find().select("-password");
        const seller = await userDistribution.filter(user => user.role === "Seller").length
        const customer = await userDistribution.filter(user => user.role === "Consumer").length

        return res.status(200).json({
            success: true, userWeeklyCounts, productsWeeklyCount, orderWeeklyCounts, seller, customer
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error });
    }
}

const pendingSellerApproval = async (req: Request, res: Response) => {
    try {
        const sellers = await User.find({
            role: "Seller",
            isVerified: false
        })
        return res.status(200).json({ success: true, message: "Pending Seller Approvals", sellers });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error });
    }
}

const approveSeller = async (req: Request, res: Response) => {
    try {
        const { sellerId } = req.params;
        const seller = await User.findByIdAndUpdate(sellerId, {
            isVerified: true
        }, {
            new: true
        }).select("-password")
        if (!seller) {
            return res.status(404).json({ success: false, message: "Seller Not Found" });
        }
        return res.status(200).json({ success: true, message: "Seller Approved", seller });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error });
    }
}

const rejectSeller = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const seller = await User.findByIdAndDelete(id);
        if (!seller) {
            return res.status(404).json({ success: false, message: "Seller Not Found" });
        }
        return res.status(200).json({ success: true, message: "Seller Rejected", seller });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error });
    }
}

const mostSoldProduct = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({}).sort({
            sold: -1
        }).limit(10)
        return res.status(200).json({ success: true, message: "Most Sold Products", products });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error });
    }
}

const recentProduct = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({
            createdAt: {
                $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            }
        }).sort({
            createdAt: -1
        }).limit(10)
        return res.status(200).json({ success: true, message: "Recent Products", products });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error });
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Product Deleted", product });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error });
    }
}


export { getDashboardStats, pendingSellerApproval, approveSeller, rejectSeller, mostSoldProduct }
