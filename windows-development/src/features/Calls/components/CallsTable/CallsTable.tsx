import { useCalls } from "../../hooks/api/useCalls";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { Call } from "@customTypes/api.types";
import { Time } from "@components/Time";
import { Loader } from "@components/Loader";
import { ReactTable } from "@components/ReactTable";

export const CallsTable = () => {
  const { isLoading, data: callsData } = useCalls();

  const calls = useMemo(() => callsData ?? [], [callsData]);

  const columns = useMemo<Array<ColumnDef<Call>>>(
    () => [
      {
        header: "#",
        accessorFn: (row) => calls.findIndex((item) => item.id === row.id) + 1,
      },
      {
        header: "Номер",
        accessorKey: "number",
      },
      {
        header: "Уникальный номер",
        accessorKey: "id_call",
      },
      {
        header: "Номер телефона",
        accessorKey: "phoneNumber",
      },
      {
        header: "Дата",
        accessorKey: "datetime",
        cell: (cell) => (
          <Time date={cell.getValue() as string} formatString="dd MMM yyyy" />
        ),
      },
      // {
      //   header: "Статус",
      //   accessorKey: "status",
      //   cell: (cell) => <CallStatus status={cell.getValue() as number} />,
      // },
      {
        header: "Действия",
        accessorFn: (row) => row,
        cell: (cell) => (
          <div className="flex items-center justify-center">
            <button type="button" className="hover:text-gray-400">
              <PencilSquareIcon className="h-6 w-6" />
            </button>
          </div>
        ),
      },
    ],
    [calls]
  );

  return (
    <>
      {isLoading ? <Loader /> : <ReactTable columns={columns} data={calls} />}
    </>
  );
};
