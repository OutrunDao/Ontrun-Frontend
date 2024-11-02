import PositionLTab from "./PositionLTab";

export default function PositionTab() {
    
    return (
        <div className="w-full">
            <div className="flex justify-between relative text-purple-300 mb-8">
                    <span className="absolute left-[4%]">Name</span>
                    <span className="absolute left-[26%]">PrincipalRedeemable</span>
                    <span className="absolute left-[50%]">APY</span>
                    <span className="absolute left-[72.5%]">Deadline</span>
            </div>
            <PositionLTab />
        </div>
    )
}
