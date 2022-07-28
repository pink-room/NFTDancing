import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {INFT} from '../@types/Api';

interface NFTProps {
    nft: INFT;
}

export default function NFT({nft}: NFTProps) {
    return (
        <View style={styles.nftContainer}>
            <Text>{nft.tokenId}</Text>
            <Text>{nft.url}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    nftContainer: {
        width: '90%',
        borderColor: 'white',
        borderRadius: 12,
        borderWidth: 1,
        borderStyle: 'solid',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 24,
        padding: 12,
    },
});
