import Utils from '../utils';
import APIClient from '../utils/api';
import APIConstants from '../utils/api/constants';
import {Buffer} from 'buffer'

const loginAPI = (username, password) => {
    const path = '/';
    const url = `${Utils.serverUrl}${path}`;
    const params = {
        username,
        password,
    };

    const client = new APIClient(url, APIConstants.HTTPMethod.POST);

    return client.sendRequest(params);
};

const signupAPI = (username, password, confirmPassword) => {
    const path = '/';
    const url = `${Utils.serverUrl}${path}`;
    const params = {
        username,
        password,
        confirmPassword,
    };

    const client = new APIClient(url, APIConstants.HTTPMethod.POST);

    return client.sendRequest(params);
};

const getToken = (token) => {
    const path = 'access_token';
    const url = `${Utils.serverUrl}${path}`;
    // const params = {
    //   "grant_type": 'authorization_code',
    //   code: token
    // };
    const params = `grant_type=authorization_code&code=${token}&redirect_uri=http://127.0.0.1:8000`;
    const headers = {
        "Content-Type": 'application/x-www-form-urlencoded',
        "Authorization": `Basic ${Buffer.from("xMReNoE2VWlRsA:").toString('base64')}`
    };
    return fetch(url, {
        method: "POST",
        headers: headers,
        body: params
    })
}

const refreshToken = (token) => {
    const path = 'access_token';
    const url = `${Utils.serverUrl}${path}`;
    const params = `grant_type=refresh_token&refresh_token=${token}`;
    const headers = {
        "Content-Type": 'application/x-www-form-urlencoded',
        "Authorization": `Basic ${Buffer.from(`${Utils.clientId}:`).toString('base64')}`
    };
    return fetch(url, {
        method: "POST",
        headers: headers,
        body: params
    })
}

export {getToken, refreshToken};
