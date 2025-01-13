import { Router } from 'express';
import { getMenuTypes } from '../controllers/menuTypeController';
const router = Router();

router.get('/', getMenuTypes);

export default router;
