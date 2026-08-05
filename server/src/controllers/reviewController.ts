import { Request, Response } from 'express';
import Review from '../models/reviewModel.js';

const postReview = async (req: Request, res: Response) => {
  try {

    const { productId, rating, comment } = req.body;
    const userId = req.user?.id;
    console.log("Received review data:", { productId, userId, rating, comment });
    const newReview = new Review({
      product: productId,
      user: userId,
      rating,
      comment,
    });

    const savedReview = await newReview.save();
    res.status(201).json({
      success: true,
      savedReview
    });

  } catch (error: any) {
    res.status(500).json({ message: 'Error posting review', error });
  }
}

const getReviewsByProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    console.log("Fetching reviews for product:", productId);
    const reviews = await Review.find({ product: productId }).populate('user', 'name email').exec();
    res.status(200).json({
      success: true,
      reviews
    });
  }
  catch (error: any) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};

export { postReview, getReviewsByProduct };