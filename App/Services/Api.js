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
    const getMinerList = () => api.get('machine/list');
    const postWithdrawal = (withdrawal) => api.post('withdraw/all', withdrawal);


    return {
        instance: api,
        login,
        getMinerList,
        postWithdrawal
    };
};

export default {
    create
};


