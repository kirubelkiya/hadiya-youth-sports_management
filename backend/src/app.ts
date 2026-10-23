import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import authRoutes from './routes/auth.routes';
import newsRoutes from './routes/news.routes';
import eventsRoutes from './routes/events.routes';
import youthRoutes from './routes/youth.routes';
import sportsRoutes from './routes/sports.routes';
import achievementsRoutes from './routes/achievements.routes';
import galleryRoutes from './routes/gallery.routes';
import contactRoutes from './routes/contact.routes';
import registrationRoutes from './routes/registration.routes';
import uploadRoutes from './routes/upload.routes';
import { errorHandler, notFound } from './middleware/error.middleware';

dotenv.config();

const app = express();

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve uploaded images as static files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'Hadiya Zone API is running', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/youth-programs', youthRoutes);
app.use('/api/sports', sportsRoutes);
app.use('/api/achievements', achievementsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/upload', uploadRoutes);

// 404 & error handlers
app.use(notFound);
app.use(errorHandler);

export default app;
