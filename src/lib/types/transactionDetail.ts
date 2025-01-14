import { Menu } from './menu';
import { Transaction } from './transaction';

export type TransactionDetail = {
  id: number;
  transactionId: Pick<Transaction, 'id'>;
  menuId: number;
  menu?: Menu | null;
  menuName: string;
  quantity: number;
  subPrice: number;
};
