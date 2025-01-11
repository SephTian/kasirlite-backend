import { getAllMenu } from '../services/menuService';
import { Request, Response } from 'express';

export async function postOrder(req: Request, res: Response) {
  try {
    const { discount, menus, name, note, paymentKind, paymentType, totalPrice, type } = req.body;

    const menu = await getAllMenu();

    res.status(200).json({ status: 'ok', message: 'Berhasil menampilkan menu', data: { menu: menu } });
    return;
  } catch (error) {
    res.status(400).json({ status: 'failed', message: error instanceof Error ? error.message : 'Unknown error occurred', data: {} });
    return;
  }
}
