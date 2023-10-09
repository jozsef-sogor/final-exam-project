import express from 'express';
// import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import milestoneRoutes from './routes/milestoneRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

dotenv.config();

// const prisma = new PrismaClient({ datasources: { db: { url: process.env.DB_URL } } });

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/milestones', milestoneRoutes);
app.use('/api/notes', noteRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

