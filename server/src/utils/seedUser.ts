import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";


const USER_DATA = [
    {
        id: "65f3a2b1c4e5f6a7b8c9d011",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        phone: "9841234567",
        role: "Seller",

    },
    {
        id: "65f3a2b1c4e5f6a7b8c9d012",
        name: "Admin User",
        email: "admin@gmail.com",
        phone: "9801234567" // Ncell range
    },
];

//   const USER_Data = [
//       {
//         name: "John Doe",
//         email: "john.reader@example.com",

//         isVerified: true,
//         role: "Reader",
//         phoneNumber: "9800000001",
//       },
//       {
//         name: "Alice Reader",
//         email: "alice.reader@example.com",

//         isVerified: true,
//         role: "Reader",
//         phoneNumber: "9800000002",
//       },
//       {
//         name: "Michael Reader",
//         email: "michael.reader@example.com",

//         isVerified: true,
//         role: "Reader",
//         phoneNumber: "9800000003",
//       },
//     ];

const seedUsers = async () => {
    try {
        // 1. Connect to your MongoDB
        await mongoose.connect("mongodb://localhost:27017");
        console.log("Database connected successfully for seeding users...");

        // 2. Clear out old test users to avoid duplicate email/phone issues
        console.log("Old users cleared out cleanly.");

        // 3. Pre-hash a default password ("password123")
        const hashedPassword = await bcrypt.hash("password123", 10);

        // 4. Map data into your Schema structure
        const formattedUsers = USER_DATA.map(user => ({
            _id: new mongoose.Types.ObjectId(user.id), // Forces MongoDB to use our exact matching IDs
            name: user.name,
            email: user.email,
            password: hashedPassword,
            isVerified: true,
            role: user.role, // Validated against your enum ["Reader", "Writer"]
            phoneNumber: user.phone // Assigns the unique phone number
        }));

        // 5. Bulk insert into MongoDB
        await User.insertMany(formattedUsers);
        console.log("4 Authors successfully seeded with unique phone numbers! 👥");
        console.log("Default password for all accounts: password123");

        // 6. Disconnect process
        await mongoose.disconnect();
        process.exit(0);

    } catch (error: any) {
        console.error("User seeding failed ❌:", error.message);
        process.exit(1);
    }
};

seedUsers();