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
    textStyle: {
        alignSelf: 'center',
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    buttonStyle: {
        height: 60,
        width: 100,
    },
    imgBackground: {
        width: 100,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export { Button }