import mongoose from "mongoose";
import dotenv from "dotenv";

// Import your Mongoose Models
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import Brand from "../models/brand.js";

export const products = [
    {
        name: "Aura Studio Headphones",
        description: "Premium studio headphones with immersive sound quality and comfortable design.",
        price: 179,
        oldPrice: 199,
        discount: 10,
        stock: 1,
        thumbnails: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b"
        ],
        category: "65c1a0000000000000000002",
        brand: "65b2b0000000000000000001",
        seller: "000000000000000000000000",
        isDeleted: false
    },
    {
        name: "Oceanic Chronograph",
        description: "Elegant chronograph watch with premium build quality and timeless style.",
        price: 451,
        oldPrice: 530,
        discount: 15,
        stock: 4,
        thumbnails: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        images: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
            "https://images.unsplash.com/photo-1524805444758-089113d48a6d"
        ],
        category: "65c1a0000000000000000007",
        brand: "65b2b0000000000000000003",
        seller: "000000000000000000000000",
        isDeleted: false
    },
    {
        name: "Nomad Backpack",
        description: "Durable travel backpack designed for everyday use and outdoor adventures.",
        price: 168,
        oldPrice: 210,
        discount: 20,
        stock: 6,
        thumbnails: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
        images: [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
            "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3"
        ],
        category: "65c1a0000000000000000009",
        brand: "65b2b0000000000000000008",
        seller: "000000000000000000000000",
        isDeleted: false
    },
    {
        name: "Smart LED Desk Lamp",
        description: "Modern smart LED desk lamp with adjustable brightness and energy efficiency.",
        price: 34,
        oldPrice: 45,
        discount: 25,
        stock: 2,
        thumbnails: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
        images: [
            "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
            "https://images.unsplash.com/photo-1534105615256-13940a56ff3b"
        ],
        category: "65c1a0000000000000000010",
        brand: "65b2b0000000000000000004",
        seller: "000000000000000000000000",
        isDeleted: false
    },
    {
        name: "Smart Fitness Band",
        description: "Fitness tracking smart band with health monitoring and activity tracking features.",
        price: 69,
        oldPrice: 99,
        discount: 30,
        stock: 7,
        thumbnails: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
        images: [
            "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
            "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6"
        ],
        category: "65c1a0000000000000000008",
        brand: "65b2b0000000000000000004",
        seller: "000000000000000000000000",
        isDeleted: false
    },
    {
        name: "Wireless Gaming Mouse",
        description: "High precision wireless gaming mouse with responsive controls.",
        price: 49,
        oldPrice: 75,
        discount: 35,
        stock: 3,
        thumbnails: "https://images.unsplash.com/photo-1527814050087-3793815479db",
        images: [
            "https://images.unsplash.com/photo-1527814050087-3793815479db",
            "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7"
        ],
        category: "65c1a0000000000000000003",
        brand: "65b2b0000000000000000002",
        seller: "000000000000000000000000",
        isDeleted: false
    },
    {
        name: "Mechanical Keyboard RGB",
        description: "RGB mechanical keyboard with customizable lighting and tactile switches.",
        price: 108,
        oldPrice: 180,
        discount: 40,
        stock: 1,
        thumbnails: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
        images: [
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3"
        ],
        category: "65c1a0000000000000000003",
        brand: "65b2b0000000000000000002",
        seller: "000000000000000000000000",
        isDeleted: false
    },
    {
        name: "4K Action Camera",
        description: "Compact action camera capable of recording high-quality 4K videos.",
        price: 165,
        oldPrice: 300,
        discount: 45,
        stock: 1,
        thumbnails: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd",
        images: [
            "https://images.unsplash.com/photo-1502920917128-1aa500764cbd",
            "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4"
        ],
        category: "65c1a0000000000000000004",
        brand: "65b2b0000000000000000005",
        seller: "000000000000000000000000",
        isDeleted: false
    },
    {
        name: "Bluetooth Speaker Mini",
        description: "Portable Bluetooth speaker with clear sound and compact design.",
        price: 20,
        oldPrice: 39,
        discount: 50,
        stock: 1,
        thumbnails: "https://images.unsplash.com/photo-1585386959984-a41552231693",
        images: [
            "https://images.unsplash.com/photo-1585386959984-a41552231693",
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1"
        ],
        category: "65c1a0000000000000000002",
        brand: "65b2b0000000000000000001",
        seller: "000000000000000000000000",
        isDeleted: false
    },
    {
        name: "Classic Leather Wallet",
        description: "Premium leather wallet with a classic design and multiple card slots.",
        price: 52,
        oldPrice: 55,
        discount: 5,
        stock: 1,
        thumbnails: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633",
        images: [
            "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633",
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
        ],
        category: "65c1a0000000000000000007",
        brand: "65b2b0000000000000000008",
        seller: "000000000000000000000000",
        isDeleted: false
    },
    {
        name: "Running Shoes Pro",
        description: "Lightweight running shoes designed for comfort, speed, and daily training.",
        price: 138,
        oldPrice: 150,
        discount: 8,
        stock: 1,
        thumbnails: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
            "https://images.unsplash.com/photo-1549298916-b41d501d3772"
        ],
        category: "65c1a0000000000000000007",
        brand: "65b2b0000000000000000007",
        seller: "000000000000000000000000",
        isDeleted: false
    },
    {
        name: "Compact Espresso Pro",
        description: "Compact espresso machine for preparing barista-style coffee at home.",
        price: 78,
        oldPrice: 89,
        discount: 12,
        stock: 1,
        thumbnails: "https://images.unsplash.com/photo-1517701550925-2f9c3e2f6c7d",
        images: [
            "https://images.unsplash.com/photo-1517701550925-2f9c3e2f6c7d",
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
        ],
        category: "65c1a0000000000000000010", // <--- FIXED: Fixed string length to 24 chars
        brand: "65b2b0000000000000000009",
        seller: "000000000000000000000000",
        isDeleted: false
    },
    {
        name: "Smartphone Gimbal",
        description: "Professional smartphone gimbal stabilizer for smooth video recording.",
        price: 115,
        oldPrice: 140,
        discount: 18,
        stock: 1,
        thumbnails: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
        images: [
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
        ],
        category: "65c1a0000000000000000004",
        brand: "65b2b0000000000000000005",
        seller: "000000000000000000000000",
        isDeleted: false
    },
    {
        name: "Portable SSD 1TB",
        description: "Fast portable SSD storage device with 1TB capacity and compact design.",
        price: 156,
        oldPrice: 200,
        discount: 22,
        stock: 1,
        thumbnails: "https://images.unsplash.com/photo-1593642634367-d91a135587b5",
        images: [
            "https://images.unsplash.com/photo-1593642634367-d91a135587b5",
            "https://images.unsplash.com/photo-1625948515291-69613efd103f"
        ],
        category: "65c1a0000000000000000005",
        brand: "65b2b0000000000000000006",
        seller: "000000000000000000000000",
        isDeleted: false
    },
    {
        name: "Smart Watch Series X",
        description: "Advanced smartwatch with fitness tracking, notifications, and modern design.",
        price: 215,
        oldPrice: 299,
        discount: 28,
        stock: 1,
        thumbnails: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        images: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
            "https://images.unsplash.com/photo-1508685096489-7aacd5a7b3b1"
        ],
        category: "65c1a0000000000000000008",
        brand: "65b2b0000000000000000003",
        seller: "000000000000000000000000",
        isDeleted: false
    },
    {
        name: "Noise Cancelling Earbuds",
        description: "Wireless earbuds with active noise cancellation and premium audio quality.",
        price: 88,
        oldPrice: 130,
        discount: 32,
        stock: 1,
        thumbnails: "https://images.unsplash.com/photo-1585386959984-a41552231693",
        images: [
            "https://images.unsplash.com/photo-1585386959984-a41552231693",
            "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1"
        ],
        category: "65c1a0000000000000000002",
        brand: "65b2b0000000000000000001",
        seller: "000000000000000000000000",
        isDeleted: false
    },
    {
        name: "Professional Tripod Stand",
        description: "Stable professional tripod stand for cameras and video equipment.",
        price: 38,
        oldPrice: 65,
        discount: 42,
        stock: 1,
        thumbnails: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
        images: [
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
            "https://images.unsplash.com/photo-1502920917128-1aa500764cbd"
        ],
        category: "65c1a0000000000000000004",
        brand: "65b2b0000000000000000002",
        seller: "000000000000000000000000",
        isDeleted: false
    },
    {
        name: "Gaming Chair Elite",
        description: "Ergonomic gaming chair designed for comfort during long gaming sessions.",
        price: 146,
        oldPrice: 280,
        discount: 48,
        stock: 1,
        thumbnails: "https://images.unsplash.com/photo-1598550476439-6847785fcea6",
        images: [
            "https://images.unsplash.com/photo-1598550476439-6847785fcea6",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7"
        ],
        category: "65c1a0000000000000000003",
        brand: "65b2b0000000000000000002",
        seller: "000000000000000000000000",
        isDeleted: false
    },
    {
        name: "Smart Home Speaker",
        description: "Smart home speaker with voice assistant support and premium sound.",
        price: 77,
        oldPrice: 170,
        discount: 55,
        stock: 1,
        thumbnails: "https://images.unsplash.com/photo-1543512214-318c7553f230",
        images: [
            "https://images.unsplash.com/photo-1543512214-318c7553f230",
            "https://images.unsplash.com/photo-1589492477829-5e65395b66cc"
        ],
        category: "65c1a0000000000000000006",
        brand: "65b2b0000000000000000003",
        seller: "000000000000000000000000",
        isDeleted: false
    },
    {
        name: "Travel Duffel Bag",
        description: "Spacious travel duffel bag suitable for trips, gym, and daily carrying.",
        price: 32,
        oldPrice: 80,
        discount: 60,
        stock: 1,
        thumbnails: "https://images.unsplash.com/photo-1526481280695-3c687fd5432c",
        images: [
            "https://images.unsplash.com/photo-1526481280695-3c687fd5432c",
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
        ],
        category: "65c1a0000000000000000009",
        brand: "65b2b0000000000000000008",
        seller: "000000000000000000000000",
        isDeleted: false
    }
];

export const brands = [
    {
        _id: "65b2b0000000000000000001",
        name: "Sony",
        category: "65c1a0000000000000000002"
    },
    {
        _id: "65b2b0000000000000000002",
        name: "Logitech",
        category: "65c1a0000000000000000003"
    },
    {
        _id: "65b2b0000000000000000003",
        name: "Apple",
        category: "65c1a0000000000000000008"
    },
    {
        _id: "65b2b0000000000000000004",
        name: "Samsung",
        category: "65c1a0000000000000000001"
    },
    {
        _id: "65b2b0000000000000000005",
        name: "GoPro",
        category: "65c1a0000000000000000004"
    },
    {
        _id: "65b2b0000000000000000006",
        name: "SanDisk",
        category: "65c1a0000000000000000005"
    },
    {
        _id: "65b2b0000000000000000007",
        name: "Nike",
        category: "65c1a0000000000000000007"
    },
    {
        _id: "65b2b0000000000000000008",
        name: "Peak Design",
        category: "65c1a0000000000000000009"
    },
    {
        _id: "65b2b0000000000000000009",
        name: "DeLonghi",
        category: "65c1a0000000000000000010"
    }
];
export const categories = [
    // === TOP LEVEL PARENT CATEGORIES ===
    {
        _id: "65c1a0000000000000000001",
        name: "Electronics",
        parentCategory: null
    },
    {
        _id: "65c1a0000000000000000007",
        name: "Accessories",
        parentCategory: null
    },
    {
        _id: "65c1a0000000000000000009",
        name: "Bags",
        parentCategory: null
    },
    {
        _id: "65c1a0000000000000000010",
        name: "Home & Appliances",
        parentCategory: null
    },

    // === SUBCATEGORIES UNDER ELECTRONICS ===
    {
        _id: "65c1a0000000000000000002",
        name: "Audio",
        parentCategory: "65c1a0000000000000000001"
    },
    {
        _id: "65c1a0000000000000000003",
        name: "Gaming",
        parentCategory: "65c1a0000000000000000001"
    },
    {
        _id: "65c1a0000000000000000004",
        name: "Cameras",
        parentCategory: "65c1a0000000000000000001"
    },
    {
        _id: "65c1a0000000000000000005",
        name: "Storage",
        parentCategory: "65c1a0000000000000000001"
    },
    {
        _id: "65c1a0000000000000000006",
        name: "Smart Home",
        parentCategory: "65c1a0000000000000000001"
    },

    // === SUBCATEGORIES UNDER ACCESSORIES ===
    {
        _id: "65c1a0000000000000000008",
        name: "Wearables",
        parentCategory: "65c1a0000000000000000007"
    }
];
dotenv.config();

const MONGO_URI = process.env.DB_URI!;

const seedDatabase = async () => {
    try {
        console.log("⏳ Connecting to database...");
        await mongoose.connect(MONGO_URI);
        console.log("✅ Database connection established.");

        // 1. Clear existing collection data to avoid duplicates
        console.log("🧹 Clearing existing collections...");
        await Product.deleteMany({});
        await Brand.deleteMany({});
        await Category.deleteMany({});
        console.log("✅ Collections cleared safely.");

        // 2. Seed Categories First (Main & Subcategories)
        console.log("🌱 Seeding Categories...");
        await Category.insertMany(categories);
        console.log(`✅ Successfully seeded ${categories.length} categories.`);

        // 3. Seed Brands (Depends on Category IDs)
        console.log("🌱 Seeding Brands...");
        await Brand.insertMany(brands);
        console.log(`✅ Successfully seeded ${brands.length} brands.`);

        // 4. Seed Products (Depends on both Category and Brand IDs)
        console.log("🌱 Seeding Products...");
        await Product.insertMany(products);
        console.log(`✅ Successfully seeded ${products.length} products.`);

        console.log("\n🚀 Database seeding completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Seeding failed with error:", error);
        process.exit(1);
    }
};

seedDatabase();