import React, {useState, useEffect} from 'react';
import {Modal, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {INFT} from '../@types/Api';
import {useWeb3State} from '../contexts/Web3Context';

import Video from 'react-native-video';

interface NFTModalProps {
    modalVisible: boolean;
    nft?: INFT;
    closeModal(): void;
}

export default function NFTModal({
    modalVisible,
    nft,
    closeModal,
}: NFTModalProps) {
    const web3State = useWeb3State();
    const [videoLocation, setVideoLocation] = useState<string>('');

    useEffect(() => {
        const loadFromIpfs = async () => {
            if (nft) {
                const fileLocation = await web3State.actions.retrieveFromIpfs(
                    nft.url,
                );
                console.log('File Location');
                console.log(fileLocation);

                if (fileLocation !== null) {
                    setVideoLocation(fileLocation);
                }
            }
        };

        loadFromIpfs();
    }, [nft]);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => closeModal()}>
            <View style={styles.centeredView}>
                <Text>OLA ANDRE</Text>
                <Text>{nft?.tokenId}</Text>

                {videoLocation && (
                    <Video
                        source={{uri: videoLocation}}
                        style={{width: 300, height: 300}}
                        controls={true}
                    />
                )}

                <TouchableOpacity
                    onPress={closeModal}
                    style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>CLOSE</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    closeButton: {
        position: 'absolute',
        top: 24,
        right: 24,
    },
    closeButtonText: {
        fontSize: 12,
        color: 'white',
        fontWeight: '700',
    },
});
