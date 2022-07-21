import React, {useState} from 'react';
import {
    View,
    Text,
    Alert,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import {useWeb3State} from '../contexts/Web3Context';

export default function Home() {
    const web3State = useWeb3State();
    const [ipfsHash, setIpfsHash] = useState<string | null>(null);
    const [video, setVideo] = useState<string | null>(null);
    const [videoPlaying, setVideoPlaying] = useState<boolean>(false);

    const handleUploadVideo = async () => {
        const hash = await web3State.actions.uploadToIpfs();
        if (hash != null) {
            setIpfsHash(hash);
        } else {
            Alert.alert('Error uploading video to IPFS');
        }

        // Mint NFT with ipfs metadata
        // const mint = await web3State.actions.mintDanceNFT(ipfsHash, ...);
    };

    const handleGetVideo = async () => {
        if (ipfsHash != null) {
            const videoContent = await web3State.actions.retrieveFromIpfs(
                ipfsHash,
            );
            if (videoContent != null) {
                setVideo(videoContent);
            } else {
                Alert.alert('Error retrieving video from IPFS');
            }
        } else {
            Alert.alert('Video not yet uploaded');
        }
    };

    return (
        <View style={styles.mainContainer}>
            {web3State.values.loading ? (
                <ActivityIndicator />
            ) : (
                <>
                    <Text>Create your own DanceMoove!</Text>
                    <TouchableOpacity onPress={handleUploadVideo}>
                        <Text>Import a dance</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleGetVideo}>
                        <Text>Get Uploaded Video</Text>
                    </TouchableOpacity>
                    {video != null && (
                        <TouchableOpacity
                            onPress={() => setVideoPlaying(!videoPlaying)}
                            style={styles.videoContainer}>
                            <Video
                                source={{
                                    uri: video,
                                }}
                                paused={videoPlaying}
                                style={styles.video}
                            />
                        </TouchableOpacity>
                    )}
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
    videoContainer: {
        width: '75%',
        height: '75%',
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});
