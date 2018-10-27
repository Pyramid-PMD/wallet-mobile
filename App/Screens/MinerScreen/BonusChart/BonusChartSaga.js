import { call, put } from 'redux-saga/effects';
import BonusChartActions from './BonusChartRedux';
import i18n from '../../../I18n/i18n.config';
import {handleConnectivityError} from "../../../Redux/Common/NetworkErrors/NetworkErrorsSaga";
import ToastActions from '../../../Redux/Common/Toast/ToastRedux';

export function * getBonusChart(api, action) {
    const { walletAddress, interval } = action;
    console.log('bonus chart', walletAddress, interval);
    const res = yield call(api.getBonusChart, walletAddress, interval);
    console.log('bonus chart', res);
    yield call(handleBonusChartResponse, res);
}

export function* handleBonusChartResponse(res, machine) {
    if (res.data) {
        if (res.data.code === "0") {
            yield call(handleGetBonusChartSuccess, res, machine);
        } else {
            yield call(handleGetBonusChartErrors, res);
        }
    } else {
        yield call(handleConnectivityError, res);
    }
}

export function* handleGetBonusChartSuccess(res, machine) {
    let chart = res.data.data.chart;
    yield put(BonusChartActions.bonusSuccess(chart));
}

export function* handleGetBonusChartErrors(res) {
    let errorMsg = '';
    switch (res.data.code) {

    }
    yield put(BonusChartActions.bonusFailure(errorMsg));
}
