import { Router } from 'express';
import authRoute from './authRoute.js';
import menuRoute from './menuRoute.js';
import orderRoute from './orderRoute.js';

// INITIATE ROUTE
const router = Router();

// GROUPING ROUTE THEN EXPORT IT TO APP.JS
router.use('/auth', authRoute);
router.use('/menu', menuRoute);
router.use('/order', orderRoute);

export default router;
