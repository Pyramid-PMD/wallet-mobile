import { put, call, take } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import VerifyEmailActions from './VerifyEmailRedux';
import ToastActions from '../../Redux/Common/Toast/ToastRedux';
import {handleConnectivityError, handleGenericNetworkErrors} from '../../Redux/Common/NetworkErrors/NetworkErrorsSaga';
import i18n from '../../I18n/i18n.config';

const VERIFY_EMAIL_COUNTDOWN = 60;

export function* verifyEmailSaga(api, action) {
    try {
        const { email } = action;
        const res = yield call(api.verifyEmail, email);
        yield call(handleEmailVerifyResponse, res, email);
        yield call(countDownSaga);
    } catch (error) {
    }

}

export function* handleEmailVerifyResponse(res, email) {
    console.log('email res', res);
    if (res.data) {
        if (res.data.code === "0") {
            yield call(handleVerifySuccess, email);
        } else {
            yield call(handleVerifyError, res);
        }
    } else {
        yield call(handleConnectivityError, res);
    }
}

export function* handleVerifySuccess(email) {
    const message = i18n.t('auth:register.emailVerifiedSuccess', {email});
    yield put(VerifyEmailActions.verifyEmailSuccess());
    yield put(ToastActions.showToast(message, 'success'));
}

export function* handleVerifyError(res) {
    yield put(VerifyEmailActions.verifyEmailFailure());
    let errorMsg;
    switch (res.data.code) {
        case "-1":
            errorMsg = i18n.t('auth:register.errors.invalidEmail');
            break;
        default:
            errorMsg = yield call(handleGenericNetworkErrors, res);
    }
    yield put(ToastActions.showToast(errorMsg));
}

export function* countDownSaga() {
    const chan = yield call(countdown, VERIFY_EMAIL_COUNTDOWN);
    try {
        while (true) {
            let seconds = yield take(chan);
            yield put(VerifyEmailActions.getCounter(seconds));
        }
    } finally {
        console.log('countdown terminated')
    }
}

export function countdown(secs) {
    return eventChannel(emitter => {
        const iv = setInterval(() => {
            secs -= 1
            if (secs >= 0) {
                emitter(secs)
            } else {
                emitter(END)
            }
        }, 1000);
        return () => {
            clearInterval(iv)
        }
    })
}