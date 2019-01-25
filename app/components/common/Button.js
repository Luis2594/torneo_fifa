import React from 'react'
import { StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native'

const Button = ({ onPress, bg, children }) => {
    const { buttonStyle, textStyle, imgBackground } = styles
    return (
        <TouchableOpacity onPress={onPress} style={buttonStyle}>
            <ImageBackground
                style={imgBackground}
                source={{ uri: bg }}>
                <Text style={textStyle}>
                    {children}
                </Text>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        width: 100,
        height: 60
    },
    imgBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        color: '#FFF',
        fontSize: 16,
        textAlign: 'center', 
    },
});

export { Button }