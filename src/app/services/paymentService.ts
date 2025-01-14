import { Payment } from 'src/lib/types';

export async function postPayment({ transactionId, name, payment, paymentTypeId }: Omit<Payment, 'id' | 'paymentType' | 'date'>) {
  console.log('posted');
}
