'use client'
import { useEffect, createContext, useContext, memo, useState, useCallback } from 'react'
import { WagmiProvider } from 'wagmi'
import { config } from '../web3/wagmiConfig'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Header from '../components/Header'
import Notiflix from 'notiflix'
import { apiEndPoints } from './constants'
import { useLocalStorage } from '@mantine/hooks'
import crypto from 'node:crypto'
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
            music: true,
            depositWithdrawModalOpen: false,
            depositWithdrawModalType: 'deposit',
            profileModalOpen: false,
            signInModalOpen: false,
            clientSeed: crypto.randomBytes(8).toString('hex'),
        },
    });

    const updateBalance = useCallback(async () => {
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
        if (authData?.balance) {
            updateBalance()
        }
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
            borderRadius: '12px',
            fontFamily: 'Inter',
            fontSize: '16px',
            timeout: 1600,
            useFontAwesome: false, // Whether to use fontawesome icons for the notifications
            showOnlyTheLastOne: false,
            cssAnimationStyle: 'from-top', // Set animations style for hiding and showing notifications
            clickToClose: false, // Whether to close the notification on click
            cssAnimationDuration: 300,
            messageMaxLength: 110,
            success: {
                background: 'linear-gradient(to right,#16a34a, #22c55e)',
                textColor: '#fff',
                fontWeight: 'bold',
            },
            failure: {
                background: 'linear-gradient(to right, #dc2626,#ef4444)',
                textColor: '#fff',
                fontWeight: 'bold',
            },
            warning: {
                background: 'linear-gradient(to right, #ea580c,#f97316)',
                textColor: '#fff',
                fontWeight: 'bold',
            },
            info: {
                background: 'linear-gradient(to right, #2563eb, #3b82f6)',
                textColor: '#fff',
                fontWeight: 'bold',
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