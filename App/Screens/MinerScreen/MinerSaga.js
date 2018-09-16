import { call, put } from 'redux-saga/effects';
import MinerActions from './MinerRedux';

export function * getMiner(api, action) {
    const { machineId } = action;
    const res = yield call(api.getMiner, machineId);
    if (res) {
        if (res.data.code === "0") {
            const miner = res.data.data;
            yield put(MinerActions.minerSuccess(miner));
        } else {
            let errorMsg;
            switch (res.data.code) {

            }
            yield put(MinerActions.minerFailure(errorMsg));
        }
    }
}