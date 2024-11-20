import { Token } from "@/packages/core/entities/token";
import { computePairAddress } from "@/packages/sdk";
import { addressMap } from "../addressMap/addressMap";
import { ChainId } from "../chains";
import { tokenAddressMap } from "../addressMap/TokenAddressMap";
import { useToken } from "@/hooks/useToken";

export const tBNB: { [chainId: number]: Token } = {

  [ChainId.BSC_TESTNET]: new Token(
    ChainId.BSC_TESTNET,
    addressMap[ChainId.BSC_TESTNET].TBNB,
    18,
    "tBNB",
    "Test BNB",
  )
}

const UseToken = useToken();

export const Token0: { [chainId: number]: Token } = {
  [ChainId.BSC_TESTNET]: new Token(
    ChainId.BSC_TESTNET,
    tokenAddressMap[ChainId.BSC_TESTNET].Token0,
    18,
    "Token0",
    "Token0",
  )
};

export const Token1: { [chainId: number]: Token } = {
  [ChainId.BSC_TESTNET]: new Token(
    ChainId.BSC_TESTNET,
    tokenAddressMap[ChainId.BSC_TESTNET].Token1,
    18,
    "Token1",
    "Token1",
  )
};

export const Token2: { [chainId: number]: Token } = {
  [ChainId.BSC_TESTNET]: new Token(
    ChainId.BSC_TESTNET,
    tokenAddressMap[ChainId.BSC_TESTNET].Token2,
    18,
    "Token2",
    "Token2",
  )
}
