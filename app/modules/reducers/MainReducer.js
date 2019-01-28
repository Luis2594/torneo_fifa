import {
    LOAD_DATA_DEFAULT,
    LOAD_ONE_IMAGE_SUCCESS,
    LOAD_IMAGE_SUCCESS,
    PLAYERS_FETCH_SUCCESS,
    TEAMS_FETCH_SUCCESS,
    PLAYER_ID_UPDATE,
    PLAYER_RESULT_UPDATE
} from '../types'
const INITIAL_STATE = {
    spinner: true,
    imagesString: null,
    players: [],
    teams: [],
    playerOne: '',
    playerOneImage: '',
    playerTwo: '',
    playerTwoImage: '',
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
        case PLAYER_ID_UPDATE:
            return {
                ...state,
                [action.payload.prop]: action.payload.value
            }
        case LOAD_ONE_IMAGE_SUCCESS:
            return {
                ...state,
                [action.payload.prop]: action.payload.url
            }
        case PLAYER_RESULT_UPDATE:
            return {
                ...state,
                [action.payload.prop]: action.payload.value
            }
        case LOAD_DATA_DEFAULT:
            return {
                ...state,
                playerOne: action.payload.id,
                playerTwo: action.payload.id,
                playerOneImage: action.payload.url,
                playerTwoImage: action.payload.url
            }
        default:
            return state
    }
}