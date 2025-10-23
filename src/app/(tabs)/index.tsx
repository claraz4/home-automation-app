import React from 'react';
import { StyleSheet } from 'react-native';
import { Heading } from "../../shared/ui/Heading"
import { AppText } from "@/src/shared/ui/AppText";
import ScreenView from "@/src/shared/ui/ScreenView";

export default function App() {
    return (
        <ScreenView style={styles.container}>
            <Heading variant="h1">HELLO THIS</Heading>
            <Heading variant="h2">Hello, React Native!</Heading>
            <Heading variant="h3">Hello, React Native!</Heading>
            <AppText>New app text.</AppText>
        </ScreenView>
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