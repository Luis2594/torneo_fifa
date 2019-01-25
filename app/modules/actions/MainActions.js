import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import _ from 'lodash';

import { LOAD_IMAGE_BACKGROUND } from '../types'

export const loadBackground = ({ urlBg, urlBgButton }) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_IMAGE_BACKGROUND,
            payload: { bg: urlBg, bgbtn: urlBgButton }
        })
    }
}

export const deletePlayer = () => {
    return () => {
        firebase.database().ref(`/players`)
            .remove()
    }
}

export const createPlayer = () => {
    const players = [{ name: 'Luis' }, { name: 'Keyler' }, { name: 'Enrique' }]
    return () => {
        firebase.database().ref(`/players/`)
            .push(players)
    }
}