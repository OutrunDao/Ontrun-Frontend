import { Button, Divider, Input, Link } from "@nextui-org/react";
import { use, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useAccount, useChainId, usePublicClient } from "wagmi";
import ToastCustom from "./ToastCustom";
import TokenSelect from "./TokenSelect";
import TokenSure from "./TokenSure";
import { Currency, Token} from "@/packages/core";
import { useSearchParams } from "next/navigation";
import { StakeCurrencyListMap } from "@/contracts/currencys";
import { POT } from "@/contracts/tokens/POT";
import Decimal from "decimal.js-light";
import { set } from "radash";
import { usePOT } from "@/contracts/useContract/usePOT";
import { ethers, parseEther, parseUnits } from "ethers";
import TokenTab from "./TokenTab";
import { useStakeRouter } from "@/contracts/useContract/useStakeRouter";
import { useERC20 } from "@/contracts/useContract/useERC20";
import { addressMap } from "@/contracts/addressMap/addressMap";

export default function RedeemTab({
  // tokenName,

  positionData,
}:{
  // tokenName:string

  positionData:any
}) {

  const chainId = useChainId();
  const account = useAccount();
  const publicClient = usePublicClient();
  // const searchParams = useSearchParams();
  const tokenName = positionData.RTSymbol;
  const PositionId = positionData.PositionId;
  const [PT, setPT] = useState<Currency>();
  const [POT, setPOT] = useState<POT>();
  const [RT, setRT] = useState<Currency>();
  const [PTBalance, setPTBalance] = useState<Decimal>(new Decimal(0));
  const [POTBalance, setPOTBalance] = useState<Decimal>(new Decimal(0));
  const [PTPOTAmount, setPTPOTAmount] = useState("");
  const [RTAmount, setRTAmount] = useState<Decimal>(new Decimal(0));
  const [isLoading, setIsLoading] = useState(false);
  const [isApprovedPT, setIsApprovedPT] = useState(false);
  const [isApprovedPOT, setIsApprovedPOT] = useState(false);

  const UsePOT = usePOT();
  const UseStakeRouter = useStakeRouter();
  const UseERC20 = useERC20();

  const routerAddress = useMemo(() => {
    return addressMap[chainId].stakeRouter;
  },[chainId])

  useEffect(() => {
    if (!chainId || !tokenName || !StakeCurrencyListMap[chainId]) return;

    const tokens = StakeCurrencyListMap[chainId][tokenName];
    if (tokens) {
      setPT(tokens.UPT[chainId]);
      setPOT(tokens.POT[chainId]);
      setRT(tokens.RT[chainId]);
    }
    
  },[chainId, tokenName])

  useEffect(() => {

    async function _PT() {
      if (!account.address || !PT || !publicClient) return new Decimal(0);
      return PT.balanceOf(account.address, publicClient).catch(() => new Decimal(0));
    }
    _PT().then(setPTBalance);
    setPOTBalance(positionData.POTBalance);
  }, [chainId, account.address, PT]);

  useEffect(() => {

    async function _() {
      if (!POT || !PTPOTAmount) return new Decimal(0); // Add this line to check if POT is undefined
      const result = await UsePOT.POTRead.previewRedeem({
        POT: POT,
        positionId: BigInt(PositionId),
        positionShare: BigInt(parseEther(PTPOTAmount)),
      });
      const result2 = new Decimal(ethers.formatEther(result || "0"));
      return result2;
    }
    _().then(setRTAmount)
  },[positionData,PTPOTAmount])

  useEffect(() => {
    async function _() {
      if (!PT || !POT || !account.address) return;
      const allowanceToken = await (PT as Token).allowance(account.address, routerAddress, publicClient!);
      setIsApprovedPT(allowanceToken.greaterThanOrEqualTo(PTPOTAmount || 0));
    }
    _();
  },[PT, PTPOTAmount])

  useEffect(() => {
    async function _() {
      if (!POT || !account.address || !routerAddress) return;
      return await UsePOT.POTRead.isApprovedForAll({
        POTAddress: POT.address,
        account: account.address,
        operator: routerAddress,
      })
    }
    _().then(setIsApprovedPOT);
  },[POT])

  function handlePTPOTAmount(amount:string) {
    if (Number(amount) > Number(PTBalance)) {
        setPTPOTAmount(PTBalance.toFixed(18));
    } else {
        setPTPOTAmount(amount);
    }
}

  async function approvePT() {
    if (!PT || !POT || !PTPOTAmount || !routerAddress) return;

    if (!account.address)
      return toast.custom(<ToastCustom content="Please Connect Wallet" />);

    setIsLoading(true);
    try {
      if (!account.address) return console.log("wallet account is not connected");
      const allowanceToken = await (PT as Token).allowance(account.address, routerAddress, publicClient!);
      if (allowanceToken.lessThan(PTPOTAmount || 0)) {
        const receipt = await UseERC20.ERC20Write.approve({
          erc20Address: (PT as Token).address,
          spender: routerAddress,
          amount: parseUnits(PTPOTAmount!.toString(), PT.decimals) - parseUnits(allowanceToken!.toString(), PT.decimals),
        });
        if (receipt.status === 1) {
          setIsApprovedPT(true);
        }
        toast.custom(() => (
          <ToastCustom
            content={
              receipt.status === 1
                ? `You have successfully approved ${PTPOTAmount} ${PT?.symbol}`
                : "Transaction failed"
            }
          />
        ));
      }
    } catch (error) {
      toast.custom(() => (
        <ToastCustom
          content={`Transaction failed`}
        />
      ));
    } finally {
      setIsLoading(false);
    }
  }

  async function approvePOT() {
    if (!PT || !POT || !PTPOTAmount || !routerAddress) return;

    if (!account.address)
      return toast.custom(<ToastCustom content="Please Connect Wallet" />);

    setIsLoading(true);
    try {
      const receipt = await UsePOT.POTWrite.setApprovalForAll({
        POTAddress: POT.address, // Replace with the actual value
        spender: routerAddress, // Replace with the actual value
        approved: true, // Replace with the actual value
      });
      if (receipt.status === 1) {
        setIsApprovedPOT(true);
      }
      toast.custom(() => (
        <ToastCustom
          content={
            receipt.status === 1
              ? `You have successfully approved ${PTPOTAmount} ${POT?.symbol}`
              : "Transaction failed"
          }
        />
      ));
    } catch (error) {
      console.log(error);
      toast.custom(() => (
        <ToastCustom
          content={`Transaction failed`}
        />
      ));
    } finally {
      setIsLoading(false);
    }
  }

  async function redeem() {
    if (!PT || !POT || !RT || !PTPOTAmount) return;

    if (!account.address)
      return toast.custom(<ToastCustom content="Please Connect Wallet" />);

    setIsLoading(true);
      try {
        const receipt = await UseStakeRouter.redeemPPToToken({
          SYAddress: (POT.SY as Token).address, // Replace with the actual value
          PTAddress: (PT as Token).address, // Replace with the actual value
          UPTAddress: "0x0000000000000000000000000000000000000000", // Replace with the actual value
          POTAddress: POT.address, // Replace with the actual value
          receiverAddress: account.address, // Replace with the actual value
          positionId: BigInt(PositionId), // Replace with the actual value
          positionShare: parseUnits(PTPOTAmount!.toString(), PT.decimals), // Replace with the actual value
          minRedeemedSyAmount: BigInt(0), // Replace with the actual value
        });

        toast.custom(() => (
          <ToastCustom
            content={
              receipt.status === 1 ? (
                <>
                  {`You have successfully redeemed ${PTPOTAmount} ${PT?.symbol}`}
                  . View on <Link href="#">BlockExplorer</Link>
                </>
              ) : (
                "Transaction failed"
              )
            }
          />
        ));
      } catch (error) {
        console.log({
          SYAddress: (POT.SY as Token).address, // Replace with the actual value
          PTAddress: (PT as Token).address, // Replace with the actual value
          UPTAddress: "0x0000000000000000000000000000000000000000", // Replace with the actual value
          POTAddress: POT.address, // Replace with the actual value
          receiverAddress: account.address, // Replace with the actual value
          positionId: BigInt(PositionId), // Replace with the actual value
          positionShare: parseUnits(PTPOTAmount!.toString(), PT.decimals), // Replace with the actual value
          minRedeemedSyAmount: BigInt(0), // Replace with the actual value
        });
        console.log(error);
        toast.custom(() => (
          <ToastCustom
            content={`Transaction failed`}
          />
        ));
      } finally {
        setIsLoading(false);
        setPTPOTAmount("");
      }

  }

  return (
    <div className="flex flex-col items-center">
      <span>Deadline:{positionData.deadline}{" "}days</span>
      <TokenTab Balance={PTBalance} InputValue={PTPOTAmount} onValueChange={handlePTPOTAmount} token={PT}/>
      <div className="text-white flex m-1 w-full justify-around items-center"></div>
      <TokenTab Balance={POTBalance} InputValue={PTPOTAmount} onValueChange={handlePTPOTAmount} token={POT} ifMax={true}/>
      <div className="text-white flex m-10 w-full justify-around items-center"></div>
      <TokenTab Balance={new Decimal(0)} InputValue={Number(RTAmount)?RTAmount.toFixed(6):""} token={RT}/>
        
      <div className="flex flex-col gap-y-[0.35rem] w-[28rem] text-[0.82rem] leading-[1.12rem] font-avenir font-medium my-[0.71rem]">
        <div className="flex justify-between w-full text-white text-opacity-50">
        </div>
      </div>
      {isApprovedPOT ? isApprovedPT ? (
        <Button
          onClick={redeem}
          isDisabled={!PTPOTAmount && !isApprovedPT}
          isLoading={isLoading}
          className="bg-button-gradient text-white w-[11.41rem] h-[3.59rem] rounded-[3.97rem]">
          {'Redeem'}
        </Button>
      ) : (
        <Button
          onClick={approvePT}
          isDisabled={!PTPOTAmount}
          isLoading={isLoading}
          className="bg-button-gradient text-white w-[11.41rem] h-[3.59rem] rounded-[3.97rem]">
          {'Approve PT'}
        </Button>
      ) : (
        <Button
          onClick={approvePOT}
          isDisabled={!POT}
          isLoading={isLoading}
          className="bg-button-gradient text-white w-[11.41rem] h-[3.59rem] rounded-[3.97rem]">
          {'Approve POT'}
        </Button>
      )}

    </div>
  );
}
