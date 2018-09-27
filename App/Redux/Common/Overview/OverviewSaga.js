import { put, call } from 'redux-saga/effects';
import OverviewActions from './OverviewRedux';

export function * getOverview(api) {
    const res = yield call(api.getOverview);
    console.log('overview', res);
    yield call(handleOverviewResponse, res);
}

export function* handleOverviewResponse(res) {
    if (res && res.data) {
        if (res.data.code === "0") {
            const overview = res.data.data;
            console.log('overview', overview);
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