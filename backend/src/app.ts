import express from 'express';
import signatureRoutes from './routes/signatureRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// Middleware: JSON parsing
app.use(express.json());

//  routes
app.use('/api/signature', signatureRoutes);

app.use(errorHandler);

export default app;
