import {call, put} from 'redux-saga/effects';
import NewsActions from './NewsRedux';
import LoadingIndicatorActions from '../../Components/LoadingIndicator/LoadingIndicatorRedux';

export function* getNews(api, action) {
    console.log('get news');
    yield put(LoadingIndicatorActions.showLoadingIndicator(true));
    const res = yield call(api.getNews);
    console.log('res', res);
    yield call(handleNewsResponse, res);
}

export function* handleNewsResponse(res) {
    yield put(LoadingIndicatorActions.showLoadingIndicator(false));
    if (res.status === 200) {
        yield call(handleNewsSuccess, res);
    } else {
        yield call(handleNewsError, res);
    }
}

export function* handleNewsSuccess(res) {
    yield put(NewsActions.newsSuccess(res.data))
}

export function* handleNewsError(res) {

}