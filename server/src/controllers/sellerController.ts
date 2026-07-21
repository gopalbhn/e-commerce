import { Request, Response } from "express"
import Order from "../models/orderModel.js"
import Product from "../models/productModel.js"



const getSellerDashboardStats = async (req: Request, res: Response) => {
    try {
        console.log("userid", req.user.id);
        const products = await Product.find({
            seller: req.user.id
        })
        console.log("products", products)
        const totalProduct = products.length;
        const productId = products.map((prod) => prod._id);
        console.log("productId", productId)
        const AllOrders = await Order.find({
            "items.product": {
                "$in": productId
            }
        })

        const orderMetrics = await Order.aggregate([
            {
                $match: {
                    "items.product": {
                        $in: productId
                    },

                }
            },
            {
                $project: {
                    week: {
                        $dateToString: {
                            format: "%V",
                            date: "$createdAt"
                        }
                    }
                }
            }

        ])
        console.log("orderMetrics", orderMetrics)

        const totalOrder = AllOrders.length;
        const totalRevenue = AllOrders.reduce((total, order) => total + order.totalPrice, 0);
        console.log("totalRevenue", totalRevenue)
        res.json({
            totalOrder: {
                week1: totalOrder,
                week2: totalOrder,
                week3: totalOrder,
                week4: totalOrder,
            },
            totalProduct: {
                week1: totalProduct,
                week2: totalProduct,
                week3: totalProduct,
                week4: totalProduct,
            },
            totalRevenue: {
                week1: totalRevenue,
                week2: totalRevenue,
                week3: totalRevenue,
                week4: totalRevenue,
            }
        })

    } catch (error) {
        console.log(error)
    }
}

const getProductStats = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({
            seller: req.user.id
        })

        const totalProduct = products.length;
        const availableProduct = products.filter((prod) => prod.stock > 0).length
        const lowStockedProduct = products.filter((prod) => prod.stock < 10).length

        const productStats = {
            totalProduct,
            availableProduct,
            lowStockedProduct
        }
        res.status(200).json({
            success: true,
            productStats
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export { getSellerDashboardStats, getProductStats }