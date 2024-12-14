import { getAllMenu } from '../services/menuService.js';

export async function getMenu(req, res) {
  try {
    const menu = await getAllMenu();

    //Jika user tidak ditemukan
    if (menu.length === 0) {
      return res.status(200).json({ status: 'ok', message: 'Menu kosong', data: { menu: [] } });
    }

    return res.status(200).json({ status: 'ok', message: 'Berhasil menampilkan menu', data: { menu: menu } });
  } catch (error) {
    return res.status(500).json({ status: 'failed', message: 'Server Error', data: error.message });
  }
}
