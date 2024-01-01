const initialState = {
  page: 1,
  per_page: 10,
  fecha_creacion_solped_start: null,
  fecha_creacion_solped_end: null,
  ceco: null,
  categoria_item: null,
  item: null,
  solicitante: null,
  grupo_compra: null,
  grupo_articulo: null,
};

export const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FILTER_DATA":
      return action.payload;
    default:
      return state;
  }
};
