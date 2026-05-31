import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js';
import contestRoutes from './routes/contestRoutes.js';
import problemRoutes from './routes/problemRoutes.js';
import { startCronScheduler } from './utils/cronSchedular.js';
import { seedContestDataIfEmpty } from './services/codeforcesService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.FRONTEND_URL,
  'https://cf-stalker-web.onrender.com',
].filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.onrender.com')) {
      callback(null, true);
      return;
    }
    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(bodyParser.json());

app.use('/api/user', userRoutes);
app.use('/api/contests', contestRoutes);
app.use('/api/problems', problemRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  mongoose.connect(MONGO_URI)
    .then(async () => {
      console.log('Connected to MongoDB');
      startCronScheduler();
      await seedContestDataIfEmpty();
    })
    .catch((err) => {
      console.log(err);
    });
});
