"use client";
import { ApolloClient, InMemoryCache, gql, useQuery} from "@apollo/client";
import PositionTable from "./PositionTable";
import { useAccount, useChainId } from "wagmi";
import { use, useEffect, useState } from "react";
import { usePOT } from "@/hooks/usePOT";
import { POTslisBNB } from "@/contracts/tokens/POT";


export default function PositionTables() {

    const account = useAccount();
    const [data, setData] = useState();
    const [result, setResult] = useState<any[]>();
    const chainId = useChainId();

    // const client = new ApolloClient({
    //     uri: 'https://api.studio.thegraph.com/query/92841/ontrun-pot/version/latest',
    //     cache: new InMemoryCache()
    // });
      
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

    // useEffect(() => {
    //     if (!account) return;
    //     async function _() {
    //         const result = await client.query({
    //             query: GET_BALANCES,
    //             variables: { account: account.address },
    //         });
    //         return result.data;
    //     }
    //     _().then(setData);
    // },[account]);

    // async function _() {
    //     const result = await client.query({
    //         query: GET_BALANCES,
    //         variables: { account:"0x974Ea02978EbfD98479B757748B628a7be5770E8" },
    //     });
    //     setData(result.data);
    // }
    // _().catch(console.error);
    // const { data } = client.query({
    //     query: GET_BALANCES,
    //     variables: { account:"0x974Ea02978EbfD98479B757748B628a7be5770E8" },
    // })

    // if (!data) return <p>Loading...</p>;

    // const balancesArray = data.balances.map(balance => (
    //     <div key={balance.id}>
    //       <p>ID: {balance.id}</p>
    //       <p>Account: {balance.account}</p>
    //       <p>Token ID: {balance.tokenId}</p>
    //       <p>Value: {balance.value}</p>
    //     </div>
    //   ));

    const UsePOT = usePOT();

    useEffect(() => {
        async function _() {
            if (!account.address || !chainId) return;
            const result = await UsePOT.POTRead.positions(POTslisBNB[chainId],account.address);
            return result;
        }
        _().then(setResult);
    },[account,chainId]);

    if (!result) return <p>Loading...</p>;

    // const balancesArray = result.balances.map(balance => (
    //     <div key={balance.id}>
    //       <p>ID: {balance.id}</p>
    //       <p>Account: {balance.account}</p>
    //       <p>Token ID: {balance.tokenId}</p>
    //       <p>Value: {balance.value}</p>
    //     </div>
    //   ));

    const stringifyWithBigInt = (obj: any) => {
        return JSON.stringify(obj, (key, value) =>
          typeof value === 'bigint' ? value.toString() : value
        );
      };
      
      return (
        <div>
          {result.length === 0 ? (
            <p>Loading...</p>
          ) : (
            result.map((position, index) => (
              <div key={index}>
                <p>Position: {stringifyWithBigInt(position)}</p>
              </div>
            ))
          )}
        </div>
      );

    return (
        <div >

            <span className="text-white bg-clip-text bg-title font-kronaOne text-[1.5rem] leading-[2.13rem] ml-10">{balancesArray}</span>
            <PositionTable />
            <span className="text-transparent bg-clip-text bg-title font-kronaOne text-[1.5rem] leading-[2.13rem] ml-10">YT Overview</span>
            <PositionTable />
            <span className="text-transparent bg-clip-text bg-title font-kronaOne text-[1.5rem] leading-[2.13rem] ml-10">PT Overview</span>
            <PositionTable />
            <span className="text-transparent bg-clip-text bg-title font-kronaOne text-[1.5rem] leading-[2.13rem] ml-10">POT Overview</span>
            <PositionTable />
        </div>
        
    )
}