import { takeLatest, all, call } from 'redux-saga/effects'
import API from '../Services/Api';
import config from '../Config/AppConfig';
/* ------------- Types ------------- */
import {StartupTypes} from './StartupRedux';
import {LoginTypes} from '../Screens/LoginScreen/LoginRedux';
import {HomeTypes} from '../Screens/HomeScreen/HomeRedux';
import {MinerTypes} from '../Screens/MinerScreen/MinerRedux';
import {WithdrawTypes} from '../Screens/WithdrawScreen/WithdrawRedux';
import {NotificationTypes} from '../Screens/NotificationScreen/NotificationRedux';

/* ------------- Sagas ------------- */
import {checkAuthStatus} from "./StartupSagas";
import {loginSaga, logoutSaga} from '../Screens/LoginScreen/LoginSaga';
import { getMinersAndExchangeIndex } from '../Screens/HomeScreen/HomeSaga';
import { getMiner } from '../Screens/MinerScreen/MinerSaga';
import { sendWithdraw, getAddressList } from '../Screens/WithdrawScreen/WithdrawSaga';
import { getNotifications } from '../Screens/NotificationScreen/NotificationSaga';


/* ------------- API ------------- */

// Two different api endpoints are used
const api = API.create();

/* ------------- Connect Types To Sagas ------------- */
export default function * root () {
    yield all([
        takeLatest(StartupTypes.CHECK_AUTH_STATUS, checkAuthStatus, api),
        takeLatest(LoginTypes.LOGIN_REQUEST, loginSaga, api),
        takeLatest(LoginTypes.LOGOUT_REQUEST, logoutSaga),
        takeLatest(HomeTypes.MINERS_EXCHANGE_REQUEST, getMinersAndExchangeIndex, api),
        takeLatest(MinerTypes.MINER_REQUEST, getMiner, api),
        takeLatest(WithdrawTypes.SEND_WITHDRAW_REQUEST, sendWithdraw, api),
        takeLatest(WithdrawTypes.GET_SAVED_ADDRESS_LIST, getAddressList),
        takeLatest(NotificationTypes.NOTIFICATION_REQUEST, getNotifications, api),

    ]);
};


