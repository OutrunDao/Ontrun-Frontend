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

  TBNB = "TBNB",
  multicall = "multicall",
  slisBNB = "slisBNB",
  stakeRouter = "stakeRouter",
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
    [ContractName.TBNB]: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    [ContractName.multicall]: "0xcA11bde05977b3631167028862bE2a173976CA11",
    [ContractName.slisBNB]: "0xCc752dC4ae72386986d011c2B485be0DAd98C744",
    [ContractName.stakeRouter]: "0xeC3dE0884a4C4b041Dda0Ae60C95Cf25967D6Efe",
    [ContractName.SWAP_FACTORY]: "0x9ef195740a75a76B0F1fE6909964E35123858521",
  }
} as Record<number, ContractAddressMap>;

export const factoryAddressMap = {
  [ChainId.BLAST_SEPOLIA]: [
    "0x7388d4A76D6Ec12946652c2953cd17B70E457f03",
  ],
  [ChainId.BSC_TESTNET]: [
    "0x263B2C7ee992959922f7C12FBdE33c1b2519f86D",//0.3% Fee
    "0x7327A22496F7396B4228656A9c13B9Fb93AE50De",//1% Fee
  ],
};

export function getFactoryAddresses(chainId: number): `0x${string}`[] {
  // @ts-ignore
  return factoryAddressMap[chainId] || [];
}

export const routerAddressMap = {
  [ChainId.BLAST_SEPOLIA]: [
    "0xff5Ca5f867a03cE04f6ac146d16aF23224518604",
  ],
  [ChainId.BSC_TESTNET]: [
    "0x1c043c58DE8e9bC23cBE72D1bC96c88770B66544",//0.3% Fee
    "0xa9f423843a1066e91bb31fF09295945EAe1Fa699",//1% Fee
  ],
}

export function getRouterAddress(chainId: number, swapFeeRate: string): `0x${string}`[] | undefined {
  switch (swapFeeRate) {
    // @ts-ignore
    case "30": return [routerAddressMap[chainId][0]];
    // @ts-ignore
    case "100": return [routerAddressMap[chainId][1]];
    default: return undefined;
  }
}

export const initCodeHashMap = {
  [ChainId.BLAST_SEPOLIA]: "0x9d7b24376800c0a5fb253d12673d2021f71732f524fe808d89000739fc93fce8",
  [ChainId.BSC_TESTNET]: "0x7473c3d610002203fa041b5c9660816c72c66dfc7cd4e1ff353ceb57289c40f4",
} as Record<number, `0x${string}`>;

