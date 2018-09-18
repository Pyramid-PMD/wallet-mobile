import { put, call } from 'redux-saga/effects';
import StartupActions from './StartupRedux';
import {AsyncStorage} from 'react-native';
import NavigationService from '../Navigation/NavigationService';
import { addTokenToRequestHeaders } from '../Services/Api';
import {
    getSelectedLanguage,
    getSelectedCurrency,
    getToken,
    getUserId
} from '../Services/Storage';

export function* startUpSaga(api, action) {
    yield call(checkAuthStatus, api, action);
    yield call(loadUserSettings);
}

export function* loadUserSettings() {
    yield call(AsyncStorage.removeItem, 'language');
    const language = yield call(getSelectedLanguage);
    const currency = yield call(getSelectedCurrency);
    yield put(StartupActions.loadUserSettingSuccess(language, currency));
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


