import { Router } from 'express';
import { getMenus } from '../controllers/menuController';
const router = Router();

router.get('/', getMenus);

export default router;
