import * as React from 'react';
import * as DocumentPicker from 'react-native-document-picker';

export interface Web3ContextInterface {
    values: {
        loading: boolean;
    };
    actions: {
        uploadToIpfs: (
            fileObject: DocumentPicker.DocumentPickerResponse,
        ) => Promise<string | null>;
        retrieveFromIpfs: (ipfsHash: string) => Promise<string | null>;
        mintDanceNFT: (ipfsHash: string) => Promise<string | null>;
        mintDanceUsageNFT: (dance: number) => Promise<string | null>;
        retrieveAllDanceNFTS: () => Promise<string | null>;
        retrieveUsersDanceUsageNFTS: (
            userAddress: string,
        ) => Promise<string | null>;
    };
}

export const Web3Context = React.createContext<Web3ContextInterface | null>(
    null,
);

export const Web3Provider = Web3Context.Provider;

export const Web3Consumer = Web3Context.Consumer;
