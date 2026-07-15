import { Request, Response } from "express";
import Category from "../models/categoryModel.js";
import Brand from "../models/brand.js";



const addCategory = async (req: Request, res: Response) => {
    const { category } = req.body;
    const ExistingCategory = await Category.findOne({ name: category })

    if (ExistingCategory) {
        return res.status(400).json({ message: "Category already exists" })
    }
    const categoryObj = new Category({
        name: category
    })
    categoryObj.save();

    res.status(201).json({ message: "category created" })
}

const getAllCategories = async (req: Request, res: Response) => {
    const categories = await Category.find().populate('parentCategory name');
    res.status(200).json({ success: true, data: categories })
}


const getSubCategories = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params;

        const subCategories = await Category.find({
            parentCategory: categoryId
        });

        return res.status(200).json({
            success: true,
            data: subCategories
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getBrandsByCategory = async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params;

        const brands = await Brand.find({
            category: categoryId
        });

        return res.status(200).json({
            success: true,
            data: brands
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export { addCategory, getAllCategories, getSubCategories, getBrandsByCategory }