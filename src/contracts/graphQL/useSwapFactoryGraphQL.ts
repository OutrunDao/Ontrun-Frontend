import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { graphURLMap } from "../graphURLs";
import { Address } from "viem";

export function useSwapFactoryGraphQL() {

    async function getPairs(chainId: number) {
        if (!graphURLMap[chainId] || !chainId) return;
        const client = new ApolloClient({
            uri: graphURLMap[chainId].swapFactory,
            cache: new InMemoryCache()
        })
        const GET_PAIRS = gql`
            query GetPairs {
                pairs(first: 10, orderBy: totalSupply, orderDirection: desc) {
                    token0 {
                        id
                        name
                        symbol
                        decimals
                    }
                    token1 {
                        id
                        name
                        symbol
                        decimals
                    }
                    id
                    reserve0
                    reserve1
                    reserveUSD
                    volumeUSD
                    totalSupply
                    factoryAddress
                }
            }
        `;
        const Gresult = await client.query({
            query: GET_PAIRS,
        });
        return Gresult.data.pairs;
    }

    async function getOwnerLiquiditys(chainId: number, owner: Address) {
        if (!graphURLMap[chainId] || !chainId) return;
        const ownerAddress = owner.toLowerCase();
        const client = new ApolloClient({
            uri: graphURLMap[chainId].swapFactory,
            cache: new InMemoryCache()
        })
        const GET_OWNER_LIQUIDITYS = gql`
            query GET_OWNER_LIQUIDITYS($user: String!) {
                user(id: $user) {
                liquidityPositions(first: 10, orderBy: liquidityTokenBalance, orderDirection: desc) {
                    liquidityTokenBalance
                    pair {
                        token0 {
                            id
                            name
                            symbol
                            decimals
                        }
                        token1 {
                            id
                            name
                            symbol
                            decimals
                        }
                        id
                        reserve0
                        reserve1
                        token0Price
                        token1Price
                        reserveUSD
                        volumeUSD
                        totalSupply
                        factoryAddress
                    }
                }
                }
            }
        `;
        const Gresult = await client.query({
            query: GET_OWNER_LIQUIDITYS,
            variables: { user: ownerAddress },
        });
        if (!Gresult.data.user) return [];
        return Gresult.data.user.liquidityPositions;
    }

    return {
        getPairs,
        getOwnerLiquiditys,
    }

}

