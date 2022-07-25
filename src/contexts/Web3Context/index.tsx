import React, {useContext, useState} from 'react';
import {Alert, Platform} from 'react-native';

import {useAuthState} from '../AuthContext';

import * as DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import IPFS from 'ipfs-mini';

import {
    Web3Provider,
    Web3Consumer,
    Web3Context,
    Web3ContextInterface,
} from './context';

import calculateSize from '../../utils/calculateSizeInMB';
import {mintNFT} from '../../api/mintNFT';

function Web3ContextProvider({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}): JSX.Element {
    const authState = useAuthState();

    const ipfs = new IPFS({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
    });
    const [loading, setLoading] = useState<boolean>(false);

    const uploadToIpfs = async (
        fileObject: DocumentPicker.DocumentPickerResponse,
    ) => {
        setLoading(true);

        try {
            const readFile = await RNFS.readFile(
                Platform.OS === 'ios'
                    ? encodeURI(fileObject.uri)
                    : fileObject.uri,
                'base64',
            );

            if (readFile != null) {
                if (calculateSize(readFile) > 50) {
                    Alert.alert(
                        'File size is too large. Please select a file less than 35MB',
                    );
                    setLoading(false);
                    return null;
                }

                const ipfsUpload = await ipfs.add(readFile);

                if (ipfsUpload == null) {
                    console.log('Error uploading to ipfs');
                }
                setLoading(false);
                return `ipfs://${ipfsUpload}`;
            }
        } catch (err) {
            if (!DocumentPicker.isCancel(err)) {
                console.log('Error uploading to ipfs', err);
            }
        }
        setLoading(false);
        return null;
    };

    const retrieveFromIpfs = async (ipfsHash: string) => {
        setLoading(true);
        try {
            const ipfsRetrieve = await ipfs.cat(ipfsHash);

            const filePath = RNFS.DocumentDirectoryPath + `/${ipfsHash}.mp4`;

            await RNFS.writeFile(filePath, ipfsRetrieve, 'base64');

            setLoading(false);
            return filePath;
        } catch (err) {
            console.log('Error retrieving from ipfs', err);
        }
        setLoading(false);
        return null;
    };

    const mintDanceNFT = async (_ipfsHash: string) => {
        setLoading(true);
        const mintTx = await mintNFT(authState.values.account, _ipfsHash);
        console.log('mintTx', mintTx);
        setLoading(false);
        return null;
    };

    const mintDanceUsageNFT = async (_danceId: number) => {
        // TODO
        // console.log('danceId', danceId);
        return null;
    };

    const retrieveAllDanceNFTS = async () => {
        // TODO
        return null;
    };

    const retrieveUsersDanceUsageNFTS = async (_userAddress: string) => {
        // TODO
        // console.log('userAddress', userAddress);
        return null;
    };

    return (
        <Web3Provider
            value={{
                values: {
                    loading,
                },
                actions: {
                    uploadToIpfs,
                    retrieveFromIpfs,
                    mintDanceNFT,
                    mintDanceUsageNFT,
                    retrieveAllDanceNFTS,
                    retrieveUsersDanceUsageNFTS,
                },
            }}>
            {children}
        </Web3Provider>
    );
}

function useWeb3State(): Web3ContextInterface {
    const context = useContext(Web3Context);
    if (context === null) {
        throw new Error(
            'useWeb3State must be used within an Web3ContextProvider',
        );
    }
    return context;
}

export {Web3ContextProvider, Web3Consumer, useWeb3State};
