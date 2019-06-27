import {HOME_ERROR, HOME_LOADING, HOME_SUCCESS} from "./types";
import {getPostsAPI} from '../../services/Listing'
import {SecureStore} from "expo";
import {checkToken} from '../../utils/tokenCheck';

function setHomeLoading(homeLoading) {
    return {
        type: HOME_LOADING,
        homeLoading
    }
}

function setHomeError(homeError) {
    return {
        type: HOME_ERROR,
        homeError
    }
}

function setHomeSuccess(homeSuccess) {
    return {
        type: HOME_SUCCESS,
        homeSuccess
    }
}

export function getPosts(sub, filter) {
    return async dispatch => {
        dispatch(setHomeLoading(true));
        dispatch(setHomeError(null));
        dispatch(setHomeSuccess(null));

        let token = null;
        checkToken();
        await SecureStore.getItemAsync('token')
            .then((res) => {
                token = res;
            })
            .catch((error) => {
                console.log(error)
            })
        getPostsAPI(sub, filter, token)
            .then((res) => {
                dispatch(setHomeLoading(false));
                dispatch(setHomeSuccess(res))
            }).catch((error) => {
            dispatch(setHomeLoading(false));
            dispatch(setHomeError(error));
        });
    }
}