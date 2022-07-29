import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {useAuthState} from '../contexts/AuthContext';

export default function Authenticate() {
    const authState = useAuthState();

    return (
        <View style={styles.mainContainer}>
            <View style={styles.content}>
                <Text style={styles.title}>Welcome to the</Text>
                <Text style={[styles.title, styles.bold]}>
                    Dance NFT Marketplace
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={authState.actions.connectWallet}
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonTextStyle}>
                        Connect your Wallet
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bold: {
        fontWeight: '700',
    },
    buttonContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 128,
        left: 48,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#3294CD',
        padding: 48,
    },
    content: {
        marginTop: 48,
    },
    title: {
        color: '#ffffff',
        fontSize: 24,
    },
    buttonStyle: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderColor: '#ffffff',
        borderRadius: 8,
        borderWidth: 2,
        marginTop: 12,
    },
    buttonTextStyle: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
    },
});
