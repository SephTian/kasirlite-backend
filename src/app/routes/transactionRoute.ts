import { Router } from 'express';
import { postTransaction } from '../controllers/transactionController';
import { authProtect } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authProtect, postTransaction);

export default router;
