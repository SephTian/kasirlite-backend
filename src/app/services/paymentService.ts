import { Payment } from '../../lib/types';

export async function postPayment({ transactionId, name, payment, paymentTypeId }: Omit<Payment, 'id' | 'paymentType' | 'date'>) {
  console.log('posted');
}
