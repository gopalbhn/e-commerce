import express from "express";
import cors from "cors";
import userRouter from './routes/userRouter.js'
import wishlistRouter from "./routes/wishListRouter.js"
import productRouter from "./routes/productRouter.js"
import cartRouter from "./routes/cartRouter.js"
import categoryRouter from "./routes/categoryRouter.js"
import "./models/categoryModel.js";
import "./models/brand.js";
import cookieParser from "cookie-parser";
import addressRouter from "./routes/addressRouter.js";
import orderRouter from "./routes/orderRoute.js"
const app = express();

app.use(cookieParser());
app.use(cors(
  {
    origin: process.env.FRONTEND_URI,
    credentials: true
  }
));
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/wishlist', wishlistRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/category', categoryRouter)
app.use('/api/address', addressRouter)
app.use('/api/order', orderRouter)
app.get('/health-check', (req, res) => {
  const healthData = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  };

  try {
    res.status(200).send(healthData);
  } catch (error: any) {
    healthData.message = error.message;
    res.status(503).send(healthData);
  }

})

export default app;