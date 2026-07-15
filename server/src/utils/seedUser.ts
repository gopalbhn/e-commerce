import mongoose from "mongoose";

import Product from "../models/productModel.js";
// export const blogs = [
//     {
//         image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
//         category: "Technology",
//         title: "The Future of Artificial Intelligence in Everyday Life",
//         excerpt: "Discover how AI is transforming industries, homes, and personal productivity in ways we never imagined.",
//         author: "Sarah Johnson",
//         avatar: "https://randomuser.me/api/portraits/women/44.jpg",
//         publishedAt: "5 min read"
//     },
//     {
//         image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
//         category: "Technology",
//         title: "How Quantum Computing Could Change the World",
//         excerpt: "A beginner-friendly look at quantum computers and their potential applications.",
//         author: "Daniel Lee",
//         avatar: "https://randomuser.me/api/portraits/men/24.jpg",
//         publishedAt: "6 min read"
//     },
//     {
//         image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
//         category: "Technology",
//         title: "Cybersecurity Trends Every Business Should Know",
//         excerpt: "Emerging threats and the best practices to keep your data safe in 2025.",
//         author: "Emma Davis",
//         avatar: "https://randomuser.me/api/portraits/women/56.jpg",
//         publishedAt: "7 min read"
//     },
//     {
//         image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935",
//         category: "Technology",
//         title: "The Rise of Smart Cities and Connected Living",
//         excerpt: "How IoT devices are making urban environments more efficient and sustainable.",
//         author: "Ryan Walker",
//         avatar: "https://randomuser.me/api/portraits/men/41.jpg",
//         publishedAt: "5 min read"
//     },

//     // Science (4)
//     {
//         image: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e",
//         category: "Science",
//         title: "The Search for Life Beyond Earth",
//         excerpt: "Scientists are discovering new exoplanets that may support life.",
//         author: "Sophia Green",
//         avatar: "https://randomuser.me/api/portraits/women/31.jpg",
//         publishedAt: "8 min read"
//     },
//     {
//         image: "https://images.unsplash.com/photo-1576086213369-97a306d36557",
//         category: "Science",
//         title: "CRISPR and the Future of Genetic Engineering",
//         excerpt: "Understanding the revolutionary gene-editing technology changing medicine.",
//         author: "James Wilson",
//         avatar: "https://randomuser.me/api/portraits/men/37.jpg",
//         publishedAt: "6 min read"
//     },
//     {
//         image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d",
//         category: "Science",
//         title: "Climate Change Innovations Offering Hope",
//         excerpt: "From carbon capture to renewable energy breakthroughs, science is fighting back.",
//         author: "Natalie Brooks",
//         avatar: "https://randomuser.me/api/portraits/women/12.jpg",
//         publishedAt: "7 min read"
//     },
//     {
//         image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31",
//         category: "Science",
//         title: "Why Deep Ocean Exploration Matters",
//         excerpt: "The mysteries of Earth's oceans could unlock discoveries about life itself.",
//         author: "Ethan Cooper",
//         avatar: "https://randomuser.me/api/portraits/men/18.jpg",
//         publishedAt: "5 min read"
//     },

//     // Business (4)
//     {
//         image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
//         category: "Business",
//         title: "Remote Work Strategies That Actually Increase Productivity",
//         excerpt: "Practical tips for teams and individuals looking to thrive in a distributed work environment.",
//         author: "Michael Brown",
//         avatar: "https://randomuser.me/api/portraits/men/55.jpg",
//         publishedAt: "6 min read"
//     },
//     {
//         image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
//         category: "Business",
//         title: "Startup Lessons from Successful Entrepreneurs",
//         excerpt: "Key insights from founders who built companies from scratch.",
//         author: "Laura Adams",
//         avatar: "https://randomuser.me/api/portraits/women/29.jpg",
//         publishedAt: "5 min read"
//     },
//     {
//         image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
//         category: "Business",
//         title: "Understanding Modern Consumer Behavior",
//         excerpt: "What drives purchasing decisions in today's digital marketplace.",
//         author: "Robert King",
//         avatar: "https://randomuser.me/api/portraits/men/48.jpg",
//         publishedAt: "7 min read"
//     },
//     {
//         image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a",
//         category: "Business",
//         title: "The Growing Impact of Sustainable Investing",
//         excerpt: "Why ESG-focused investments are attracting global attention.",
//         author: "Grace Hill",
//         avatar: "https://randomuser.me/api/portraits/women/43.jpg",
//         publishedAt: "6 min read"
//     },

//     // Travel (4)
//     {
//         image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
//         category: "Travel",
//         title: "10 Hidden Destinations You Should Visit This Year",
//         excerpt: "Explore breathtaking locations away from the crowds and experience authentic local culture.",
//         author: "David Miller",
//         avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//         publishedAt: "7 min read"
//     },
//     {
//         image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
//         category: "Travel",
//         title: "A Complete Guide to Solo Travel Adventures",
//         excerpt: "How to travel safely, confidently, and enjoyably on your own.",
//         author: "Hannah Scott",
//         avatar: "https://randomuser.me/api/portraits/women/50.jpg",
//         publishedAt: "6 min read"
//     },
//     {
//         image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828",
//         category: "Travel",
//         title: "Budget-Friendly Trips That Feel Luxurious",
//         excerpt: "Affordable travel experiences without compromising comfort.",
//         author: "Jason Reed",
//         avatar: "https://randomuser.me/api/portraits/men/22.jpg",
//         publishedAt: "5 min read"
//     },
//     {
//         image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
//         category: "Travel",
//         title: "The World's Most Stunning Coastal Escapes",
//         excerpt: "Discover beaches and coastal towns that belong on every traveler's list.",
//         author: "Mia Thompson",
//         avatar: "https://randomuser.me/api/portraits/women/35.jpg",
//         publishedAt: "8 min read"
//     },

//     // Health (4)
//     {
//         image: "https://images.unsplash.com/photo-1518611012118-696072aa579a",
//         category: "Health",
//         title: "Simple Daily Habits for Better Mental Wellbeing",
//         excerpt: "Small lifestyle changes can have a significant impact on stress management and happiness.",
//         author: "Olivia Wilson",
//         avatar: "https://randomuser.me/api/portraits/women/22.jpg",
//         publishedAt: "3 min read"
//     },
//     {
//         image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
//         category: "Health",
//         title: "The Benefits of Regular Exercise Beyond Fitness",
//         excerpt: "Physical activity improves mental health, productivity, and longevity.",
//         author: "Noah Evans",
//         avatar: "https://randomuser.me/api/portraits/men/60.jpg",
//         publishedAt: "5 min read"
//     },
//     {
//         image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
//         category: "Health",
//         title: "Nutrition Myths You Should Stop Believing",
//         excerpt: "Separating fact from fiction when it comes to healthy eating.",
//         author: "Ava Mitchell",
//         avatar: "https://randomuser.me/api/portraits/women/40.jpg",
//         publishedAt: "4 min read"
//     },
//     {
//         image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
//         category: "Health",
//         title: "Mindfulness Techniques for Busy Professionals",
//         excerpt: "Practical methods to stay calm and focused during demanding workdays.",
//         author: "Benjamin Clark",
//         avatar: "https://randomuser.me/api/portraits/men/45.jpg",
//         publishedAt: "6 min read"
//     }
// ];

// export const blogs = [
//     {
//         title: "AI Agents and the Future of Automation",
//         description:
//             "AI agents are evolving from simple assistants to fully autonomous systems capable of handling complex workflows in businesses and daily life.",
//         category: "Technology",
//         image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
//         author: "65f3a2b1c4e5f6a7b8c9d011",
//         commentsEnabled: true,
//         comments: []
//     },
//     {
//         title: "The Rise of Quantum Internet",
//         description:
//             "Quantum networking promises ultra-secure communication by leveraging quantum entanglement and next-generation encryption methods.",
//         category: "Technology",
//         image: "https://images.unsplash.com/photo-1581091870620-3f1c2a6b0b66",
//         author: "65f3a2b1c4e5f6a7b8c9d012",
//         commentsEnabled: true,
//         comments: []
//     },
//     {
//         title: "How AR is Changing Real-World Experiences",
//         description:
//             "Augmented Reality is transforming industries like gaming, education, and retail by blending digital content with the physical world.",
//         category: "Technology",
//         image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620",
//         author: "65f3a2b1c4e5f6a7b8c9d013",
//         commentsEnabled: true,
//         comments: []
//     },
//     {
//         title: "Cyber-Physical Systems in Modern Engineering",
//         description:
//             "Cyber-physical systems integrate computation with physical processes, enabling smarter factories, autonomous vehicles, and intelligent infrastructure.",
//         category: "Technology",
//         image: "https://images.unsplash.com/photo-1581091215367-59ab6c8f6c5c",
//         author: "65f3a2b1c4e5f6a7b8c9d014",
//         commentsEnabled: true,
//         comments: []
//     }
// ];

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
        category: "65c1a0000000000000000002", // Audio
        brand: "65b2b0000000000000000001",    // Sony
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
        category: "65c1a0000000000000000007", // Accessories
        brand: "65b2b0000000000000000003",    // Apple
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
        category: "65c1a0000000000000000009", // Bags
        brand: "65b2b0000000000000000008",    // Peak Design
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
        category: "65c1a0000000000000000010", // Home & Appliances
        brand: "65b2b0000000000000000004",    // Samsung
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
        category: "65c1a0000000000000000008", // Wearables
        brand: "65b2b0000000000000000004",    // Samsung
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
        category: "65c1a0000000000000000003", // Gaming
        brand: "65b2b0000000000000000002",    // Logitech
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
        category: "65c1a0000000000000000003", // Gaming
        brand: "65b2b0000000000000000002",    // Logitech
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
        category: "65c1a0000000000000000004", // Cameras
        brand: "65b2b0000000000000000005",    // GoPro
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
        category: "65c1a0000000000000000002", // Audio
        brand: "65b2b0000000000000000001",    // Sony
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
        category: "65c1a0000000000000000007", // Accessories
        brand: "65b2b0000000000000000008",    // Peak Design
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
        category: "65c1a0000000000000000007", // Accessories (Using as placeholder for active gear)
        brand: "65b2b0000000000000000007",    // Nike
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
        category: "65c1a000000000000000010",  // Home & Appliances
        brand: "65b2b0000000000000000009",    // DeLonghi
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
        category: "65c1a0000000000000000004", // Cameras
        brand: "65b2b0000000000000000005",    // GoPro
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
        category: "65c1a0000000000000000005", // Storage
        brand: "65b2b0000000000000000006",    // SanDisk
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
        category: "65c1a0000000000000000008", // Wearables
        brand: "65b2b0000000000000000003",    // Apple
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
        category: "65c1a0000000000000000002", // Audio
        brand: "65b2b0000000000000000001",    // Sony
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
        category: "65c1a0000000000000000004", // Cameras
        brand: "65b2b0000000000000000002",    // Logitech
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
        category: "65c1a0000000000000000003", // Gaming
        brand: "65b2b0000000000000000002",    // Logitech
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
        category: "65c1a0000000000000000006", // Smart Home
        brand: "65b2b0000000000000000003",    // Apple
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
        category: "65c1a0000000000000000009", // Bags
        brand: "65b2b0000000000000000008",    // Peak Design
        seller: "000000000000000000000000",
        isDeleted: false
    }
];
const seedDatabase = async () => {
    try {

        await mongoose.connect("mongodb://localhost:27017");
        console.log("Database connected successfully for seeding...");


        const formattedBlogs = products.map(blog => ({
            name: blog.name,
            description: blog.description,
            price: blog.price,
            stock: blog.stock,
            thumbnails: blog.thumbnails,
            images: blog.images,
            category: blog.category,
            seller: blog.seller,
            brand: blog.brand,
            isDeleted: blog.isDeleted,
            discount: blog.discount,
            oldPrice: blog.oldPrice
        }));
        await Product.deleteMany({});
        await Product.insertMany(formattedBlogs);
        console.log("20 Blog Posts successfully seeded to MongoDB! 🎉");
        await mongoose.disconnect();
        process.exit(0);

    } catch (error: any) {
        console.error("Seeding failed ❌:", error.message);
        process.exit(1);
    }
};

seedDatabase();