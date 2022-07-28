import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import {listMyNFT} from '../api/listNFTs';
import {useAuthState} from '../contexts/AuthContext';
import {useWeb3State} from '../contexts/Web3Context';
import {INFT} from '../@types/Api';
import {useIsFocused} from '@react-navigation/native';
import NFTModal from '../components/NFTModal';
import NFT from '../components/NFT';

import Video from 'react-native-video';

export default function Profile() {
    const [nfts, setNfts] = useState<INFT[]>();
    const [video, setVideo] = useState<string>();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedNFT, setSelectedNFT] = useState<INFT>();
    const authState = useAuthState();
    const web3State = useWeb3State();
    const isFocused = useIsFocused();

    useEffect(() => {
        const load = async () => {
            console.log('REQUESTING USER NFTS');
            const userNfts = await listMyNFT(authState.values.account);
            setNfts(userNfts);

            console.log('REQUESTING COMPLETE');
            console.log(userNfts[5].url);
        };

        if (isFocused && !nfts) {
            load();
        }
    }, [isFocused, nfts]);

    const loadNfts = async () => {
        console.log('REQUESTING USER NFTS');
        const userNfts = await listMyNFT(authState.values.account);
        setNfts(userNfts);

        console.log('REQUESTING COMPLETE');
        console.log(userNfts[5].url);
    };

    /* useEffect(() => {
        const loadFromIpfs = async () => {
            console.log('STARTED LOADING FROM IPFS');
            if (nfts && nfts.length > 0) {
                console.log('HAS NFTS AND WILL MAKE THE RETRIEVING REQUEST');
                const fileLocation = await web3State.actions.retrieveFromIpfs(
                    nfts[1].url,
                );
                if (fileLocation !== null) {
                    setVideo(fileLocation);
                }
                console.log('HAS SET THE PATH ON MEMORY');
            }
            console.log('END LOADING FROM IPFS AND IS IN MEMORY');
        };

        loadFromIpfs();
    }, [nfts]); */

    /* const handleLoadFromIPFS = async () => {
        const filePath = await web3State.actions.retrieveFromIpfs('');
        console.log('FILEPATH -> ', filePath);
        if (filePath) {
            setVideo(filePath);
        }
    }; */

    const shortenAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(
            address.length - 4,
            address.length,
        )}`;
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const showModal = () => {
        setModalVisible(true);
    };

    const nftClicked = (nft: INFT) => {
        console.log('CARREGOR NUM NFT');
        console.log(nft);
        setSelectedNFT(nft);
        showModal();
    };

    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.insideContainer}>
                <Text style={[styles.userAccount, styles.bold]}>Account</Text>
                <Text style={[styles.userAccount]}>
                    {shortenAddress(authState.values.account)}
                </Text>

                <TouchableOpacity
                    onPress={authState.actions.killSession}
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonTextStyle}>Kill session</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={loadNfts} style={styles.buttonStyle}>
                    <Text style={styles.buttonTextStyle}>LOAD NFTS</Text>
                </TouchableOpacity>

                {nfts?.map((nft: INFT, index: number) => {
                    return (
                        <TouchableOpacity onPress={() => nftClicked(nft)}>
                            <NFT key={index} nft={nft} />
                        </TouchableOpacity>
                    );
                })}

                {modalVisible && (
                    <NFTModal
                        modalVisible
                        closeModal={closeModal}
                        nft={selectedNFT}
                    />
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    bold: {
        fontWeight: '700',
    },
    mainContainer: {
        backgroundColor: '#e7a61a',
    },
    insideContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userAccount: {
        color: '#ffffff',
        fontSize: 18,
        textAlign: 'center',
    },
    buttonStyle: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderColor: '#ffffff',
        borderRadius: 8,
        borderWidth: 2,
        marginTop: 12,
    },
    buttonTextStyle: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '500',
    },
});
