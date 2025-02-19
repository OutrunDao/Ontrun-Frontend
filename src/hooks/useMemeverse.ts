import { BytesLike, ethers } from "ethers";
import { useEffect, useMemo, useState } from "react";
import {Options} from '@layerzerolabs/lz-v2-utilities';
import { useMemeverseRegistrationCenter } from "@/contracts/useContract/useMemeverse/useMemeverseRegistrationCenter";
import { useAccount, useChainId } from "wagmi";
import { CenterChainId, supportChainId, supportChainNames } from "@/contracts/chains";
import { UPTSymbol,UPTAddressMap } from "@/contracts/addressMap/TokenAddressMap";
import { useMemeverseRegistrar } from "@/contracts/useContract/useMemeverse/useMemeverseRegistrar";

interface MemeverseParam {
  name: string;
  symbol: string;
  uri: string;
  // uniqueId: bigint;
  // endTime: bigint;
  // unlockTime: bigint;
  durationDays: bigint;
  lockupDays: bigint;
  omnichainIds: number[];
  creator: string;
  upt: string;
}

function encodeLzReceiveOption() {
  const GAS_LIMIT = 10000000
  const MSG_VALUE = 0; // msg.value for the lzReceive() function on destination in wei
  const _options = Options.newOptions().addExecutorLzReceiveOption(GAS_LIMIT, MSG_VALUE);
  return _options;
}

// function encodeMemeverseParam(param: MemeverseParam): string {
//   const abiCoder = ethers.AbiCoder.defaultAbiCoder();
//   const encodedParam = abiCoder.encode(
//     [
//       "tuple(string name,string symbol,string uri,uint256 uniqueId,uint64 endTime,uint64 unlockTime,uint32[] omnichainIds,address creator,address upt)"
//     ],
//     [{
//       name: param.name,
//       symbol: param.symbol,
//       uri: param.uri,
//       uniqueId: param.uniqueId,
//       endTime: param.endTime,
//       unlockTime: param.unlockTime,
//       omnichainIds: param.omnichainIds,
//       creator: param.creator,
//       upt: param.upt
//     }]
//   );
//   return encodedParam;
// }

export function useMemeverse() {

  const chainId = useChainId();
  const account = useAccount();
  
  const [name, setName] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [lockupDays, setLockupDays] = useState<string>("");
  // const [maxFund, setMaxFund] = useState<string>("");
  const [upt, setUPT] = useState<string>(UPTAddressMap[UPTSymbol.UETH]);
  const [website, setWebsite] = useState<string>("");
  const [X, setX] = useState<string>("");
  const [telegram, setTelegram] = useState<string>("");
  const [discord, setDiscord] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [omnichainIds, setOmnichainIds] = useState<number[]>([97]);
  const [omichainIdsValue, setOmichainIdsValue] = useState<string>("");
  const [fee, setFee] = useState<string>("");
  const UseMemeverseRegistrationCenter = useMemeverseRegistrationCenter();
  const UseMemeverseRegistrar = useMemeverseRegistrar();

  const abiCoder = ethers.AbiCoder.defaultAbiCoder();

  const options = encodeLzReceiveOption();

  useEffect(() => {
    console.log(omichainIdsValue);
  },[omichainIdsValue])

  const supportChains = useMemo(() => {
    return Object.keys(supportChainId)
      .filter(key => !isNaN(Number(key)))
      .map(key => {
        const chainId = Number(key);
        return {
          chainId,
          chainName: supportChainNames[chainId]
        };
      });
  }, [chainId]);

  const UPT = useMemo(() => {
    return Object.keys(UPTSymbol)
      .map(key => {
        const symbol = key;
        return {
          symbol,
          address: UPTAddressMap[symbol]
        };
      });
  }, [chainId]);

  function handleOmnichainIds(param:string) {
    const arr = param.split(',').map(Number);
    setOmnichainIds(arr);
    return arr;
  }

  // async function handleFee(value:string) {
  //   if (!value || !account.address) {
  //     setOmichainIdsValue("");
  //     return setFee(ethers.formatEther(0));
  //   };
  //   setOmichainIdsValue(value);
  //   const _omnichainIds = handleOmnichainIds(value);
  //   const currentTime = Math.floor(Date.now() / 1000);

  //   const encodedData = abiCoder.encode(
  //     ["string", "uint256", "address"],
  //     [symbol, currentTime, account.address]
  //   );

  //   const hash = ethers.keccak256(encodedData);
  //   const uniqueId = BigInt(hash);

  //   const memeverseParam: MemeverseParam = {
  //     name: name,
  //     symbol: symbol,
  //     uri: "0",
  //     uniqueId: uniqueId,
  //     endTime: BigInt(Math.floor(Date.now() / 1000) + Number(duration)*86400),
  //     unlockTime: BigInt(Math.floor(Date.now() / 1000) + Number(lockupDays)*86400),
  //     omnichainIds: _omnichainIds, // 示例链ID
  //     creator: account.address, // 替换为实际的以太坊地址
  //     upt: "0xff5f3E0a160392fBF4fFfD9Eb6F629c121E92d9e", // 替换为实际的以太坊地址
  //   };

  //   const message = encodeMemeverseParam(memeverseParam);
  //   const receipt = await UseMemeverseRegistrationCenter.Read.quoteSend({
  //     omnichainIds: _omnichainIds,
  //     message: message // Replace {} with the appropriate message object
  //   });
  //   setFee(ethers.formatEther(receipt[0]));
  //   return receipt[0];
  // }

  async function handleFeeAtLocal(param:string) {
    if (!param || !account.address) {
      setOmichainIdsValue("");
      return setFee(ethers.formatEther(0));
    };
    setOmichainIdsValue(param);
    const _omnichainIds = handleOmnichainIds(param);
    const currentTime = Math.floor(Date.now() / 1000);

    const encodedData = abiCoder.encode(
      ["string", "uint256", "address"],
      [symbol, currentTime, account.address]
    );

    const hash = ethers.keccak256(encodedData);
    const uniqueId = BigInt(hash);

    const memeverseParam: MemeverseParam = {
      name: name,
      symbol: symbol,
      uri: "0",
      // uniqueId: uniqueId,
      // endTime: BigInt(Math.floor(Date.now() / 1000) + Number(duration)*86400),
      // unlockTime: BigInt(Math.floor(Date.now() / 1000) + Number(lockupDays)*86400),
      durationDays: BigInt(Number(duration)),
      lockupDays: BigInt(Number(lockupDays)),
      omnichainIds: _omnichainIds, // 示例链ID
      creator: account.address, // 替换为实际的以太坊地址
      upt: upt, // 替换为实际的以太坊地址
    };

    const receipt = await UseMemeverseRegistrar.Read.quoteRegister({
      value: BigInt(0),
      param: memeverseParam,
    });
    setFee(ethers.formatEther(receipt));
    return receipt;
  }

  async function handleFeeOmnichainId(param:string) {
    if (!param || !account.address) {
      setOmichainIdsValue("");
      return setFee(ethers.formatEther(0));
    };
    setOmichainIdsValue(param);
    const _omnichainIds = handleOmnichainIds(param);

    const memeverseParam: MemeverseParam = {
      name: name,
      symbol: symbol,
      uri: "0",
      durationDays: BigInt(Number(duration)),
      lockupDays: BigInt(Number(lockupDays)),
      omnichainIds: _omnichainIds, // 示例链ID
      creator: account.address, // 替换为实际的以太坊地址
      upt: upt, // 替换为实际的以太坊地址
    };
    const receiptAtLocal = await UseMemeverseRegistrar.Read.quoteRegisterAtLocal({
      value: BigInt(0),
      param: memeverseParam,
    });
    const receipt = await UseMemeverseRegistrar.Read.quoteRegister({
      value: receiptAtLocal,
      param: memeverseParam,
    });
    setFee(ethers.formatEther(receipt));
    return receipt[0];
  }

  async function registration() {
    if (!name || !symbol || !duration || !lockupDays || !account.address) return;
    
      console.log(omnichainIds);
      const value = ethers.parseEther(fee);
      const receipt = await UseMemeverseRegistrar.Write.registerAtCenter({
        value: BigInt(value),
        name,
        symbol,
        uri: "0",
        durationDays: BigInt(Number(duration)),
        lockupDays: BigInt(Number(lockupDays)),
        // maxFund: BigInt(maxFund),
        omnichainIds,
        registrar: account.address,
        UPT: upt,
      });
      return receipt;


  }

  return {
    memeverseData: {
      name,
      symbol,
      duration,
      lockupDays,
      // maxFund,
      upt,
      website,
      X,
      telegram,
      discord,
      description,
      supportChains,
      UPT,
      fee,
    },
    memeverseSetPramas: {
      setName,
      setSymbol,
      setDuration,
      setLockupDays,
      // setMaxFund,
      setUPT,
      setWebsite,
      setX,
      setTelegram,
      setDiscord,
      setDescription,
    },
    handleFeeAtLocal,
    handleFeeOmnichainId,
    registration,
    loading,
    setLoading,
  }
}