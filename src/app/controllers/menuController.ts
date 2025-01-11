import { Request, Response } from 'express';
import { getAllMenu } from '../services/menuService';

export async function getMenu(req: Request, res: Response) {
  try {
    const menu = await getAllMenu();

    //Jika user tidak ditemukan
    if (menu.length === 0) {
      res.status(200).json({ status: 'ok', message: 'Menu kosong', data: { menu: [] } });
      return;
    }

    const transformedData = menu.map((item) => {
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        discount: item.discount,
        menuType: {
          id: item.menuTypeId,
          name: item.menuType,
          isAdditional: item.isAdditional,
        },
      };
    });

    res.status(200).json({ status: 'ok', message: 'Berhasil menampilkan menu', data: { menu: transformedData } });
    return;
  } catch (error) {
    res.status(500).json({ status: 'failed', message: error instanceof Error ? error.message : 'Unknown error occurred', data: {} });
    return;
  }
}
