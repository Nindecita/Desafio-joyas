import { pool } from "../../config/db/conection.db.js";
import format from "pg-format";

export const jewelsModel = async ({
  limits = 10,
  page = 1,
  order_by = "id_ASC",
}) => {
  const [columna, orden] = order_by.split("_");
  const offset = Math.abs((page - 1) * limits);

  //Creo la consulta con la libreria format para mayor seguridad
  const formattedQuery = format(
    "SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s",
    columna,
    orden,
    limits,
    offset
  );

  const { rows: joyas } = await pool.query(formattedQuery);
  return joyas;
};

export const filtersJewelsModel = async ({
  precio_min,
  precio_max,
  categoria,
  metal,
}) => {
  let filtros = [];

  if (precio_min) {
    filtros.push(`precio >= ${precio_min}`);
  }
  if (precio_max) {
    filtros.push(`precio <= ${precio_max}`);
  }
  if (categoria) {
    filtros.push(`categoria = '${categoria}'`);
  }
  if (metal) {
    filtros.push(`metal = '${metal}'`);
  }
  let query = "SELECT * FROM inventario";
  if (filtros.length > 0) {
    filtros = filtros.join(" AND ");
    query += ` WHERE ${filtros}`;
  }

  const { rows: joyas } = await pool.query(query);
  if (joyas.length === 0) {
    return { error: "No se encontraron joyas" };
  }
  return joyas;
};
