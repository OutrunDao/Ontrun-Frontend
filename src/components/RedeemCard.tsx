import { Tabs, Tab } from "@heroui/react";
import RedeemTab from "./RedeemTab";
import StakeTab from "./StakeTab";
import YieldPoolOCard from "./YieldPoolOCard";
import Decimal from "decimal.js-light";

export default function RedeemCard({
    // tokenName

    positionData,

}:{
    // tokenName:string,

    positionData:any

}) {
    return (
        <div className="w-full max-w-3xl bg-gray-900 text-white border border-gray-800 rounded-lg shadow-lg">
      <div className="p-6">
        <Tabs
          aria-label="Yield Pool Tabs"
          classNames={{
            base: "w-full",
            tabList: "h-full flex gap-x-8 rounded-none px-8 pt-4 bg-transparent",
            tab: "max-w-fit px-0 h-12",
            tabContent: 
            "text-white group-data-[selected=true]:bg-title text-[1.5rem] leading-[1.88rem] font-kronaOne group-data-[selected=true]:text-transparent group-data-[selected=true]:bg-clip-text",
            cursor: "bg-transparent",
            panel: "pt-6",
          }}
        >
        <Tab
            key="redeem"
            title="Redeem"
        >
            {/* <RedeemTab tokenName={tokenName}/> */}
            <RedeemTab positionData={positionData}/>
        </Tab>
        </Tabs>
      </div>
    </div>  
    )
    
}