import { swapFactory } from "@/contracts/abis/swapFactory";
import { graphURLMap } from "@/contracts/graphURLs";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { ethers } from "ethers";
import { Address } from "viem";
import { useChainId } from "wagmi";

export function useSwapFactory() {

    const chainId = useChainId();
    
    async function swapFeeRate(factoryAddress: Address) {
        // await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const swapFactoryContract = new ethers.Contract(factoryAddress, swapFactory, provider);
        const result = await swapFactoryContract.swapFeeRate();
        return result;
    }

    async function getAllPairs() {
        const client = new ApolloClient({
        uri: graphURLMap[chainId].swapFactory,
        cache: new InMemoryCache()
        });
        const GET_ALL_PAIRS = gql`
            query GetAllPairs {
                pairCreateds {
                    pair
                }
            }
        `;
        const Gresult = await client.query({
            query: GET_ALL_PAIRS,
        })
        return Gresult.data.pairCreateds;
    }

    return {
        swapFactoryView: {
            swapFeeRate,
            getAllPairs,
        }
    }
}