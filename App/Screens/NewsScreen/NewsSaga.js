import {call, put} from 'redux-saga/effects';
import NewsActions from './NewsRedux';

export function* getNews(api, action) {
    const res = yield call(api.getNews);
    console.log('res', res);
}

export function* handleNewsResponse(res) {
    if (res.status === 200) {
        yield call(handleNewsSuccess, res);
    } else {
        yield put(NewsActions.newsSuccess(res.data))
    }
}

export function* handleNewsSuccess(res) {
    yield put(NewsActions.newsSuccess(res.data))
}

export function* handleNewsError(res) {

}