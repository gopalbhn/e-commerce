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
                success_url: `${process.env.FRONTEND_URI}/payment-success`,
                failure_url: `${process.env.FRONTEND_URI}/payment-failed`,
                signed_field_names: "total_amount,transaction_uuid,product_code",
                signature


            }
        })
    } catch (error) {
        console.log(error)
    }
}


const verifyEsewaPayment = async (req: Request, res: Response) => {
    try {


        const {

            transaction_uuid,
            total_amount,
            product_code,
        } = req.body;

        const response = await fetch(`https://rc.esewa.com.np/api/epay/transaction/status/?product_code=${product_code}&total_amount=${total_amount}&transaction_uuid=${transaction_uuid} `)
        const data = await response.json()
        console.log(data)

        const payment = await Payment.findOneAndUpdate({
            transactionId: transaction_uuid
        }, {
            status: data.status,
            transactionId: transaction_uuid,
            amount: total_amount,
            product_code,
        })
        res.status(200).json({
            success: true,
            result: payment,
        })
    } catch (error) {
        console.log(error)
    }
}
export { paymentHndler, verifyEsewaPayment }