import React, {useContext, useState} from 'react';
import {useWalletConnect} from '@walletconnect/react-native-dapp';

import {
    AuthProvider,
    AuthConsumer,
    AuthContext,
    AuthContextInterface,
} from './context';
import {SUPPORTED_CHAIN_IDS} from '../../utils/constants';

function AuthContextProvider({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}): JSX.Element {
    const connector = useWalletConnect();
    const [account, setAccount] = useState<string>('');

    const connectWallet = React.useCallback(() => {
        connector.connect().then(res => {
            setAccount(res.accounts[0]);
        });
    }, [connector]);

    const killSession = React.useCallback(() => {
        connector.killSession();
        setAccount('');
    }, [connector]);

    const supportedChainId = SUPPORTED_CHAIN_IDS.includes(connector.chainId);

    return (
        <AuthProvider
            value={{
                values: {
                    account,
                    connector,
                    supportedChainId,
                },
                actions: {
                    setAccount,
                    connectWallet,
                    killSession,
                },
            }}>
            {children}
        </AuthProvider>
    );
}

function useAuthState(): AuthContextInterface {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error(
            'useAuthState must be used within an AuthContextProvider',
        );
    }
    return context;
}

export {AuthContextProvider, AuthConsumer, useAuthState};
