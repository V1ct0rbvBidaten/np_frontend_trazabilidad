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
import ModalHome from "../pages/abastecimiento/home/ModalHome";

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
  fecha_borrador_oc_start: null,
  fecha_borrador_oc_end: null,
  fecha_creacion_oc_start: null,
  fecha_creacion_oc_end: null,
  docentry: null,
  id_solped: null,
  item_code: null,
  categoria_item: null,
  id_aprobacion: null,
  numero_oc: null,
  borrador_oc: null,
  id_borrador_oc: null,
  estado: null,
};

const DataTableMateriales = ({
  data,
  filter,
  resetState,
  columnsFilter,
  user,
  dinamicState,
  setDinamicState,
}) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openFilterColumns, setOpenFilterColumns] = useState(false);
  const [filterData, setFilterData] = useState(filterState);

  const [visibleColumns, setVisibleColumns] = useState(columnsFilter);
  const [columnsUpdate, setColumnsUpdate] = useState(columnsFilter);

  const columns = useMemo(() => {
    if (data && data.data && data.data.length > 0) {
      return getColumns(data.data[0]);
    }

    return [
      { name: "ID SOLPED", uid: "id_solped" },
      { name: "Fecha Creación Solped", uid: "fecha_creacion_solped" },
      { name: "Solicitante", uid: "solicitante" },
      { name: "Item", uid: "item" },
      { name: "Detalle", uid: "detalle" },
      { name: "Stock", uid: "stock" },
      { name: "Estado Pedido", uid: "estado_pedido" },
    ];
  }, [data]);

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

  const handleFilterColumnSubmit = () => {
    dispatch({
      type: "FILTER_COLUMN",
      payload: columnsUpdate,
    });

    resetState();
  };

  // if (data.data.length === 0)
  //   return (
  //     <Table
  //       topContent={topContent}
  //       bottomContent={bottomContent}
  //       aria-label="Example static collection table"
  //     >
  //       <TableHeader columns={headerColumns}>
  //         {(column) => (
  //           <TableColumn
  //             className="bg-emerald-700 text-white text-xs"
  //             key={column.uid}
  //             align={column.uid === "actions" ? "center" : "start"}
  //           >
  //             {column.name}
  //           </TableColumn>
  //         )}
  //       </TableHeader>
  //       <TableBody>
  //         <TableRow key="1">
  //           <TableCell>Tony Reichert</TableCell>
  //           <TableCell>CEO</TableCell>
  //           <TableCell>Active</TableCell>
  //         </TableRow>
  //         <TableRow key="2">
  //           <TableCell>Zoey Lang</TableCell>
  //           <TableCell>Technical Lead</TableCell>
  //           <TableCell>Paused</TableCell>
  //         </TableRow>
  //         <TableRow key="3">
  //           <TableCell>Jane Fisher</TableCell>
  //           <TableCell>Senior Developer</TableCell>
  //           <TableCell>Active</TableCell>
  //         </TableRow>
  //         <TableRow key="4">
  //           <TableCell>William Howard</TableCell>
  //           <TableCell>Community Manager</TableCell>
  //           <TableCell>Vacation</TableCell>
  //         </TableRow>
  //       </TableBody>
  //     </Table>
  //   );

  return (
    <>
      {data.data && data.data.length !== 0 && (
        <ModalComponent
          open={open}
          handleModal={handleModal}
          data={solpedData.current}
          resetState={resetState}
        />
      )}
      <ModalFilterColumns
        visibleColumns={columnsUpdate}
        columns={columns}
        setVisibleColumns={setColumnsUpdate}
        open={openFilterColumns}
        handleFilterColumnSubmit={handleFilterColumnSubmit}
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
        <TableBody
          emptyContent={"No hay datos."}
          loadingContent={<Spinner />}
          items={data.data}
        >
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
