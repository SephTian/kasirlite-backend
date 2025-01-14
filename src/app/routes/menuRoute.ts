import { Router } from 'express';
import { getMenus } from '../controllers/menuController';
import { authProtect } from '../middlewares/authMiddleware';
const router = Router();

router.get('/', authProtect, getMenus);

export default router;
