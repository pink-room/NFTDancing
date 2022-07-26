import * as React from 'react';
import * as DocumentPicker from 'react-native-document-picker';
import {IMetadata} from '../../@types/NFT';

export interface Web3ContextInterface {
    values: {
        loading: boolean;
    };
    actions: {
        uploadObjectToIpfs: (metadata: IMetadata) => Promise<string | null>;
        uploadToIpfs: (
            fileObject: DocumentPicker.DocumentPickerResponse,
            nftName: string,
            nftDescription: string,
        ) => Promise<string | null>;
        retrieveFromIpfs: (ipfsHash: string) => Promise<string | null>;
        mintDanceNFT: (ipfsHash: string) => Promise<string | null>;
    };
}

export const Web3Context = React.createContext<Web3ContextInterface | null>(
    null,
);

export const Web3Provider = Web3Context.Provider;

export const Web3Consumer = Web3Context.Consumer;
