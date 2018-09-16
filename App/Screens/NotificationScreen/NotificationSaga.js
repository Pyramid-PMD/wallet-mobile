import { put, call } from 'redux-saga/effects';
import NotificationActions from './NotificationRedux';

export function* getNotifications(api, action) {
    try {
        const res = yield call(api.getNotifications);
        console.log('notifications res', res);
        yield call(handleNotificationResponse, res);
    } catch (error) {
        console.log('error', error);
        yield call(handleNotificationResponse);
    }
}

export function* handleNotificationResponse(res) {
    if (res && res.data) {
        if (res.data.code === "0") {
            yield call(handleNotificationSuccess, res);
        } else {
            yield call(handleNotificationError, res);
        }
    }
}

export function* handleNotificationSuccess(res) {
    const notifications = res.data.data.list;
    yield put(NotificationActions.notificationSuccess(notifications));
}

export function* handleNotificationError(res = null) {
    let errorMsg = '';
    if (res) {
        // switch (res.data.code) {
        //     default:
        //         errorMsg = yield call(handleGenericNetworkErrors, res);
        // }
    }
    yield put(NotificationActions.notificationFailure(errorMsg));
}