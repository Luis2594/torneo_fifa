import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const ListItem = ({ statistics }) => {
    const { container, containerPlayer, containerText, textStyle } = styles
    return (
        <View style={container}>
            <View style={containerPlayer}>
                <Text style={textStyle}>{statistics.player}</Text>
            </View>

            <View style={containerText}>
                <Text style={textStyle}>{statistics.pj}</Text>
            </View>

            <View style={containerText}>
                <Text style={textStyle}>{statistics.pg}</Text>
            </View>

            <View style={containerText}>
                <Text style={textStyle}>{statistics.pp}</Text>
            </View>

            <View style={containerText}>
                <Text style={textStyle}>{statistics.gf}</Text>
            </View>

            <View style={containerText}>
                <Text style={textStyle}>{statistics.gc}</Text>
            </View>

            <View style={containerText}>
                <Text style={textStyle}>{statistics.dg}</Text>
            </View>

            <View style={containerText}>
                <Text style={textStyle}>{statistics.pts}</Text>
            </View>

            <View style={containerText}>
                <Text style={textStyle}>{statistics.r}</Text>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
    },
    containerPlayer: {
        flex: .2,
        justifyContent: 'flex-start'
    },
    containerText: {
        flex: .1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        color: '#fff',
        fontSize: 10,
        marginTop: 5,
        marginBottom: 5,
    }
});

export { ListItem }