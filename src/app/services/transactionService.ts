import { TAX } from '../../utils/constan';
import { Transaction } from '../../lib/types';
import prisma from '../../utils/prisma';

export async function addTransaction({
  discount,
  totalPrice,
  customerName,
  paymentKind,
  note = '',
  type,
  userId,
}: Omit<Transaction, 'id' | 'cashier' | 'date' | 'menus' | 'payments' | 'status' | 'tax'> & { paymentKind: string }) {
  const tax = totalPrice * TAX;
  const transaction = await prisma.transaction.create({
    data: {
      userId,
      discount,
      tax,
      totalPrice,
      customerName,
      note,
      type: type,
      status: paymentKind === 'N' ? 'LUNAS' : 'BELUM_BAYAR',
      date: new Date(),
    },
  });
  return transaction;
}
