import {HOME_ERROR, HOME_LOADING, HOME_SUCCESS} from "../actions/types";

export default function HomeReducer(state = {
    homeSuccess: null,
    homeError: null,
    homeLoading: false
}, action) {
    switch (action.type) {
        case HOME_LOADING:
            return Object.assign({}, state, {
                homeLoading: action.homeLoading
            });
        case HOME_SUCCESS:
            return Object.assign({}, state, {
                homeSuccess: action.homeSuccess
            });
        case HOME_ERROR:
            return Object.assign({}, state, {
                homeError: action.homeError
            });
        default:
            return state
    }
}