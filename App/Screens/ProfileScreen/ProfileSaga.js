import { put, call } from 'redux-saga/effects';
import OverviewActions from './ProfileRedux';

export function * getOverview(api) {
    const res = yield call(api.getOverview);
    yield call(handleOverviewResponse, res);
}

export function* handleOverviewResponse(res) {
    if (res && res.data) {
        if (res.data.code === "0") {
            const overview = res.data.data;
            yield put(OverviewActions.overviewSuccess(overview));
        }
    } else {

    }
    // console.log('res', res);
    // let errorMsg;
    // if (res) {
    //
    //
    // }
    // yield put(LoadingIndicatorActions.showLoadingIndicator(false));
}