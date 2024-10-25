import { UT } from "@/contracts/abis/UT";
import { ContractName, uAddressMap } from "@/contracts/addressMap/UTokenAddressMap";
import { config } from "@/contracts/config";
import { getUTContract } from "@/contracts/getTokenContract/getUTContract";
import { UBNB } from "@/contracts/tokens/UPT";
import { Currency, Token } from "@/packages/core";
import { useEffect, useState } from "react";
import { publicActions } from "viem";
import { readContract } from "viem/actions";
import { useChainId, useClient, usePublicClient, useWalletClient } from "wagmi";

export function useUTView(token:Currency) {
    
    const publicClient = usePublicClient();
    const chainId = useChainId();

    const[ symbol,setSymbol ] = useState<string | undefined>();

    useEffect(() => {
        async function _() {
            return await publicClient?.readContract({
                // @ts-ignore
                address: (token as Token)?.address,
                abi: UT,
                functionName: 'symbol',
            })
        }
        _().then(setSymbol)
    },[token])


    return {
        UTView: {
            symbol
        }
    }
}