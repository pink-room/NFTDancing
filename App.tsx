import React from 'react';

import {Platform} from 'react-native';

import {AuthContextProvider} from './src/contexts/AuthContext';

import Routes from './src/routes';

const {
    default: AsyncStorage,
} = require('@react-native-async-storage/async-storage');
const {withWalletConnect} = require('@walletconnect/react-native-dapp');

function App() {
    process.env.TATUM_API_KEY = 'e59159ea-f508-41d2-80f7-28ae4204cd9b';
    return (
        <AuthContextProvider>
            <Routes />
        </AuthContextProvider>
    );
}

export default withWalletConnect(App, {
    redirectUrl:
        Platform.OS === 'web' ? window.location.origin : 'nftdacing://',
    storageOptions: {
        asyncStorage: AsyncStorage,
    },
});
