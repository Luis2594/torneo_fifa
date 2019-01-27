import { LOAD_IMAGE, LOAD_IMAGE_SUCCESS, PLAYERS_FETCH_SUCCESS, TEAMS_FETCH_SUCCESS, MATCH_UPDATE } from '../types'
const INITIAL_STATE = {
    spinner: true,
    imagesString: null,
    players: [],
    teams: [],
    playerOne: '',
    playerTwo: '',
    golesOne: '',
    golesTwo: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_IMAGE_SUCCESS:
            return {
                ...state,
                imagesString: action.payload,
                spinner: false
            }
        case PLAYERS_FETCH_SUCCESS:
            return {
                ...state,
                players: action.payload
            }
        case TEAMS_FETCH_SUCCESS:
            return {
                ...state,
                teams: action.payload
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