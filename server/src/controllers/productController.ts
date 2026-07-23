import { Request, Response } from "express";
import { ProductCreateSchema, ProductUpdateSchema } from "../schemas/productSchema.js";
import Product from "../models/productModel.js";
import { Types } from "mongoose";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary.js";

const addProduct = async (req: Request, res: Response) => {
    try {
        console.log("req.body", req.body)
        console.log("req.files", req.files)
        const { name, description, price, stock, category, subcategory, discountRate } = req.body
        // const data = ProductCreateSchema.safeParse(req.body)
        // if (!data.success) {
        //     return res.status(400).json({
        //         success: false,
        //         message: data.error.flatten().fieldErrors,
        //     })
        // }

        const files = req.files as { thumbnails?: Express.Multer.File[], images?: Express.Multer.File[] }
        const thumbnailFile = files?.thumbnails?.[0].buffer

        const imagesFiles = files.images as Express.Multer.File[]

        if (!thumbnailFile) {
            return res.status(400).json({
                success: false,
                message: "Unable to get thumbnails"
            })
        }
        const thumbnail: any = await uploadToCloudinary(thumbnailFile)

        if (!thumbnail) {
            return res.status(400).json({
                success: false,
                message: "Unable to upload thumbnail"
            })
        }

        const image: any[] = await Promise.all(imagesFiles.map((file) => uploadToCloudinary(file.buffer)))

        if (!image) {
            return res.status(400).json({
                success: false,
                message: "Unable to upload images"
            })
        }
        const thumbnailLink = thumbnail.url;
        const imageLink: any[] = image.map(item => item.url)
        const discountedPrice = price - (price * discountRate) / 100
        const product = new Product({
            name,
            description,
            price: discountedPrice,
            oldPrice: price,
            stock,
            discount: discountRate,
            thumbnails: thumbnailLink,
            images: imageLink,
            subcategory,
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
        const productId = req.params.id;
        const data = ProductUpdateSchema.safeParse(req.body)
        if (!data.success) {
            return res.status(400).json({
                success: false,
                message: data.error.flatten().fieldErrors,
            })
        }
        const { name, description, price, stock, category } = data.data

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        if (product.seller.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this product"
            })
        }

        let thumbnailurl = product.thumbnails;
        let imageesUrl = product.images;

        if (req.files) {
            const files: any = req.files
            if (files.thumbnails?.[0].buffer) {
                const thumbnailId: any = thumbnailurl.split("/").pop()?.split(".")[0]

                const deleteThumbnail = await deleteFromCloudinary(thumbnailId)
                if (!deleteThumbnail) {
                    return res.status(400).json({
                        success: false,
                        message: "Unable to delete thumbnail"
                    })
                }
                const thumbnail: any = await uploadToCloudinary(files.thumbnails?.[0].buffer)
                thumbnailurl = thumbnail.url
            }
        }

        if (req.files) {
            const files: any = req.files;
            if (files.images?.length) {
                const deleteImages = await Promise.all(imageesUrl.map((url: any) => deleteFromCloudinary(url.split("/").pop()?.split(".")[0])))
                if (!deleteImages) {
                    return res.status(400).json({
                        success: false,
                        message: "Unable to delete images"
                    })
                }
                const images = await Promise.all(files.images?.map((file: any) => uploadToCloudinary(file.buffer)))
                imageesUrl = images.map(item => item.url)
            }
        }
        const newProduct = await Product.findByIdAndUpdate(req.params.id, {
            name,
            description,
            price,
            stock,
            thumbnails: thumbnailurl,
            images: imageesUrl,
            category,
            seller: req.user.id
        }, { new: true })
        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: newProduct
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
        const product = await Product.find({ isDeleted: false }).populate({
            path: "category",
            select: "name"
        })
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
        const product = await Product.findOne({
            _id: productId,
            isDeleted: false
        })
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
            filteredData.rating = { $gte: Number(rating) };
        }


        console.log("filterd data", filteredData)
        const products = await Product.find({ ...filteredData, isDeleted: false }).populate([
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

const getLowStockedProduct = async (req: Request, res: Response) => {
    const userId = req.user.id;
    console.log("userId", userId)
    const lowStockedProduct = await Product.find({
        seller: userId,
        stock: { $lte: 5 },
        isDeleted: false
    })
    console.log("lowStockedProduct", lowStockedProduct)
    if (lowStockedProduct.length === 0) {
        return res.status(200).json({
            success: true,
            message: "No low stocked products found",
            data: []
        })
    }
    return res.status(200).json({
        success: true,
        message: "Low stocked products fetched successfully",
        data: lowStockedProduct
    })

}

const getMyProducts = async (req: Request, res: Response) => {

    try {
        console.log("userId", req.user.id)
        const products = await Product.find({ seller: req.user.id, isDeleted: false }).populate({
            path: "category",
            select: "name"
        }).populate({
            path: "brand",
            select: "name"
        })
        if (products.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No products found",
                data: []
            })
        }
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
    getFilteredProduct,
    getLowStockedProduct,
    getMyProducts
}