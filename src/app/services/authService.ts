import bcrypt from 'bcrypt';
import prisma from '../../utils/prisma';

export async function checkAccount(email: string) {
  const user = await prisma.user.findFirst({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      role: {
        select: {
          name: true,
        },
      },
    },
  });

  if (user) {
    return {
      ...user,
      id: Number(user.id), // Konversi BigInt ke string
    };
  }

  return null;
}

export async function checkPassword(userPassword: string, dbPassword: string) {
  const match = await bcrypt.compare(userPassword, dbPassword);

  return match;
}
