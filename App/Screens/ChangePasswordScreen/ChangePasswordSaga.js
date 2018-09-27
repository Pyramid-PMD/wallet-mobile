import { put, call } from 'redux-saga/effects';
import ChangePasswordActions from './ChangePasswordRedux';
import i18n from '../../I18n/i18n.config';
import NavigationService from '../../Navigation/NavigationService';
import LoadingIndicatorActions from '../../Components/LoadingIndicator/LoadingIndicatorRedux';
import ToastActions from '../../Redux/Common/Toast/ToastRedux';

export function * changePasswordSaga(api, action) {
    yield put(LoadingIndicatorActions.showLoadingIndicator(true));
    const { password } = action;
    const res = yield call(api.changePassword, password);
    console.log('password reset', res);
    yield call(handleChangePasswordResponse, res);

}

export function* handleChangePasswordResponse(res) {
    yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    if (res.data) {
        if (res.data.code === "0") {
            yield call(handleChangePasswordSuccess, res);
        } else {
            yield call(handleChangePasswordError, res);
        }
    }
}

export function* handleChangePasswordSuccess(res) {
    yield put(ToastActions.showToast('Password changed successfully', 'success'));
}

export function* handleChangePasswordError(res) {
    yield put(ToastActions.showToast('error'));
}
