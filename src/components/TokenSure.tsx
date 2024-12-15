import { YT } from "@/contracts/tokens/YT";
import { Currency } from "@/packages/core";
import { useEffect, useState } from "react";
import { useAccount, useChainId, usePublicClient } from "wagmi";


export default function TokenSure({
    token,
}:{
    token?: Currency | YT
}) {
    
    const chainId = useChainId();
    const publicClient = usePublicClient();
    const account = useAccount();

    const [Token,setToken] = useState<Currency | YT>();

    useEffect(() => {
        setToken(token)
    })

    return (
        <div className="flex items-center">
            <img alt="icon" src="/images/select-token.svg" className="w-[1.59rem] ml- mr-4" />
            <span className="text-[1rem] leading-7">{Token?.symbol}</span>
        </div>
    )

}