import { put, call, take } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import VerifyEmailActions from './VerifyEmailRedux';

const VERIFY_EMAIL_COUNTDOWN = 60;

export function* verifyEmailSaga(api, action) {
    const { email } = action;
    const response = yield call(api.verifyEmail, email);
    console.log('email res', response);
    if (response.data.code == 0) {
        // yield put(VerifyEmailActions.verifySMSSuccess());
    } else {
        // yield put(VerifyEmailActions.verifySMSFailure());
    }
    yield call(countDownSaga);
}



export function* handleVerifySuccess(res) {

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
            if (secs > 0) {
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