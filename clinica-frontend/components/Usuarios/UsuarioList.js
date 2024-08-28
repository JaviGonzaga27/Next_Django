import React from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { ChevronUpIcon, ChevronDownIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/20/solid';
import { useUsuarios } from '../../hooks/useUsuarios'

const UsuarioList = ({ onEdit, onDelete, onView }) => {
    const { usuarios, loading, error } = useUsuarios();

    const data = React.useMemo(() => usuarios, [usuarios]);
    
    const columns = React.useMemo(
        () => [
            {
                Header: 'Username',
                accessor: 'username',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Nombre',
                accessor: 'first_name',
            },
            {
                Header: 'Apellido',
                accessor: 'last_name',
            },
            {
                Header: 'Estado',
                accessor: 'is_active',
                Cell: ({ value }) => (
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {value ? 'Activo' : 'Inactivo'}
                    </span>
                ),
            },
            {
                Header: 'Acciones',
                Cell: ({ row }) => (
                    <div className="flex space-x-2">
                        <button onClick={() => onView(row.original)} className="text-blue-600 hover:text-blue-900 p-1">
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
                    placeholder="Buscar usuario..."
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                />
            </div>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th
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
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="py-3 flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                    <button onClick={() => previousPage()} disabled={!canPreviousPage} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Anterior
                    </button>
                    <button onClick={() => nextPage()} disabled={!canNextPage} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                        Siguiente
                    </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div className="flex gap-x-2 items-baseline">
                        <span className="text-sm text-gray-700">
                            Página <span className="font-medium">{pageIndex + 1}</span> de <span className="font-medium">{pageOptions.length}</span>
                        </span>
                        <select
                            value={pageSize}
                            onChange={e => {
                                setPageSize(Number(e.target.value))
                            }}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            {[5, 10, 20, 30, 40, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Mostrar {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <button
                                onClick={() => gotoPage(0)}
                                disabled={!canPreviousPage}
                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                <span className="sr-only">Primera</span>
                                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                                className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                <span className="sr-only">Anterior</span>
                                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                onClick={() => nextPage()}
                                disabled={!canNextPage}
                                className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                <span className="sr-only">Siguiente</span>
                                <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                onClick={() => gotoPage(pageCount - 1)}
                                disabled={!canNextPage}
                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                <span className="sr-only">Última</span>
                                <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsuarioList;