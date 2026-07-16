import { Request, Response } from "express";
import Address from "../models/addressModel.js";
import { addressSchema } from "../schemas/addressSchmea.js";


const addShipingAddress = async (req: Request, res: Response) => {
    try {
        const data = addressSchema.safeParse(req.body);
        if (!data.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid data",
                error: data.error
            })
        }
        const { state, district, city, street } = data.data;
        const userId = req.user.id;

        const ExistingAddress = await Address.findOne({ userId: req.user.id })

        if (ExistingAddress) {
            return res.status(400).json({
                success: false,
                message: "You Have already added address"
            })
        }

        const address = new Address({
            userId,
            state,
            district,
            city,
            street
        })
        await address.save();
        res.status(200).json({
            success: true,
            message: "Address added successfully",
            data: address
        })

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const getMyAddress = async (req: Request, res: Response) => {
    try {
        const address = await Address.findOne({ user: req.user.id });
        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            })
        }

        await address.populate('user', 'name email');
        return res.status(200).json({
            success: true,
            message: "Address fetched successfully",
            data: address
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateMyAddress = async (req: Request, res: Response) => {
    try {
        const address = await Address.findOne({ userId: req.user.id });
        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            })
        }
        const data = addressSchema.safeParse(req.body);
        if (!data.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid data",
                error: data.error
            })
        }
        const { state, district, city, street } = data.data;
        address.state = state;
        address.district = district;
        address.city = city;
        address.street = street;
        await address.save();
        return res.status(200).json({
            success: true,
            message: "Address updated successfully",
            data: address
        })
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export {
    addShipingAddress,
    getMyAddress,
    updateMyAddress
}
