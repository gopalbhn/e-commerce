import { Request, Response } from "express";
import Coupon from "../models/couponModel.js";
import { couponSchema } from "../schemas/couponSchema.js";

const createCoupon = async (req: Request, res: Response) => {
    try {
        const data = couponSchema.safeParse(req.body)
        if (!data.success) {
            return res.status(400).json({
                success: false,
                message: data.error.message
            })
        }
        const { code, discountRate, maxUses, expiryDate } = data.data
        const coupon = await Coupon.create({ code, discountRate, maxUses, expiryDate, seller: req.user.id })
        res.status(200).json({
            success: true,
            message: "Coupon created successfully",
            coupon
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

const deleteCoupon = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const coupon = await Coupon.findByIdAndDelete(id)
        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" })
        }
        res.json({ message: "Coupon deleted successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

const updateCoupon = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { code, discountRate, maxUses, expiryDate } = req.body
        const coupon = await Coupon.findByIdAndUpdate(id, { code, discountRate, maxUses, expiryDate }, { new: true })
        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" })
        }
        res.json({ message: "Coupon updated successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

const getAllCoupons = async (req: Request, res: Response) => {
    try {
        const seller = req.user.id
        const coupons = await Coupon.find({ seller })
        if (coupons.length == 0) {
            return res.status(404).json({ success: false, message: "No coupons found" })
        }
        res.status(200).json({ success: true, coupons })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}



const useCoupon = async (req: Request, res: Response) => {
    try {
        const { code } = req.params
        const coupon = await Coupon.findOne({ code })
        if (!coupon) {
            return res.status(404).json({ success: false, message: "Coupon not found" })
        }
        if (coupon.expiryDate < new Date()) {
            return res.status(400).json({ success: false, message: "Coupon is expired" })
        }
        if (coupon.usedCount >= coupon.maxUses) {
            return res.status(400).json({ success: false, message: "Coupon is used up" })
        }
        coupon.usedCount++
        await coupon.save()
        res.status(200).json({ success: true, coupon })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export {
    createCoupon,
    deleteCoupon,
    updateCoupon,
    getAllCoupons,

    useCoupon
}
