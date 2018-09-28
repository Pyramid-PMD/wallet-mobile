import { put, call, select } from 'redux-saga/effects';
import StartupActions from './StartupRedux';
import NavigationService from '../Navigation/NavigationService';
import { addTokenToRequestHeaders } from '../Services/Api';

import {
    getSelectedLanguage,
    getSelectedCurrency,
    getToken,
    getUserId
} from '../Services/Storage';

export function* startUpSaga(api, action) {
    const isAuthenticated = yield call(checkAuthStatus, api, action);
    console.log('is authenticated', isAuthenticated);
    yield call(loadUserLanguage);
    if (isAuthenticated) {
        yield call(loadUserCurrency, api);
    }
}

export function* getExchangeRates(api) {
    const res = yield call(api.getExchangeRates);
    console.log('res',res);
    yield call(handleExchangeRateResponse, res);
}

export function* handleExchangeRateResponse(res) {
    if (res.data) {
        if (res.data.code === "0") {
            console.log('success');
            yield call(handleExchangeRateSuccess, res);
        } else {
            console.log('error');
            yield call(handleExchangeRateError, res);
        }
    }
}
export function* handleExchangeRateSuccess(res) {
    const rates = res.data.data.list;
    console.log('rates', rates);
    yield put(StartupActions.exchangeRateSuccess(rates));
}

export function* handleExchangeRateError(res) {
}

export function* loadUserSettings(defaultCurrency) {
    // yield call(AsyncStorage.removeItem, 'language');
    const language = yield call(getSelectedLanguage);
    let currency = yield call(getSelectedCurrency);
    if (!currency) {
        currency = defaultCurrency;
    }
    yield put(StartupActions.loadUserSettingSuccess(language, currency));
}

export function* loadUserLanguage() {
    const language = yield call(getSelectedLanguage);
    yield put(StartupActions.loadUserLanguage(language));
}

export function* loadUserCurrency(api) {
    yield call(getExchangeRates, api);
    const rates = yield select(state => state.app.currencies);
    console.log('rates', rates);
    let currency = yield call(getSelectedCurrency);
    if (!currency) {
        currency = rates ? rates[0]: {};
    }

    console.log('selected currency', currency);
    yield put(StartupActions.loadUserCurrency(currency));
}

export function* checkAuthStatus(api, action) {
    const token = yield call(getToken);
    const uid = yield call(getUserId);
    if(token) {
        yield call(addTokenToRequestHeaders, api, token, uid);
        yield call(NavigationService.navigate, 'App');
    }
    else {
        yield call(NavigationService.navigate, 'Auth');
    }
    return token !== undefined;
}


