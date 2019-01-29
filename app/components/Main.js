//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, FlatList, Image, Picker, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from 'firebase'
import { connect } from 'react-redux'
import _ from 'lodash';
import Toast, { DURATION } from 'react-native-easy-toast'

import {
    loadDataDefault,
    loadOneImage,
    loadImages,
    getAllPlayers,
    getAllTeams,
    updateIDPlayer,
    updateResultPlayer,
    updateIDTeam,
    updateNameTeam,
    setResults,
    createPlayer,
    createTeam
} from '../modules/actions'
import { Button, ListItem } from './common'

// create a component
class Main extends Component {

    componentWillMount() {
        // this.props.createPlayer()
        // this.props.createTeam()
        this.props.getAllPlayers()
        this.props.getAllTeams()
        this.props.loadImages()
        this.props.loadDataDefault({ id: '-LXJyZYMZJ1rFZS2_nL-', path: `players/luis.png` })
    }

    load() {
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
            viewContentTextTeam,
            textTeamStyle,
            footer } = styles

        if (!this.props.spinner) {

            return <ImageBackground
                style={imgBackground}
                source={{ uri: this.props.images[0].bg }}>

                <Spinner
                    visible={this.props.setResult}
                    textContent={'Insertando marcador...'}
                />

                {/* TABLE */}
                <View style={{ flex: .3 }}>
                    <FlatList
                        style={flatlistStyle}
                        data={data}
                        renderItem={({ item }) => <ListItem statistics={item} />}
                    />
                </View>

                {/* IMAGE PROFILE */}
                <View style={{ flex: .2, flexDirection: 'row' }}>
                    <View style={viewRowStyle}>
                        <Image style={imageProfileStyle} source={{ uri: this.props.playerOneImage }} />
                    </View>

                    <View style={viewRowStyle}>
                        <Image style={imageProfileStyle} source={{ uri: this.props.playerTwoImage }} />
                    </View>
                </View>

                {/* SELECT PLAYER */}
                <View style={{ flex: .1, flexDirection: 'row' }}>
                    <View style={viewContenPicker}>
                        <Picker style={{ width: '100%' }}
                            selectedValue={this.props.playerOne}
                            onValueChange={value => {
                                this.props.updateIDPlayer({ prop: 'playerOne', value })

                                const playerTemp = _.find(this.props.players, function (player) {
                                    return player.id == value;
                                });

                                this.props.loadOneImage({ prop: 'playerOneImage', path: `players/${playerTemp.image}` })
                            }
                            }
                        >
                            {this.loadPlayersPicker()}
                        </Picker>
                    </View>

                    <View style={viewContenPicker}>
                        <Picker style={{ width: '100%' }}
                            selectedValue={this.props.playerTwo}
                            onValueChange={value => {
                                this.props.updateIDPlayer({ prop: 'playerTwo', value })

                                const playerTemp = _.find(this.props.players, function (player) {
                                    return player.id == value;
                                });

                                this.props.loadOneImage({ prop: 'playerTwoImage', path: `players/${playerTemp.image}` })
                            }
                            }
                        >
                            {this.loadPlayersPicker()}
                        </Picker>
                    </View>
                </View>

                {/* SET MATCH */}
                <View style={{ flex: .3, flexDirection: 'row' }}>
                    <View style={viewRowStyle}>
                        <View style={viewContentMatch}>
                            <Image style={imageTeamStyle} source={{ uri: this.props.teamOneImage }} />
                            <View style={viewContentTextTeam}>
                                <Text style={textTeamStyle}>{this.props.teamOneName}</Text>
                            </View>

                            <TextInput
                                style={textInputStyle}
                                keyboardType="number-pad"
                                value={this.props.golesOne}
                                onChangeText={value => this.props.updateResultPlayer({ prop: 'golesOne', value })}
                            />
                        </View>
                    </View>

                    <View style={viewRowStyle}>
                        <View style={viewContentMatch}>
                            <TextInput
                                style={textInputStyle}
                                keyboardType="number-pad"
                                value={this.props.golesTwo}
                                onChangeText={value => this.props.updateResultPlayer({ prop: 'golesTwo', value })} />
                            <View style={viewContentTextTeam}>
                                <Text style={textTeamStyle} > {this.props.teamTwoName}</Text>
                            </View>
                            <Image style={imageTeamStyle} source={{ uri: this.props.teamTwoImage }} />
                        </View>
                    </View>
                </View>

                {/* FOOTER */}
                <View style={footer}>

                    <Button
                        onPress={this.generateRandomMatch.bind(this)}
                        bg={this.props.images[0].bgbtn}
                    >
                        Generar Partido
                        </Button>

                    <Button
                        onPress={() => { }}
                        bg={this.props.images[0].bgbtn}
                    >
                        Ver
                        Partidos
                        </Button>

                    <Button
                        onPress={this.finallyMatch.bind(this)}
                        bg={this.props.images[0].bgbtn}
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

    loadPlayersPicker() {
        const dataPiker = this.props.players.map((player) => {
            return (<Picker.Item key={player} label={player.name} value={player.id} />)
        })
        return dataPiker
    }

    generateRandomMatch() {
        const teamsLength = this.props.teams.length - 1
        const position1 = _.random(0, teamsLength)
        const team1 = _.find(this.props.teams, function (team, index) {
            return index == position1
        })

        this.props.updateIDTeam({ prop: 'teamOne', value: team1.id })
        this.props.updateNameTeam({ prop: 'teamOneName', value: team1.name })
        this.props.loadOneImage({ prop: 'teamOneImage', path: `teams/${team1.image}` })

        const position2 = _.random(teamsLength, function (position) {
            return position !== position1
        })

        const team2 = _.find(this.props.teams, function (team, index) {
            return index == position2
        })

        this.props.updateIDTeam({ prop: 'teamTwo', value: team2.id })
        this.props.updateNameTeam({ prop: 'teamTwoName', value: team2.name })
        this.props.loadOneImage({ prop: 'teamTwoImage', path: `teams/${team2.image}` })
    }

    finallyMatch() {
        if (this.props.playerOne != '' &&
            this.props.golesOne != '' &&
            this.props.teamOne != '' &&
            this.props.playerTwo != '' &&
            this.props.golesTwo != '' &&
            this.props.teamTwo != ''
        ) {

            if (this.props.playerOne == this.props.playerTwo) {
                this.refs.toast.show('Seleccione dos jugadores distintos.');
                return
            }

            if (this.props.teamOne == this.props.teamTwo) {
                this.refs.toast.show('Seleccione dos equipos distintos.');
                return
            }

            this.props.setResults({
                playerOne: this.props.playerOne,
                golesOne: this.props.golesOne,
                teamOne: this.props.teamOne,
                playerTwo: this.props.playerTwo,
                golesTwo: this.props.golesTwo,
                teamTwo: this.props.teamTwo
            })
        } else {
            this.refs.toast.show('Ingrese los datos del partido.');
        }
    }

    render() {
        const { container } = styles
        return (
            <View style={container}>
                {this.load()}
                <Toast ref="toast" />
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
        margin: 3,
        padding: 10,
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
        width: 45,
        height: 60
    },
    textInputStyle: {
        flex: 1,
        height: '70%',
        margin: 1
    },
    viewContentTextTeam: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    textTeamStyle: {
        fontSize: 9,
    },
    footer: {
        flex: .1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    }
});

const mapStateToProps = (state) => {

    const {
        setResult,
        images,
        spinner,
        playerOne,
        playerOneImage,
        playerTwo,
        playerTwoImage,
        golesOne,
        golesTwo,
        teamOne,
        teamOneName,
        teamOneImage,
        teamTwo,
        teamTwoName,
        teamTwoImage
    } = state.main

    const players = _.map(state.main.players, (val, id) => {
        return { ...val, id }
    })

    const teams = _.map(state.main.teams, (val, id) => {
        return { ...val, id }
    })

    return {
        setResult,
        images,
        spinner,
        players,
        teams,
        playerOne,
        playerOneImage,
        playerTwo,
        playerTwoImage,
        golesOne,
        golesTwo,
        teamOne,
        teamOneName,
        teamOneImage,
        teamTwo,
        teamTwoName,
        teamTwoImage
    }
}

//make this component available to the app
export default connect(mapStateToProps,
    {
        loadDataDefault,
        loadOneImage,
        loadImages,
        getAllPlayers,
        getAllTeams,
        updateIDPlayer,
        updateResultPlayer,
        updateIDTeam,
        updateNameTeam,
        setResults,
        createPlayer,
        createTeam
    })
    (Main);

