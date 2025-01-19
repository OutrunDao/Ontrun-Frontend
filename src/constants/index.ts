import type { CardContent, DiscoverCard, NavbarItem } from "@/types";

export const outstake: DiscoverCard = {
  title: "Outstake",
  link: "/",
  description: "Control and boost your native yields",
  background: "/images/outstake-home.svg",
  items: [
    {
      icon: "/images/mint.svg",
      title: "Stake",
      description: "Stake native yield tokens (LRT, LST, etc.) to earn more profits",
      link: "/markets",
    },
    {
      icon: "/images/position.svg",
      title: "Position",
      description: "Manage staked position and yield token",
      link: "/staking/position",
    },
    // {
    //   icon: "/images/yield-pool.svg",
    //   title: "Yield Pool",
    //   description: "Burn yield token to claim native yield",
    //   link: "/staking/yieldpool",
    // },
  ],
};

export const outrunAMM: DiscoverCard = {
  title: "Outrun AMM",
  link: "/",
  background: "/images/outrun-Amm-home.svg",
  description: "More composable and user-friendly AMM",
  items: [
    {
      icon: "/images/swap.svg",
      title: "Swap",
      description: "Trade crypto assets without a counterparty",
      link: "/trade/swap",
    },
    {
      icon: "/images/liquidity.svg",
      title: "Liquidity",
      description: "Earn trading fees or native yields",
      link: "/trade/liquidity",
    },
    {
      icon: "/images/referral.svg",
      title: "Referral",
      description: "Composable on-chain referral bonus engine",
      link: "/trade/referral",
    },
  ],
};

export const FFLaunch: CardContent = {
  title: "FFLaunch",
  background: "/images/fflaunch.svg",
  text: "Truly community-driven token financing paradigm",
  multiText: [
    "The first Fair and Free Launch standard on the EVM",
    "Provides continuous funding for project teams",
    "Provide deeper liquidity and market exposure for tokens",
    "Provides investors with a risk-free way to participate in token financing",
  ],
  enterLink: "/fflaunch",
  learnLink: "",
};

export const Memeverse: CardContent = {
  title: "Memeverse",
  background: "/images/memeverse.svg",
  text: "Community-driven memecoin fair launch standards",
  multiText: [
    "Integrating native yields, liquidity staking and memecoin",
    "Participate in DeFi activities by joining the Memeverse genesis",
    "No PVP, Just PPP, entering the world of Memecoin with extremely low risk",
    "Provide economic support for the ongoing operation of the Memecoin community",
  ],
  enterLink: "/memeverse",
  learnLink: "",
};

export const CompanyName: string[] = [];

export const NavbarMenu: NavbarItem[] = [
  {
    name: "Markets",
    hasChildren: true,
    // path: "/markets",
    children: [
      { name: "Markets", path: "/markets" },
      { name: "Position", path: "/staking/position" },
      // { name: "Yield Pool", path: "/staking/yieldpool" },
    ],
  },
  {
    name: "Trade",
    hasChildren: true,
    children: [
      { name: "Swap", path: "/trade/swap" },
      { name: "Liquidity", path: "/trade/liquidity" },
      { name: "Referral", path: "/trade/referral" },
    ],
  },
  {
    name: "FFLaunch",
    hasChildren: false,
    path: "/fflaunch",
    children: [],
  },
  {
    name: "Memeverse",
    hasChildren: false,
    path: "/memeverse",
    children: [],
  },
];

export const positionTableColumns = [
  { key: "name", label: "Name" },
  { key: "principalRedeemable", label: "Principal Redeemable" },
  { key: "rate", label: "Rate" },
  { key: "unlockTime", label: "Unlock Time" },
  { key: "action", label: "" },
]

export const liquidityTableColumns = [
  { key: "id", label: "#" },
  { key: "pool", label: "Pool" },
  { key: "volume", label: "Volume(24H)" },
  { key: "liquidity", label: "Liquidity" },
  { key: "fees", label: "Fees(24H)" },
  { key: "apy", label: "APY" },
  { key: "action", label: "" },
];

export const MemeverseTableColumns = [
  { key: "symbol", label: "Memeverse" },
  { key: "deposit", label: "Deposited" },
  { key: "liquidity", label: "Liquiduty" },
  { key: "endtime", label: "End Time" },
  { key: "lockupdays", label: "LockupDays" },
  { key: "population", label: "Population" },
];

export const ReferralTableColumns = [
  { key: "router", label: "Router" },
  { key: "amount", label: "Gross commission (Token)" },
  { key: "account", label: "Account" },
  { key: "time", label: "Time" },
]

export const minLockupDays = 7;
export const maxLockupDays = 365;
export const oneDaySec = 24 * 3600;
