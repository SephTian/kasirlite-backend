import { getAllMenu } from '../services/menuService';

export async function postOrder(req, res) {
  try {
    const { discount, menus, name, note, paymentKind, paymentType, totalPrice, type } = req.body;

    if (!discount) {
      return res.status(400).json({ status: 'failed', message: 'Diskon tidak boleh kosong', data: {} });
    }
    if (!menus) {
      return res.status(400).json({ status: 'failed', message: 'Menu tidak boleh kosong', data: {} });
    }
    if (!name) {
      return res.status(400).json({ status: 'failed', message: 'Nama tidak boleh kosong', data: {} });
    }
    if (!type) {
      return res.status(400).json({ status: 'failed', message: 'Tipe order tidak boleh kosong', data: {} });
    }
    if (!paymentKind) {
      return res.status(400).json({ status: 'failed', message: 'Jenis pembayaran tidak boleh kosong', data: {} });
    }
    if (!paymentType) {
      return res.status(400).json({ status: 'failed', message: 'Tipe pembayaran tidak boleh kosong', data: {} });
    }
    if (!totalPrice) {
      return res.status(400).json({ status: 'failed', message: 'Harga total tidak boleh kosong', data: {} });
    }

    const menu = await getAllMenu();

    return res.status(200).json({ status: 'ok', message: 'Berhasil menampilkan menu', data: { menu: menu } });
  } catch (error) {
    return res.status(400).json({ status: 'failed', message: 'Server Error', data: error.message });
  }
}
