export const icons = {
    MetaMask: '/icons/MetaMask.png',
    WalletConnect: '/icons/WalletConnect.png',
    Coinbase: '/icons/Coinbase.png',
    'Brave Wallet': '/icons/Brave.png',
};
export const availableTokens = [
    {
        "name": "Ethereum",
        "address": "",
        "symbol": "ETH",
        "decimals": 18,
        "chainId": 1,
        "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png"
    },
    {
        "name": "Wrapped Ether",
        "address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        "symbol": "WETH",
        "decimals": 18,
        "chainId": 1,
        "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png",
        "extensions": {
            "bridgeInfo": {
                "10": {
                    "tokenAddress": "0x4200000000000000000000000000000000000006"
                },
                "137": {
                    "tokenAddress": "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"
                },
                "42161": {
                    "tokenAddress": "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"
                },
                "42220": {
                    "tokenAddress": "0x2DEf4285787d58a2f811AF24755A8150622f4361"
                }
            }
        }
    },
    {
        "name": "Dai Stablecoin",
        "address": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        "symbol": "DAI",
        "decimals": 18,
        "chainId": 1,
        "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png"
    },

    {
        "name": "Uniswap",
        "address": "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
        "symbol": "UNI",
        "decimals": 18,
        "chainId": 1,
        "logoURI": "https://assets.coingecko.com/coins/images/12504/thumb/uniswap-uni.png"
    },
    {
        "name": "Tether USD",
        "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        "symbol": "USDT",
        "decimals": 6,
        "chainId": 1,
        "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png",
        "extensions": {
            "bridgeInfo": {
                "42220": {
                    "tokenAddress": "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e"
                }
            }
        }
    },
    {
        "name": "USDCoin",
        "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        "symbol": "USDC",
        "decimals": 6,
        "chainId": 1,
        "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
        "extensions": {
            "bridgeInfo": {
                "42161": {
                    "tokenAddress": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831"
                },
                "42220": {
                    "tokenAddress": "0xcebA9300f2b948710d2653dD7B07f33A8B32118C"
                }
            }
        }
    },

    {
        "name": "Wrapped BTC",
        "address": "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
        "symbol": "WBTC",
        "decimals": 8,
        "chainId": 1,
        "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png"
    },

    {
        "chainId": 1,
        "address": "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
        "name": "Aave",
        "symbol": "AAVE",
        "decimals": 18,
        "logoURI": "https://assets.coingecko.com/coins/images/12645/thumb/AAVE.png?1601374110",
        "extensions": {
            "bridgeInfo": {
                "10": {
                    "tokenAddress": "0x76FB31fb4af56892A25e32cFC43De717950c9278"
                }
            }
        }
    },

    {
        "chainId": 1,
        "address": "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
        "name": "Polygon",
        "symbol": "MATIC",
        "decimals": 18,
        "logoURI": "https://assets.coingecko.com/coins/images/4713/thumb/matic-token-icon.png?1624446912",
        "extensions": {
            "bridgeInfo": {
                "137": {
                    "tokenAddress": "0x0000000000000000000000000000000000001010"
                }
            }
        }
    },
]