import express from 'express';
import dotenv from 'dotenv';
import { addReview, getReviewsByRestaurantId } from '../../controllers/index.js';

const router = express.Router();
dotenv.config();

// GET /api/v1/reviews/
router.get('/:id', getReviewsByRestaurantId);

// POST /api/v1/reviews/id
router.post('/:id', addReview);

export default router;