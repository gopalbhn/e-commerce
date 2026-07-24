import { Request, Response } from "express"

import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import Coupon from "../models/couponModel.js";
import { use } from "react";
import Seller from "../models/sellerModel.js";


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
            success: true,
            userWeeklyCounts,
            productsWeeklyCount,
            orderWeeklyCounts,
            seller,
            customer
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const pendingSellerApproval = async (req: Request, res: Response) => {
    try {

        const sellers = await Seller.find({
            approved: false,
            isDeleted: false
        }).populate({
            path: "userId",
            select: "name email"
        })
        return res.status(200).json({
            success: true,
            sellers
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const approveSeller = async (req: Request, res: Response) => {
    try {
        const sellerId = req.params.id;

        const seller = await Seller.findOne({ userId: sellerId })
        if (!seller) {
            return res.status(404).json({ success: false, message: "Seller Store Not Found" });
        }
        seller.approved = true;
        await seller.save();
        return res.status(200).json({
            success: true,
            seller
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const rejectSeller = async (req: Request, res: Response) => {
    try {
        const sellerId = req.params.id;
        const seller = await Seller.findOne({ userId: sellerId, isDeleted: false })
        if (!seller) {
            return res.status(404).json({
                success: false,
                message: "Seller Not Found"
            });
        }
        seller.isDeleted = true;
        seller.approved = false;
        await seller.save();
        return res.status(200).json({
            success: true,
            seller
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const mostSoldProduct = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({}).sort({
            sold: -1
        }).limit(10)
        return res.status(200).json({
            success: true,
            message: "Most Sold Products",
            products
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const recentProduct = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({
            isDeleted: false,
        }).populate({
            path: "category",
            select: "name"
        }).sort({
            updatedAt: -1
        }).limit(4)
        return res.status(200).json({
            success: true,
            products
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    console.log("control from delete")
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, {
            isDeleted: true
        })
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        }
        return res.status(200).json({
            success: true,
            product
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


const AllOrder = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({}).populate({
            path: "items.product",
            select: "name image"
        })
        return res.status(200).json({ success: true, message: "All Orders", orders });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const AllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({
            isDeleted: false,
            role: {
                $ne: "Admin"
            }
        }).select("name email role")

        if (users.length == 0) {
            return res.status(404).json({
                success: false,
                message: "Users not found",
            })
        }

        return res.status(200).json({ success: true, users });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {

        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userId not found"
            })
        }

        const user = await User.findById(userId);


        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Not Found"
            })
        }

        user.isDeleted = true;

        user.save();

        return res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export { getDashboardStats, pendingSellerApproval, approveSeller, rejectSeller, mostSoldProduct, recentProduct, deleteProduct, AllOrder, AllUsers, deleteUser }
