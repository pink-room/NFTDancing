import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native';
import * as DocumentPicker from 'react-native-document-picker';
import IPFS from 'ipfs-mini';
import RNFS from 'react-native-fs';
import calculateSize from '../utils/calculateSizeInMB';
import Video from 'react-native-video';

export default function Home() {
    const ipfs = new IPFS({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
    });
    const [myFile, setMyFile] = useState<string | null>(null);
    const [ipfsHash, setIpfsHash] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleUploadDocument = async () => {
        setLoading(true);
        const file = await DocumentPicker.pickSingle({
            type: DocumentPicker.types.video,
            copyTo: 'documentDirectory',
        });

        // const buffer = Buffer.from(data, 'base64');
        // const buffer = Buffer.from(file.fileCopyUri, 'base64');

        RNFS.readFile(file.uri, 'base64').then(data => {
            if (data != null) {
                if (calculateSize(data) > 50) {
                    Alert.alert(
                        'File size is too large. Please select a file less than 35MB',
                    );
                }

                ipfs.add(data).then((result: string) => {
                    if (result != null) {
                        setIpfsHash(result);
                    } else {
                        console.log('Error uploading to ipfs');
                    }
                    setLoading(false);
                });
            }
        });
    };

    const handleGetVideo = () => {
        setLoading(true);
        ipfs.cat(ipfsHash, (err: any, result: any) => {
            if (err == null && result != null) {
                RNFS.writeFile(
                    RNFS.DocumentDirectoryPath + `/${ipfsHash}.mp4`,
                    result,
                    'base64',
                ).then(() => {
                    setMyFile(RNFS.DocumentDirectoryPath + `/${ipfsHash}.mp4`);
                });
            } else {
                console.log('Error retrieving from ipfs', err);
            }
            setLoading(false);
        });
    };

    return (
        <View style={styles.mainContainer}>
            {loading ? (
                <ActivityIndicator />
            ) : (
                <>
                    <Text>Create your own DanceMoove!</Text>
                    <TouchableOpacity onPress={handleUploadDocument}>
                        <Text>Import a dance</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleGetVideo}>
                        <Text>Get Uploaded Video</Text>
                    </TouchableOpacity>
                    {myFile != null && (
                        <Video
                            source={{
                                uri: myFile,
                            }}
                            style={styles.backgroundVideo}
                            // thumbnail={{
                            //     uri: 'https://i.picsum.photos/id/866/1600/900.jpg',
                            // }}
                        />
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
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});
