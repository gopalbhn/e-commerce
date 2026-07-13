import express from "express";
import cors from "cors";
import userRouter from './routes/userRouter.js'
import cookieParser from "cookie-parser";
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