import { Button, Input } from "@nextui-org/react"
import TokenSure from "./TokenSure"
import { Currency } from "@/packages/core";
import { POT } from "@/contracts/tokens/POT";
import Decimal from "decimal.js-light";

export default function TokenTab({
    Balance,
    InputValue,
    onValueChange,
    token,
    ifMax = false,
}:{
    Balance:Decimal,
    InputValue:string,
    onValueChange?:(value: string) => void,
    token?: Currency | POT,
    ifMax?:boolean,
}) {
    
    return (
        <div>
            <div className="flex justify-between mt-2 mb-2 mx-8">
                <div className="text-white text-opacity-50 flex gap-x-4">
                    <span className="text-[0.88rem] leading-[1.19rem] font-avenir font-medium">
                        balance: {Balance.toFixed(6)}
                    </span>
                    {ifMax && 
                    <Button
                        onClick={() => onValueChange && onValueChange(Balance.toFixed(18))}
                        className="text-white text-[0.82rem] font-avenir leading-[1.12rem] font-normal text-opacity-50 bg-transparent rounded-[1.76rem] border-solid border-[0.06rem] border-opacity-30  px-0 min-w-[2.67rem] h-[1.34rem]">
                        Max
                    </Button>
                    }
                </div>
                <span className="text-white text-opacity-50 text-[0.88rem] leading-[1.19rem] font-avenir font-normal">
                ～$0
                </span>
            </div>
            <div className="w-[28rem] h-[4rem] rounded-xl border-solid border-[0.06rem] border-[#C29BFF] border-opacity-[0.37] flex flex-col justify-around py-2 px-8">
                <div>
                <Input
                    placeholder="0.00"
                    value={InputValue}
                    onValueChange={onValueChange}
                    classNames={{
                    base: "h-[2.5rem] text-white",
                    input: "data-[hover=true]:bg-transparent group-data-[has-value=true]:text-white text-[1.25rem] leading-[1.69rem] font-avenir font-black text-right w-[10rem]",
                    inputWrapper: "bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent px-0",
                    innerWrapper: "justify-between",
                    }}
                    startContent={

                    <TokenSure token={token}/>
                    }
                />
                
                </div>
            </div>
        </div>
    )
}