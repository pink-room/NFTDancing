import React, {useEffect} from 'react';
import {LogBox} from 'react-native';

import {AuthContextProvider} from './src/contexts/AuthContext';
import {Web3ContextProvider} from './src/contexts/Web3Context';
import {IPFSContextProvider} from './src/contexts/IPFSContext';

import Routes from './src/routes';

const {
    default: AsyncStorage,
} = require('@react-native-async-storage/async-storage');
const {withWalletConnect} = require('@walletconnect/react-native-dapp');

function App() {
    useEffect(() => {
        LogBox.ignoreAllLogs();
    }, []);

    return (
        <IPFSContextProvider>
            <AuthContextProvider>
                <Web3ContextProvider>
                    <Routes />
                </Web3ContextProvider>
            </AuthContextProvider>
        </IPFSContextProvider>
    );
}

export default withWalletConnect(App, {
    redirectUrl: 'nftdacing://',
    storageOptions: {
        asyncStorage: AsyncStorage,
    },
});
