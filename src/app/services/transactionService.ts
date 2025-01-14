import { Transaction } from 'src/lib/types';

export async function postTransaction({ tax, discount, totalPrice, customerName, note = '', type, userId }: Omit<Transaction, 'cashier' | 'date' | 'menus' | 'payments' | 'status'>) {
  console.log('posted');
}
