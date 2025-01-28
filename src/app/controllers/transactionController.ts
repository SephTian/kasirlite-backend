import { postTransactionSchema } from '../../lib/schemas/transactionSchema';
import { Request, Response } from 'express';
import { addTransaction } from '../services/transactionService';
import { jsonForBigInt } from '../../utils';
import { decodeToken } from '../../utils/jwt';
import { addTransactionDetail } from '../services/transactionDetailService';
import { TransactionDetail } from 'src/lib/types';

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

    // decode token to take user id that use this api
    const decodedToken = decodeToken(req.headers.authorization?.split(' ')[1] as string);

    // take data that has been validated
    const vd = validatedData.data;

    // add transaction
    const newTransaction = await addTransaction({
      discount: vd.discount,
      totalPrice: vd.totalPrice,
      customerName: vd.customerName,
      paymentKind: vd.paymentKind,
      note: vd.note,
      type: vd.type,
      date: vd.date,
      userId: decodedToken.id,
    });

    //@ TODO input ke transaction detail -- DONE
    const newDetailTransaction = await addTransactionDetail(vd.cart, newTransaction.id);

    //@ TODO input ke payment jika bayar langsung

    // mapping data to make it better on frontend
    const transaction = {
      ...newTransaction,
      transactionDetail: newDetailTransaction.map((item) => {
        const temp: Partial<TransactionDetail> = item;
        delete temp['transactionId'];
        return temp;
      }),
    };

    res.status(200).send(jsonForBigInt({ status: 'ok', message: 'Berhasil menambahkan transaksi', data: { transaction } }));
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
