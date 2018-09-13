import { takeLatest, all, call } from 'redux-saga/effects'
import API from '../Services/Api';

/* ------------- Types ------------- */
import {LoginTypes} from '../Screens/LoginScreen/LoginRedux';

/* ------------- Sagas ------------- */
import {loginSaga, logoutSaga} from '../Screens/LoginScreen/LoginSaga';


/* ------------- API ------------- */

const api = API.create();


/* ------------- Connect Types To Sagas ------------- */
export default function * root () {
    yield all([
        takeLatest(LoginTypes.LOGIN_REQUEST, loginSaga, api),
        takeLatest(LoginTypes.LOGOUT_REQUEST, logoutSaga),
    ]);
};


