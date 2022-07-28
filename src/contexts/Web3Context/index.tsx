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
import {IMetadata} from '../../@types/NFT';

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

    const uploadObjectToIpfs = async (
        metadata: IMetadata,
    ): Promise<string | null> => {
        const ipfsUpload = await ipfs.addJSON(metadata);

        if (ipfsUpload == null) {
            console.log('Error uploading to ipfs');
            return null;
        }

        return ipfsUpload;
    };

    const uploadVideoToIPFS = async (videoBase64: string): Promise<string> => {
        try {
            const videoIpfsHash = await ipfs.add(videoBase64);
            return videoIpfsHash;
        } catch (error) {
            console.log(error);
            throw new Error('');
        }
    };

    // This method will upload the video to IPFS and then upload the metadata info to IPFS
    const uploadToIpfs = async (
        fileObject: DocumentPicker.DocumentPickerResponse,
        nftName: string,
        nftDescription: string,
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

                const videoIpfsHash = await uploadVideoToIPFS(readFile);

                // const ipfsUpload = await ipfs.add(readFile);

                if (videoIpfsHash == null) {
                    console.log('Error uploading video to ipfs');
                    return null;
                }

                const metadata = {
                    name: nftName,
                    description: nftDescription,
                    video: videoIpfsHash,
                };

                const metadataHash = await uploadObjectToIpfs(metadata);

                setLoading(false);
                return `ipfs://${metadataHash}`;
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
                    uploadObjectToIpfs,
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
