import {PROFILE_SUCCESS, PROFILE_ERROR, PROFILE_LOADING} from "./types";
import {getProfileAPI} from '../../services/Profile'
import {SecureStore} from "expo";
import {checkToken} from '../../utils/tokenCheck'
function setProfileLoading(profileLoading) {
    return {
        type: PROFILE_LOADING,
        profileLoading
    }
}

function setProfileError(profileError) {
    return {
        type: PROFILE_ERROR,
        profileError
    }
}

function setProfileSuccess(profileSuccess) {
    return {
        type: PROFILE_SUCCESS,
        profileSuccess
    }
}

export function getProfile() {
    return async dispatch => {
        dispatch(setProfileLoading(true));
        dispatch(setProfileError(null));
        dispatch(setProfileSuccess(null));

        let token = null;
        checkToken();
        await SecureStore.getItemAsync('token')
            .then((res) => {
                token = res;
            })
            .catch((error) => {
            console.log(error)
        })
        getProfileAPI(token)
            .then((res) => {
                dispatch(setProfileLoading(false));
                dispatch(setProfileSuccess(res))
            }).catch((error) => {
            dispatch(setProfileLoading(false));
            dispatch(setProfileError(error));
        });
    }
}