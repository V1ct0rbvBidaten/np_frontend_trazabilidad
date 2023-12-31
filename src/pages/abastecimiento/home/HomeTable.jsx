import { useCallback, useMemo, useState, useRef } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Pagination,
  Spinner,
} from "@nextui-org/react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { getColumns } from "../../../functions/tableUtilities";
import ModalHome from "./ModalHome";
import { uidsToRemoveHome } from "../../../components/utils";

const HomeTable = ({ data, filter, setFilter }) => {
  const [open, setOpen] = useState(false);
  const allColumns = useMemo(() => getColumns(data.data[0]), [data.data[0]]);

  const columns = allColumns.filter(
    (item) => !uidsToRemoveHome.includes(item.uid)
  );

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
  } = filter;

  const solpedData = useRef([]);

  const handleModal = (value) => {
    console.log(value);
    if (open === true) {
      setOpen(!open);
    } else {
      setOpen(!open);
      solpedData.current = value;
      // solpedData.current = data.data.filter(
      //   (d) => d.docentry === value.docentry
      // );
    }
  };

  const renderCell = useCallback((value, columnKey) => {
    const cellValue = value[columnKey];

    switch (columnKey) {
      case "detalle":
        return (
          <Button
            className="bg-emerald-500 text-white"
            size="sm"
            startContent={<MagnifyingGlassIcon className="h-6" />}
            onClick={() => handleModal(value)}
          >
            Detalle
          </Button>
        );
      default:
        return <p className="text-xs ">{cellValue}</p>;
    }
  }, []);

  const pages = data.total_pages;

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {data.total_count} solicitudes en gestión
          </span>
          <label className="flex items-center text-default-400 text-small">
            Filas por pagina:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              value={per_page}
              onChange={(e) =>
                setFilter({ ...filter, per_page: Number(e.target.value) })
              }
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filter]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex w-full justify-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="secondary"
          page={page}
          total={pages}
          onChange={(page) => setFilter({ ...filter, page: Number(page) })}
        />
      </div>
    );
  }, [filter]);

  return (
    <>
      <ModalHome
        open={open}
        handleModal={handleModal}
        data={solpedData.current}
      />
      <Table
        isCompact
        aria-label="Example table with custom cells"
        topContent={topContent}
        bottomContent={bottomContent}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              className="bg-emerald-700 text-white text-xs"
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody loadingContent={<Spinner />} items={data.data}>
          {(item) => (
            <TableRow key={item.pkey}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default HomeTable;
