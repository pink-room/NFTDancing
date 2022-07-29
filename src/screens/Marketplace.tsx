import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Marketplace() {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.text}>FEATURE COMING SOON</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3294CD',
    },
    text: {
        width: '70%',
        fontSize: 28,
        textAlign: 'center',
    },
});
