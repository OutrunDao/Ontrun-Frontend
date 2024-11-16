import { Ether } from "@/packages/core";
import { ORETH, ORUSD, OSETH, OSUSD, REY, RUY, USDB, tBNB } from "./tokens/tokens";
import { UBNB } from "./tokens/UPT";
import { SYslisBNB } from "./tokens/SY";
import { ChainId } from "./chains";
import { slisBNB } from "./tokens/tokenStake";
import { YTslisBNB } from "./tokens/YT";
import { POTslisBNB } from "./tokens/POT";


export const currencySelectList = [Ether, USDB, ORETH, ORUSD, OSUSD, OSETH, REY, RUY];

export const currencyMintPageSelectList = [Ether, USDB, ORETH, ORUSD];

export const currencyStakePageSelectList = [ORETH, ORUSD];

export const currencyStakePageSelectList2 = [OSETH, OSUSD];

export const currencySelectListTBNB = [Ether, SYslisBNB];

export const currencySelectListETH = [Ether];

export const currencySelectListUSDB = [USDB];

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
    [ChainId.BSC_TESTNET]: [UBNB, Ether],
}

export const StakeCurrencyListMap = {
    [ChainId.BSC_TESTNET]: {
      [ContractName.slisBNB]: slisBNBCurrencyList,
    }
} as Record<number, StakeCurrencyListMapType>;
