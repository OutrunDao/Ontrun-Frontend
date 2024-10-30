import { ArrowUpDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function PositionTable() {

    return (
      <div className="bg-transparent text-white p-6 overflow-hidden">

        <div className="max-w-7xl mx-auto relative">
        {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-500/10 blur-3xl"></div> */}
        <div className="rounded-lg overflow-hidden"> 

        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-700">
              <TableHead className="w-[250px] text-gray-300">Name <ArrowUpDown className="ml-2 h-4 w-4 inline" /></TableHead>
              <TableHead className="text-gray-300">Liquidity <ArrowUpDown className="ml-2 h-4 w-4 inline" /></TableHead>
              <TableHead className="text-gray-300">Average Lock Time <ArrowUpDown className="ml-2 h-4 w-4 inline" /></TableHead>
              <TableHead className="text-gray-300">Currently Anchored APY</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              className={"bg-gray-800/30 backdrop-blur-sm transition-all duration-300 ease-in-out hover:bg-gray-700/30 cursor-pointer"}
            >
              <TableCell colSpan={4} className="text-center text-gray-500">
                No data available
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        </div>
      </div>
     </div>
    )
}