import mongoose from 'mongoose';

export interface IUser {
  username: string;
  userId: string;
  email: string;
  password: string;
  avatar: string;
  role: number;
  mobile: string;
  address: string;
}

export interface UserDocument extends IUser, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 20,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/duw5jvlb4/image/upload/v1624169200/samples/avatar_default6_ctvu5b.png',
    },
    role: {
      type: Number,
      default: 0,
    },
    mobile: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<UserDocument>('user', userSchema);
