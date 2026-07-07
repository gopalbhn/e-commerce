import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./db/connection.js";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI!;


// connectDB()
//     .then(() => {
//         app.listen(PORT, () => {
//             console.log(`Server is running on port ${PORT}`);
//         });
//     })
//     .catch((err) => {
//         console.error("Failed to connect to MongoDB", err);
//     });



connectDB()
    .then(() => {

        console.log("Database Connected");

    })
    .catch((err:any) => {
        console.log("Database connection Error!!!", err.message)
    })

export default app