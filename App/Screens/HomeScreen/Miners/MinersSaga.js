import { call, put } from 'redux-saga/effects';
import MinersActions from './MinersRedux';

export function* getMiners(api, action) {
    try {
        const res = yield call(api.getMiners);
        yield call(handleMinerListResponse, res);

    } catch (error) {
        console.log(error);
    }
}

export function* handleMinerListResponse(res) {
    if (res) {
        if (res.data.code === "0") {
            yield call(handleMinerListSuccess, res);
        } else {
            yield call(handleMinerListError, res);
        }
    }
}

export function* handleMinerListSuccess(res) {
    console.log(res.data.data.list);
    yield put(MinersActions.minersSuccess(res.data.data.list));
}

export function handleMinerListError(res) {
    let errorMsg;
    switch (res.data.code) {

    }

}
