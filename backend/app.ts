import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import connectToDB from './src/utils/connect';
import authRouter from './src/routes/auth.router';
import courseRouter from './src/routes/course.router';
import userRouter from './src/routes/user.router';
import reviewRouter from './src/routes/review.router';

const app: express.Application = express();

const privateKey = fs.readFileSync(
  '/etc/letsencrypt/live/courseplanet.site/privkey.pem',
  'utf8'
);
const certificate = fs.readFileSync(
  '/etc/letsencrypt/live/courseplanet.site/cert.pem',
  'utf8'
);
const ca = fs.readFileSync(
  '/etc/letsencrypt/live/courseplanet.site/chain.pem',
  'utf8'
);

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

//Create http server with certificate credentials
const https_server = https.createServer(credentials, app);

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/courses', courseRouter);
app.use('/api/review', reviewRouter);

const PORT = process.env.PORT || 4250;

// app.listen(PORT, async () => {
//   await connectToDB();
//   console.log('Server is running on port', PORT);
// });

https_server.listen(PORT, async () => {
  await connectToDB();
  console.log('Server is running on port', PORT);
});
