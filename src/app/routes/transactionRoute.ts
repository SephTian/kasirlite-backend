import { Router } from 'express';
import { postTransaction } from '../controllers/transactionController';

const router = Router();

router.post('/', postTransaction);

export default router;
