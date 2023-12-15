import axios from "axios";

export const getCurrentUser = async (userToken) => {
  return await axios.post(`${import.meta.env.VITE_API_URL}/auth`, userToken);
};

export const createTrazabilidad = async (token, body) => {
  return await axios.post(
    `${import.meta.env.VITE_API_URL}/users/update_trazabilidad`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getSolicitudesNoGestionadas = async (token, body) => {
  const {
    page,
    per_page,
    fecha_creacion_solped_start,
    fecha_creacion_solped_end,
    ceco,
    categoria_item,
    item,
    solicitante,
    grupo_compra,
    grupo_articulo,
  } = body;

  // Crear un objeto con los parámetros
  const params = {
    page,
    per_page,
    fecha_creacion_solped_start,
    fecha_creacion_solped_end,
    ceco,
    categoria_item,
    item,
    solicitante,
    grupo_compra,
    grupo_articulo,
  };

  // Filtrar los parámetros que no están vacíos
  const filteredParams = Object.entries(params).reduce((acc, [key, value]) => {
    if (value) {
      acc[key] = value;
    }
    return acc;
  }, {});

  // Construir la cadena de consulta (query string)
  const queryString = new URLSearchParams(filteredParams).toString();

  console.log(queryString);

  return await axios.get(
    `${import.meta.env.VITE_API_URL}/users/get_r2_filtered?${queryString}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getR2Trazabilidad = async (token, body) => {
  const {
    page,
    per_page,
    fecha_creacion_solped_start,
    fecha_creacion_solped_end,
    ceco,
    categoria_item,
    item,
    solicitante,
    grupo_compra,
    grupo_articulo,
    estado_pedido,
  } = body;

  // Crear un objeto con los parámetros
  const params = {
    page,
    per_page,
    fecha_creacion_solped_start,
    fecha_creacion_solped_end,
    ceco,
    categoria_item,
    item,
    solicitante,
    grupo_compra,
    grupo_articulo,
    estado_pedido,
  };

  // Filtrar los parámetros que no están vacíos
  const filteredParams = Object.entries(params).reduce((acc, [key, value]) => {
    if (value) {
      acc[key] = value;
    }
    return acc;
  }, {});

  // Construir la cadena de consulta (query string)
  const queryString = new URLSearchParams(filteredParams).toString();

  console.log(queryString);

  return await axios.get(
    `${import.meta.env.VITE_API_URL}/users/get_r2_trazabilidad?${queryString}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getR2pp = async (token, body) => {
  const {
    page,
    per_page,
    fecha_creacion_solped_start,
    fecha_creacion_solped_end,
    ceco,
    categoria_item,
    item,
    solicitante,
    grupo_compra,
    grupo_articulo,
    estado_pedido,
  } = body;

  // Crear un objeto con los parámetros
  const params = {
    page,
    per_page,
    fecha_creacion_solped_start,
    fecha_creacion_solped_end,
    ceco,
    categoria_item,
    item,
    solicitante,
    grupo_compra,
    grupo_articulo,
    estado_pedido,
  };

  // Filtrar los parámetros que no están vacíos
  const filteredParams = Object.entries(params).reduce((acc, [key, value]) => {
    if (value) {
      acc[key] = value;
    }
    return acc;
  }, {});

  // Construir la cadena de consulta (query string)
  const queryString = new URLSearchParams(filteredParams).toString();

  console.log(queryString);

  return await axios.get(
    `${import.meta.env.VITE_API_URL}/users/get_r2_pp?${queryString}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
