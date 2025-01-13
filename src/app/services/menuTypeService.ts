import prisma from '../../utils/prisma';

export async function getAllMenuType() {
  const menuTypes = await prisma.menu_type.findMany();

  return menuTypes;
}
