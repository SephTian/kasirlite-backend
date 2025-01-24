import prisma from '../../utils/prisma';

export async function getAllMenu({
  keyword = '',
  category = '',
  page = undefined,
  limit = undefined,
}: {
  keyword: string | undefined;
  category: string | undefined;
  page: number | undefined;
  limit: number | undefined;
}) {
  const skip = page && limit ? (page - 1) * limit : undefined;
  const take = limit || undefined;

  // query all menu
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
    skip: skip,
    take: take,
  });

  let totalItems = 0;
  if (page && limit) {
    totalItems = await prisma.menu.count({
      where: {
        name: {
          contains: keyword,
          mode: 'insensitive',
        },
        menuCategory: {
          name: {
            contains: category,
            mode: 'insensitive',
          },
        },
      },
    });
  }

  const pagination =
    page && limit
      ? {
          totalItems,
          totalPages: Math.ceil(totalItems / limit),
          currentPage: page,
          limit,
        }
      : null;

  if (!menus)
    return {
      menus: [],
      pagination,
    };

  return {
    menus,
    pagination,
  };
}
