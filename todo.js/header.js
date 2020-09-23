import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
    return (
        <View style={style.header}>
            <Text style={style.title}>TODO List</Text>
        </View>
    )
}
const style = StyleSheet.create({
    header: {
        height: 80,
        paddingTop: 38,
        backgroundColor: 'lightorange'
    },
    title: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontwieght: 'bold',
    }

})