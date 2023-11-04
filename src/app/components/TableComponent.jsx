import React, { useState } from "react";
import { useTable, useFilters, useGlobalFilter } from "react-table";

const data = [
  {
    rol: "Desarrollador",
    habilidadesBlandas: "Comunicación",
    habilidadesDuras: "JavaScript",
  },
  {
    rol: "Diseñador",
    habilidadesBlandas: "Creatividad",
    habilidadesDuras: "Diseño gráfico",
  },
];

const columns = [
  {
    Header: "Rol",
    accessor: "rol",
    //Filter: TextFilter,
  },
  {
    Header: "Soft Skills",
    accessor: "habilidadesBlandas",
    //Filter: TextFilter,
  },
  {
    Header: "Hard Skills",
    accessor: "habilidadesDuras",
    //Filter: TextFilter,
  },
];

const TableComponent = () => {
  const [filterInput, setFilterInput] = useState("");

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter
  );

  // Obtiene el estado del filtro global
  const { globalFilter } = state;

  return (
    <div className="pt-2">
      <input
        className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        type="text"
        placeholder="Busca por Rol, Habilidad"
        value={filterInput}
        onChange={(e) => {
          setFilterInput(e.target.value); // Actualiza el estado del filtro global
          setGlobalFilter(e.target.value); // Aplica el filtro global
        }}
      />
      <div className="pt-3"></div>
      <table {...getTableProps()} className="min-w-full table-auto divide-y divide-gray-300 py-2">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="text-lg from-black font-bold leading-2 text-gray-900 sm:tracking-tight py-1">{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="divide-y divide-gray-300 py-2">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td className="text-sm font-medium leading-6 text-gray-700 sm:px-3 py-1" {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
