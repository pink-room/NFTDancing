import React, {useState} from 'react';
import {
    View,
    Text,
    Alert,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    ScrollView,
} from 'react-native';
import * as DocumentPicker from 'react-native-document-picker';
import {useWeb3State} from '../contexts/Web3Context';

export default function Home() {
    const web3State = useWeb3State();

    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();
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
        if (video != null && name && description) {
            const ipfsHash = await web3State.actions.uploadToIpfs(
                video,
                name,
                description,
            );

            if (ipfsHash != null) {
                const txId = await web3State.actions.mintDanceNFT(ipfsHash);

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
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.mainContainer}>
                {web3State.values.loading ? (
                    <ActivityIndicator />
                ) : (
                    <>
                        <Text style={[styles.text, styles.title]}>
                            Create your own Dance NFT!
                        </Text>

                        <Text style={[styles.inputLabel]}>Name of The NFT</Text>
                        <TextInput
                            style={[styles.input, styles.inputText]}
                            onChangeText={setName}
                            value={name}
                            placeholder="NFT Placeholder"
                        />

                        <Text style={[styles.inputLabel]}>Description</Text>
                        <TextInput
                            style={[styles.inputDescription, styles.input]}
                            onChangeText={setDescription}
                            value={description}
                            placeholder="Description"
                            multiline
                            numberOfLines={5}
                        />

                        <Text style={[styles.inputLabel]}>Video to Upload</Text>
                        <TouchableOpacity onPress={handleUploadVideo}>
                            <Text
                                style={
                                    video
                                        ? [styles.text, styles.input]
                                        : styles.input
                                }>
                                {video ? video.name : 'Select Video'}
                            </Text>
                            <Text style={[styles.text, styles.label]}>
                                It should not be greater than 35MB
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            disabled={video == null}
                            style={styles.buttonStyle}
                            onPress={handleMintNFT}>
                            <Text style={styles.buttonTextStyle}>Mint NFT</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#ccc',
        marginBottom: 12,
    },
    inputText: {
        minHeight: 40,
    },
    inputDescription: {
        textAlignVertical: 'top',
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: 'white',
        marginBottom: 6,
    },
    scrollContainer: {
        backgroundColor: '#3294CD',
    },
    mainContainer: {
        paddingHorizontal: 24,
        justifyContent: 'center',
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
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        marginBottom: 24,
        marginTop: 12,
    },
    label: {
        fontSize: 10,
        marginTop: -10,
    },
    buttonStyle: {
        padding: 10,
        borderColor: '#fff',
        borderRadius: 10,
        borderWidth: 2,
        marginTop: 24,
    },
    buttonTextStyle: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
    },
});
