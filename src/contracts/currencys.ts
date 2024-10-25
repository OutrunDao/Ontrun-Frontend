import { Ether } from "@/packages/core";
import { ORETH, ORUSD, OSETH, OSUSD, REY, RUY, USDB, tBNB } from "./tokens/tokens";
import { UBNB } from "./tokens/UPT";
import { SYslisBNB } from "./tokens/SY";

export const currencySelectList = [Ether, USDB, ORETH, ORUSD, OSUSD, OSETH, REY, RUY];

export const currencyMintPageSelectList = [Ether, USDB, ORETH, ORUSD];

export const currencyStakePageSelectList = [ORETH, ORUSD];

export const currencyStakePageSelectList2 = [OSETH, OSUSD];

export const currencySelectListTBNB = [Ether, SYslisBNB];

export const currencySelectListETH = [Ether];

export const currencySelectListUSDB = [USDB];

export type CurrencySelectListType = typeof currencySelectList;
