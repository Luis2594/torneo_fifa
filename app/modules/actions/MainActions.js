import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import _ from 'lodash';

import {
    LOAD_IMAGE,
    LOAD_IMAGE_SUCCESS,
    PLAYERS_FETCH_SUCCESS,
    TEAMS_FETCH_SUCCESS,
    MATCH_UPDATE
} from '../types'

import players from '../src/data/players.json'
import teams from '../src/data/teams.json'
import images from '../src/data/images.json'

export const loadImages = () => {
    return (dispatch) => {
        let imagesTemp = "[{"
        const cont = []
        _.each(images, function (image) {
            const ref = firebase.storage().ref(`images/${image.img}`);
            ref.getDownloadURL()
                .then((url) => {
                    imagesTemp += `"${image.name}": "${url}",`
                    cont.push(url)
                    if (cont.length == 2) {
                        imagesTemp += '"": null}]'
                        dispatch({
                            type: LOAD_IMAGE_SUCCESS,
                            payload: imagesTemp
                        })
                    }
                });
        })
    }
}

// export const managementPlayer = () => {
//     return (dispatch) => {
//         firebase.database().ref(`/players`)
//             .remove()
//             .then(createPlayer(dispatch))
//     }
// }

export const createPlayer = () => {
    return (dispatch) => {
        _.each(players, function (player) {
            firebase.database().ref(`/players/`)
                .push(player)
                .then(getAllPlayers(dispatch))
        })
    }
}

const getAllPlayers = (dispatch) => {
    return () => {
        firebase.database().ref(`/players/`)
            .on('value', snapshot => {
                dispatch({ type: PLAYERS_FETCH_SUCCESS, payload: snapshot.val() })
            })
    }
}

// export const managementTeam = () => {
//     return (dispatch) => {
//         firebase.database().ref(`/teams`)
//             .remove()
//             .then(createTeam(dispatch))
//     }
// }

export const createTeam = (dispatch) => {
    return () => {
        _.each(teams, function (team) {
            firebase.database().ref(`/teams/`)
                .push(team)
                .then(getAllTeams(dispatch))
        })
    }
}

const getAllTeams = (dispatch) => {
    return () => {
        firebase.database().ref(`/teams/`)
            .on('value', snapshot => {
                dispatch({ type: TEAMS_FETCH_SUCCESS, payload: snapshot.val() })
            })
    }
}

export const matchUpdate = ({ prop, value }) => {
    return {
        type: MATCH_UPDATE,
        payload: { prop, value }
    }
}