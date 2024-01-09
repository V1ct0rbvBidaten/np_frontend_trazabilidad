const INITIAL_VISIBLE_COLUMNS = [
  "id_solped",
  "fecha_creacion_solped",
  "solicitante",
  "item",
  "detalle",
  "stock",
  "estado_pedido",
];

export const filterColumnsReducer = (
  state = INITIAL_VISIBLE_COLUMNS,
  action
) => {
  switch (action.type) {
    case "FILTER_COLUMN":
      return action.payload;
    default:
      return state;
  }
};
