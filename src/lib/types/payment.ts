import { PaymentType } from './paymentType';

export type Payment = {
  id: number;
  transactionId: number;
  paymentTypeId: number;
  name: string;
  payment: number;
  paymentType: PaymentType;
  proof?: string | null;
  date: string;
};
