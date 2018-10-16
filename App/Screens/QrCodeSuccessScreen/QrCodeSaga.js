import { put, call } from 'redux-saga/effects';
import {handleConnectivityError} from "../../Redux/Common/NetworkErrors/NetworkErrorsSaga";
import QrCodeLoginActions from './QrCodeRedux';
import LoadingIndicatorActions from '../../Components/LoadingIndicator/LoadingIndicatorRedux';
import ToastActions from '../../Redux/Common/Toast/ToastRedux';

export function* sendQrCodeSaga(api, action) {
    try {
        const {qrCode} = action;
        const res = yield call(api.qrCodeLogin, qrCode);
        console.log('res', res);
        yield call(handleQrCodeResponse, res);
    } catch (error) {

    }
}

export function* handleQrCodeResponse(res) {
    if (res.data) {
        if (res.data.code === '0') {
            yield call(handleQrCodeSuccess, res);
        } else {
            yield call(handleQrCodeError, res);
        }
    } else {
        yield call(handleConnectivityError, res);
    }
}

export function* handleQrCodeSuccess(res) {
    const { is_bind, wallet_addr} = res.data.data;
    yield put(QrCodeLoginActions.sendQrCodeSuccess(is_bind, wallet_addr));
}

export function* handleQrCodeError(res) {
    //-18 can not find the machine disk_id
    switch (res.data.code) {
        //-16 machines have users
        // Show contact support screen
        case -16:
            yield put(QrCodeLoginActions.machineHasUsers());
            break;
    }
}

export function* bindMachineSaga(api, action) {
    try {
        yield put(LoadingIndicatorActions.showLoadingIndicator(true));
        const {walletAddress} = action;
        const res = yield call(api.bindMachine, walletAddress);
        yield call(handleBindMachineResponse, res);
    } catch (error) {
        console.log('error', error);
        yield put(LoadingIndicatorActions.showLoadingIndicator(false));

    }
}

export function* handleBindMachineResponse(res) {
    yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    if (res.data) {
        if (res.data.code === '0') {
            yield call(handleBindMachineSuccess());
        } else {
            yield call(handleBindMachineError, res);
        }
    } else {
        yield call(handleConnectivityError, res);
    }
}

export function* handleBindMachineSuccess() {
    yield put(QrCodeLoginActions.bindMachineSuccess());
}

export function* handleBindMachineError(res) {
    yield put(QrCodeLoginActions.bindMachineFailure('error'));
}
