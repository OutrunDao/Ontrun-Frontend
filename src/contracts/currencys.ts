import { Ether } from "@/packages/core";
import { Token0, Token1, Token2, tBNB } from "./tokens/tokens";
import { UBNB } from "./tokens/UPT";
import { SYslisBNB } from "./tokens/SY";
import { ChainId } from "./chains";
import { slisBNB } from "./tokens/tokenStake";
import { YTslisBNB } from "./tokens/YT";
import { POTslisBNB } from "./tokens/POT";


export const currencySelectList = [Ether, tBNB, slisBNB];

export const currencySelectListTBNB = [Ether, SYslisBNB];

export const currencySelectListETH = [Ether];

export type CurrencySelectListType = typeof currencySelectList;

const slisBNBCurrencyList = {
    NT: Ether,
    RT: slisBNB,
    SY: SYslisBNB,
    UPT: UBNB,
    YT: YTslisBNB,
    POT: POTslisBNB,
};

export type StakeCurrencyListType = typeof slisBNBCurrencyList;

export type StakeCurrencyListMapType = Record<string, StakeCurrencyListType>;

export enum ContractName {
    slisBNB = "slisBNB",
}

export const SwapCurrencyList = {
    [ChainId.BSC_TESTNET]: [Token0, Token1, Token2,Ether ,slisBNB],
}

export const BaseCurrencyList = {
    [ChainId.BSC_TESTNET]: [Token0, Token1, Token2],
}

export const StakeCurrencyListMap = {
    [ChainId.BSC_TESTNET]: {
      [ContractName.slisBNB]: slisBNBCurrencyList,
    }
} as Record<number, StakeCurrencyListMapType>;

export function getSwapCurrencyList(chainId: number): [] {
    // @ts-ignore
    return SwapCurrencyList[chainId];
}

export function getBaseCurrencyList(chainId: number): [] {
    // @ts-ignore
    return BaseCurrencyList[chainId];
}