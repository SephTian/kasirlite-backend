import prisma from '../../utils/prisma';

export async function getAllMenu({ keyword = '', category = '' }: { keyword: string | undefined; category: string | undefined }) {
  const menus = await prisma.menu.findMany({
    select: {
      id: true,
      image: true,
      name: true,
      price: true,
      discount: true,
      disabled: true,
      menuCategory: {
        select: {
          id: true,
          name: true,
          isAdditional: true,
        },
      },
    },
    where: {
      name: {
        contains: keyword, // Similar to SQL's LIKE '%value%'
        mode: 'insensitive', // Optional: Makes the search case-insensitive
      },
      menuCategory: {
        name: {
          contains: category, // Similar to SQL's LIKE '%value%'
          mode: 'insensitive', // Optional: Makes the search case-insensitive
        },
      },
    },
    orderBy: [{ menuCategory: { name: 'asc' } }, { menuCategory: { isAdditional: 'desc' } }, { disabled: 'desc' }],
  });

  if (!menus) return [];

  return menus;
}
