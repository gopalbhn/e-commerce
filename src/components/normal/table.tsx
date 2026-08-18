
interface Column<T> {
    header: string
    accessor?: keyof T
    render?: (row: T) => React.ReactNode
}

interface TableProps<T> {
    columns: Column<T>[]
    data: T[]
    message?: string
}

export default function Table<T>({
    columns,
    data,
    message = "No Data Found",
}: TableProps<T>) {
    return (
        <div className=" w-full rounded-xl overflow-hidden shadow-sm bg-white">
            <div className="w-full overflow-x-auto">
                <table className="w-full overflow-x-auto">
                    <thead>
                        <tr className="text-left text-xs uppercase tracking-wider text-gray-400 border-b">
                            {columns.map((column) => (
                                <th
                                    key={column.header}
                                    className="py-4 px-4"
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="py-12 text-center text-slate-500">
                                    {message}
                                </td>
                            </tr>
                        ) : (
                            data.map((row: any, index) => (
                                <tr
                                    key={row._id || index}
                                    className="  hover:bg-gray-50 transition"
                                >
                                    {columns.map(column => (
                                        <td
                                            key={column.header}
                                            className="py-5 font-normal text-sm text-gray-800 px-4"
                                        >
                                            {column.render ? column.render(row) : row[column.accessor]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    )
}