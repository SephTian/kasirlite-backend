import prisma from '../../utils/prisma';

export async function getAllMenuCategory() {
  const menuCategories = await prisma.menu_category.findMany();

  return menuCategories;
}
