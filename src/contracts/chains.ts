export enum ChainId {
  BLAST_SEPOLIA = 168587773,
  BLAST = 81457,
  BSC_TESTNET = 97,
}

export const SUPPORTED_CHAINS = [ChainId.BLAST_SEPOLIA, ChainId.BLAST, ChainId.BSC_TESTNET] as const;
export type SupportedChainsType = (typeof SUPPORTED_CHAINS)[number];

export enum NativeCurrencyName {
  // Strings match input for CLI
  ETHER = "ETH",
}

export const BlockExplorers = {
  [ChainId.BLAST_SEPOLIA]: "https://testnet.blastscan.io",
  [ChainId.BSC_TESTNET]: "https://testnet.bscscan.com/",
} as Record<number, string>;

export const ChainETHSymbol = {
  [ChainId.BLAST_SEPOLIA]: "ETH",
  [ChainId.BSC_TESTNET]: "TBNB",
} as Record<number, string>;

export const ChainETHName = {
  [ChainId.BLAST_SEPOLIA]: "Ether",
  [ChainId.BSC_TESTNET]: "Test BNB",
} as Record<number, string>