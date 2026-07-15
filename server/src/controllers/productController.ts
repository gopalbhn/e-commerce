import { Request, Response } from "express";
import { ProductCreateSchema, ProductUpdateSchema } from "../schemas/productSchema.js";
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import Brand from "../models/brand.js";
import mongoose from "mongoose";

const addProduct = async (req: Request, res: Response) => {
    try {
        const data = ProductCreateSchema.safeParse(req.body)
        if (!data.success) {
            return res.status(400).json({
                success: false,
                message: data.error.flatten().fieldErrors,
            })
        }
        const { name, description, price, stock, thumbnails, images, category, seller } = data.data

        const files = req.files as { thumbnails?: Express.Multer.File, images?: Express.Multer.File[] }
        const thumbnailFile = files?.thumbnails

        const imagesFiles = files.images as Express.Multer.File[]



        const product = new Product({
            name,
            description,
            price,
            stock,
            thumbnails,
            images,
            category,
            seller: req.user.id
        })


        await product.save()
        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateProduct = async (req: Request, res: Response) => {
    try {
        const data = ProductUpdateSchema.safeParse(req.body)
        if (!data.success) {
            return res.status(400).json({
                success: false,
                message: data.error.flatten().fieldErrors,
            })
        }
        const { name, description, price, stock, thumbnails, images, category } = data.data
        const product = await Product.findByIdAndUpdate(req.params.id, {
            name,
            description,
            price,
            stock,
            thumbnails,
            images,
            category,
            seller: req.user.id
        }, { new: true })
        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const userid = req.user.id;
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            })
        }
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        if (product.seller.toString() !== userid) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this product"
            })
        }

        product.isDeleted = true;
        await product.save();
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: product
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const product = await Product.find({ isDeleted: false })
        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: product
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getProductById = async (req: Request, res: Response) => {
    try {

        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            })
        }
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: product
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })

    }
}

const getFilteredProduct = async (req: Request, res: Response) => {
    try {
        const { category, subcategory, brand, minPrice, maxPrice, rating, sort } = req.query;
        console.log("req.query", req.query)
        const filteredData: any = {}

        if (subcategory) {
            filteredData.category = subcategory;
        } else if (category) {
            filteredData.category = category;
        }


        if (brand) {
            filteredData.brand = brand;
        }

        if (minPrice || maxPrice) {
            filteredData.price = {};

            if (minPrice && !isNaN(Number(minPrice))) {
                filteredData.price.$gte = Number(minPrice);
            }

            if (maxPrice && !isNaN(Number(maxPrice))) {
                filteredData.price.$lte = Number(maxPrice);
            }
        }



        if (rating) {
            filteredData.rating = Number(rating);
        }


        console.log("filterd data", filteredData)
        const products = await Product.find(filteredData).populate([
            {
                path: "category",
                select: "name"
            },
            {
                path: "brand",
                select: "name"
            }
        ]);


        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: products
        })

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export {
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    getFilteredProduct
}