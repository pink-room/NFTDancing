import React from 'react';

export interface IPFSContextInterface {
    values: {
        client?: any;
    };
    actions: {};
}

export const IPFSContext = React.createContext<IPFSContextInterface | null>(
    null,
);

export const IPFSProvider = IPFSContext.Provider;

export const IPFSConsumer = IPFSContext.Consumer;
