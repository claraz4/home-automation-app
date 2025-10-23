import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Controls() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Controls</Text>
            <Text>Try.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});