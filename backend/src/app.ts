import express from 'express';
import signatureRoutes from './routes/signatureRoutes';
import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

// Middleware: JSON parsing
app.use(express.json());

//  routes
app.use('/api', signatureRoutes);

app.use(errorHandler);

// הגדרת תיקייה סטטית
app.use('/images', express.static(path.join(__dirname, 'public/images')));

export default app;
