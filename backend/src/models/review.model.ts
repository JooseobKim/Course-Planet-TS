import mongoose from 'mongoose';
import { CourseDocument } from './course.model';
import { UserDocument } from './user.model';

export interface IReview {
  likes: UserDocument['_id'][];
  owner: UserDocument['_id'];
  courseId: CourseDocument['_id'];
  merit: string;
  demerit: string;
  rating: number;
  difficulty: string;
}

export interface ReviewDocument extends IReview, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new mongoose.Schema(
  {
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'user',
      },
    ],
    owner: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
    courseId: {
      type: mongoose.Types.ObjectId,
      ref: 'course',
    },
    merit: {
      type: String,
      required: true,
    },
    demerit: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ReviewDocument>('review', reviewSchema);
