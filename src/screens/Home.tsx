import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function Home() {
    const handleUploadDocument = async () => {
        // const videoFile = await DocumentPicker.getDocumentAsync({
        //     type: 'video/*',
        //     copyToCacheDirectory: false,
        // });
        // if (videoFile.type === 'success') {
        //     try {
        //         const fetchResponse = await fetch(videoFile.uri);
        //         console.log('fetchResponse', fetchResponse);
        //         const blob = await fetchResponse.blob();
        //         console.log('blob', blob);
        //     } catch (err) {
        //         console.log(err);
        //     }
        //     // try {
        //     // 	// const base64File = await FileSystem.readAsStringAsync(videoFile.uri, { encoding: EncodingType.Base64 })
        //     // 	// const finalBase64 = `data:${videoFile.mimeType};base64,${base64File}`;
        //     // 	await uploadToIPFS(videoFile.file);
        //     // } catch (err) {
        //     // 	console.log(err);
        //     // 	// } finally () {
        //     // 	// 	await getFromIPFS(test)
        //     // }
        // }
    };

    return (
        <View style={styles.mainContainer}>
            <Text>Create your own DanceMoove!</Text>
            <TouchableOpacity onPress={handleUploadDocument}>
                <Text>Import a dance</Text>
            </TouchableOpacity>
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
});
