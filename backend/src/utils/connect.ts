import mongoose from 'mongoose';

const URI = process.env.MONGODB_URL as string;

const connectToDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('DB connected');
  } catch (err) {
    console.log((err as Error).message);
  }
};

export default connectToDB;
