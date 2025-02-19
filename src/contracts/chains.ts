export enum ChainId {
  BLAST_SEPOLIA = 168587773,
  BLAST = 81457,
  BSC_TESTNET = 97,
  BASE_SEPOLIA = 84532,
}

export const SUPPORTED_CHAINS = [ChainId.BLAST_SEPOLIA, ChainId.BLAST, ChainId.BSC_TESTNET] as const;
export type SupportedChainsType = (typeof SUPPORTED_CHAINS)[number];

export enum NativeCurrencyName {
  // Strings match input for CLI
  ETHER = "ETH",
}

export const ChainNames = {
  [ChainId.BLAST_SEPOLIA]: 'Blast Sepolia',
  [ChainId.BLAST]: 'Blast',
  [ChainId.BSC_TESTNET]: 'BSC Testnet',
  [ChainId.BASE_SEPOLIA]: 'Base Sepolia',
} as Record<number, string>;

export const BlockExplorers = {
  [ChainId.BLAST_SEPOLIA]: "https://testnet.blastscan.io",
  [ChainId.BSC_TESTNET]: "https://testnet.bscscan.com/",
  [ChainId.BASE_SEPOLIA]: "https://sepolia.basescan.org/",
} as Record<number, string>;

export const RPC_URL = {
  [ChainId.BSC_TESTNET]: "https://go.getblock.io/48b8466fd80241a28d4d5684d4d370f9",
} as Record<number, string>;

export const ChainETHSymbol = {
  [ChainId.BLAST_SEPOLIA]: "ETH",
  [ChainId.BSC_TESTNET]: "BNB",
  [ChainId.BASE_SEPOLIA]: "ETH",
} as Record<number, string>;

export const ChainETHName = {
  [ChainId.BLAST_SEPOLIA]: "Ether",
  [ChainId.BSC_TESTNET]: "Test BNB",
  [ChainId.BASE_SEPOLIA]: "Ether",
} as Record<number, string>

export enum supportChainId {
  // BLAST_SEPOLIA = 168587773,
  BASE_SEPOLIA = 84532,
  BSC_TESTNET = 97,
}

export const CenterChainId = supportChainId.BSC_TESTNET;

export const supportChainNames = {
  // [supportChainId.BLAST_SEPOLIA]: 'Blast Sepolia',
  [supportChainId.BASE_SEPOLIA]: 'Base Sepolia',
  [supportChainId.BSC_TESTNET]: 'BSC Testnet',
} as Record<number, string>;