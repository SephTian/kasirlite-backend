import { Router } from 'express';
import { getMenuCategories } from '../controllers/menuCategoryController';
const router = Router();

router.get('/', getMenuCategories);

export default router;
