import crypto from "crypto"
import { Request, Response } from "express"
import { v4 as uuidv4 } from "uuid"
import Payment from "../models/paymentModel.js"
import Order from "../models/orderModel.js"


const generateSignature = (message: string, secretKey: string) => {
    return crypto.createHmac("sha256", secretKey).update(message).digest("base64")
}

const paymentHandlerEsewa = async (req: Request, res: Response) => {
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
            amount: amount,
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
        const buyer = req.user?.id;
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
        }, { new: true })

        if (payment?.status == "COMPLETE") {
            console.log(" payment  is  success", buyer)
            await Order.findOneAndUpdate({
                _id: payment.orderId,
            }, {
                paymentStatus: "Paid"
            })
        }
        res.status(200).json({
            success: true,
            result: payment,
        })
    } catch (error) {
        console.log(error)
    }
}

const paymentHandlerKhalti = async (req: Request, res: Response) => {
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



        const payment = await Payment.create({
            amount: amount,
            orderId,
            gateway,
            status: "pending",
        })
        const khaltiConfig = {
            return_url: `${process.env.FRONTEND_URI}/payment-success`,
            website_url: process.env.FRONTEND_URI,
            amount: amount,
            purchase_order_id: payment._id.toString(),
            purchase_order_name: "test"
        }
        const response = await fetch("https://dev.khalti.com/api/v2/epayment/initiate/",
            {
                method: "POST",
                headers: {
                    "Authorization": `key ${process.env.KHALTI_SECRET_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(khaltiConfig)
            }
        )

        if (!response.ok) {
            return res.status(400).json({
                success: false,
                message: "Failed to initiate khalti payment"
            })
        }

        const khaltiResponse = await response.json();
        console.log(khaltiResponse)


        res.json({
            success: true,
            paymentUrl: khaltiResponse.payment_url,
        })
    } catch (error) {
        console.log(error)
    }
}

const verifyKhaltiPayment = async (req: Request, res: Response) => {
    try {

        const {
            pidx,
            total_amount,
            transaction_id,
            status
        } = req.body;

        const response = await fetch("https://dev.khalti.com/api/v2/epayment/lookup",
            {
                method: "POST",
                headers: {
                    "Authorization": `key ${process.env.KHALTI_SECRET_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    purchase_order_id: pidx
                })
            }
        )

        if (!response.ok) {
            return res.status(400).json({
                success: false,
                message: "Failed to verify khalti payment"
            })
        }

        const khaltiResponse = await response.json();
        console.log("khaltiResponse", khaltiResponse)

        const payment = await Payment.findOneAndUpdate(
            { transactionId: pidx },
            {
                status: khaltiResponse?.status,
                transactionId: khaltiResponse?.transaction_id,
                amount: khaltiResponse?.total_amount,
                transaction_id,
            },
            { new: true }
        );

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found",
            });
        }

    } catch (error) {
        console.log(error)

    }
}
export { paymentHandlerEsewa, verifyEsewaPayment, paymentHandlerKhalti, verifyKhaltiPayment }