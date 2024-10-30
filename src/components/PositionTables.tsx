import PositionTable from "./PositionTable";


export default function PositionTables() {

    return (
        <div >
            <span className="text-transparent bg-clip-text bg-title font-kronaOne text-[1.5rem] leading-[2.13rem] ml-10">Position Overview</span>
            <PositionTable />
            <span className="text-transparent bg-clip-text bg-title font-kronaOne text-[1.5rem] leading-[2.13rem] ml-10">YT Overview</span>
            <PositionTable />
            <span className="text-transparent bg-clip-text bg-title font-kronaOne text-[1.5rem] leading-[2.13rem] ml-10">PT Overview</span>
            <PositionTable />
            <span className="text-transparent bg-clip-text bg-title font-kronaOne text-[1.5rem] leading-[2.13rem] ml-10">POT Overview</span>
            <PositionTable />
        </div>
        
    )
}