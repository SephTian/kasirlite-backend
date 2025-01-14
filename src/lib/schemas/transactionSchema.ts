import { z } from 'zod';

export const postTransactionSchema = z
  .object({
    cart: z.array(
      z.object({
        menuId: z.coerce.number().optional().nullable(),
        menuName: z.string({ required_error: 'Jenis Pembayaran harus dipilih', invalid_type_error: 'Jenis Pembayaran harus dipilih' }).min(2, 'Nama menu minimal 2 huruf'),
        subPrice: z.coerce.number().min(0, 'Harga minimal 0 rupiah'),
        quantity: z.coerce.number().min(1, 'Minimal 1 kuantitas menu'),
      })
    ),
    discount: z.coerce.number().min(0, 'Diskon minimal 0 rupiah'),
    totalPrice: z.coerce.number().min(0, 'Total Price minimal 0 rupiah'),
    type: z.enum(['DIANTAR', 'DITEMPAT', 'DIBUNGKUS']),
    paymentKind: z
      .string({ required_error: 'Jenis Pembayaran harus dipilih', invalid_type_error: 'Jenis Pembayaran harus dipilih' })
      .refine((val) => val === 'N' || val === 'L', { message: 'Huruf harus N atau L' }),
    paymentType: z.string().nullable().optional(),
    customerName: z.string({ required_error: 'Nama harus diisi', invalid_type_error: 'Nama harus diisi' }).min(3, 'Nama minimal harus 3 digit'),
    note: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentKind === 'N' && !data.paymentType) {
      ctx.addIssue({
        code: 'custom', // Kode error harus ada
        path: ['paymentType'], // Field yang terkena error
        message: 'Metode Pembayaran harus dipilih',
      });
    }
  });
