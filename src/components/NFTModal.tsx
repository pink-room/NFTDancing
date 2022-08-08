import React, {useState, useEffect} from 'react';
import {
    Modal,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

import {useWeb3State} from '../contexts/Web3Context';

import Video from 'react-native-video';
import {IMetadata} from '../@types/NFT';

interface NFTModalProps {
    modalVisible: boolean;
    nft?: IMetadata;
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
                    nft.video,
                );

                if (fileLocation !== null) {
                    setVideoLocation(fileLocation);
                }
            }
        };

        loadFromIpfs();
    }, []);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => closeModal()}>
            <View style={styles.centeredView}>
                <Text style={styles.name}>{nft?.name}</Text>
                <Text style={styles.description}>{nft?.description}</Text>

                {videoLocation ? (
                    <View style={styles.videoContainer}>
                        <Video
                            source={{uri: videoLocation}}
                            style={styles.video}
                            controls={true}
                        />
                    </View>
                ) : (
                    <ActivityIndicator style={styles.activityIndicator} />
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
        padding: 24,
        backgroundColor: '#3294CD',
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
    description: {
        fontSize: 16,
        marginTop: 12,
    },
    name: {
        fontSize: 22,
        fontWeight: '700',
        color: 'white',
        marginTop: 48,
    },
    video: {
        width: '60%',
        height: 400,
        marginTop: 72,
    },
    videoContainer: {
        alignItems: 'center',
    },
    activityIndicator: {
        alignSelf: 'center',
        marginTop: '50%',
    },
});
