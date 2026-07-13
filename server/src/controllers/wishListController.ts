import { Request, Response } from "express"
import WishList from "../models/wishlistModel.js";


const getAllWishListItem = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const wishlist = await WishList.find({ userId })

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
        const { productId, quantity } = req.body;
        const userId = req.user.id;
        const wishlist = await WishList.findById(productId);
        if (wishlist) {
            return res.status(400).json({
                success: false,
                message: "Product already in wishlist"
            })
        }

        const wishlistItem = new WishList({
            userId,
            products: [{ productId }]
        })
        await wishlistItem.save();
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
        const { productId } = req.params;
        const userId = req.user.id;
        const wishlist = await WishList.findById(productId);
        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        if (wishlist.userid !== userId) {
            return res.status(401).json({
                success: false,
                message: "You Are not allowed to delete this item"
            })
        }

        const wishlistItem = await WishList.findByIdAndDelete(productId);
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



export {
    getAllWishListItem,
    addToWishList,
    removeFromWishList
}