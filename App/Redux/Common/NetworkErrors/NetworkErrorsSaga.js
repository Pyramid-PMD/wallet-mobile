import {put} from 'redux-saga/effects';
import LoginActions from '../../../Screens/LoginScreen/LoginRedux';
import i18n from '../../../I18n/i18n.config';
import ToastActions from '../Toast/ToastRedux';

export function * handleGenericNetworkErrors (res) {
    // Dispatch generic errors if code not equal "0"
    // -500: Wrong parameter
    // -501: Wrong version
    // -502: Wrong token, logout user
    // -503: Wrong header
    const { code } = res.data;
    let errorMsg;
    switch(code) {
        case -502:
            yield put(LoginActions.logoutRequest());
            errorMsg = i18n.t('common:networkErrors.tokenExpired');
            break;
        case -501:
            errorMsg = i18n.t('common:networkErrors.installNewUpdate');
            break;
        default:
            errorMsg = i18n.t('common:networkErrors.somethingWentWrong');
    }
    return errorMsg;

}

export function* handleConnectivityError(res) {
    let errorMsg;
    switch (res.problem) {
        case 'TIMEOUT_ERROR':
            errorMsg = i18n.t('common:interface.errors.networkTimeout');
            break;
        case 'NETWORK_ERROR':
            errorMsg = i18n.t('common:interface.errors.noNetwork');
            break;
        default:
            errorMsg = i18n.t('common:interface.errors.genericError');
    }
    yield put(ToastActions.showToast(errorMsg));
}