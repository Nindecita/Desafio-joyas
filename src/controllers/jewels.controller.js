import { jewelsModel, filtersJewelsModel } from "../models/jewels.model.js";

export const jewels = async (req, res) => {
  try {
    let { limits, page, order_by } = req.query;

    if (limits === undefined) {
      limits = 2;
    }
    if (page === undefined) {
      page = 1;
    }
    if (order_by === undefined) {
      order_by = "id_ASC";
    }

    const result = await jewelsModel({ limits, page, order_by });
    const HATEOAS = getJoyasHateoas(result);
    return res.json(HATEOAS);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: `Error al obtener las joyas: ${error.message}` });
  }
};

export const filtersJewels = async (req, res) => {
  try {
    const { precio_min, precio_max, categoria, metal } = req.query;
    const result = await filtersJewelsModel({
      precio_min,
      precio_max,
      categoria,
      metal,
    });
    if (result.error) {
      return res.status(404).json(result);
    }

    return res.json(result);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: `Error al obtener las joyas: ${error.message}` });
  }
};

/* HATEOAS JOYAS */
export const getJoyasHateoas = (joyas) => {
  const results = joyas.map((j) => {
    return {
      //id: j.id,
      name: j.nombre,
      //stock: j.stock,
      //precio: j.precio,
      //categoria: j.categoria,
      //metal: j.metal,
      href: `http://localhost:3000/joyas/${j.id}`,
    };
  });
  const stockTotal = joyas.reduce((accumulator, item) => {
    return (accumulator += item.stock);
  }, 0);
  const total = joyas.length;
  return {
    total,
    stockTotal,
    results,
  };
};
