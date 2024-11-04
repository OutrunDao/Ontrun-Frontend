import { POTAbi } from "@/contracts/abis/POT";
import { POT } from "@/contracts/tokens/POT";
import { Currency, Token } from "@/packages/core";
import Decimal from "decimal.js-light";
import { ethers } from "ethers";
import { useState } from "react";
import { createWalletClient, parseEther } from "viem";
import { useAccount, useChainId, usePublicClient, useWalletClient, useWriteContract } from "wagmi";
import { ApolloProvider, InMemoryCache, ApolloClient, useQuery, gql} from '@apollo/client';



export function usePOT() {

    const account = useAccount();
    const publicClient = usePublicClient();

    // const client = new ApolloClient({
    //     uri: 'https://api.studio.thegraph.com/query/92841/ontrun-pot/version/latest',
    //     cache: new InMemoryCache()
    //   });
      
    // const GET_BALANCES = gql`
    //     query GetBalances($account: String!) {
    //         balances(where: { account: $account }) {
    //         id
    //         account
    //         tokenId
    //         value
    //         }
    //     }
    // `;
    // const { loading, error, data } = useQuery(GET_BALANCES, {
    //     variables: { account:account.address },
    //     });

    async function stake({
            POT,
            SYAmount,
            lockupDays,
            
        }:{
            POT:POT,
            SYAmount:string,
            lockupDays:number,
        }) {
            
            if (publicClient) {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const POTContract = new ethers.Contract(POT.address, POTAbi, signer);
                const tx = await POTContract.stake(parseEther(SYAmount), BigInt(lockupDays), account.address, account.address, account.address);
            }
    }

    async function previewStake({
        POT,
        amountInSY,
        lockupDays,
    }:{
        POT:POT,
        amountInSY:BigInt,
        lockupDays:BigInt,
    }) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        // const signer = await provider.getSigner();
        const POTContract = new ethers.Contract(POT.address, POTAbi, provider);
        const result = await POTContract.previewStake(amountInSY, lockupDays);
        return result;
    }

    async function previewRedeem({
        POT,
        positionId,
        positionShare,
    }:{
        POT:POT,
        positionId:BigInt,
        positionShare:BigInt,
    }) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        // const signer = await provider.getSigner();
        const POTContract = new ethers.Contract(POT.address, POTAbi, provider);
        const result = await POTContract.previewRedeem(positionId, positionShare);
        return result;
    }

    async function getAllPOT(POT:POT,account:string) {
        if (!POT) return;
        const client = new ApolloClient({
        uri: POT.graphURL,
        cache: new InMemoryCache()
        });
        const GET_BALANCES = gql`
            query GetBalances($account: String!) {
                balances(where: { account: $account }) {
                id
                account
                tokenId
                value
                }
            }
        `;
        const Gresult = await client.query({
            query: GET_BALANCES,
            variables: { account },
        })
        return Gresult.data.balances;
    }

    async function positions(POT:POT,account:string) {
        if (!POT) return;
        const client = new ApolloClient({
        uri: POT.graphURL,
        cache: new InMemoryCache()
        });
        const GET_BALANCES = gql`
            query GetBalances($account: String!) {
                balances(where: { account: $account }) {
                id
                account
                tokenId
                value
                }
            }
        `;
        const Gresult = await client.query({
            query: GET_BALANCES,
            variables: { account },
        })
        const tokenIds = Gresult.data.balances.map((balance: { tokenId: any; }) => balance.tokenId);

        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const POTContract = new ethers.Contract(POT.address, POTAbi, provider);

        // const positionsArray = [];
        // for (let i=0 ;i<tokenIds.length;i++) {
        //     try {
        //         const position = await POTContract.positions(tokenIds[i]);
        //         positionsArray.push(position);
        //     } catch (error) {
        //         console.error(`Error fetching position for tokenId ${tokenIds[i]}:`, error);
        //     }
        // }
        const positionsPromises = tokenIds.map((tokenId: any | ethers.Overrides) => POTContract.positions(tokenId));
        const positionsArray = await Promise.all(positionsPromises);

        return positionsArray;
    }

    return {
        POTWrite: {
            stake,
        },
        POTRead: {
            previewStake,
            previewRedeem,
            getAllPOT,
            positions,
        }
    }

}
