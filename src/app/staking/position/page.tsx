import PositionTable from "@/components/PositionTable";
import PositionTables from "@/components/PositionTables";
import PositionTabs from "@/components/PositionTabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Position | Outrun",
};

export default function Position() {
  return (
    // <PositionTable />
    <div className="min-h-[57rem] bg-[url('/images/position-bg.png')] bg-no-repeat bg-cover pt-[8rem] pb-[8rem] px-[20rem]">
      <PositionTabs />
    </div>
  );
}
