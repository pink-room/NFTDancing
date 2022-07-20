import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import * as DocumentPicker from 'react-native-document-picker';
import {API_KEY} from '../utils/constants';
// import {ipfsDelete, ipfsUpload} from '@tatumio/tatum';

export default function Home() {
    const handleUploadDocument = async () => {
        const file = await DocumentPicker.pickSingle({
            type: DocumentPicker.types.video,
        });
        // const buffer = Buffer.from(file.fileCopyUri, 'base64');

        const response = await fetch(file.uri);
        const blob = await response.blob();

        // console.log(blob);

        const form = new FormData();
        form.append('file', blob);

        // console.log(form);

        try {
            const resp = await fetch('https://api-eu1.tatum.io/v3/ipfs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-api-key': API_KEY,
                },
                body: form,
            });
            // console.log(resp);
            const data = await resp.text();
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
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
