'use client'
import { useEffect, createContext, useContext, memo, useState, useCallback } from 'react'
import { WagmiProvider } from 'wagmi'
import { config } from '../web3/wagmiConfig'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Header from '../components/Header'
import Notiflix from 'notiflix'
import { apiEndPoints } from './constants'
import { useLocalStorage } from '@mantine/hooks'
import CryptoJS from 'crypto-js'
const queryClient = new QueryClient()

const gameContext = createContext()
export const useGameContext = () => useContext(gameContext)

function GamesLayout({ children }) {
    const [authData, setAuthData] = useState(null)
    const [balance, setBalance] = useState(0)
    const [gameSettings, setGameSettings] = useLocalStorage({
        key: 'gameSettings',
        defaultValue: {
            sound: true,
            music: false,
            depositWithdrawModalOpen: false,
            depositWithdrawModalType: 'Deposit',
            profileModalOpen: false,
            signInModalOpen: false,
            myBetsModalOpen: false,
            clientSeed: CryptoJS.lib.WordArray.random(8).toString(),
        },
    });

    const updateBalance = useCallback(async () => {
        if (!authData) return
        const response = await fetch(apiEndPoints.balance, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authData?.token
            }
        })
        const responseData = await response.json()
        setBalance(responseData.data.balance)
    }, [authData]);

    useEffect(() => {
        updateBalance()
    }, [authData])

    useEffect(() => {
        const data = localStorage.getItem('authData')
        if (data) {
            setAuthData(JSON.parse(data))
        }
        Notiflix.Notify.init({
            useIcon: false,
            position: 'center-top', // Set the position of notifications
            backOverlay: false,
            borderRadius: '14px',
            fontFamily: 'Chivo',
            fontSize: '16px',
            timeout: 1600,
            useFontAwesome: false, // Whether to use fontawesome icons for the notifications
            showOnlyTheLastOne: false,
            cssAnimationStyle: 'from-top', // Set animations style for hiding and showing notifications
            clickToClose: false, // Whether to close the notification on click
            cssAnimationDuration: 300,
            messageMaxLength: 110,
            success: {
                background: '#55f6c8',
                textColor: '#000000',
                childClassName: 'flex justify-center text-center',
            },
            failure: {
                background: '#f985cd',
                textColor: '#000000',
                childClassName: 'flex justify-center text-center',
            },
            warning: {
                background: '#f9ac85',
                textColor: '#000000',
                childClassName: 'flex justify-center text-center',
            },
            info: {
                background: '#6896f7',
                textColor: '#000000',
                childClassName: 'flex justify-center text-center',
            },
        });
    }, [])

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <gameContext.Provider value={{ authData, setAuthData, balance, updateBalance, gameSettings, setGameSettings }}>
                    <main className="h-dvh bg-base-300 flex flex-col flex-grow gap-2 p-2 w-dvw select-none max-w-lg mx-auto">
                        <Header />
                        {children}
                    </main>
                </gameContext.Provider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

export default memo(GamesLayout);