import express from 'express';
import {
  createReview,
  deleteReview,
  getReviews,
  likeReview,
  unlikeReview,
  updateReview,
} from '../controller/review.controller';
import logged from '../middleware/logged.middleware';

const reviewRouter = express.Router();

reviewRouter
  .route('/')
  .post(logged, createReview)
  .patch(logged, updateReview)
  .delete(logged, deleteReview);

reviewRouter.patch('/:id/like', logged, likeReview);

reviewRouter.patch('/:id/unlike', logged, unlikeReview);

reviewRouter.get('/:courseId', getReviews);

export default reviewRouter;
