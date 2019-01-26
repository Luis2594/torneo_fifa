import { LOAD_IMAGE_BACKGROUND, PLAYERS_FETCH_SUCCESS, MATCH_UPDATE } from '../types'
const INITIAL_STATE = {
    images: null,
    spinner: true,
    players: [],
    playerOne: '',
    playerTwo: '',
    golesOne: '',
    golesTwo: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_IMAGE_BACKGROUND:
            return {
                ...state,
                images: action.payload,
                spinner: false
            }
        case PLAYERS_FETCH_SUCCESS:
            return {
                ...state,
                players: action.payload
            }
        case MATCH_UPDATE:
            return {
                ...state,
                [action.payload.prop]: action.payload.value
            }
        default:
            return state
    }
}