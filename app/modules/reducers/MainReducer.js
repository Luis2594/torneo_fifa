import { LOAD_IMAGE_BACKGROUND } from '../types'
const INITIAL_STATE = {
    images: null,
    spinner: true,
    players: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_IMAGE_BACKGROUND:
            return {
                ...state,
                images: action.payload,
                spinner: false
            }
        default:
            return state
    }
}