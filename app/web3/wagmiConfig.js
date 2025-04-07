import { http, createConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID


export const config = createConfig({
    chains: [mainnet],
    connectors: [
        walletConnect({ projectId }),
        injected(),
    ],
    ssr: false,
    transports: {
        [mainnet.id]: http(),
    },
})
