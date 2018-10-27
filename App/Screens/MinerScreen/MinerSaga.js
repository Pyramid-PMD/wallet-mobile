import { call, put } from 'redux-saga/effects';
import MinerActions from './MinerRedux';
import i18n from '../../I18n/i18n.config';
import LoadingIndicatorActions from '../../Components/LoadingIndicator/LoadingIndicatorRedux';
import {handleConnectivityError} from "../../Redux/Common/NetworkErrors/NetworkErrorsSaga";
import ToastActions from '../../Redux/Common/Toast/ToastRedux';
import NavigationService from '../../Navigation/NavigationService';
import OverviewActions from '../../Redux/Common/Overview/OverviewRedux';

export function * getMiner(api, action) {
    const { machine } = action;
    yield put(LoadingIndicatorActions.showLoadingIndicator(true));
    const res = yield call(api.getMiner, machine.wallet_addr);
    yield call(handleGetMinerResponse, res, machine);
}


export function* handleGetMinerResponse(res, machine) {
    yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    if (res.data) {
        if (res.data.code === "0") {
            yield call(handleGetMinerSuccess, res, machine);
        } else {
            yield call(handleGetMinerErrors, res);
        }
    } else {
        yield call(handleConnectivityError, res);
    }
}

export function* handleGetMinerSuccess(res, machine) {
    let miner = res.data.data;
    miner = {...miner, ...machine};
    yield put(MinerActions.minerSuccess(miner));
}

export function* handleGetMinerErrors(res) {
    let errorMsg = '';
    switch (res.data.code) {

    }
    yield put(MinerActions.minerFailure(errorMsg));
}

export function* unbindMachineSaga(api, action) {
    try {
        const {walletAddress} = action;
        const res = yield call(api.unBindMachine, walletAddress);
        console.log('res', res);
        yield call(handleUnbindMachineResponse, res);
    } catch(error) {
        console.log('error', error);
    }
}

export function* handleUnbindMachineResponse(res) {
    if (res.data) {
        if (res.data.code === "0") {
            yield call(handleUnbindMachineSuccess, res);
        } else {
            yield call(handleUnbindMachineErrors, res);
        }
    } else {
        yield call(handleConnectivityError, res);
    }
}

export function* handleUnbindMachineSuccess(res) {
    // yield put(ToastActions.showToast(i18n.t('dashboard:qrCodeLoginScreen.unbindMachineSuccess'), 'success'));
    yield put(MinerActions.unbindSuccess());
    yield put(OverviewActions.overviewRequest());
    yield call(NavigationService.navigate, 'Home');
}

export function* handleUnbindMachineErrors(res) {
    let errorMsg;
    switch (res.data.code) {
        case -10202:
            errorMsg = i18n.t('dashboard:minerDetailScreen.errors.machineHasBalance');
            break;
        case -15:
            errorMsg = i18n.t('dashboard:minerDetailScreen.errors.machineNotFound');
            break;
    }
    yield put(MinerActions.unbindFailure(errorMsg));
    yield put(ToastActions.showToast(errorMsg));
}