import { call, put} from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import * as _ from 'lodash';
import WithdrawActions from './WithdrawRedux';
import OverviewActions from '../../Redux/Common/Overview/OverviewRedux';

export function* getAddressList() {
    const addressList = yield AsyncStorage.getItem('addressList');
    yield put (WithdrawActions.getSavedAddressListSuccess(JSON.parse(addressList)));
    return addressList ? JSON.parse(addressList) : [];
}

export function* sendWithdraw(api, action) {
    const { withdrawal } = action;
    yield call(saveAddress, withdrawal.to_addr);
    try {
        const res = yield call(api.postWithdrawal, withdrawal);
        console.log('res', res);
        yield call(handleWithdrawResponse, res);
    } catch (error) {
        // TODO: handle generic errors
    }

}

export function* saveAddress(address) {
    let saved = yield getAddressList();
    saved = _.uniq(saved.push(address));
    yield AsyncStorage.setItem('addressList', JSON.stringify(saved));
}


export function* handleWithdrawResponse(res) {
    if (res.data.code === "0") {
        yield call(handleWithdrawSuccess);
    } else {
        yield call(handleWithdrawError, res);
    }
}

export function* handleWithdrawSuccess() {
    yield put(WithdrawActions.sendWithdrawSuccess(null));
    yield put(OverviewActions.overviewRequest());
}

export function* handleWithdrawError(res) {
    let errorMsg;
    switch (res.data.code) {
        // Wrong transaction amount
        case -21:
            errorMsg = 'Wrong transaction amount';
            break;
        // Wrong transaction address
        case -22:
            errorMsg = 'Wrong transaction amount';
            break;
        // Wrong trade password
        case -23:
            errorMsg = 'Wrong transaction amount';
            break;
        // Balance not enough
        case -24:
            errorMsg = 'Wrong transaction amount';
            break;
        default:
            errorMsg = 'Wrong transaction amount';
    }
    yield put(WithdrawActions.sendWithdrawFailure(errorMsg));
}