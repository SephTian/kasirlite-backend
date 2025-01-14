import { postTransactionSchema } from '../../lib/schemas/transactionSchema';
import { Request, Response } from 'express';
import { addTransaction } from '../services/transactionService';
import { JwtPayload, verify } from 'jsonwebtoken';
import { jsonForBigInt } from '../../utils';

export async function postTransaction(req: Request, res: Response) {
  try {
    //validate the data
    const validatedData = postTransactionSchema.safeParse(req.body);
    if (!validatedData.success) {
      res.status(400).json({
        status: 'failed',
        message: validatedData.error.errors[0].message,
        data: {},
      });
      return;
    }
    // Take id from token
    const token = req.headers.authorization?.split(' ')[1] as string;
    const decodedToken = verify(token, process.env.SECRET_KEY as string) as JwtPayload;

    const b = validatedData.data;
    const data = await addTransaction({
      discount: b.discount,
      totalPrice: b.totalPrice,
      customerName: b.customerName,
      paymentKind: b.paymentKind,
      note: b.note,
      type: b.type,
      userId: decodedToken.id,
    });

    //@ TODO input ke transaction detail
    for (const cartItem of b.cart) {
    }

    //@ TODO input ke payment jika bayar langsung
    res.status(200).send(jsonForBigInt({ status: 'ok', message: 'Berhasil menambahkan transaksi', data }));
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
