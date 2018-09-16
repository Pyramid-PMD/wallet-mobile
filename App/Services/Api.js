import apisauce from 'apisauce';
const url = 'http://101.132.161.0/api/web/';

// const url = 'http://101.132.161.0/api/web/';


const create  =  (baseURL = url) => {
    const api = apisauce.create({
        baseURL,
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
            'version': '1.0.0'
        },
        timeout: 10000
    });

    const getRoot = () => api.get('');

    // Auth
    const login = (credentials) => api.post('login', credentials);
    const getMiners = () => api.get('machine/list');
    const getMiner = (machine_id) => api.get(`machine/${machine_id}`);
    const postWithdrawal = (withdrawal) => api.post('withdraw/all', withdrawal);


    return {
        instance: api,
        login,
        getMiners,
        getMiner,
        postWithdrawal
    };
};

export const addTokenToRequestHeaders = (api, token, uid) => {
    api.instance.addRequestTransform(request => {
        request.headers['token'] = token;
        request.headers['uid'] = uid;
    });
};

export default {
    create
};


