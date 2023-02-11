import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

type Props<T> = {
  columns: Array<ColumnDef<T, any>>;
  data: T[];
};

export const ReactTable = <T extends any>(props: Props<T>) => {
  const { columns, data } = props;

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable<T>({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <div className="mt-8 overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden border-b border-gray-600 shadow-xl rounded-lg">
          <table className="divide-y divide-gray-600 overflow-auto min-w-full">
            <thead className="bg-slate-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-tg-lbg px-4 text-white">
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        onClick={header.column.getToggleSortingHandler()}
                        className="relative px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 cursor-pointer"
                      >
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>

                        {{
                          asc: (
                            <ChevronDownIcon className="absolute bottom-[33%] right-0 h-4 w-4 flex-none" />
                          ),
                          desc: (
                            <ChevronUpIcon className="absolute bottom-[33%] right-0 h-4 w-4 flex-none" />
                          ),
                        }[header.column.getIsSorted() as string] ?? null}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>

            <tbody className="divide-y divide-gray-600 bg-gray-700">
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="relative whitespace-nowrap px-6 py-4 text-gray-300"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
