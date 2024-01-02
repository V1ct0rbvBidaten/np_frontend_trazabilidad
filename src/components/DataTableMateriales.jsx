import { useCallback, useMemo, useState, useRef } from "react";
import { useDispatch } from "react-redux";
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

import {
  MagnifyingGlassIcon,
  FunnelIcon,
  TableCellsIcon,
} from "@heroicons/react/24/solid";
import { getColumns } from "../functions/tableUtilities";

import ModalComponent from "./Modal";
import ModalFilterColumns from "./ModalFilterColumns";
import ModalFilters from "./ModalFilters";

const INITIAL_VISIBLE_COLUMNS = [
  "id_solped",
  "fecha_creacion_solped",
  "solicitante",
  "item",
  "detalle",
  "stock",
  "estado_pedido",
];

const filterState = {
  fecha_creacion_solped_start: null,
  fecha_creacion_solped_end: null,
  ceco: null,
  item: null,
  solicitante: null,
  grupo_compra: null,
  grupo_articulo: null,
};

const DataTableMateriales = ({
  data,
  filter,
  setFilter,
  resetState,
  user,
  dinamicState,
  setDinamicState,
}) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openFilterColumns, setOpenFilterColumns] = useState(false);
  const [filterData, setFilterData] = useState(filterState);

  const [visibleColumns, setVisibleColumns] = useState(INITIAL_VISIBLE_COLUMNS);

  const columns = useMemo(() => getColumns(data.data[0]), [data.data[0]]);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const {
    fecha_creacion_solped_start,
    fecha_creacion_solped_end,
    ceco,
    categoria_item,
    item,
    solicitante,
    grupo_compra,
    grupo_articulo,
  } = filter;

  const { page, per_page } = dinamicState;

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

  const handleModalFilter = () => {
    setOpenFilter(!openFilter);
  };

  const handleModalFilterColumns = () => {
    console.log(openFilterColumns);
    setOpenFilterColumns(!openFilterColumns);
  };

  const renderCell = useCallback((value, columnKey) => {
    const cellValue = value[columnKey];

    switch (columnKey) {
      case "stock":
        return cellValue === "BODEGA" ? (
          <Button size="sm" className="bg-emerald-500 w-50 text-white">
            BODEGA
          </Button>
        ) : (
          <Button size="sm" className="bg-amber-500 w-50 text-white">
            COMPRAR
          </Button>
        );
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
        <div className="flex justify-end items-center gap-4">
          <Button
            className="bg-purple-700 text-white"
            size="sm"
            startContent={<TableCellsIcon className="h-6" />}
            onClick={handleModalFilter}
          >
            Filtrar Tabla
          </Button>
          <Button
            className="bg-foreground text-white"
            size="sm"
            startContent={<FunnelIcon className="h-6" />}
            onClick={handleModalFilterColumns}
          >
            Filtrar Columnas
          </Button>
          <label className="flex items-center text-default-400 text-small">
            Filas por pagina:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              value={per_page}
              onChange={(e) =>
                setDinamicState({
                  ...dinamicState,
                  per_page: Number(e.target.value),
                })
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
  }, [dinamicState, visibleColumns, openFilterColumns]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex w-full justify-between">
        <Pagination
          isCompact
          showControls
          showShadow
          color="secondary"
          page={page}
          total={pages}
          onChange={(page) =>
            setDinamicState({ ...dinamicState, page: Number(page) })
          }
        />
        <span className="text-default-400 text-small">
          Total {data.total_count} solicitudes
        </span>
      </div>
    );
  }, [filter]);

  const handleFilterChange = (e) => {
    setFilterData({ ...filterData, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = () => {
    console.log(filterData);
    dispatch({
      type: "FILTER_DATA",
      payload: filterData,
    });

    resetState();
  };

  return (
    <>
      <ModalComponent
        open={open}
        handleModal={handleModal}
        data={solpedData.current}
        resetState={resetState}
      />
      <ModalFilterColumns
        visibleColumns={visibleColumns}
        columns={columns}
        setVisibleColumns={setVisibleColumns}
        open={openFilterColumns}
        handleModal={handleModalFilterColumns}
      />
      <ModalFilters
        open={openFilter}
        handleFilterSubmit={handleFilterSubmit}
        handleFilterChange={handleFilterChange}
        user={user}
        filterData={filterData}
        handleModal={handleModalFilter}
      />
      <Table
        isCompact
        aria-label="Example table with custom cells"
        topContent={topContent}
        bottomContent={bottomContent}
      >
        <TableHeader columns={headerColumns}>
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

export default DataTableMateriales;
