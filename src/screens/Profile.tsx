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
import {INFT} from '../@types/Api';
import {useIsFocused} from '@react-navigation/native';
import NFTModal from '../components/NFTModal';
import NFT from '../components/NFT';

export default function Profile() {
    const [nfts, setNfts] = useState<INFT[]>();

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedNFT, setSelectedNFT] = useState<INFT>();
    const authState = useAuthState();

    const isFocused = useIsFocused();

    useEffect(() => {
        const load = async () => {
            try {
                console.log('REQUESTING USER NFTS');
                const userNfts = await listMyNFT(authState.values.account);
                setNfts(userNfts);

                console.log('REQUESTING COMPLETE');
                console.log(userNfts[5].url);
            } catch (err) {
                console.log('ERROR RETRIEVING NFTS');
            }
        };

        if (isFocused && !nfts) {
            load();
        }
    }, [isFocused, nfts, authState.values.account]);

    const loadNfts = async () => {
        console.log('REQUESTING USER NFTS');
        const userNfts = await listMyNFT(authState.values.account);
        setNfts(userNfts);

        console.log('REQUESTING COMPLETE');
        console.log(userNfts[5].url);
    };

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
                        <TouchableOpacity
                            key={index}
                            onPress={() => nftClicked(nft)}
                            style={styles.nftTouchable}>
                            <NFT nft={nft} />
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
    nftTouchable: {width: '100%', display: 'flex', alignItems: 'center'},
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
