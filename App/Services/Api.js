import apisauce from 'apisauce';
import config from '../Config/AppConfig';

const url = config.api.baseUrl;

const create  =  (baseURL = url) => {
    const api = apisauce.create({
        baseURL,
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
            'version': '1.0.0',
            'disk_id': '123456'
        },
        timeout: 10000
    });

    const getRoot = () => api.get('');

    const login = (credentials) => api.post('web/login', credentials);
    const getMiners = () => api.get('web/machine/list');
    const getMiner = (machine_id) => api.get(`web/machine/${machine_id}`);
    const postWithdrawal = (withdrawal) => api.post('web/withdraw/all', withdrawal);
    const getNotifications = () => api.get('msg/list');


    return {
        instance: api,
        login,
        getMiners,
        getMiner,
        postWithdrawal,
        getNotifications
    };
};

const createWpApi  =  (baseURL = config.api.wpApi) => {
    const api = apisauce.create({
        baseURL,
    });

    const getNews = () => api.get('posts');

    return {
        instance: api,
        getNews
    };
};

export const addTokenToRequestHeaders = (api, token, uid) => {
    api.instance.addRequestTransform(request => {
        request.headers['token'] = token;
        request.headers['uid'] = uid;
    });
};

export default {
    create,
    createWpApi
};


