import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'

import { LOAD_IMAGE_BACKGROUND } from '../types'

export const loadBackground = ({ urlBg, urlBgButton }) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_IMAGE_BACKGROUND,
            payload: { bg: urlBg, bgbtn: urlBgButton }
        })
    }
}