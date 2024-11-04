"use client";
import { ApolloClient, InMemoryCache, gql, useQuery} from "@apollo/client";
import PositionTable from "./PositionTable";
import { useAccount, useChainId } from "wagmi";
import { use, useEffect, useState } from "react";
import { usePOT } from "@/hooks/usePOT";
import { POTslisBNB } from "@/contracts/tokens/POT";
import { Button, Divider, Input, Link } from "@nextui-org/react";
import { useYT } from "@/hooks/useYT";
import { YTslisBNB } from "@/contracts/tokens/YT";
import { graphURLMap } from "@/contracts/graphURLs";
import { SYslisBNB } from "@/contracts/tokens/SY";



export default function PositionTables() {

    const account = useAccount();
    const [data, setData] = useState();
    const [result, setResult] = useState<any[]>();
    const chainId = useChainId();

    const [APY, setAPY] = useState<Number>();
    const UsePOT = usePOT();
    const UseYT = useYT();

    // useEffect(() => {
    //     async function _() {
    //         if (!account.address || !chainId) return;
    //         const result = await UsePOT.POTRead.getAllPOT(POTslisBNB[chainId],account.address);
    //         return result;
    //     }
    //     _().then(setResult);
    // },[account]);

    // if (!result) return <p>Loading...</p>;

    useEffect(() => {

      async function APY() {
          return UseYT.YTView.APY({YT:YTslisBNB[chainId],SY:SYslisBNB[chainId]});
      }
      
      APY().then(setAPY);
  })

    // useEffect(() => {
    //   async function _() {
    //     const result = await UseYT.YTView.amountInYields(YTslisBNB[chainId]);
    //     return result;
    //   }
    //   _().then(setResult);
    // })

    function Test() {
      UseYT.YTWrite.accumulateYields(YTslisBNB[chainId]);
    }

    const stringifyWithBigInt = (obj: any) => {
        return JSON.stringify(obj, (key, value) =>
          typeof value === 'bigint' ? value.toString() : value
        );
      };
      
      // const a = graphURLMap[chainId]["YT-slisBNB"];

      return (
        <div>
          {/* {result.length === 0 ? (
            <p>Loading...</p>
          ) : (
            result.map((position, index) => (
              <div key={index} className="text-white">
                <p>Position: {stringifyWithBigInt(position.value)}</p>
              </div>
            ))
          )} */}
          <span className="text-white">{stringifyWithBigInt(result)}</span>
          <span className="text-white">{APY}</span>
          <Button
            onClick={Test}
            className="bg-button-gradient text-white w-[11.41rem] h-[3.59rem] rounded-[3.97rem]">
            {'Test'}
          </Button>
        </div>
      );

}