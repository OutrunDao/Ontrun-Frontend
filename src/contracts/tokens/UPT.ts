import { UPTAddressMap } from "../addressMap/OutStakeAddressMap";
import { addressMap } from "../addressMap/addressMap";
import { ChainId } from "../chains";
import { Token } from "@/packages/core/entities/token";

export const UBNB: { [chainId: number]: Token } = {

    [ChainId.BSC_TESTNET]: new Token(
      ChainId.BSC_TESTNET,
      UPTAddressMap[ChainId.BSC_TESTNET].UBNB,
      18,
      "UBNB",
      "UBNB",
    )
  }