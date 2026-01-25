import { useEffect, useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import classNames from "classnames";
import { rankItem } from "@tanstack/match-sorter-utils";
import {
  MagnifyingGlassIcon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  ChevronUpDownIcon,
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronDoubleRightIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import DateRangePicker from "@/components/molecules/DataRangePicker";
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);

  addMeta({ itemRank });

  return itemRank.passed;
};

// eslint-disable-next-line react/prop-types
const DebouncedInput = ({ value: keyWord, onChange, ...props }) => {
  const [value, setValue] = useState(keyWord);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, 500);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

const DataTableSell = (datas) => {

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([
    {
      id: "productos",
      desc: false, // Establecer a false para orden ascendente
    },
  ]);
  const [startDate, setStartDate] = useState(null); // Estado para la fecha de inicio
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState(datas.data);
  const total = useMemo(() => {
    return datas.data.reduce((accumulator, venta) => {
      return accumulator + venta.precioTotal;
    }, 0);
  }, [datas.data]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP", // Cambia 'COL' por el código de la moneda que necesitas
    }).format(value);
  };

  const columns = [
    {
      accessorKey: "_id",
      header: () => <span>ID</span>,
    },
    {
      accessorKey: "cliente",
      header: () => <span className="">cliente</span>,
    },
    {
      accessorKey: "productos",
      header: () => <span>Productos</span>,
      cell: ({ row }) => {
        const productos = row.getValue("productos");

        const formatCurrency = (value) => {
          return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP", // Cambia 'COL' por el código de la moneda que necesitas
          }).format(value);
        };
        return (
          <div>
            {productos.map((producto, index) => (
              <div key={index}>
                <p>{producto.producto.nombre}</p>
                <p>Precio: {formatCurrency(producto.precioUnitario)}</p>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "cantidad",
      header: () => <span>Cantidad</span>,
      cell: ({ row }) => {
        const productos = row.getValue("productos");

        return (
          <div>
            {productos.map((producto, index) => (
              <div key={index}>
                <p>{producto.cantidad}</p>
              </div>
            ))}
          </div>
        );
      },
      enableSorting: true,
    },
    {
      accessorKey: "precioTotal",
      header: () => <span>Total</span>,
      cell: ({ row }) => {
        const precioTotal = row.getValue("precioTotal");

        const formatCurrency = (value) => {
          return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP", // Cambia 'COL' por el código de la moneda que necesitas
          }).format(value);
        };
        return (
          <div>
            <p>{formatCurrency(precioTotal)}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: () => <span className="">Fecha</span>,
      cell: ({ row }) => {
        const fechaString = row.original.createdAt; // Ajusta esto según la estructura real de tus datos
        const fecha = new Date(fechaString);
        const opcionesDeFormato = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true, // Indica que quieres formato de 12 horas
          timeZone: "UTC",
        };

        const fechaFormateada = fecha.toLocaleDateString(
          "es-ES",
          opcionesDeFormato
        );
        const partesFecha = fechaFormateada.split(", ");

        return (
          <div style={{ display: "contents" }}>
            {partesFecha.map((parte, index) => (
              <div key={index}>{parte}</div>
            ))}
          </div>
        );
      },
    },
  ];

  const getStateTable = () => {
    const totalRows = table.getFilteredRowModel().rows.length;
    const pageSize = table.getState().pagination.pageSize;
    const pageIndex = table.getState().pagination.pageIndex;
    const rowsPerPage = table.getRowModel().rows.length;

    const firstIndex = pageIndex * pageSize + 1;
    const lastIndex = pageIndex * pageSize + rowsPerPage;

    return {
      totalRows,
      firstIndex,
      lastIndex,
    };
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  // ...

  const applyDateFilter = () => {
    // Verifica si ambas fechas están definidas antes de aplicar el filtro
    if (startDate && endDate) {
      // Lógica para aplicar el filtro de fechas
      const filteredData = datas.data.filter((row) => {
        // Formatea startDate en formato ISO
        const formattedStartDate = new Date(startDate)
          .toISOString()
          .split("T")[0];
        // Formatea endDate en formato ISO
        const formattedEndDate = new Date(endDate).toISOString().split("T")[0];
        // Obtén solo la parte de la fecha (sin la hora) de la fila
        const rowDate = row.createdAt.split("T")[0];

        // Compara las partes de la fecha sin la hora
        return rowDate >= formattedStartDate && rowDate <= formattedEndDate;
      });

      // Actualiza el estado con los datos filtrados
      setFilteredData(filteredData);
    } else {
      // Si alguna de las fechas no está definida, muestra todos los datos
      setFilteredData(datas.data);
    }
  };

  const table = useReactTable({
    data: filteredData != null ? filteredData : datas.data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: fuzzyFilter,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  return (
    <div className="px-6 py-6 w-full h-screen">
      <header className="bg-gray-900 shadow">
        <div className="mx-auto py-6 px-4">
          <h1 className="text-white font-bold text-3xl">{datas.data[0].tipo}</h1>
        </div>
      </header>
      <div className="my-2 flex justify-end">
        <div className="relative">
          <div className="text-black">
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={handleStartDateChange}
              onEndDateChange={handleEndDateChange}
              onFilterClick={applyDateFilter}
            />
          </div>
          <div className="flex justify-end py-2">
            <DebouncedInput
              type="text"
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              className="px-6 py-2 text-gray-600 border border-gray-300 rounded outline-indigo-700"
              placeholder="Buscar..."
            />
            <MagnifyingGlassIcon className="w-5 h-5 absolute top-3 left-1" />
          </div>
        </div>
      </div>
      <div className="overflow-auto">
        <table className="table-auto w-full min-w-[560px]">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b border-gray-300 text-gray-600 bg-gray-100"
              >
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="py-2 px-4 text-left uppercase">
                    {header.isPlaceholder ? null : (
                      <div
                        className={classNames({
                          "cursor-pointer select-none flex justify-between":
                            header.column.getCanSort(),
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <BarsArrowUpIcon className="w-5 h-5" />,
                          desc: <BarsArrowDownIcon className="w-5 h-5" />,
                        }[header.column.getIsSorted()] ??
                          (header.column.getCanSort() ? (
                            <ChevronUpDownIcon className="w-5 h-5" />
                          ) : null)}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="text-white px-2 rounded-full font-semibold hover:bg-blue-500"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-2 px-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td
                colSpan="4"
                className="text-white px-2 rounded-full font-semibold"
              >
                Total General:
              </td>
              <td className="px-4 py-2 text-white rounded-full font-semibold">
                {formatCurrency(total)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4 md:flex items-center justify-between space-y-4 text-center">
        <div className="flex items-center gap-2">
          <button
            className="text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300
            disabled:hover:bg-white disabled:hover:text-gray-300"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronDoubleLeftIcon className="w-5 h-5" />
          </button>
          <button
            className="text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300
            disabled:hover:bg-white disabled:hover:text-gray-300"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>

          {table.getPageOptions().map((value, key) => (
            <button
              key={key}
              className={classNames({
                "text-gray-600 bg-gray-200 py-0.5 px-2 font-bold rounded border border-gray-300 disabled:hover:bg-white disabled:hover:text-gray-300": true,
                "bg-indigo-200 text-indigo-700":
                  value === table.getState().pagination.pageIndex,
              })}
              onClick={() => table.setPageIndex(value)}
            >
              {value + 1}
            </button>
          ))}

          <button
            className="text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300
            disabled:hover:bg-white disabled:hover:text-gray-300"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
          <button
            className="text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-300
            disabled:hover:bg-white disabled:hover:text-gray-300"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronDoubleRightIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="text-gray-600 font-semibold">
          Mostrando de {getStateTable().firstIndex}&nbsp; a{" "}
          {getStateTable().lastIndex}&nbsp; del total de{" "}
          {getStateTable().totalRows} registros
        </div>
        <select
          className="text-gray-600 border border-gray-300 rounded outline-indigo-700 py-2"
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          <option value="5">5 pág.</option>
          <option value="10">10 pág.</option>
          <option value="20">20 pág.</option>
          <option value="25">25 pág.</option>
          <option value="50">50 pág.</option>
        </select>
      </div>
    </div>
  );
};

export default DataTableSell;
