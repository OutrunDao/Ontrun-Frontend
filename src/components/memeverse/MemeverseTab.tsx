import { MemeverseTableColumns, liquidityTableColumns } from "@/constants";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import PaginationCustom from "../PaginationCustom";


export default function MemeverseTab() {
  return (
    <div className="flex flex-col gap-y-12 items-center justify-center">
      <div className="bg-no-repeat bg-cover bg-[url('/images/liquidity-tab.png')] w-[82.47rem] h-[56.30rem]">
        <Table
          removeWrapper
          classNames={{
            th: "bg-transparent text-center border-b border-divider border-[#4A325D] border-opacity-[0.3]",
            tr: "border-divider border-[#4A325D] border-opacity-[0.3] outline-2",
            td: "text-center text-white",
          }}>
          <TableHeader columns={MemeverseTableColumns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
            <TableBody >
              <TableRow key="1">
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
            </TableBody>
        </Table>
      </div>
      <PaginationCustom total={10} currentPage={1} pageSize={10} setCurrentPage={() => {}} />
      {/* <span>{allPairs}</span> */}
    </div>
  );
}