export const getColumns = (data) => {
  if (!data) return [{ name: "DETALLE", uid: "detalle" }];

  const columns = Object.keys(data).map((key) => {
    return {
      name: key.replace(/_/g, " ").toUpperCase(), // Replace underscores with spaces and convert to uppercase
      uid: key,
    };
  });

  columns.push({ name: "DETALLE", uid: "detalle" });

  return columns;
};
