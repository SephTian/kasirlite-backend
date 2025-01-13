import prisma from '../../utils/prisma';

export async function getAllMenu({ keyword = '', type = '' }: { keyword: string | undefined; type: string | undefined }) {
  const menus = await prisma.menu.findMany({
    include: {
      menuType: {
        // Ini akan meng-join tabel 'menu_type'
        select: {
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
      menuType: {
        name: {
          contains: type, // Similar to SQL's LIKE '%value%'
          mode: 'insensitive', // Optional: Makes the search case-insensitive
        },
      },
    },
    orderBy: [{ menuType: { name: 'asc' } }, { menuType: { isAdditional: 'desc' } }, { disabled: 'desc' }],
  });

  if (!menus) return [];

  return menus;
}
