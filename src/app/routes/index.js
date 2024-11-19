import { Router } from 'express';
import authRoute from './authRoute.js';

// INITIATE ROUTE
const router = Router();

// GROUPING ROUTE THEN EXPORT IT TO APP.JS
router.use('/auth', authRoute);

export default router;
