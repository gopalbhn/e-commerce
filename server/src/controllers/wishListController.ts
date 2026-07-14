import { Request, Response } from "express"
import WishList from "../models/wishlistModel.js";
import { Types } from "mongoose";


const getAllWishListItem = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id as string;
        const wishlist = await WishList.find({ userid: userId }).populate("products")

        if (wishlist.length == 0) {
            return res.status(400).json({
                success: true,
                message: "WishList is empty",
                data: []
            })
        }


        return res.status(200).json({
            success: true,
            wishlist
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const addToWishList = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id as string;
        const productIdObj = new Types.ObjectId(productId);
        const userId = req.user.id;
        const wishlist = await WishList.findOne({ products: productId });
        console.log("All Log", {
            productId,
            productIdObj,
            userId,
            wishlist
        })
        if (wishlist) {
            return res.status(400).json({
                success: false,
                message: "Product already in wishlist"
            })
        }

        const wishlistItem = await WishList.findOne({
            userid: userId,
        })

        if (wishlistItem) {
            wishlistItem.products.push(productIdObj)
            await wishlistItem?.save();
        } else {
            const newWishList = await WishList.create({
                userid: userId,
                products: [productIdObj]
            })
            await newWishList.save();
        }
        return res.status(200).json({
            success: true,
            message: "Product added to wishlist successfully"
        })

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const removeFromWishList = async (req: Request, res: Response) => {
    try {
        console.log("REquest here ")
        const productId = req.params.id as string;
        const userId = req.user.id;
        const productIdObj = new Types.ObjectId(productId);
        const wishlist = await WishList.findOne({ products: productId });
        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        console.log("this is wishlist", wishlist)
        if (wishlist.userid.toString() !== userId.toString()) {
            return res.status(401).json({
                success: false,
                message: "You Are not allowed to delete this item"
            })
        }

        if (wishlist.products.length == 1) {
            await WishList.deleteOne({ userid: userId });
            return res.status(200).json({
                success: true,
                message: "Product removed from wishlist successfully"
            })
        }
        await WishList.updateOne(
            { userid: userId },
            {
                $pull: {
                    products: productId
                }
            }
        );

        console.log("here", wishlist)
        return res.status(200).json({
            success: true,
            message: "Product removed from wishlist successfully"
        })

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const checkWishListed = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id as string;
        console.log("top", productId)
        const productIdobj = new Types.ObjectId(productId);
        console.log("second top", productIdobj)
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product Id Not found"
            })
        }
        console.log(productId)
        console.log(productIdobj)
        const wishlistItem = await WishList.findOne({ products: productId })
        console.log(wishlistItem)
        console.log("wishlistItem", wishlistItem)
        if (!wishlistItem) {
            return res.status(404).json({
                success: false,
                message: "Product Not found"
            })
        }
        res.status(200).json({
            success: true,

        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const clearAllWishList = async (req: Request, res: Response) => {
    try {

        const userId = req.user.id as string;
        const wishlist = await WishList.findOne({ userid: userId })
        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "Wishlist Not Found"
            })
        }
        await WishList.deleteMany({ userid: userId })
        return res.status(200).json({
            success: true,
            message: "Wishlist Cleared Successfully"
        })

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const addAllToCart = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id as string;

        const wishlist = await WishList.find({ userid: userId })
        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "You don't have any item in wishlist"
            })
        }
        const products = wishlist.map((item) => item.products)
        console.log(wishlist)
        console.log(products)
        res.status(200).json({
            success: true,
            message: "All items added to cart successfully",
            products,
            wishlist
        })

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export {
    getAllWishListItem,
    addToWishList,
    removeFromWishList,
    checkWishListed,
    clearAllWishList,
    addAllToCart
}