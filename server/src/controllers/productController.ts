import { Request, Response } from "express";
import { ProductCreateSchema, ProductUpdateSchema } from "../schemas/productSchema.js";
import Product from "../models/productModel.js";

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
        const thumbnailFile = req.files?.thumbnail
        const imagesFiles = req.files?.images


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
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error?.message
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
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error?.message
        })
    }
}

const deleteProduct = (req: Request, res: Response) => {
    try {

    } catch (error) {

    }
}

const getAllProducts = (req: Request, res: Response) => {
    try {

    } catch (error) {

    }
}

const getProductById = (req: Request, res: Response) => {
    try {

    } catch (error) {

    }
}

export {
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductById
}