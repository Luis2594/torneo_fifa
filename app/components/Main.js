//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, FlatList, Image, Picker, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from 'firebase'
import { connect } from 'react-redux'

import { loadBackground } from '../modules/actions'
import { Button, ListItem } from './common'

// create a component
class Main extends Component {

    componentWillMount() {
        const ref = firebase.storage().ref('images/bg.png');
        ref.getDownloadURL()
            .then((urlBg) => {
                const ref2 = firebase.storage().ref('images/bgbtn.png');
                ref2.getDownloadURL()
                    .then((urlBgButton) => {
                        this.props.loadBackground({ urlBg, urlBgButton })
                    });
            });
    }

    loadImage() {

        const data = [{
            player: "Jugador",
            pj: 'PJ',
            pg: 'PG',
            pp: 'PP',
            gf: 'GF',
            gc: 'GC',
            dg: 'DG',
            pts: 'PTS',
            r: '%'
        },
        {
            player: "Luis Castillo Calderon",
            pj: '1',
            pg: '10',
            pp: '10',
            gf: '10',
            gc: '1',
            dg: '1',
            pts: '30',
            r: '50%'
        },
        {
            player: "Luis Castillo Calderon",
            pj: '1',
            pg: '10',
            pp: '10',
            gf: '10',
            gc: '1',
            dg: '1',
            pts: '30',
            r: '50%'
        },
        {
            player: "Luis Castillo Calderon",
            pj: '1',
            pg: '10',
            pp: '10',
            gf: '10',
            gc: '1',
            dg: '1',
            pts: '30',
            r: '50%'
        }]

        const {
            imgBackground,
            spinnerTextStyle,
            flatlistStyle,
            viewRowStyle,
            imageProfileStyle,
            viewContenPicker,
            viewContentMatch,
            imageTeamStyle,
            textInputStyle,
            footer } = styles

        if (this.props.images !== null) {
            return <ImageBackground
                style={imgBackground}
                source={{ uri: this.props.images.bg }}>

                {/* TABLE */}
                <View style={{ flex: .4 }}>
                    <FlatList
                        style={flatlistStyle}
                        data={data}
                        renderItem={({ item }) => <ListItem statistics={item} />}
                    />
                </View>

                {/* IMAGE PROFILE */}
                <View style={{ flex: .2, flexDirection: 'row' }}>
                    <View style={viewRowStyle}>
                        <Image style={imageProfileStyle} source={{ uri: this.props.images.bgbtn }} />
                    </View>

                    <View style={viewRowStyle}>
                        <Image style={imageProfileStyle} source={{ uri: this.props.images.bgbtn }} />
                    </View>
                </View>

                {/* SELECT PLAYER */}
                <View style={{ flex: .1, flexDirection: 'row' }}>
                    <View style={viewContenPicker}>
                        <Picker style={{ width: '100%' }}>
                            <Picker.Item label="Monday" value="Monday" />
                            <Picker.Item label="Tuesday" value="Tuesday" />
                            <Picker.Item label="Wednesday" value="Wednesday" />
                            <Picker.Item label="Thursday" value="Thursday" />
                            <Picker.Item label="Friday" value="Friday" />
                            <Picker.Item label="Saturday" value="Saturday" />
                            <Picker.Item label="Sunday" value="Sunday" />
                        </Picker>
                    </View>

                    <View style={viewContenPicker}>
                        <Picker style={{ width: '100%' }}>
                            <Picker.Item label="Monday" value="Monday" />
                            <Picker.Item label="Tuesday" value="Tuesday" />
                            <Picker.Item label="Wednesday" value="Wednesday" />
                            <Picker.Item label="Thursday" value="Thursday" />
                            <Picker.Item label="Friday" value="Friday" />
                            <Picker.Item label="Saturday" value="Saturday" />
                            <Picker.Item label="Sunday" value="Sunday" />
                        </Picker>
                    </View>
                </View>

                {/* SET MATCH */}
                <View style={{ flex: .3, flexDirection: 'row' }}>
                    <View style={viewRowStyle}>
                        <View style={viewContentMatch}>
                            <Image style={imageTeamStyle} source={{ uri: this.props.images.bgbtn }} />
                            <Text style={{ flex: 1 }}>Real Madrid</Text>
                            <TextInput style={textInputStyle} />
                        </View>
                    </View>

                    <View style={viewRowStyle}>
                        <View style={viewContentMatch}>
                            <TextInput style={textInputStyle} />
                            <Text style={{ flex: 1 }} > Real Madrid </Text>
                            <Image style={imageTeamStyle} source={{ uri: this.props.images.bgbtn }} />
                        </View>
                    </View>
                </View>

                {/* FOOTER */}
                <View style={footer}>

                    <Button
                        onPress={() => { }}
                        bg={this.props.images.bgbtn}
                    >
                        Generar Partido
                        </Button>

                    <Button
                        onPress={() => { }}
                        bg={this.props.images.bgbtn}
                    >
                        Ver
                        Partidos
                        </Button>

                    <Button
                        onPress={() => { }}
                        bg={this.props.images.bgbtn}
                    >
                        Finalizar Partido
                        </Button>

                </View>

            </ImageBackground>
        } else {
            return <Spinner
                visible={this.props.spinner}
                textContent={'Cargando torneo...'}
                textStyle={spinnerTextStyle}
            />
        }
    }

    render() {
        const { container } = styles
        return (
            <View style={container}>
                {this.loadImage()}
            </View>

        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#66CCFC'
    },
    imgBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    flatlistStyle: {
        marginTop: 30,
        marginRight: 10,
        marginLeft: 10,
    },
    viewRowStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageProfileStyle: {
        width: '50%',
        height: '80%'
    },
    viewContenPicker: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewContentMatch: {
        flex: 1,
        position: 'absolute',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#03AEFE',
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    imageTeamStyle: {
        flex: 1,
        width: "25%",
        height: "50%",
        margin: 5
    },
    textInputStyle: {
        flex: 1,
        height: '70%',
        margin: 5
    },
    footer: {
        flex: .1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    }
});

const mapStateToProps = (state) => {
    const { images, spinner } = state.main
    return { images, spinner }
}

//make this component available to the app
export default connect(mapStateToProps, { loadBackground })(Main);

