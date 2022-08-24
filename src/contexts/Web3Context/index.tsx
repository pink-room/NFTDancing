import React, {useContext, useState} from 'react';
import {Alert} from 'react-native';

import {useAuthState} from '../AuthContext';
import {useIPFSState} from '../IPFSContext';

import * as DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

import {
    Web3Provider,
    Web3Consumer,
    Web3Context,
    Web3ContextInterface,
} from './context';

import {mintNFT} from '../../api/mintNFT';

function Web3ContextProvider({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}): JSX.Element {
    const authState = useAuthState();
    const IPFSState = useIPFSState();

    const [loading, setLoading] = useState<boolean>(false);

    // This method will upload the video to IPFS and then upload the metadata info to IPFS
    const uploadToIpfs = async (
        fileObject: DocumentPicker.DocumentPickerResponse,
        nftName: string,
        nftDescription: string,
    ) => {
        setLoading(true);

        try {
            if (fileObject == null) {
                Alert.alert('Error loading file. Please try again');
                setLoading(false);
                return null;
            }
            // 1048576 = 1024 * 1024 = 1MB
            if (fileObject.size! / 1048576 > 50) {
                Alert.alert(
                    'File size is too large. Please select a file less than 35MB',
                );
                setLoading(false);
                return null;
            }

            const videoIpfsHash = await IPFSState.values.client.add(fileObject);
            console.log(
                '🚀 ~ file: index.tsx ~ line 53 ~ videoIpfsHash',
                videoIpfsHash,
            );

            if (videoIpfsHash == null) {
                console.log('Error uploading video to ipfs');
                return null;
            }

            const metadata = {
                name: nftName,
                description: nftDescription,
                video: videoIpfsHash,
            };

            const metadataHash = await IPFSState.values.client.add(metadata);
            console.log(
                '🚀 ~ file: index.tsx ~ line 70 ~ metadataHash',
                metadataHash,
            );

            setLoading(false);
            return metadataHash;
        } catch (err) {
            console.log('Error uploading to ipfs', err);
        }
        setLoading(false);
        return null;
    };

    const retrieveFromIpfs = async (ipfsHash: string) => {
        setLoading(true);
        const slicedIpfsHash = ipfsHash.slice(7);
        try {
            // const ipfsRetrieve = await IPFSState.values.client.cat(
            //     slicedIpfsHash,
            // );
            const ipfsRetrieve = await IPFSState.values.client.get(
                slicedIpfsHash,
            );
            console.log(
                '🚀 ~ file: index.tsx ~ line 94 ~ retrieveFromIpfs ~ ipfsRetrieve',
                ipfsRetrieve,
            );

            const filePath =
                RNFS.DocumentDirectoryPath + `/${slicedIpfsHash}.mp4`;

            await RNFS.writeFile(filePath, ipfsRetrieve, 'base64');

            setLoading(false);
            return filePath;
        } catch (err) {
            console.log('Error retrieving from ipfs', err);
        }
        setLoading(false);
        return null;
    };

    const mintDanceNFT = async (ipfsHash: string): Promise<string> => {
        setLoading(true);
        const mintTx = await mintNFT(authState.values.account, ipfsHash);
        setLoading(false);
        return mintTx;
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
