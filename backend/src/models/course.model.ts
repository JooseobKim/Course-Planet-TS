import mongoose from 'mongoose';
import { ReviewDocument } from './review.model';

export interface ICourse {
  title: string;
  instructor: string;
  description: string;
  image: string;
  price: string;
  url: string;
  platform: string;
  review: ReviewDocument['_id'][];
}

export interface CourseDocument extends ICourse, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    instructor: { type: String, default: '자료 없음' },
    description: { type: String, default: '자료 없음' },
    image: {
      type: String,
      default:
        'https://res.cloudinary.com/duw5jvlb4/image/upload/v1624383950/samples/no-image_dfpama.png',
    },
    price: {
      type: String,
      default: '자료 없음',
    },
    url: {
      type: String,
      required: true,
    },
    platform: { type: String, required: true },
    review: [{ type: mongoose.Types.ObjectId, ref: 'review' }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<CourseDocument>('course', courseSchema);
