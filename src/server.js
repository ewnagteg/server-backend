import './config/loadEnv.js'; // Always FIRST
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import miscRoutes from './routes/api/miscRoutes.js';
import playerRoutes from './routes/api/playerRoutes.js';
import playerStatsRoutes from './routes/api/playerStatsRoutes.js';
import teamRoutes from './routes/api/teamRoutes.js';
import notesRoutes from './routes/api/notesRoutes.js';
import groupsRoutes from './routes/api/groupsRoutes.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(bodyParser.json());

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20, // limit each ip to 20 reqs per min (windowMs)
  message: {
    status: 429,
    error: 'Too many requests, please try again later.',
  },
});

app.use('/api', apiLimiter);

app.use('/api', miscRoutes);
app.use('/api', playerRoutes);
app.use('/api', playerStatsRoutes);
app.use('/api', teamRoutes);
app.use('/api', notesRoutes);
app.use('/api', groupsRoutes);

export default app;