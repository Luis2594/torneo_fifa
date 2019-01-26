import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import _ from 'lodash';

import { LOAD_IMAGE_BACKGROUND, PLAYERS_FETCH_SUCCESS, MATCH_UPDATE } from '../types'

export const loadBackground = ({ urlBg, urlBgButton }) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_IMAGE_BACKGROUND,
            payload: { bg: urlBg, bgbtn: urlBgButton }
        })
    }
}

export const managementPlayer = () => {
    return (dispatch) => {
        firebase.database().ref(`/players`)
            .remove()
            .then(createPlayer(dispatch))
    }
}

const createPlayer = (dispatch) => {
    const players = [{ id: 0, name: 'Luis' }, { id: 1, name: 'Keyler' }, { id: 2, name: 'Enrique' }]

    return () => {
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

export const matchUpdate = ({ prop, value }) => {
    return {
        type: MATCH_UPDATE,
        payload: { prop, value }
    }
}