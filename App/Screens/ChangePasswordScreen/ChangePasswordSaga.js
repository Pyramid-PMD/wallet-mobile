import { put, call } from 'redux-saga/effects';
import ChangePasswordActions from './ChangePasswordRedux';
import i18n from '../../I18n/i18n.config';
import NavigationService from '../../Navigation/NavigationService';


export function * changePasswordSaga(api, action) {
    const { password } = action;
    console.log(password);
    console.log('password', password);
    const res = yield call(api.changePassword, password);
    console.log('password reset', res);
    yield call(handleChangePasswordResponse, res);

}

export function* handleChangePasswordResponse(res) {
    if (res.data) {
        if (res.data.code === "0") {
            yield call(handleChangePasswordSuccess, res);
        } else {
            yield call(handleChangePasswordError, res);
        }
    }
}

export function* handleChangePasswordSuccess(res) {
}

export function* handleChangePasswordError(res) {

}
