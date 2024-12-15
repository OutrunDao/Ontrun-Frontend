import { BytesLike, ethers } from "ethers";
import { useMemo, useState } from "react";
import {Options} from '@layerzerolabs/lz-v2-utilities';
import { useMemeverseRegistrationCenter } from "@/contracts/useContract/useMemeverse/useMemeverseRegistrationCenter";
import { useAccount, useChainId } from "wagmi";
import { CenterChainId, supportChainId, supportChainNames } from "@/contracts/chains";

interface MemeverseParam {
  name: string;
  symbol: string;
  uri: string;
  uniqueId: bigint;
  maxFund: bigint;
  endTime: bigint;
  unlockTime: bigint;
  omnichainIds: number[];
  creator: string;
}

function encodeLzReceiveOption() {
  const GAS_LIMIT = 10000000
  const MSG_VALUE = 0; // msg.value for the lzReceive() function on destination in wei
  const _options = Options.newOptions().addExecutorLzReceiveOption(GAS_LIMIT, MSG_VALUE);
  return _options;
}

function encodeMemeverseParam(param: MemeverseParam): string {
  const abiCoder = ethers.AbiCoder.defaultAbiCoder();
  const encodedParam = abiCoder.encode(
    [
      "tuple(string name,string symbol,string uri,uint256 uniqueId,uint128 maxFund,uint64 endTime,uint64 unlockTime,uint32[] omnichainIds,address creator)"
    ],
    [{
      name: param.name,
      symbol: param.symbol,
      uri: param.uri,
      uniqueId: param.uniqueId,
      maxFund: param.maxFund,
      endTime: param.endTime,
      unlockTime: param.unlockTime,
      omnichainIds: param.omnichainIds,
      creator: param.creator
    }]
  );
  return encodedParam;
}

export function useMemeverse() {

  const chainId = useChainId();
  const account = useAccount();
  
  const [name, setName] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [lockupDays, setLockupDays] = useState<string>("");
  const [maxFund, setMaxFund] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [X, setX] = useState<string>("");
  const [telegram, setTelegram] = useState<string>("");
  const [discord, setDiscord] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [omnichainIds, setOmnichainIds] = useState<number[]>([]);
  const [omichainIdsValue, setOmichainIdsValue] = useState<string>("");
  const [fee, setFee] = useState<string>("");
  const UseMemeverseRegistrationCenter = useMemeverseRegistrationCenter();

  const abiCoder = ethers.AbiCoder.defaultAbiCoder();

  const options = encodeLzReceiveOption();

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

  function handleOmnichainIds(value:string) {
    const arr = value.split(',').map(Number);
    setOmnichainIds(arr);
    return arr;
  }

  async function handleFee(value:string) {
    if (!value || !account.address) return setFee(ethers.formatEther(0));
    setOmichainIdsValue(value);
    const _omnichainIds = handleOmnichainIds(value);
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
      uniqueId: uniqueId,
      maxFund: BigInt(maxFund), // 使用 BigInt 表示 uint128
      endTime: BigInt(Math.floor(Date.now() / 1000) + Number(duration)*86400), // 当前时间加1小时，单位为秒
      unlockTime: BigInt(Math.floor(Date.now() / 1000) + Number(lockupDays)*86400), // 当前时间加2小时，单位为秒
      omnichainIds: _omnichainIds, // 示例链ID
      creator: account.address // 替换为实际的以太坊地址
    };

    const message = encodeMemeverseParam(memeverseParam);
    const receipt = await UseMemeverseRegistrationCenter.Read.quoteSend({
      omnichainIds: _omnichainIds,
      options: options.toHex(),
      message: message // Replace {} with the appropriate message object
    });
    setFee(ethers.formatEther(receipt[0]));
    return receipt[0];
  }

  async function registration() {
    if (!name || !symbol || !duration || !lockupDays || !account.address) return;
    if (chainId == CenterChainId) {
      const _fee = await handleFee(omichainIdsValue)
      const receipt = await UseMemeverseRegistrationCenter.Write.registration({
        value: BigInt(_fee),
        name,
        symbol,
        uri: "0",
        website,
        X,
        telegram,
        discord,
        description,
        durationDays: BigInt(Number(duration)),
        lockupDays: BigInt(Number(lockupDays)),
        maxFund: BigInt(maxFund),
        omnichainIds,
        registrar: account.address
      });
      return receipt;
    } else {
      
    }

  }

  return {
    memeverseData: {
      name,
      symbol,
      duration,
      lockupDays,
      maxFund,
      website,
      X,
      telegram,
      discord,
      description,
      supportChains,
      fee,
    },
    memeverseSetPramas: {
      setName,
      setSymbol,
      setDuration,
      setLockupDays,
      setMaxFund,
      setWebsite,
      setX,
      setTelegram,
      setDiscord,
      setDescription,
    },
    handleFee,
    registration,
    loading,
    setLoading,
  }
}