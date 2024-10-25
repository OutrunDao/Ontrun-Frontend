import { uAddressMap } from "../addressMap/UTokenAddressMap";
import { addressMap } from "../addressMap/addressMap";
import { ChainId } from "../chains";
import { Token } from "@/packages/core/entities/token";

export const UBNB: { [chainId: number]: Token } = {

    [ChainId.BSC_TESTNET]: new Token(
      ChainId.BSC_TESTNET,
      uAddressMap[ChainId.BSC_TESTNET].UBNB,
      18,
      "UBNB",
      "UBNB",
    )
  }