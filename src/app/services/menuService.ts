import prisma from '../../utils/prisma';

export async function getAllMenu({
  keyword = '',
  category = '',
  page = undefined,
  minPrice = undefined,
  maxPrice = undefined,
}: {
  keyword: string | undefined;
  category: string | undefined;
  page: number | undefined;
  minPrice: number | undefined;
  maxPrice: number | undefined;
}) {
  const LIMIT = 2;
  const skip = page && LIMIT ? (page - 1) * LIMIT : undefined; // for prisma
  const take = page ? LIMIT : undefined; // for prisma

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
      price: {
        ...(minPrice && { gte: minPrice }),
        ...(maxPrice && { lte: maxPrice }),
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
  if (page) {
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

  const pagination = page
    ? {
        totalItems,
        totalPages: Math.ceil(totalItems / LIMIT),
        currentPage: page,
        limit: LIMIT,
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
