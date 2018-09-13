import { put, call } from 'redux-saga/effects';
import LoginActions from './LoginRedux';
import i18n from '../../I18n/i18n.config';


export function * loginSaga(api, action) {
    const { credentials } = action;
    const res = yield call(api.login, credentials);
    console.log('res', res);
    yield handleLoginResponse(api, res);
}

export function *handleLoginResponse(api, res) {
    if (res.data.code === '0') {
        yield handleLoginSuccess(res, api)
    } else {
        yield handleLoginErrors(res)
    }
}

export function *handleLoginSuccess(api, res) {
    yield saveTokenToStorage(res);
    yield addTokenToRequestHeaders(api, res);
    yield put(LoginActions.loginSuccess(res.data.data));
}


export function saveTokenToStorage(res) {
    localStorage.setItem('token', res.data.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.data));
}

export function addTokenToRequestHeaders(api, res) {
    api.instance.addRequestTransform(request => {
        request.headers['token'] = res.data.data.token;
        request.headers['uid'] = res.data.data.uid;
    });
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
            errorMsg = '';
    }
    yield put(LoginActions.loginFailure(errorMsg));
}


export function * logoutSaga() {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('user');
    yield put(LoginActions.logoutSuccess());
}