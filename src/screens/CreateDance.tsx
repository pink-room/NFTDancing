import React, {useState} from 'react';
import {
    View,
    Text,
    Alert,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import * as DocumentPicker from 'react-native-document-picker';
import {useWeb3State} from '../contexts/Web3Context';

export default function Home() {
    const web3State = useWeb3State();
    const [video, setVideo] =
        useState<DocumentPicker.DocumentPickerResponse | null>(null);

    const handleUploadVideo = async () => {
        const selectedFile = await DocumentPicker.pickSingle({
            type: 'video/mp4',
            copyTo: 'documentDirectory',
        });

        setVideo(selectedFile);
    };

    const handleMintNFT = async () => {
        if (video != null) {
            const ipfsHash = await web3State.actions.uploadToIpfs(video);
            console.log('IPFD Hash -> ', ipfsHash);
            if (ipfsHash != null) {
                const txId = await web3State.actions.mintDanceNFT(ipfsHash);
                console.log('txID CreateDance -> ', txId);
                if (txId !== null && txId !== '') {
                    Alert.alert('Success', 'Dance NFT minted');
                    setVideo(null);
                } else {
                    Alert.alert('Error minting NFT');
                }
            } else {
                Alert.alert('Error uploading video to IPFS');
            }
        }
    };

    return (
        <View style={styles.mainContainer}>
            {web3State.values.loading ? (
                <ActivityIndicator />
            ) : (
                <>
                    <Text style={[styles.text, styles.title]}>
                        Create your own Dance NFT!
                    </Text>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={handleUploadVideo}>
                        <Text style={styles.buttonTextStyle}>
                            Upload your dance video
                        </Text>
                    </TouchableOpacity>
                    <Text style={[styles.text, styles.label]}>
                        It should not be greater than 35MB
                    </Text>

                    <View style={styles.videoNameContainer}>
                        {video != null && <Text>{video.name}</Text>}
                    </View>
                    <TouchableOpacity
                        disabled={video == null}
                        style={styles.buttonStyle}
                        onPress={handleMintNFT}>
                        <Text style={styles.buttonTextStyle}>Mint NFT</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e7a61a',
    },
    videoNameContainer: {
        padding: 12,
        borderWidth: 1,
        marginTop: 32,
        borderColor: '#000000',
        width: '65%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#ffffff',
        textAlign: 'center',
    },
    title: {
        fontSize: 30,
        position: 'absolute',
        top: 32,
    },
    content: {
        fontSize: 18,
        marginTop: 12,
    },
    label: {
        fontSize: 8,
    },
    buttonStyle: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderColor: '#ffffff',
        borderRadius: 8,
        borderWidth: 2,
        marginTop: 32,
    },
    buttonTextStyle: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '500',
    },
});
