import pool from '../../config/db.js';

export async function getAllMenu() {
  const query = `
    SELECT m.id, m.name, m.image, m.menu_type_id as "menuTypeId", mt.name as "menuType", mt.is_additional as "isAdditional", m.price, m.discount, m.disabled
    FROM "menu" AS m
    LEFT JOIN "menu_type" AS mt ON m.menu_type_id = mt.id
    ORDER BY mt.name ASC, mt.is_additional DESC, m.disabled DESC`;
  const menu = await pool.query(query.trim());

  return menu.rows;
}
