import { put, call } from 'redux-saga/effects';
import ChangePinActions from './ChangePinRedux';
import i18n from '../../I18n/i18n.config';
import NavigationService from '../../Navigation/NavigationService';


export function * changePinSaga(api, action) {
    const { pin } = action;
    console.log(pin);
    console.log('password', pin);
    const res = yield call(api.changePin, pin);
    console.log('password reset', res);
    yield call(handleChangePinResponse, res);

}

export function* handleChangePinResponse(res) {
    if (res.data) {
        if (res.data.code === "0") {
            yield call(handleChangePinSuccess, res);
        } else {
            yield call(handleChangePinError, res);
        }
    }
}

export function* handleChangePinSuccess(res) {
}

export function* handleChangePinError(res) {

}
