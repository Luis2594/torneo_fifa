import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import _ from 'lodash';

import {
    LOAD_DATA_DEFAULT,
    LOAD_ONE_IMAGE_SUCCESS,
    LOAD_IMAGE_SUCCESS,
    PLAYERS_FETCH_SUCCESS,
    TEAMS_FETCH_SUCCESS,
    PLAYER_ID_UPDATE,
    PLAYER_RESULT_UPDATE,
    TEAM_ID_UPDATE,
    TEAM_NAME_UPDATE
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

export const loadOneImage = ({ prop, path }) => {
    return (dispatch) => {
        const ref = firebase.storage().ref(path);
        ref.getDownloadURL()
            .then((url) => {
                dispatch({
                    type: LOAD_ONE_IMAGE_SUCCESS,
                    payload: { prop, url }
                })
            });
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
    return () => {
        _.each(players, function (player) {
            firebase.database().ref(`/players/`)
                .push(player)
        })
    }
}

export const getAllPlayers = () => {
    return (dispatch) => {
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

export const createTeam = () => {
    return () => {
        _.each(teams, function (team) {
            firebase.database().ref(`/teams/`)
                .push(team)
        })
    }
}

export const getAllTeams = () => {
    return (dispatch) => {
        firebase.database().ref(`/teams/`)
            .on('value', snapshot => {
                dispatch({ type: TEAMS_FETCH_SUCCESS, payload: snapshot.val() })
            })
    }
}

export const updateIDPlayer = ({ prop, value }) => {
    return {
        type: PLAYER_ID_UPDATE,
        payload: { prop, value }
    }
}

export const updateIDTeam = ({ prop, value }) => {
    return {
        type: TEAM_ID_UPDATE,
        payload: { prop, value }
    }
}

export const updateNameTeam = ({ prop, value }) => {
    return {
        type: TEAM_NAME_UPDATE,
        payload: { prop, value }
    }
}

export const loadDataDefault = ({ id, path }) => {
    return (dispatch) => {
        const ref = firebase.storage().ref(path);
        ref.getDownloadURL()
            .then((url) => {
                dispatch({
                    type: LOAD_DATA_DEFAULT,
                    payload: { id, url }
                })
            });
    }
}

export const updateResultPlayer = ({ prop, value }) => {
    return {
        type: PLAYER_RESULT_UPDATE,
        payload: { prop, value }
    }
}