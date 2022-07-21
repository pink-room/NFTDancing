import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
// import {useAuthState} from '../contexts/AuthContext';

export default function Home() {
    // const authState = useAuthState();

    return (
        <View style={styles.mainContainer}>
            <Text>Create your own DanceMoove!</Text>
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
