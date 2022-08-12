import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {INFTResponse} from '../api/@types/NFTResponse';

interface NFTProps {
    nft: INFTResponse;
}

export default function NFT({nft}: NFTProps) {
    const shortenDescription = (description: string) => {
        if (description.length < 128) {
            return description;
        }
        const trimmedDescription = description.slice(125);
        return trimmedDescription + '...';
    };

    const metadata =
        nft.metadata != null
            ? nft.metadata.name! != null
                ? nft.metadata
                : JSON.parse(Object.keys(nft.metadata)[0])
            : null;
    console.log(metadata);

    return (
        <View style={styles.nftContainer}>
            {metadata != null && (
                <>
                    <Text style={styles.name}>{metadata.name || ''}</Text>
                    <Text>
                        {shortenDescription(metadata.description || '')}
                    </Text>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    name: {
        fontSize: 16,
        fontWeight: '700',
        color: 'white',
        marginBottom: 6,
    },
    nftContainer: {
        width: '100%',
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
