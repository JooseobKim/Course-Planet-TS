import express from 'express';
import logged from '../middleware/logged.middleware';
// eslint-disable-next-line prettier/prettier
import { deleteUser, getDetailUser, getReviewByUserId, resetPassword, updateUser } from '../controller/user.controller';

const userRouter = express.Router();

userRouter.post('/reset_password', logged, resetPassword);

userRouter.get('/:username/review', getReviewByUserId);

userRouter
  .route('/:username')
  .get(getDetailUser)
  .patch(logged, updateUser)
  .delete(logged, deleteUser);

export default userRouter;
