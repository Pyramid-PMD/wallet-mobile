import { put, call } from 'redux-saga/effects';

export function* verifyEmailSaga(api, action) {
    const { email } = action;
    const response = yield call(api.verifyEmail, email);
    console.log('email res', response);
    if (response.data.code == 0) {
        // yield put(VerifyEmailActions.verifySMSSuccess());
    } else {
        // yield put(VerifyEmailActions.verifySMSFailure());
    }
}

export function* handleVerifySuccess(res) {

}