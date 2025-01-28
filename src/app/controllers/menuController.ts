import { Request, Response } from 'express';
import { getAllMenu } from '../services/menuService';
import { jsonForBigInt } from '../../utils';

export async function getMenus(req: Request, res: Response) {
  try {
    // filter
    const keyword = (req.query.keyword as string) || '';
    const category = (req.query.category as string) || '';
    const maxPrice = Number(req.query.maxPrice) || undefined;
    const minPrice = Number(req.query.minPrice) || undefined;

    //pagination
    const page = Number(req.query.page) || undefined; // page

    const { menus, pagination } = await getAllMenu({ keyword, category, page, minPrice, maxPrice });

    //Jika menu tidak ada
    if (menus.length === 0) {
      res.status(200).json({ status: 'ok', message: 'Menu kosong', data: { menus: [], pagination } });
      return;
    }

    res.status(200).send(jsonForBigInt({ status: 'ok', message: 'Berhasil menampilkan menu', data: { menus, pagination } }));
    return;
  } catch (error) {
    res.status(500).json({ status: 'failed', message: error instanceof Error ? error.message : 'Unknown error occurred', data: {} });
    return;
  }
}
