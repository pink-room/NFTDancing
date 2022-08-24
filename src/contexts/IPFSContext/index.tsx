import React, {useContext, useState} from 'react';
import createIpfsHttpClient from 'ipfs-http-client';
import {HTTP_CLIENT_URL} from './ipfs-config';

import {
    IPFSProvider,
    IPFSConsumer,
    IPFSContext,
    IPFSContextInterface,
} from './context';

function IPFSContextProvider({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}): JSX.Element {
    const [client] = useState(createIpfsHttpClient(HTTP_CLIENT_URL));

    return <IPFSProvider value={{client}}>{children}</IPFSProvider>;
}

function useIPFSState(): IPFSContextInterface {
    const context = useContext(IPFSContext);
    if (context === null) {
        throw new Error(
            'useIPFSState must be used within an IPFSContextProvider',
        );
    }
    return context;
}

export {IPFSContextProvider, IPFSConsumer, useIPFSState};
