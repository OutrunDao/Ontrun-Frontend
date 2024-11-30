import { swapFactory } from "@/contracts/abis/swapFactory";
import { graphURLMap } from "@/contracts/graphURLs";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { ethers } from "ethers";
import { Address } from "viem";
import { useChainId } from "wagmi";

export function useSwapFactory() {

    async function getSwapFactoryread(factoryAddress: Address) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        return new ethers.Contract(factoryAddress, swapFactory, provider);
    }
    
    async function swapFeeRate(factoryAddress: Address) {
        const swapFactoryContract = await getSwapFactoryread(factoryAddress);
        const result = await swapFactoryContract.swapFeeRate();
        return result;
    }

    // async function getAllPairs() {
    //     const client = new ApolloClient({
    //     uri: graphURLMap[chainId].swapFactory,
    //     cache: new InMemoryCache()
    //     });
    //     const GET_ALL_PAIRS = gql`
    //         query GetAllPairs {
    //             pairCreateds {
    //                 pair
    //             }
    //         }
    //     `;
    //     const Gresult = await client.query({
    //         query: GET_ALL_PAIRS,
    //     })
    //     return Gresult.data.pairCreateds;
    // }

    async function getAllPairs(factoryAddress: Address) {
        const swapFactoryContract = await getSwapFactoryread(factoryAddress);
        const allPairsLength = await swapFactoryContract.allPairsLength();
        let result = [];
        for (let i = 0; i < allPairsLength; i++) {
            result.push({pair:await swapFactoryContract.allPairs(i),swapFeeRate:await swapFactoryContract.swapFeeRate()});
        }
        return result;
    }

    return {
        swapFactoryView: {
            swapFeeRate,
            getAllPairs,
        }
    }
}