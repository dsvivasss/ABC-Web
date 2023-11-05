import React, { useState } from "react";
import { useTable, useFilters, useGlobalFilter } from "react-table";

const data = [
  {
    name: "Pedro Melenas",
    rol: "Desarrollador",
    habilidadesBlandas: "Comunicación",
    habilidadesDuras: "JavaScript",
  },
  {
    name: "Nino Bravo",
    rol: "Backend Developer",
    habilidadesBlandas: "Creatividad",
    habilidadesDuras: "Python",
  },
  {
    name: "Jesus Roman",
    rol: "Senior Frontend Engineer",
    habilidadesBlandas: "Creatividad",
    habilidadesDuras: "SQL",
  },
  {
    name: "Jack Morrison",
    rol: "Software Architect",
    habilidadesBlandas: "Creatividad",
    habilidadesDuras: "TypeScript",
  },
  {
    name: "Mick Jager",
    rol: "Diseñador",
    habilidadesBlandas: "Creatividad",
    habilidadesDuras: "AWS",
  },
  {
    name: "Nick Meadow",
    rol: "Diseñador",
    habilidadesBlandas: "Creatividad",
    habilidadesDuras: "GraphQl",
  },

];

const columns = [

    {
        Header: "Nombre",
        accessor: "name",
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
        placeholder="Busca por Nombre, Rol, Habilidad"
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
              <th className="text-lg from-black font-bold leading-2 text-gray-900 sm:tracking-tight py-1">Detalle</th>
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
                <td>
                    <button className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => console.log(`Detalles de ${row.original.rol}`)}>
                      Ver Detalle
                    </button>
                  </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
