import crypto from "crypto"
import { Request, Response } from "express"
import { v4 as uuidv4 } from "uuid"
import Payment from "../models/paymentModel.js"


const generateSignature = (message: string, secretKey: string) => {
    return crypto.createHmac("sha256", secretKey).update(message).digest("base64")
}

const paymentHndler = async (req: Request, res: Response) => {
    try {
        const { amount, orderId, gateway } = req.body;
        console.log({
            amount,
            orderId,
            gateway
        })
        if (!amount) {
            return res.status(400).json({
                message: "Amount is missing"
            })
        }

        const transactionUUID = uuidv4();

        const productCode = process.env.ESEWA_PRODUCT_CODE;

        if (!productCode) {
            return res.status(400).json({
                message: "Product code is missing"
            })
        }
        const payment = await Payment.create({
            transactionId: transactionUUID,
            amount,
            orderId,
            gateway,
            status: "pending",
        })
        const message = `total_amount=${amount},transaction_uuid=${transactionUUID},product_code=${productCode}`;
        const signature = generateSignature(
            message,
            process.env.ESEWA_SECRET_KEY!
        );
        res.json({
            success: true,
            paymentUrl: "https://rc-epay.esewa.com.np/api/epay/main/v2/form",

            data: {
                amount,
                tax_amount: 0,
                total_amount: amount,
                transaction_uuid: transactionUUID,
                product_code: process.env.ESEWA_PRODUCT_CODE,
                product_service_charge: 0,
                product_delivery_charge: 0,
                success_url: `${process.env.FRONTEND_URI}/order-success`,
                failure_url: `${process.env.FRONTEND_URI}/order-failed`,
                signed_field_names: "total_amount,transaction_uuid,product_code",
                signature


            }
        })
    } catch (error) {
        console.log(error)
    }
}


const verifyEsewaPayment = async (req: Request, res: Response) => {
    const {
        transaction_uuid,
        amount,
        product_code,
        status,
        signed_field_names,
        signature,
    } = req.body;

    const expectedMessage =
        "total_amount=" + amount +
        ",transaction_uuid=" + transaction_uuid +
        ",product_code=" + product_code;

    // Recalculate signature using your backend secret
    const expectedSignature = generateSignature(
        expectedMessage,
        process.env.ESEWA_SECRET_KEY!   // ← same secret as init
    );
}

export { paymentHndler, verifyEsewaPayment }