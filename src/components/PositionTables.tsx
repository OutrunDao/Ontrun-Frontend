"use client";
import { ApolloClient, InMemoryCache, gql, useQuery} from "@apollo/client";
import PositionTable from "./PositionTable";
import { useAccount, useChainId } from "wagmi";
import { use, useEffect, useState } from "react";
import { usePOT } from "@/contracts/useContract/usePOT";
import { POTslisBNB } from "@/contracts/tokens/POT";
import { Button, Divider, Input, Link } from "@heroui/react";
import { useYT } from "@/contracts/useContract/useYT";
import { YTslisBNB } from "@/contracts/tokens/YT";
import { graphURLMap } from "@/contracts/graphURLs";
import { SYslisBNB } from "@/contracts/tokens/SY";
import { useStakeRouter } from "@/contracts/useContract/useStakeRouter";
import ToastCustom from "./ToastCustom";
import toast from "react-hot-toast";
import { ethers, parseEther } from "ethers";
import { useERC20 } from "@/contracts/useContract/useERC20";
import axios from 'axios';
import { erc20 } from "@/contracts/abis/erc20";



export default function PositionTables() {

    const account = useAccount();
    const [data, setData] = useState();
    const [result, setResult] = useState<any[]>();
    const [isLoading, setIsLoading] = useState(false);
    const chainId = useChainId();

    const [APY, setAPY] = useState<Number>();
    const UsePOT = usePOT();
    const UseYT = useYT();
    const UseERC20 = useERC20();
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

    async function Test() {

      const provider = new ethers.JsonRpcProvider("https://api.zan.top/bsc-testnet");
      const contract = new ethers.Contract("0x3212bD0fA3aeBd0001cd2616Ff7a161E7C9cfB0E", erc20, provider);

      const data = contract.interface.encodeFunctionData("approve", ["0xEf63848F3105e3a4EF568d8358F80EE5615eE4BF", parseEther("1")]);
      const tx = {
        to: "0x3212bD0fA3aeBd0001cd2616Ff7a161E7C9cfB0E",
        gasLimit: 21000,
        gasPrice: 1000000000,
        data: data
      };

      const nonce = await provider.getTransactionCount("0x974Ea02978EbfD98479B757748B628a7be5770E8", "latest");
      const response = await axios.post('http://localhost:3001/sign-transaction', {
        transaction: {
          to: tx.to,
          value: "0x0", // approve 交易不需要发送 ETH
          gasLimit: tx.gasLimit.toString(),
          gasPrice: tx.gasPrice.toString(),
          nonce: nonce,
          chainId: chainId,
          data: tx.data
        }
      }, {
        headers: {
          'x-api-key': 'INTERNAL_API_KEY'
        }
      });
    
      console.log(response);
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