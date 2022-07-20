import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {useAuthState} from '../contexts/AuthContext';

export default function Unsupported() {
    const authState = useAuthState();

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.text}>This wallet does not support CELO.</Text>
            <Text style={styles.text}>Please use a CELO wallet</Text>
            <TouchableOpacity
                onPress={authState.actions.killSession}
                style={styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}>Kill session</Text>
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
    text: {
        color: '#ffffff',
        fontSize: 18,
        textAlign: 'center',
    },
    buttonStyle: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderColor: '#ffffff',
        borderRadius: 8,
        borderWidth: 2,
        marginTop: 12,
    },
    buttonTextStyle: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '500',
    },
});
