import {
    LOAD_DATA_DEFAULT,
    LOAD_ONE_IMAGE_SUCCESS,
    LOAD_IMAGE_SUCCESS,
    PLAYERS_FETCH_SUCCESS,
    TEAMS_FETCH_SUCCESS,
    PLAYER_ID_UPDATE,
    PLAYER_RESULT_UPDATE,
    TEAM_ID_UPDATE,
    TEAM_NAME_UPDATE,
    SET_RESULT_SUCCESS,
    SET_RESULT_LOADING,
    SET_IMAGE_DEFAULT
} from '../types'

const INITIAL_STATE = {
    spinner: true,
    setResult: false,
    images: null,
    players: [],
    teams: [],
    playerOne: '',
    playerOneImage: '',
    playerTwo: '',
    playerTwoImage: '',
    golesOne: '',
    golesTwo: '',
    teamOne: '',
    teamOneName: 'Equipo',
    teamOneImage: '',
    teamTwo: '',
    teamTwoName: 'Equipo',
    teamTwoImage: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_IMAGE_SUCCESS:
            return {
                ...state,
                images: action.payload,
                teamOneImage: action.payload[0].sinLogo,
                teamTwoImage: action.payload[0].sinLogo,
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
        case LOAD_ONE_IMAGE_SUCCESS:
            return {
                ...state,
                [action.payload.prop]: action.payload.url
            }
        case PLAYER_RESULT_UPDATE:
        case TEAM_ID_UPDATE:
        case PLAYER_ID_UPDATE:
        case TEAM_NAME_UPDATE:
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
        case SET_RESULT_LOADING:
            return {
                ...state,
                setResult: true
            }
        case SET_RESULT_SUCCESS:
            return {
                ...state,
                golesOne: '',
                golesTwo: '',
                setResult: false
            }
        case SET_IMAGE_DEFAULT:
            return {
                ...state,
                teamOneImage: action.payload.url,
                teamTwoImage: action.payload.url
            }
        default:
            return state
    }
}