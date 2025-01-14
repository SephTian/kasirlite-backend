import { TransactionDetail } from '../../lib/types';
import prisma from '../../utils/prisma';

export async function postTransactionDetail({ menuId, transactionId, subPrice, quantity, menuName }: Omit<TransactionDetail, 'menu, id'>) {
  const transactionDetail = await prisma.transaction_detail.create({
    data: {
      menuId: menuId || null,
      transactionId,
      quantity,
      menuName,
      subPrice,
    },
  });
}
