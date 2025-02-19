import { memeverseAddressMap } from "@/contracts/addressMap/memeverseAddressMap";
import { ChainId } from "@/contracts/chains";
import { ethers } from "ethers";
import { memeverseRegistrationCenterAbi } from "@/contracts/abis/memeverseRegistrationCenter";
import { Address } from "viem";

export function useMemeverseRegistrationCenter() {
  
  async function getMemeverseRegistrationCenterRead() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    return new ethers.Contract(memeverseAddressMap[ChainId.BSC_TESTNET].memeverseRegistrationCenter, memeverseRegistrationCenterAbi, provider);
  }

  async function getMemeverseRegistrationCenterWrite() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(memeverseAddressMap[ChainId.BSC_TESTNET].memeverseRegistrationCenter, memeverseRegistrationCenterAbi, signer);
  }

  async function quoteSend({
    omnichainIds,
    message,
  }: {
    omnichainIds: Number[];
    message: any;
  }) {
    const memeverseRegistrationCenterContract = await getMemeverseRegistrationCenterRead();
    const receipt = await memeverseRegistrationCenterContract.quoteSend(omnichainIds, message);
    return receipt;
  }

  async function registration({
    value,
    name,
    symbol,
    uri,
    durationDays,
    lockupDays,
    maxFund,
    omnichainIds,
    registrar,
    UPT,
  }:{
    value: BigInt,
    name: string,
    symbol: string,
    uri: string,
    durationDays: BigInt,
    lockupDays: BigInt,
    maxFund: BigInt,
    omnichainIds: number[],
    registrar: Address,
    UPT: string,
  }) {
    console.log(value);
    console.log([value, name, symbol, uri, durationDays, lockupDays, omnichainIds, registrar, UPT]);
    const memeverseRegistrationCenterContract = await getMemeverseRegistrationCenterWrite();
    const tx = await memeverseRegistrationCenterContract.registration(
      [
        name,
        symbol,
        uri,
        durationDays,
        lockupDays,
        omnichainIds,
        registrar,
        UPT,
      ],
      {value : value}
    );
    const receipt = await tx.wait();
    return receipt;
  }

  return {
    Read: {
      quoteSend,
    },
    Write: {
      registration,
    }
  }
}