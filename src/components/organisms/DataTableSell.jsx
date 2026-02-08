import { useEffect, useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { rankItem } from '@tanstack/match-sorter-utils';
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
      className="input-field pl-10"
    />
  );
};

const DataTableSell = (datas) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState(datas.data);

  const total = useMemo(() => {
    return datas.data.reduce((acc, venta) => {
      return acc + (venta.precioTotal || 0);
    }, 0);
  }, [datas.data]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const fecha = new Date(dateString);
    return fecha.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const columns = [
    {
      accessorKey: "createdAt",
      header: "Fecha",
      cell: ({ row }) => (
        <span className="text-gray-300">{formatDate(row.original.createdAt)}</span>
      ),
    },
    {
      accessorKey: "cliente",
      header: "Cliente",
      cell: ({ row }) => (
        <span className="text-white">{row.original.cliente || "General"}</span>
      ),
    },
    {
      accessorKey: "productos",
      header: "Productos",
      cell: ({ row }) => {
        const productos = row.original.productos || [];
        return (
          <div className="space-y-1">
            {productos.slice(0, 2).map((producto, index) => (
              <div key={index} className="text-sm">
                <span className="text-gray-300">{producto.producto?.nombre || "Producto"}</span>
                <span className="text-gray-500 ml-2">x{producto.cantidad}</span>
              </div>
            ))}
            {productos.length > 2 && (
              <span className="text-xs text-gray-500">+{productos.length - 2} más</span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "precioTotal",
      header: "Total",
      cell: ({ row }) => (
        <span className="font-semibold text-emerald-400">
          {formatCurrency(row.original.precioTotal || 0)}
        </span>
      ),
    },
  ];

  const getStateTable = () => {
    const totalRows = table.getFilteredRowModel().rows.length;
    const pageSize = table.getState().pagination.pageSize;
    const pageIndex = table.getState().pagination.pageIndex;
    const rowsPerPage = table.getRowModel().rows.length;
    const firstIndex = pageIndex * pageSize + 1;
    const lastIndex = pageIndex * pageSize + rowsPerPage;
    return { totalRows, firstIndex, lastIndex };
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const applyDateFilter = () => {
    if (startDate && endDate) {
      const filtered = datas.data.filter((row) => {
        const rowDate = row.createdAt.split("T")[0];
        const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
        const formattedEndDate = new Date(endDate).toISOString().split("T")[0];
        return rowDate >= formattedStartDate && rowDate <= formattedEndDate;
      });
      setFilteredData(filtered);
    } else {
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
      pagination: { pageSize: 5 },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: fuzzyFilter,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-white">
          {datas.data[0]?.tipo || "Transacciones"}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <DebouncedInput
              type="text"
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              placeholder="Buscar..."
            />
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
            onFilterClick={applyDateFilter}
          />
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="w-full">
          <thead className="bg-secondary-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="table-header px-4 py-3 text-left">
                    {header.isPlaceholder ? null : (
                      <div
                        className={`flex items-center gap-2 ${
                          header.column.getCanSort() ? "cursor-pointer select-none" : ""
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <BarsArrowUpIcon className="w-4 h-4 text-primary-400" />,
                          desc: <BarsArrowDownIcon className="w-4 h-4 text-primary-400" />,
                        }[header.column.getIsSorted()] ??
                          (header.column.getCanSort() ? (
                            <ChevronUpDownIcon className="w-4 h-4 text-gray-400" />
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
                className="hover:bg-secondary-700/50 transition-colors border-b border-secondary-700"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="table-cell">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {/* Footer with Total */}
          <tfoot className="bg-secondary-700/50">
            <tr>
              <td colSpan="2" className="px-4 py-3 text-right font-semibold text-white">
                Total General:
              </td>
              <td className="px-4 py-3 font-bold text-emerald-400">
                {formatCurrency(total)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-lg bg-secondary-700 text-gray-400 hover:text-white hover:bg-secondary-600 transition-colors disabled:opacity-50"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronDoubleLeftIcon className="w-5 h-5" />
          </button>
          <button
            className="p-2 rounded-lg bg-secondary-700 text-gray-400 hover:text-white hover:bg-secondary-600 transition-colors disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>

          {table.getPageOptions().map((value, key) => (
            <button
              key={key}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                value === table.getState().pagination.pageIndex
                  ? "bg-primary-600 text-white"
                  : "bg-secondary-700 text-gray-400 hover:text-white"
              }`}
              onClick={() => table.setPageIndex(value)}
            >
              {value + 1}
            </button>
          ))}

          <button
            className="p-2 rounded-lg bg-secondary-700 text-gray-400 hover:text-white hover:bg-secondary-600 transition-colors disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
          <button
            className="p-2 rounded-lg bg-secondary-700 text-gray-400 hover:text-white hover:bg-secondary-600 transition-colors disabled:opacity-50"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronDoubleRightIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">
            Mostrando {getStateTable().firstIndex} a {getStateTable().lastIndex} de{" "}
            {getStateTable().totalRows} registros
          </span>
          <select
            className="input-field py-1.5 px-3"
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            <option value="5">5 pág.</option>
            <option value="10">10 pág.</option>
            <option value="20">20 pág.</option>
            <option value="25">25 pág.</option>
            <option value="50">50 pág.</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DataTableSell;
