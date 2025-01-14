import { TransactionDetail } from 'src/lib/types';

export async function postTransactionDetail({ menuId, transactionId, subPrice, quantity, menuName }: Omit<TransactionDetail, 'menu, id'>) {
  console.log('posted');
}
