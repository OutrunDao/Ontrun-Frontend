import { ChainId } from "@/contracts/chains";
import { Ether, Token } from "@/packages/core";
import { multicall } from "viem/actions";

export enum ContractName {
  POTslisBNB = "POTslisBNB",
  YTslisBNB = "YT-slisBNB",
  swapFactory = "swapFactory",
}
export type graphURL = Record<string, string>;

export const graphURLMap = {
  [ChainId.BSC_TESTNET]: {
    [ContractName.POTslisBNB]: "https://api.studio.thegraph.com/query/92841/ontrun-pot/version/latest",
    [ContractName.YTslisBNB]: "https://api.studio.thegraph.com/query/92841/ontrun-yt/version/latest",
    [ContractName.swapFactory]: "https://api.studio.thegraph.com/query/92841/outrunammfactory/version/latest",
  }
} as Record<number, graphURL>;