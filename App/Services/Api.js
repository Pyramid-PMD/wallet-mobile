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
        },
        timeout: 30000
    });

    const getRoot = () => api.get('');

    const login = (credentials) => api.post('login', credentials);
    const qrCodeLogin = (mac_info) => api.post('qrcode', {mac_info});
    const bindMachine = (wallet_addr) => api.get(`bind/${wallet_addr}`);
    const unBindMachine = (wallet_addr) => api.get(`unbind/${wallet_addr}`);
    const register = (user) => api.post('register', user);
    const verifyEmail = (email) => api.get('sendVerify', {email});
    const changePassword = (password) => api.post('reset/password', password);
    const changePin = (pin) => api.post('reset/pin', pin);
    const getMiners = () => api.get('machine/list');
    const getMiner = (wallet_addr) => api.get(`machine/detail/${wallet_addr}`);
    const postWithdrawal = (withdrawal) => api.post('transaction/outer', withdrawal);
    const getNotifications = () => api.get('msg/list');
    const getExchangeRates = () => api.get('exchange/rate');
    const getOverview = () => api.get('overview');
    const getBonusChart = (walletAddress, q) => api.get(`bonus/info/${walletAddress}`, {q});



    return {
        instance: api,
        login,
        qrCodeLogin,
        bindMachine,
        unBindMachine,
        register,
        verifyEmail,
        changePassword,
        changePin,
        getMiners,
        getMiner,
        postWithdrawal,
        getNotifications,
        getExchangeRates,
        getOverview,
        getBonusChart
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


