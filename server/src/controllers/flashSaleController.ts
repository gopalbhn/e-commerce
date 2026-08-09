import { Request, Response } from "express"
import createSaleSchema from "../schemas/flashSaleSchema.js"
import FlashSale from "../models/flashSaleModel.js"



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


export { createFlashSale, updateFalshSale, deleteFlashSale, getAllSale }