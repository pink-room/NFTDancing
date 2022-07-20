import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// import { useAuthState } from '../contexts/AuthContext';

export default function Marketplace() {
    // const authState = useAuthState();

    return (
        <View style={styles.mainContainer}>
            <Text>Marketplace</Text>
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
