import { put, call } from 'redux-saga/effects';
import RegisterActions from './RegisterRedux';
import i18n from '../../I18n/i18n.config';
import NavigationService from '../../Navigation/NavigationService';
import ToastActions from '../../Redux/Common/Toast/ToastRedux';
import LoadingIndicatorActions from '../../Components/LoadingIndicator/LoadingIndicatorRedux';


export function * registerSaga(api, action) {
    yield put(LoadingIndicatorActions.showLoadingIndicator(true));
    const { user } = action;
    const res = yield call(api.register, user);
    yield call(handleRegisterResponse, res);

}

export function* handleRegisterResponse(res) {
    yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    if (res.data) {
        if (res.data.code === "0") {
            yield call(handleRegisterSuccess, res);
        } else {
            yield call(handleRegisterError, res);
        }
    }
}

export function* handleRegisterSuccess(res) {
    yield put(RegisterActions.registerSuccess());
    NavigationService.navigate('Login');
}

export function* handleRegisterError(res) {
    let errorMsg;
    switch (res.data.code) {
        case -3:
            errorMsg = i18n.t('auth:register.errors.wrongRepeatPass');
            break;
        case -4:
            errorMsg = i18n.t('auth:register.errors.wrongPasswordFormat');
            break;
        case -5:
            errorMsg = i18n.t('auth:register.errors.emailNotVerified');
            break;
        case -6:
            errorMsg = i18n.t('auth:register.errors.verificationCodeExpired');
            break;
        case -7:
            errorMsg = i18n.t('auth:register.errors.wrongVerificationCode');
            break;
        case -8:
            errorMsg = i18n.t('auth:register.errors.registrationError');
            break;
        case -13:
            errorMsg = i18n.t('auth:register.errors.emailRegistered');
            break;
        case -16:
            // Machine has a user
            errorMsg = i18n.t('auth:register.errors.machineHasUser');
            break;
        default:
            // errorMsg = yield call(handleGenericNetworkErrors, res);
    }
    yield put(RegisterActions.registerFailure(errorMsg));
    yield put(ToastActions.showToast(errorMsg));
}
