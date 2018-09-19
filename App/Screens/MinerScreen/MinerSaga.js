import { call, put } from 'redux-saga/effects';
import MinerActions from './MinerRedux';

export function * getMiner(api, action) {
    const { machine } = action;
    const res = yield call(api.getMiner, machine.wallet_addr);
    if (res) {
        if (res.data.code === "0") {
            let miner = res.data.data;
            miner = {...miner, ...machine}
            yield put(MinerActions.minerSuccess(miner));
        } else {
            let errorMsg;
            switch (res.data.code) {

            }
            yield put(MinerActions.minerFailure(errorMsg));
        }
    }
}