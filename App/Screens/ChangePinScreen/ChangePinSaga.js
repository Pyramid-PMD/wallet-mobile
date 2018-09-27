import { put, call } from 'redux-saga/effects';
import ChangePinActions from './ChangePinRedux';
import i18n from '../../I18n/i18n.config';
import NavigationService from '../../Navigation/NavigationService';
import LoadingIndicatorActions from '../../Components/LoadingIndicator/LoadingIndicatorRedux';
import ToastActions from '../../Redux/Common/Toast/ToastRedux';

export function * changePinSaga(api, action) {
    yield put(LoadingIndicatorActions.showLoadingIndicator(true));
    const { pin } = action;
    const res = yield call(api.changePin, pin);
    yield call(handleChangePinResponse, res);

}

export function* handleChangePinResponse(res) {
    yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    if (res.data) {
        if (res.data.code === "0") {
            yield call(handleChangePinSuccess, res);
        } else {
            yield call(handleChangePinError, res);
        }
    }
}

export function* handleChangePinSuccess(res) {
    yield put(ToastActions.showToast('Pin changed successfully', 'success'));

}

export function* handleChangePinError(res) {
    yield put(ToastActions.showToast('error'));
}
