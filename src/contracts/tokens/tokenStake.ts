import { Token } from "@/packages/core";
import { addressMap } from "../addressMap/addressMap";
import { ChainId } from "../chains";

export const slisBNB: { [chainId: number]: Token } = {

    [ChainId.BSC_TESTNET]: new Token(
      ChainId.BSC_TESTNET,
      addressMap[ChainId.BSC_TESTNET].slisBNB,
      18,
      "slisBNB",
      "Staked Lista BNB",
    )
  }
  
  export const getTokensByChainId = (chainId: number): Token[] => {
    const tokenObjects = [slisBNB]; //expend
    const tokens: Token[] = [];
  
    tokenObjects.forEach(tokenObject => {
      if (tokenObject[chainId]) {
        tokens.push(tokenObject[chainId]);
      }
    });
  
    return tokens;
  };