import { Router } from 'express';
import authRoute from './authRoute';
import menuRoute from './menuRoute';
import menuTypeRoute from './menuTypeRoute';
import orderRoute from './orderRoute';

// INITIATE ROUTE
const router = Router();

// GROUPING ROUTE THEN EXPORT IT TO APP.JS
router.use('/auth', authRoute);
router.use('/menus', menuRoute);
router.use('/menutypes', menuTypeRoute);
router.use('/orders', orderRoute);

export default router;
