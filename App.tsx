import React from 'react';

import {Platform} from 'react-native';

import {AuthContextProvider} from './src/contexts/AuthContext';

import Routes from './src/routes';

const {
    default: AsyncStorage,
} = require('@react-native-async-storage/async-storage');
const {withWalletConnect} = require('@walletconnect/react-native-dapp');

function App() {
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
