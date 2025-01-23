import { TransactionDetail } from '../../lib/types';
import prisma from '../../utils/prisma';

export async function addTransactionDetail(transactionDetail: Omit<TransactionDetail, 'menu' | 'transactionId' | 'id'>[], transactionId: TransactionDetail['transactionId']) {
  let newInsertedData: Omit<TransactionDetail, 'menu' | 'id'>[] = [];
  for (const e of transactionDetail) {
    const transactionDetail = await prisma.transaction_detail.create({
      data: {
        transactionId: transactionId,
        menuId: e.menuId || null,
        quantity: e.quantity,
        menuName: e.menuName,
        subPrice: e.subPrice,
      },
    });

    newInsertedData = [...newInsertedData, { ...transactionDetail, quantity: Number(transactionDetail.quantity), subPrice: Number(transactionDetail.subPrice) }];
  }

  return newInsertedData;
}
