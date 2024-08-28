import React from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { ChevronUpIcon, ChevronDownIcon, ChevronDoubleLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/20/solid';
import { useCitas } from '../../hooks/useCitas';

const CitaList = ({ onEdit, onDelete, onView }) => {
    const { citas, loading, error } = useCitas();

    const data = React.useMemo(() => citas, [citas]);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Paciente',
                accessor: row => `${row.paciente.nombre} ${row.paciente.apellido}`,
            },
            {
                Header: 'Doctor',
                accessor: row => `Dr. ${row.doctor.usuario.first_name} ${row.doctor.usuario.last_name}`,
            },
            {
                Header: 'Fecha',
                accessor: 'fecha',
            },
            {
                Header: 'Duración',
                accessor: 'duracion',
                Cell: ({ value }) => `${value} minutos`,
            },
            {
                Header: 'Estado',
                accessor: 'estado',
            },
            {
                Header: 'Acciones',
                Cell: ({ row }) => (
                    <div className="flex space-x-2">
                        <button onClick={() => onView(row.original.id)} className="text-blue-600 hover:text-blue-900 p-1">
                            <EyeIcon className="h-5 w-5" />
                        </button>
                        <button onClick={() => onEdit(row.original)} className="text-indigo-600 hover:text-indigo-900 p-1">
                            <PencilIcon className="h-5 w-5" />
                        </button>
                        <button onClick={() => onDelete(row.original.id)} className="text-red-600 hover:text-red-900 p-1">
                            <TrashIcon className="h-5 w-5" />
                        </button>
                    </div>
                ),
            },
        ],
        [onView, onEdit, onDelete]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize, globalFilter },
        setGlobalFilter,
    } = useTable(
        { columns, data, initialState: { pageIndex: 0, pageSize: 10 } },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    if (loading) return <p className="text-center text-gray-500 my-4">Cargando...</p>;
    if (error) return <p className="text-center text-red-500 my-4">Ha ocurrido un error: {error.message}</p>;

    return (
        <div className="flex flex-col space-y-4">
            <div className="p-4">
                <input
                    value={globalFilter || ''}
                    onChange={e => setGlobalFilter(e.target.value)}
                    placeholder="Buscar cita..."
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                />
            </div>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        {headerGroups.map(headerGroup => (
                            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th
                                        key={column.id}
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        <div className="flex items-center space-x-1">
                                            <span>{column.render('Header')}</span>
                                            <span>
                                                {column.isSorted
                                                    ? column.isSortedDesc
                                                        ? <ChevronDownIcon className="w-4 h-4" />
                                                        : <ChevronUpIcon className="w-4 h-4" />
                                                    : ''}
                                            </span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                        {page.map(row => {
                            prepareRow(row)
                            return (
                                <tr key={row.id} {...row.getRowProps()}>
                                    {row.cells.map(cell => (
                                        <td key={cell.column.id} {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <button
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Anterior
                    </button>
                    <button
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Siguiente
                    </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Mostrando <span className="font-medium">{pageIndex * pageSize + 1}</span> a <span className="font-medium">{Math.min((pageIndex + 1) * pageSize, data.length)}</span> de{' '}
                            <span className="font-medium">{data.length}</span> resultados
                        </p>
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <button
                                onClick={() => gotoPage(0)}
                                disabled={!canPreviousPage}
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Primera página</span>
                                <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                                className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Anterior</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                                Página {pageIndex + 1} de {pageOptions.length}
                            </span>
                            <button
                                onClick={() => nextPage()}
                                disabled={!canNextPage}
                                className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Siguiente</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                onClick={() => gotoPage(pageCount - 1)}
                                disabled={!canNextPage}
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Última página</span>
                                <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CitaList;