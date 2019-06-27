import Utils from '../utils';
import APIClient from '../utils/api';
import APIConstants from '../utils/api/constants';

const getProfileAPI = (token) => {
    const path = `/api/v1/me`;
    const url = `${Utils.oAuthUrl}${path}`;
    const client = new APIClient(url, APIConstants.HTTPMethod.GET);
    const header = {
        'Authorization': `bearer ${token}`,
        'User-Agent': 'Dune by Mayank'
    }

    return client.sendRequest({}, header);
};

const getSubredditsAPI = (token) => {
    const path = `/subreddits/mine/subscriber`;
    const url = `${Utils.oAuthUrl}${path}`;
    const client = new APIClient(url, APIConstants.HTTPMethod.GET);
    const header = {
        'Authorization': `bearer ${token}`,
        'User-Agent': 'Dune by Mayank'
    }
    console.log(token)
    return client.sendRequest({}, header);
}

export {getProfileAPI, getSubredditsAPI};