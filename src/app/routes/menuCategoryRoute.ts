import { Router } from 'express';
import { getMenuCategories } from '../controllers/menuCategoryController';
import { authProtect } from '../middlewares/authMiddleware';
const router = Router();

router.get('/', authProtect, getMenuCategories);

export default router;
