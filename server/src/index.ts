import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./app.js";
import connectDB from "./db/connection.js";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI!;


connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});
