import Utils from '../utils';
import APIClient from '../utils/api';
import APIConstants from '../utils/api/constants';

const getPostsAPI = (sub, filter, token) => {
    const path = `/r/${sub}/${filter}/`;
    const url = `${Utils.oAuthUrl}${path}`;
    const client = new APIClient(url, APIConstants.HTTPMethod.GET);
    const header = {
        'Authorization': `bearer ${token}`,
        'User-Agent': 'Dune by Mayank'
    }

    return client.sendRequest({}, header);
};

const getHomePostsAPI = (filter, token) => {
    const path = `/${filter}/`;
    const url = `${Utils.oAuthUrl}${path}`;
    const client = new APIClient(url, APIConstants.HTTPMethod.GET);
    const header = {
        'Authorization': `bearer ${token}`,
        'User-Agent': 'Dune by Mayank'
    }

    return client.sendRequest({}, header);
};

export {getPostsAPI, getHomePostsAPI};