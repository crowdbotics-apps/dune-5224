import {PROFILE_SUCCESS, PROFILE_ERROR, PROFILE_LOADING} from "../actions/types";

export default function ProfileReducer(state = {
    profileSuccess: null,
    profileError: null,
    profileLoading: false
}, action) {
    switch (action.type) {
        case PROFILE_LOADING:
            return Object.assign({}, state, {
                profileLoading: action.profileLoading
            });
        case PROFILE_SUCCESS:
            return Object.assign({}, state, {
                profileSuccess: action.profileSuccess
            });
        case PROFILE_ERROR:
            return Object.assign({}, state, {
                profileError: action.profileError
            });
        default:
            return state
    }
}