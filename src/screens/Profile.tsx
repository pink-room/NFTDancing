import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {listMyNFT} from '../api/listNFTs';
import {useAuthState} from '../contexts/AuthContext';
import {NFT} from '../@types/Api';
import {useIsFocused} from '@react-navigation/native';

export default function Profile() {
    const [nfts, setNfts] = useState<NFT[]>();

    const authState = useAuthState();
    const isFocused = useIsFocused();

    const aux = ['a', 'b', 'c'];

    useEffect(() => {
        const load = async () => {
            console.log('REQUESTING USER NFTS');
            const userNfts = await listMyNFT(authState.values.account);
            setNfts(userNfts);
            console.log('REQUESTING COMPLETE');
        };

        if (isFocused) {
            load();
        }
    }, [isFocused]);

    const shortenAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(
            address.length - 4,
            address.length,
        )}`;
    };

    return (
        <View style={styles.mainContainer}>
            <Text style={[styles.userAccount, styles.bold]}>Account</Text>
            <Text style={[styles.userAccount]}>
                {shortenAddress(authState.values.account)}
            </Text>

            <TouchableOpacity
                onPress={authState.actions.killSession}
                style={styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}>Kill session</Text>
            </TouchableOpacity>

            {nfts && <Text> tamanho: {nfts[1].tokenId}</Text>}

            {nfts?.map((nft: NFT, index: number) => {
                return (
                    <View key={index}>
                        <Text>{index + 1}</Text>
                        <Text>{nft.tokenId}</Text>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    bold: {
        fontWeight: '700',
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e7a61a',
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
