import { Request, Response } from 'express';
import { getAllMenuType } from '../services/menuTypeService';
import { jsonForBigInt } from '../../utils';

export async function getMenuTypes(req: Request, res: Response) {
  try {
    const menuTypes = await getAllMenuType();

    //Jika menu tidak ada
    if (menuTypes.length === 0) {
      res.status(200).json({ status: 'ok', message: 'Tipe menu kosong', data: { menuTypes: [] } });
      return;
    }

    res.status(200).send(jsonForBigInt({ status: 'ok', message: 'Berhasil menampilkan tipe menu', data: { menuTypes } }));
    return;
  } catch (error) {
    res.status(500).json({ status: 'failed', message: error instanceof Error ? error.message : 'Unknown error occurred', data: {} });
    return;
  }
}
