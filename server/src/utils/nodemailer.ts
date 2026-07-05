import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
})

export async function sendMail(to: string, subject: string, html: string) {
    try {

        await transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject,
            html

        })

    } catch (error) {
        console.log("error occured", error)
    }
}

export default sendMail;