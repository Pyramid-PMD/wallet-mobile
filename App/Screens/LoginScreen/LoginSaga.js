import { put, call } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import LoginActions from './LoginRedux';
import i18n from '../../I18n/i18n.config';
import NavigationService from '../../Navigation/NavigationService';
import { addTokenToRequestHeaders } from '../../Services/Api';
import LoadingIndicatorActions from '../../Components/LoadingIndicator/LoadingIndicatorRedux';
import ToastActions from '../../Redux/Common/Toast/ToastRedux';
import {handleConnectivityError, handleGenericNetworkErrors} from '../../Redux/Common/NetworkErrors/NetworkErrorsSaga';
import {removeEmail, saveEmail} from "../../Services/Storage";


export function * loginSaga(api, action) {
    try {
        const { credentials } = action;
        yield put(LoadingIndicatorActions.showLoadingIndicator(true));
        const res = yield call(api.login, credentials);
        const {email} = credentials;
        yield call(handleLoginResponse, api, res, email);
    } catch (error) {
        yield put(LoadingIndicatorActions.showLoadingIndicator(false));

    }
}

export function *handleLoginResponse(api, res, email) {
    yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    if (res.data) {
        if (res.data.code === '0') {
            yield call(handleLoginSuccess, api, res, email);
        } else {
            yield call(handleLoginErrors, res);
        }
    } else {
        yield call(handleConnectivityError, res);
    }

}

export function *handleLoginSuccess(api, res, email) {
    const token = res.data.data.token.toString(),
        uid = res.data.data.uid.toString();
    yield call(saveEmail, email);
    yield call(saveTokenToStorage, token);
    yield call(saveUserIdToStorage, uid);
    yield call(addTokenToRequestHeaders, api, token, uid);
    yield call(NavigationService.navigate, 'AuthLoading');
    yield put(LoginActions.loginSuccess(res.data.data));
}


export function *saveTokenToStorage(token) {
    try {
        yield call(AsyncStorage.setItem, 'token', token);
    } catch (error) {
        console.log('failed saving token');
    }
}

export function *saveUserIdToStorage(uid) {
    try {
        yield call(AsyncStorage.setItem, 'uid', uid);
    } catch (error) {
        console.log('failed saving user id');
    }
}


export function *handleLoginErrors(res) {
    let errorMsg;
    switch (res.data.code) {
        case -11:
            errorMsg = i18n.t('auth:login.errors.emailNotRegistered');
            break;
        // Wrong password
        case -12:
            errorMsg = i18n.t('auth:login.errors.wrongPassword');
            break;
        default:
            errorMsg = yield call(handleGenericNetworkErrors, res);
    }
    yield put(LoginActions.loginFailure(errorMsg));
    yield put(ToastActions.showToast(errorMsg));
}


export function * logoutSaga() {
    yield call(removeTokenFormStorage);
    yield call(removeUserIdFormStorage);
    yield call(removeEmail);
    NavigationService.navigate('Auth');
}


export async function removeTokenFormStorage() {
    try {
        await AsyncStorage.removeItem('token');
    } catch (error) {
        console.log('failed removing token');
    }
}

export async function removeUserIdFormStorage() {
    try {
        await AsyncStorage.removeItem('uid');
    } catch (error) {
        console.log('failed saving user id');
    }
}

