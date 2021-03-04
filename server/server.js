import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

import { restaurantRoutes } from './routers/v1/index.js';

dotenv.config();
const app = express();
const { PORT = 4000 } = process.env;

// middlewares
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/v1/restaurants', restaurantRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
