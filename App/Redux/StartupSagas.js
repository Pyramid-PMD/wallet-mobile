import { put, call } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import StartupActions from './StartupRedux';
import NavigationService from '../Navigation/NavigationService';
import { addTokenToRequestHeaders } from '../Services/Api';

export function* startUpSaga(api, action) {
    yield call(checkAuthStatus, api, action);
}

export function* checkAuthStatus(api, action) {
    const token = yield call(getToken);
    const uid = yield call(getUserId);
    if(token) {
        yield call(addTokenToRequestHeaders, api, token, uid);
        yield call(NavigationService.navigate, 'App');
    } else {
        yield call(NavigationService.navigate, 'Auth');
    }
}

export async function getToken() {
    try {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
            console.log(token);
            return token;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getUserId() {
    try {
        const uid = await AsyncStorage.getItem('uid');
        if (uid !== null) {
            console.log(uid);
            return parseInt(uid);
        }
    } catch (error) {
        console.log(error);
    }
}


