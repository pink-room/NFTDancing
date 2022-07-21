import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {createContract} from '../api/createContract';
import Config from 'react-native-config';

export default function Home() {
    const handleContractCreation = async () => {
        console.log('CREATING CONTRACT...');
        const transactionId = await createContract();
        console.log('DEBUG transactionId -> ', transactionId);
    };

    return (
        <View style={styles.mainContainer}>
            <Text>Create your own DanceMoove!</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={handleContractCreation}>
                <Text style={styles.text}>Create Contract</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Config.API_KEY</Text>
            {/* <TouchableOpacity onPress={handleUploadDocument}>
                <Text>Import a dance</Text>
            </TouchableOpacity> */}
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
    button: {
        height: 40,
        width: '60%',
        borderColor: '#e7401a',
        borderStyle: 'solid',
        borderWidth: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },
    text: {
        fontSize: 16,
        fontWeight: '700',
    },
});
