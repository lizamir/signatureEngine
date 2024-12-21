import express from 'express';
import signatureRoutes from './routes/signatureRoutes';
import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';

const app = express();

// Middleware: JSON parsing
app.use(express.json());

//  routes
app.use('/api/signature', signatureRoutes);

app.use(errorHandler);

app.use(cors());

export default app;
