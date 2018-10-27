import { put, call, select } from 'redux-saga/effects';
import StartupActions from './StartupRedux';
import NavigationService from '../Navigation/NavigationService';
import { addTokenToRequestHeaders } from '../Services/Api';
import i18n from '../I18n/i18n.config';


import {
    getSelectedLanguage,
    getSelectedCurrency,
    getToken,
    getUserId
} from '../Services/Storage';
import {setMomentLocale} from "../Services/Utils";

export function* startUpSaga(api, action) {
    const isAuthenticated = yield call(checkAuthStatus, api, action);
    yield call(loadUserLanguage);
    if (isAuthenticated) {
        yield call(loadUserCurrency, api);
    }
}

export function* getExchangeRates(api) {
    const res = yield call(api.getExchangeRates);
    yield call(handleExchangeRateResponse, res);
}

export function* handleExchangeRateResponse(res) {
    if (res.data) {
        if (res.data.code === "0") {
            yield call(handleExchangeRateSuccess, res);
        } else {
            console.log('error');
            yield call(handleExchangeRateError, res);
        }
    }
}
export function* handleExchangeRateSuccess(res) {
    const rates = res.data.data.list;
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
    i18n.changeLanguage(language.code);
    yield call(setMomentLocale, language.code);
    yield put(StartupActions.loadUserLanguage(language));
}

export function* loadUserCurrency(api) {
    yield call(getExchangeRates, api);
    const rates = yield select(state => state.app.currencies);
    let currency = yield call(getSelectedCurrency);
    if (!currency) {
        currency = rates ? rates[0]: {};
    }
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



