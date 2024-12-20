import { PTAddressMap } from "../addressMap/PTAddressMap";
import { uAddressMap } from "../addressMap/UTokenAddressMap";
import { addressMap } from "../addressMap/addressMap";
import { ChainId } from "../chains";
import { Token } from "@/packages/core/entities/token";

export const PTslisBNB: { [chainId: number]: Token } = {

    [ChainId.BSC_TESTNET]: new Token(
      ChainId.BSC_TESTNET,
      PTAddressMap[ChainId.BSC_TESTNET].slisBNB,
      18,
      "PT-slisBNB",
      "PT-slisBNB",
    )
  }