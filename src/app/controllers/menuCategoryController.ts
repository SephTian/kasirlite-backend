import { Request, Response } from 'express';
import { getAllMenuCategory } from '../services/menuCategoryService';
import { jsonForBigInt } from '../../utils';

export async function getMenuCategories(req: Request, res: Response) {
  try {
    const menuCategories = await getAllMenuCategory();

    //Jika menu tidak ada
    if (menuCategories.length === 0) {
      res.status(200).json({ status: 'ok', message: 'Tipe menu kosong', data: { menuCategories: [] } });
      return;
    }

    res.status(200).send(jsonForBigInt({ status: 'ok', message: 'Berhasil menampilkan tipe menu', data: { menuCategories } }));
    return;
  } catch (error) {
    res.status(500).json({ status: 'failed', message: error instanceof Error ? error.message : 'Unknown error occurred', data: {} });
    return;
  }
}
