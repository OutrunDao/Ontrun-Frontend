export const pairAbi = [
    {
        "type": "constructor",
        "inputs": [
            {
                "name": "_gasManager",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "_YIELD_VAULT",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "BLAST",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "contract IBlast"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "BLAST_POINTS",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "MINIMUM_LIQUIDITY",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "RATIO",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "SY_BETH",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "SY_USDB",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "USDB",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "WETH",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "YIELD_VAULT",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "allowance",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "approve",
        "inputs": [
            {
                "name": "spender",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "balanceOf",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "burn",
        "inputs": [
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "amount0",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "amount1",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "claimMakerFee",
        "inputs": [],
        "outputs": [
            {
                "name": "amount0",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "amount1",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "claimMaxGas",
        "inputs": [
            {
                "name": "recipient",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "gasAmount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "clearBETHNativeYield",
        "inputs": [
            {
                "name": "maker",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "clearUSDBNativeYield",
        "inputs": [
            {
                "name": "maker",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "decimals",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint8",
                "internalType": "uint8"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "enableBETHNativeYield",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "enableUSDBNativeYield",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "factory",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "feeGrowthRecordX128",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "feeGrowthX128",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "gasManager",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getPairTokens",
        "inputs": [],
        "outputs": [
            {
                "name": "_token0",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "_token1",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getReserves",
        "inputs": [],
        "outputs": [
            {
                "name": "_reserve0",
                "type": "uint112",
                "internalType": "uint112"
            },
            {
                "name": "_reserve1",
                "type": "uint112",
                "internalType": "uint112"
            },
            {
                "name": "_blockTimestampLast",
                "type": "uint32",
                "internalType": "uint32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "initialize",
        "inputs": [
            {
                "name": "_token0",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "_token1",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "_swapFeeRate",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "_enableBETHNativeYield",
                "type": "bool",
                "internalType": "bool"
            },
            {
                "name": "_enableUSDBNativeYield",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "kLast",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "makerBETHNativeYields",
        "inputs": [
            {
                "name": "maker",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "index",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "accrued",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "makerUSDBNativeYields",
        "inputs": [
            {
                "name": "maker",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "index",
                "type": "uint128",
                "internalType": "uint128"
            },
            {
                "name": "accrued",
                "type": "uint128",
                "internalType": "uint128"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "mint",
        "inputs": [
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "liquidity",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "name",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "previewMakerFee",
        "inputs": [],
        "outputs": [
            {
                "name": "amount0",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "amount1",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "previewNativeYield",
        "inputs": [
            {
                "name": "nativeYieldToken",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "accrued",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "price0CumulativeLast",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "price1CumulativeLast",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "proactivelyBurnedAmount",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "readGasBalance",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "skim",
        "inputs": [
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "swap",
        "inputs": [
            {
                "name": "amount0Out",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "amount1Out",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "referrer",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "data",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "swapFeeRate",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "syBETHYieldIndex",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "syUSDBYieldIndex",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "symbol",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "sync",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "token0",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "token1",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "totalSupply",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "transfer",
        "inputs": [
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "transferFrom",
        "inputs": [
            {
                "name": "from",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "transferGasManager",
        "inputs": [
            {
                "name": "newGasManager",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "unClaimedFeesX128",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "updateAndDistributeYields",
        "inputs": [
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "Approval",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "spender",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "value",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Burn",
        "inputs": [
            {
                "name": "sender",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "amount0",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "amount1",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ClaimMaxGas",
        "inputs": [
            {
                "name": "recipient",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "gasAmount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "GasManagerTransferred",
        "inputs": [
            {
                "name": "previousGasManager",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "newGasManager",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Mint",
        "inputs": [
            {
                "name": "sender",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "amount0",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "amount1",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "ProtocolFee",
        "inputs": [
            {
                "name": "referrer",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "rebateFee0",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "rebateFee1",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "protocolFee0",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "protocolFee1",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Swap",
        "inputs": [
            {
                "name": "sender",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "amount0In",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "amount1In",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "amount0Out",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "amount1Out",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Sync",
        "inputs": [
            {
                "name": "reserve0",
                "type": "uint112",
                "indexed": false,
                "internalType": "uint112"
            },
            {
                "name": "reserve1",
                "type": "uint112",
                "indexed": false,
                "internalType": "uint112"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Transfer",
        "inputs": [
            {
                "name": "from",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "value",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "error",
        "name": "FeeRateOverflow",
        "inputs": []
    },
    {
        "type": "error",
        "name": "Forbidden",
        "inputs": []
    },
    {
        "type": "error",
        "name": "GasZeroAddress",
        "inputs": []
    },
    {
        "type": "error",
        "name": "InsufficientInputAmount",
        "inputs": []
    },
    {
        "type": "error",
        "name": "InsufficientLiquidity",
        "inputs": []
    },
    {
        "type": "error",
        "name": "InsufficientLiquidityBurned",
        "inputs": []
    },
    {
        "type": "error",
        "name": "InsufficientLiquidityMinted",
        "inputs": []
    },
    {
        "type": "error",
        "name": "InsufficientMakerFeeClaimed",
        "inputs": []
    },
    {
        "type": "error",
        "name": "InsufficientOutputAmount",
        "inputs": []
    },
    {
        "type": "error",
        "name": "InsufficientUnclaimedFee",
        "inputs": []
    },
    {
        "type": "error",
        "name": "InvalidTo",
        "inputs": []
    },
    {
        "type": "error",
        "name": "Locked",
        "inputs": []
    },
    {
        "type": "error",
        "name": "Overflow",
        "inputs": []
    },
    {
        "type": "error",
        "name": "PermissionDenied",
        "inputs": []
    },
    {
        "type": "error",
        "name": "ProductKLoss",
        "inputs": []
    },
    {
        "type": "error",
        "name": "TransferFailed",
        "inputs": []
    },
    {
        "type": "error",
        "name": "UnauthorizedAccount",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            }
        ]
    }
] as const;