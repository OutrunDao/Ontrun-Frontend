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
import { useStakeRouter } from "@/hooks/useStakeRouter";
import ToastCustom from "./ToastCustom";
import toast from "react-hot-toast";
import { parseEther } from "ethers";



export default function PositionTables() {

    const account = useAccount();
    const [data, setData] = useState();
    const [result, setResult] = useState<any[]>();
    const [isLoading, setIsLoading] = useState(false);
    const chainId = useChainId();

    const [APY, setAPY] = useState<Number>();
    const UsePOT = usePOT();
    const UseYT = useYT();
    const UseStakeRouter = useStakeRouter();

    async function redeem() {
  
      setIsLoading(true);
        // try {
          const receipt = await UseStakeRouter.redeemPPToToken({
            SYAddress: "0xA51A28C628ee5aA25A1AE3eC911DA54028A39332",
            PTAddress: "0x36955F4cDC4E77c41038024A072cD37832F2Ea87",
            UPTAddress: "0x0000000000000000000000000000000000000000",
            POTAddress: "0xDA5744032E53b2451E561B09a823210DF89f8d33",
            receiverAddress: account.address || "", // Ensure account.address is not undefined
            positionId: BigInt(3),
            positionShare: BigInt(parseEther("0.001")),
            minRedeemedSyAmount: BigInt(1),
          });
  
          toast.custom(() => (
            <ToastCustom
              content={
                receipt.status === 1 ? (
                  <>
                    {`You have successfully redeemed `}
                    . View on <Link href="#">BlockExplorer</Link>
                  </>
                ) : (
                  "Transaction failed"
                )
              }
            />
          ));
        // } catch (error) {
        //   toast.custom(() => (
        //     <ToastCustom
        //       content={`Transaction failed: ${error.message}`}
        //     />
        //   ));
        // } finally {
        //   setIsLoading(false);
        //   setPTPOTAmount("");
        // }
  
    }

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
          {/* <span className="text-white">{APY}</span> */}
          <Button
            onClick={Test}
            // isLoading={isLoading}
            className="bg-button-gradient text-white w-[11.41rem] h-[3.59rem] rounded-[3.97rem]">
            {'Test'}
          </Button>
          <Button
            onClick={redeem}
            // isLoading={isLoading}
            className="bg-button-gradient text-white w-[11.41rem] h-[3.59rem] rounded-[3.97rem]">
            {'redeem'}
          </Button>
        </div>
      );

}