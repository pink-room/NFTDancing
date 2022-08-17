import {useIsFocused} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {INFTResponse} from '../@types/NFTResponse';
import {queryTheGraph} from '../api/thegraph';
import NFT from '../components/NFT';
import {useAuthState} from '../contexts/AuthContext';

export default function Marketplace() {
    const authState = useAuthState();
    const isFocused = useIsFocused();

    const [nfts, setNfts] = useState<INFTResponse[]>();

    useEffect(() => {
        const load = async () => {
            try {
                const queryResult = await queryTheGraph(
                    authState.values.account,
                );
                if (queryResult != null) {
                    setNfts(queryResult);
                }
            } catch (err) {
                console.log('ERROR RETRIEVING NFTS', err);
            }
        };

        if (isFocused) {
            load();
        }
    }, [authState.values.account, isFocused]);

    return (
        <View style={styles.mainContainer}>
            {nfts?.map((nft: INFTResponse, index: number) => {
                return (
                    <TouchableOpacity
                        key={index}
                        // onPress={() => nftClicked(nft)}
                        style={styles.nftTouchable}>
                        <NFT nft={nft} />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3294CD',
    },
    text: {
        width: '70%',
        fontSize: 28,
        textAlign: 'center',
    },
    nftTouchable: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
});
