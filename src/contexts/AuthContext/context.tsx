import * as React from 'react';

export interface AuthContextInterface {
    values: {
        connector: any;
        account: string;
        supportedChainId: boolean;
    };
    actions: {
        setAccount: React.Dispatch<React.SetStateAction<string>>;
        connectWallet: () => void;
        killSession: () => void;
    };
}

export const AuthContext = React.createContext<AuthContextInterface | null>(
    null,
);

export const AuthProvider = AuthContext.Provider;

export const AuthConsumer = AuthContext.Consumer;
