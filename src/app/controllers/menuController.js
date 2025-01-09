import { getAllMenu } from '../services/menuService.js';

export async function getMenu(req, res) {
  try {
    const menu = await getAllMenu();

    //Jika user tidak ditemukan
    if (menu.length === 0) {
      return res.status(200).json({ status: 'ok', message: 'Menu kosong', data: { menu: [] } });
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

    return res.status(200).json({ status: 'ok', message: 'Berhasil menampilkan menu', data: { menu: transformedData } });
  } catch (error) {
    return res.status(500).json({ status: 'failed', message: 'Server Error', data: error.message });
  }
}
