import { POTAbi } from "@/contracts/abis/POT";
import { POT } from "@/contracts/tokens/POT";
import { Currency, Token } from "@/packages/core";
import Decimal from "decimal.js-light";
import { ethers } from "ethers";
import { useState } from "react";
import { Address, createWalletClient, parseEther } from "viem";
import { useAccount, useChainId, usePublicClient, useWalletClient, useWriteContract } from "wagmi";
import { ApolloProvider, InMemoryCache, ApolloClient, useQuery, gql} from '@apollo/client';



export function usePOT() {

    async function getPOTread(POTAddress: string) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        return new ethers.Contract(POTAddress, POTAbi, provider);
    }

    async function getPOTwrite(POTAddress: string) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        return new ethers.Contract(POTAddress, POTAbi, signer);
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
        const POTContract = await getPOTread(POT.address);
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
        const POTContract = await getPOTread(POT.address);
        const result = await POTContract.previewRedeem(positionId, positionShare);
        return result;
    }

    async function impliedStakingDays({POT}:{POT:POT}) {
        const POTContract = await getPOTread(POT.address);
        const result = await POTContract.impliedStakingDays();
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

        const POTContract = await getPOTread(POT.address);
        const positionsPromises = tokenIds.map((tokenId: any | ethers.Overrides) => POTContract.positions(tokenId));
        const positionsArray = await Promise.all(positionsPromises);

        return positionsArray;
    }

    async function setApprovalForAll({
        POTAddress,
        spender,
        approved,
    }: {
        POTAddress: string;
        spender: Address;
        approved: boolean;
    }) {
        const POTContract = await getPOTwrite(POTAddress);
        const tx = await POTContract.setApprovalForAll(spender,approved);
        const receipt = await tx.wait();
        return receipt;
    }

    async function isApprovedForAll({
        POTAddress,
        account,
        operator,
    } : {
        POTAddress: string;
        account: Address;
        operator: string;
    }) {
        const POTContract = await getPOTread(POTAddress);
        const result = POTContract.isApprovedForAll(account,operator);
        return result;
    }

    return {
        POTWrite: {
            setApprovalForAll,
        },
        POTRead: {
            previewStake,
            previewRedeem,
            getAllPOT,
            positions,
            impliedStakingDays,
            isApprovedForAll,
        }
    }

}
