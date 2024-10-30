import { Button } from "@nextui-org/react"

export default function PositionLTab() {

    const PositionsDates = [
        {name: "ETH", APY: "0.00%", value: "0.00", deadline: "0"},
        {name: "USDB", APY: "0.00%", value: "0.00", deadline: "0"},
    ]
    
    return (
        <div>
            {PositionsDates.map((item, index) => (
                <div key={index} className="w-full h-[5rem] text-white relative mb-12 border-solid border-[#504360] border-[0.15rem] rounded-[1.25rem] bg-white bg-opacity-5">
                    <div className="flex justify-between h-full items-center text-lg text-center mx-8">
                            <span className="absolute left-[4%] top-1/2 transform -translate-y-1/2 text-white">{item.name}</span>
                            <span className="absolute left-[25%] top-1/2 transform -translate-y-1/2 text-white">{item.APY}</span>
                            <span className="absolute left-[50%] top-1/2 transform -translate-y-1/2 text-white">{item.value}</span>
                            <span className="absolute left-[75%] top-1/2 transform -translate-y-1/2 text-white">{item.deadline}</span>
                            <Button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-button-gradient text-white">Redeem</Button>
                    </div>
                </div>

        ))}
        </div>
        
        // <div className="w-full h-[5rem] text-white relative border-solid border-[#504360] border-[0.15rem] rounded-[1.25rem] bg-white bg-opacity-5">
        //     <div className="flex justify-between h-full items-center text-center mb-2">
        //             <span>Name</span>
        //             <span>APY</span>
        //             <span>value</span>
        //             <span>deadline</span>
        //     </div>
        // </div>
    )
}