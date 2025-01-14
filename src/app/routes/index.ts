import { Router } from 'express';
import authRoute from './authRoute';
import menuRoute from './menuRoute';
import menuCategoryRoute from './menuCategoryRoute';
import orderRoute from './transactionRoute';

// INITIATE ROUTE
const router = Router();

// GROUPING ROUTE THEN EXPORT IT TO APP.JS
router.use('/auth', authRoute);
router.use('/menu-categories', menuCategoryRoute);
router.use('/menus', menuRoute);
router.use('/transactions', orderRoute);

export default router;
