import { call, select, put } from 'redux-saga/effects';
import { getMiners } from './Miners/MinersSaga';
import HomeActions from './HomeRedux';

const selectMiners = state => state.miners.miners;

export function* getMinersAndExchangeIndex(api, action) {
    yield call(getMiners, api, action);
    const miners = yield select(selectMiners);
    // TODO: call exchange api
    yield call(handleMinersAndExchangeResponse, miners);
}

export function* handleMinersAndExchangeResponse(miners) {
    if (miners) {
        const data = {
            miners,
        };
        yield put(HomeActions.minersExchangeSuccess(data));
    }
}