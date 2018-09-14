import { takeLatest, all, call } from 'redux-saga/effects'
import API from '../Services/Api';

/* ------------- Types ------------- */
import {StartupTypes} from "./StartupRedux";
import {LoginTypes} from '../Screens/LoginScreen/LoginRedux';
import {HomeTypes} from '../Screens/HomeScreen/HomeRedux';

/* ------------- Sagas ------------- */
import {checkAuthStatus} from "./StartupSagas";
import {loginSaga, logoutSaga} from '../Screens/LoginScreen/LoginSaga';
import { getMinersAndExchangeIndex } from '../Screens/HomeScreen/HomeSaga';


/* ------------- API ------------- */

const api = API.create();


/* ------------- Connect Types To Sagas ------------- */
export default function * root () {
    yield all([
        takeLatest(StartupTypes.CHECK_AUTH_STATUS, checkAuthStatus, api),
        takeLatest(LoginTypes.LOGIN_REQUEST, loginSaga, api),
        takeLatest(LoginTypes.LOGOUT_REQUEST, logoutSaga),
        takeLatest(HomeTypes.MINERS_EXCHANGE_REQUEST, getMinersAndExchangeIndex, api),
    ]);
};


