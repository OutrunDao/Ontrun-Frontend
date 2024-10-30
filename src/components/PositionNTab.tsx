import PositionLTab from "./PositionLTab";

export default function PositionTab() {

    const PositionsDates = [
        {name: "ETH", APY: "0.00%", value: "0.00", deadline: "0"},
        {name: "USDB", APY: "0.00%", value: "0.00", deadline: "0"},
    ]
    
    return (
        <div className="w-full">
            <div className="flex justify-between relative text-purple-300 mb-8">
                    <span className="absolute left-[4%]">Name</span>
                    <span className="absolute left-[26%]">APY</span>
                    <span className="absolute left-[50%]">value</span>
                    <span className="absolute left-[72.5%]">deadline</span>
            </div>
            <PositionLTab />
        </div>
    )
}
