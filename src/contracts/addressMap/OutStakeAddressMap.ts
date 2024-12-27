import { ChainId } from "../chains";
import { ContractAddressMap } from "./addressMap";


export enum ContractName {
  slisBNB = "slisBNB",
  UBNB = "UBNB",
}

export const SYAddressMap = {
  [ChainId.BSC_TESTNET]: {
    // [ContractName.slisBNB]: '0xA51A28C628ee5aA25A1AE3eC911DA54028A39332',
    [ContractName.slisBNB]: '0x34cf7a7BF7391963607c97b9c01b8866301a0aBe',

  }
} as Record<number, ContractAddressMap>;

export const PTAddressMap = {
  [ChainId.BSC_TESTNET]: {
    // [ContractName.slisBNB]: '0x36955F4cDC4E77c41038024A072cD37832F2Ea87',
    [ContractName.slisBNB]: '0xF023a8EdE920Ea18eb5Eca88E347148970072489',

  }
} as Record<number, ContractAddressMap>;

export const YTAddressMap = {
  [ChainId.BSC_TESTNET]: {
    // [ContractName.slisBNB]: '0x3cf002ddF720795Cd169804779D5A33589008628',
    [ContractName.slisBNB]: '0xeCE73D99A911FDD84f063C62b3144abB43200A81',

  }
} as Record<number, ContractAddressMap>;

export const POTAddressMap = {
  [ChainId.BSC_TESTNET]: {
    // [ContractName.slisBNB]: '0xDA5744032E53b2451E561B09a823210DF89f8d33',
    [ContractName.slisBNB]: '0x72A040320E8920694803E886D733d9BBDCd94AF8',

  }
} as Record<number, ContractAddressMap>;

export const UPTAddressMap = {
  [ChainId.BSC_TESTNET]: {
    // [ContractName.UBNB]: "0x36955F4cDC4E77c41038024A072cD37832F2Ea87",
    [ContractName.UBNB]: "0x36955F4cDC4E77c41038024A072cD37832F2Ea87",

  }
} as Record<number, ContractAddressMap>;

export const initCodeHashMap = {
  [ChainId.BLAST_SEPOLIA]: "0x9d7b24376800c0a5fb253d12673d2021f71732f524fe808d89000739fc93fce8",
} as Record<number, `0x${string}`>;