import { ChainId } from "@/contracts/chains";
import { Ether, Token } from "@/packages/core";
import { multicall } from "viem/actions";
import { slisBNB } from "../tokens/tokenStake";

type AddressMap = { [chainId: number]: string };
export enum ContractName {
  SWAP_ROUTER = "SWAP_ROUTER",
  SWAP_FACTORY = "SWAP_FACTORY",
  ORETH_STAKE = "ORETH_STAKE",
  ORUSD_STAKE = "ORUSD_STAKE",
  ORETH_ORUSD = "ORETH_ORUSD",
  MULTICALL = "MULTICALL",
  ORETH = "ORETH",
  ORUSD = "ORUSD",
  OSUSD = "OSUSD",
  RUY = "RUY",
  REY = "REY",
  OSETH = "OSETH",

  WBNB = "WBNB",
  multicall = "multicall",
  slisBNB = "slisBNB",
  stakeRouter = "stakeRouter",
  refferManager = "refferManager",
}
export type ContractAddressMap = Record<string, `0x${string}`>;

export const addressMap = {
  [ChainId.BLAST_SEPOLIA]: {
    [ContractName.SWAP_ROUTER]: "0xff5Ca5f867a03cE04f6ac146d16aF23224518604",
    [ContractName.SWAP_FACTORY]: "0x7388d4A76D6Ec12946652c2953cd17B70E457f03",
    [ContractName.MULTICALL]: "0xca11bde05977b3631167028862be2a173976ca11",
    [ContractName.ORETH_ORUSD]: "0x8677E9D150731bFd63c03C0683d19E3E03c0CAdD",
    [ContractName.ORETH]: "0x99766FEb8EA7F357bDBa860998D1Fb44d7fb89eA",
    [ContractName.ORUSD]: "0x6D78F8523Be0d36DDB874B4db5570c7E034F250A",
    [ContractName.OSUSD]: "0x486741e031C9c76daA4c74aB0E2E9046190b267f",
    [ContractName.REY]: "0x2f66A2Fc3b9bb263347Ef591f1Cd2a3eA82Bd70d",
    [ContractName.RUY]: "0x7f678be74744E5fA44a36c709736F6f557867abA",
    [ContractName.OSETH]: "0x02288a4a965cBA212257b85a809c158e0E85Ac3D",
    [ContractName.ORETH_STAKE]: "0x2FB88bb0fc7175212b49E6577020e74272B28B47",
    [ContractName.ORUSD_STAKE]: "0x082fcCB4Ef497B7cC856e71DcAD81763B15916Bc",
  },
  [ChainId.BSC_TESTNET]: {
    [ContractName.WBNB]: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
    [ContractName.multicall]: "0xcA11bde05977b3631167028862bE2a173976CA11",
    [ContractName.slisBNB]: "0xCc752dC4ae72386986d011c2B485be0DAd98C744",
    [ContractName.stakeRouter]: "0x88c022aA8Ccae9C1cdc2BeC7Aac32dc0ec61986c",
    [ContractName.SWAP_FACTORY]: "0xe2d3d0BC4Cc3ACfe3DAbDc01e291c8E8fb25EED8",
    [ContractName.SWAP_ROUTER]: "0xEf63848F3105e3a4EF568d8358F80EE5615eE4BF",
    [ContractName.refferManager]: "0x19D4B167198a6f5c5cF5A31668a0F276c3EF173e",
  }
} as Record<number, ContractAddressMap>;

export const factoryAddressMap = {
  [ChainId.BLAST_SEPOLIA]: [
  ],
  [ChainId.BSC_TESTNET]: [
    "0xe2d3d0BC4Cc3ACfe3DAbDc01e291c8E8fb25EED8",//0.3% Fee
    "0xfeFcCd94289d39f71DFA09564eC9d14D31b3BeDe",//1% Fee
  ],
};

export function getSwapFactoryAddresses(chainId: number): `0x${string}`[] {
  // @ts-ignore
  return factoryAddressMap[chainId] || [];
}

export const initCodeHashMap = {
  [ChainId.BLAST_SEPOLIA]: "0x9d7b24376800c0a5fb253d12673d2021f71732f524fe808d89000739fc93fce8",
  [ChainId.BSC_TESTNET]: "0xf52fc9f1359be155b90c9431d42b6d85340b12743086a3ba41d0297b047c675a",
  
} as Record<number, `0x${string}`>;

