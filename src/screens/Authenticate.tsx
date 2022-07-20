import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {useAuthState} from '../contexts/AuthContext';

export default function Authenticate() {
    const authState = useAuthState();

    return (
        <View style={styles.mainContainer}>
            <View style={styles.content}>
                <Text style={styles.title}>Welcome to</Text>
                <Text style={[styles.title, styles.bold]}>
                    DanceMooves Marketplace
                </Text>
            </View>
            <TouchableOpacity
                onPress={authState.actions.connectWallet}
                style={styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}>Connect a Wallet</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    bold: {
        fontWeight: '700',
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e7a61a',
    },
    content: {
        maxWidth: 250,
    },
    title: {
        color: '#ffffff',
        fontSize: 24,
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
