import React from 'react';

import {AuthContextProvider} from './src/contexts/AuthContext';
import {Web3ContextProvider} from './src/contexts/Web3Context';

import Routes from './src/routes';

const {
    default: AsyncStorage,
} = require('@react-native-async-storage/async-storage');
const {withWalletConnect} = require('@walletconnect/react-native-dapp');

function App() {
    return (
        <AuthContextProvider>
            <Web3ContextProvider>
                <Routes />
            </Web3ContextProvider>
        </AuthContextProvider>
    );
}

export default withWalletConnect(App, {
    redirectUrl: 'nftdacing://',
    storageOptions: {
        asyncStorage: AsyncStorage,
    },
});
