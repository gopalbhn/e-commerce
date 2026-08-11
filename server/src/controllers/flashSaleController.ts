import { Request, Response } from "express"
import createSaleSchema from "../schemas/flashSaleSchema.js"
import FlashSale from "../models/flashSaleModel.js"
import FlashSaleProduct from "../models/flashSaleProductModel.js";
import { success } from "zod";



const getAllSale = async (req: Request, res: Response) => {
    try {
        const flashSale = await FlashSale.find({ isDeleted: false }).select("-isDeleted");
        if (flashSale.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Flash sale is live"
            })
        }
        res.status(200).json({
            success: true,
            message: "Flash sales fetched successfully",
            data: flashSale
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getRunningFlashSale = async (req: Request, res: Response) => {
    try {
        const flashSale = await FlashSale.findOne({ isDeleted: false, startTime: { $lte: new Date() }, endTime: { $gte: new Date() } }).select("-isDeleted");
        if (!flashSale) {
            return res.status(404).json({
                success: false,
                message: "No Flash sale is live"
            })
        }
        res.status(200).json({
            success: true,
            message: "Flash sale fetched successfully",
            data: flashSale
        })
    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const createFlashSale = async (req: Request, res: Response) => {
    try {
        const data = createSaleSchema.safeParse(req.body);
        if (!data.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid data",
                error: data.error
            })
        }

        const { discountPercentage, saleTitle, startTime, endTime } = data.data;

        const ExistingSale = await FlashSale.find({
            $or: [
                { saleTitle: saleTitle },
                { discountPercentage: discountPercentage },
                { startTime: startTime },
                { endTime: endTime }
            ]
        });

        if (ExistingSale.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Flash sale already exists `
            })
        }


        const flashSale = new FlashSale({
            discountPercentage,
            saleTitle,
            startTime,
            endTime
        })
        await flashSale.save();
        res.status(200).json({
            success: true,
            message: "Flash sale created successfully",
            data: flashSale
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const updateFalshSale = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        console.log(req)
        console.log("saleid", id)
        const data = createSaleSchema.safeParse(req.body);
        if (!data.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid data",
                error: data.error
            })
        }
        const { discountPercentage, saleTitle, startTime, endTime } = data.data;
        const flashSale = await FlashSale.findById(id);
        if (!flashSale) {
            return res.status(404).json({
                success: false,
                message: "Flash sale not found"
            })
        }
        flashSale.discountPercentage = discountPercentage;
        flashSale.saleTitle = saleTitle;
        flashSale.startTime = startTime;
        flashSale.endTime = endTime;
        await flashSale.save();
        res.status(200).json({
            success: true,
            message: "Flash sale updated successfully",
            data: flashSale
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const deleteFlashSale = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const flashSale = await FlashSale.findById(id);
        if (!flashSale) {
            return res.status(404).json({
                success: false,
                message: "Flash sale not found"
            })
        }
        flashSale.isDeleted = true;
        await flashSale.save();
        return res.status(200).json({
            success: true,
            message: "Flash sale deleted successfully"
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const AddProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { products } = req.body;
        const userId = req.user.id;
        console.log(products)
        const flashSale = await FlashSale.findById(id);
        if (!flashSale) {
            return res.status(404).json({
                success: false,
                message: "Flash sale not found"
            })
        }

        const ExistingProduct = await FlashSaleProduct.find({ user: userId })

        console.log("existingproduct", ExistingProduct)

        ExistingProduct.map(prod => {
            products.map((prod1: { productId: string; stock: number }) => {
                if (String(prod.productId) == String(prod1.productId)) {
                    return res.status(404).json({
                        success: false,
                        message: "You cannot add same product twice for flash sale"
                    })
                }
            })
        })

        if (ExistingProduct.length >= 2) {
            return res.status(404).json({
                success: false,
                message: "You can only add two products for flash sale"
            })
        }

        const flashSaleProducts = products.map(
            async (prod: { productId: string; stock: number }) => {
                return await new FlashSaleProduct({
                    flashSaleId: id,
                    productId: prod.productId,
                    stock: prod.stock,
                    user: userId
                }).save();
            }
        );



        await Promise.all(flashSaleProducts);
        res.status(200).json({
            success: true,
            message: "Products added to flash sale successfully",
            data: flashSaleProducts
        })
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getRequestedProducts = async (req: Request, res: Response) => {
    try {
        const flashSaleProduct = await FlashSaleProduct.find({ status: "Pending" }).populate(
            {
                path: "productId",
                select: "name images price stock",
                populate: {
                    path: "seller",
                    select: "name email"
                }
            }
        )
        if (flashSaleProduct.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No requested products"
            })
        }
        res.status(200).json({
            success: true,
            message: "Requested products fetched successfully",
            data: flashSaleProduct
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const acceptRequestedProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const flashSaleProduct = await FlashSaleProduct.findById(id);
        if (!flashSaleProduct) {
            return res.status(404).json({
                success: false,
                message: "Flash sale product not found"
            })
        }

        const flashSale = await FlashSale.findById(
            flashSaleProduct.flashSaleId
        );

        if (!flashSale) {
            return res.status(404).json({
                success: false,
                message: "Flash sale not found"
            });
        }

        const sellerId = flashSaleProduct.user;

        const acceptedProductNumber = await FlashSaleProduct.countDocuments({
            user: sellerId,
            status: "Accepted"
        })
        if (acceptedProductNumber >= 2) {
            return res.status(404).json({
                success: false,
                message: "Already two products are accepted for this Seller"
            })
        }

        const totalSaleproduct = await FlashSaleProduct.countDocuments({
            flashSaleId: flashSaleProduct.flashSaleId,
            status: "Accepted"
        })
        if (totalSaleproduct >= 4) {
            return res.status(404).json({
                success: false,
                message: "Already four products are accepted for this flash sale"
            })
        }

        flashSaleProduct.status = "Accepted";
        await flashSaleProduct.save();

        const flashId = Object(flashSaleProduct.productId);

        flashSale.products.push(flashId);
        await flashSale.save();
        return res.status(200).json({
            success: true,
            message: "Flash sale product accepted successfully"
        })


    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const rejectRequestedProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const flashSaleProduct = await FlashSaleProduct.findById(id);
        if (!flashSaleProduct) {
            return res.status(404).json({
                success: false,
                message: "Flash sale product not found"
            })
        }
        flashSaleProduct.status = "Rejected";
        await flashSaleProduct.save();
        return res.status(200).json({
            success: true,
            message: "Flash sale product rejected successfully"
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getAllMyFlashSaleProduct = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;

        const flashSaleProduct = await FlashSaleProduct.find({ user: userId }).populate({
            path: "productId",
            select: "name images price stock thumbnails",
            populate: {
                path: "seller",
                select: "name email"
            }
        })

        if (flashSaleProduct.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No requested products"
            })
        }
        const myproducts = flashSaleProduct.map(item => {

            return {
                productName: (item.productId as any).name,
                thumbnails: (item.productId as any).thumbnails,
                productPrice: (item.productId as any).price,
                productStock: (item.productId as any).stock,
                productSeller: (item.productId as any).seller,
                status: item.status,
                stock: item.stock,
                _id: item._id,
            }
        }

        )
        res.status(200).json({
            success: true,
            message: "Requested products fetched successfully",
            data: myproducts
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const removeMyItem = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;

        const product = FlashSaleProduct.find({ _id: productId });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        await product.deleteOne();
        return res.status(200).json({
            success: true,
            message: "Product removed successfully"
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getFlashSaleProduct = async (req: Request, res: Response) => {
    try {
        const product = await FlashSale.find({
            endTime: {
                $gte: Date.now()
            }
        }).populate({
            path: "products",
            select: "name images price stock thumbnails oldPrice"
        })

        if (product.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No products found"
            })
        }

        res.status(200).json({
            success: true,
            product
        })

    }
    catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export { createFlashSale, updateFalshSale, getFlashSaleProduct, deleteFlashSale, getAllSale, AddProduct, getRequestedProducts, getRunningFlashSale, acceptRequestedProduct, rejectRequestedProduct, getAllMyFlashSaleProduct, removeMyItem }