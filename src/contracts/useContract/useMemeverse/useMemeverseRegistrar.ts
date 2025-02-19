import { ContractName, GmemeverseAddressMap } from "@/contracts/addressMap/memeverseAddressMap";
import { ChainId,RPC_URL } from "@/contracts/chains";
import { ethers } from "ethers";
import { MemeverseRegistrarAbi } from "@/contracts/abis/memeverseRegistrar";
import { Address } from "viem";

export function useMemeverseRegistrar() {
  
  async function getMemeverseRegistrarRead() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    return new ethers.Contract(GmemeverseAddressMap.MemeverseRegistrar, MemeverseRegistrarAbi, provider);
  }

  async function getMemeverseRegistrarReadAtLocal() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.JsonRpcProvider(RPC_URL[ChainId.BSC_TESTNET]);
    return new ethers.Contract(GmemeverseAddressMap.MemeverseRegistrar, MemeverseRegistrarAbi, provider);
  }

  async function getMemeverseRegistrarWrite() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(GmemeverseAddressMap.MemeverseRegistrar, MemeverseRegistrarAbi, signer);
  }

  async function quoteRegister({
    value,
    param,
  }: {
    value: BigInt,
    param: any;
  }) {
    const MemeverseRegistrarContract = await getMemeverseRegistrarRead();
    const receipt = await MemeverseRegistrarContract.quoteRegister(param, value);
    return receipt;
  }

  async function quoteRegisterAtLocal({
    value,
    param,
  }: {
    value: BigInt,
    param: any;
  }) {
    const MemeverseRegistrarContract = await getMemeverseRegistrarReadAtLocal();
    const receipt = await MemeverseRegistrarContract.quoteRegister(param, value);
    return receipt;
  }

  async function registerAtCenter({
    value,
    name,
    symbol,
    uri,
    durationDays,
    lockupDays,
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
    omnichainIds: number[],
    registrar: Address,
    UPT: string,
  }) {
    console.log([value, name, symbol, uri, durationDays, lockupDays, omnichainIds, registrar, UPT]);
    const MemeverseRegistrarContract = await getMemeverseRegistrarWrite();
    const tx = await MemeverseRegistrarContract.registerAtCenter(
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
      value,
      {value : value}
    );
    const receipt = await tx.wait();
    return receipt;
  }

  return {
    Read: {
      quoteRegister,
      quoteRegisterAtLocal,
    },
    Write: {
      registerAtCenter,
    }
  }
}