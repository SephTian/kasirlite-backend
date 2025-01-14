import { postTransactionSchema } from '../../lib/schemas/transactionSchema';
import { Request, Response } from 'express';

export async function postTransaction(req: Request, res: Response) {
  try {
    const validatedData = postTransactionSchema.safeParse(req.body);
    if (!validatedData.success) {
      res.status(400).json({
        status: 'failed',
        message: validatedData.error.errors[0].message,
        data: {},
      });
      return;
    }

    res.status(200).json({ status: 'ok', message: 'Berhasil menambahkan transaksi', data: validatedData.data });
    return;
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({
        status: 'failed',
        message: e.message,
        data: {},
      });
      return;
    }

    res.status(500).json({ status: 'failed', message: 'Internal server error', data: {} });
    return;
  }
}
