import express from 'express';
import dotenv from 'dotenv';
import connectDB from './configs/db.js';
import SingUpRoute from './routes/auth.routes.js';
import User from './models/user.model.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

connectDB();
await User.syncIndexes();

const app = express();
app.use(express.json({ extend: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173','http://192.168.1.5:5173/'],
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send('working');
});

app.use('/auth', SingUpRoute);

app.listen(
  process.env.PORT || 3000,
  console.log(`server running on ${process.env.PORT} || 3000 `)
);
