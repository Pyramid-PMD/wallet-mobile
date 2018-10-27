import { takeLatest, all, call } from 'redux-saga/effects'
import API from '../Services/Api';
import config from '../Config/AppConfig';
/* ------------- Types ------------- */
import {StartupTypes} from './StartupRedux';
import {LoginTypes} from '../Screens/LoginScreen/LoginRedux';
import {QrCodeTypes} from '../Screens/QrCodeSuccessScreen/QrCodeRedux';
import {RegisterTypes} from '../Screens/RegisterScreen/RegisterRedux';
import {HomeTypes} from '../Screens/HomeScreen/HomeRedux';
import {MinerTypes} from '../Screens/MinerScreen/MinerRedux';
import {WithdrawTypes} from '../Screens/WithdrawScreen/WithdrawRedux';
import {NotificationTypes} from '../Screens/NotificationScreen/NotificationRedux';
import {NewsTypes} from '../Screens/NewsScreen/NewsRedux';
import {ChangeLanguageTypes} from '../Screens/ChangeLanguageScreen/ChangeLanguageRedux';
import {ChangeCurrencyTypes} from '../Screens/ChangeCurrencyScreen/ChangeCurrencyRedux';
import {OverviewTypes} from './Common/Overview/OverviewRedux';
import {ToastTypes} from './Common/Toast/ToastRedux';
import {VerifyEmailTypes} from '../Screens/RegisterScreen/VerifyEmailRedux';
import {ChangePasswordTypes} from '../Screens/ChangePasswordScreen/ChangePasswordRedux';
import {ChangePinTypes} from '../Screens/ChangePinScreen/ChangePinRedux';
import {BonusChartTypes} from '../Screens/MinerScreen/BonusChart/BonusChartRedux';


/* ------------- Sagas ------------- */
import {startUpSaga} from "./StartupSagas";
import {sendQrCodeSaga, bindMachineSaga} from '../Screens/QrCodeSuccessScreen/QrCodeSaga';
import {loginSaga, logoutSaga} from '../Screens/LoginScreen/LoginSaga';
import {registerSaga} from '../Screens/RegisterScreen/RegisterSaga';
import { getMinersAndExchangeIndex } from '../Screens/HomeScreen/HomeSaga';
import { getMiner, unbindMachineSaga } from '../Screens/MinerScreen/MinerSaga';
import { sendWithdraw, getAddressList } from '../Screens/WithdrawScreen/WithdrawSaga';
import { getNotifications } from '../Screens/NotificationScreen/NotificationSaga';
import { getNews } from '../Screens/NewsScreen/NewsSaga';
import { changeLanguage } from '../Screens/ChangeLanguageScreen/ChangeLanguageSaga';
import { changeCurrency } from '../Screens/ChangeCurrencyScreen/ChangeCurrencySaga';
import {getOverview} from './Common/Overview/OverviewSaga';
import {showToastSaga} from './Common/Toast/ToastSaga';
import {verifyEmailSaga} from '../Screens/RegisterScreen/VerifyEmailSaga';
import {changePasswordSaga} from '../Screens/ChangePasswordScreen/ChangePasswordSaga';
import {changePinSaga} from '../Screens/ChangePinScreen/ChangePinSaga';
import {getBonusChart} from '../Screens/MinerScreen/BonusChart/BonusChartSaga';


/* ------------- API ------------- */

// Two different api endpoints are used
const api = API.create();
// use for news and news details
const wpApi = API.createWpApi();

/* ------------- Connect Types To Sagas ------------- */
export default function * root () {
    yield all([
        takeLatest(StartupTypes.BOOTSTRAP_APP, startUpSaga, api),
        takeLatest(LoginTypes.LOGIN_REQUEST, loginSaga, api),
        takeLatest(LoginTypes.LOGOUT_REQUEST, logoutSaga),
        takeLatest(RegisterTypes.REGISTER_REQUEST, registerSaga, api),
        takeLatest(VerifyEmailTypes.VERIFY_EMAIL_REQUEST, verifyEmailSaga, api),
        takeLatest(ChangePasswordTypes.CHANGE_PASSWORD_REQUEST, changePasswordSaga, api),
        takeLatest(ChangePinTypes.CHANGE_PIN_REQUEST, changePinSaga, api),
        takeLatest(HomeTypes.MINERS_EXCHANGE_REQUEST, getMinersAndExchangeIndex, api),
        takeLatest(MinerTypes.MINER_REQUEST, getMiner, api),
        takeLatest(WithdrawTypes.SEND_WITHDRAW_REQUEST, sendWithdraw, api),
        takeLatest(WithdrawTypes.GET_SAVED_ADDRESS_LIST, getAddressList),
        takeLatest(NotificationTypes.NOTIFICATION_REQUEST, getNotifications, api),
        takeLatest(NewsTypes.NEWS_REQUEST, getNews, wpApi),
        takeLatest(ChangeLanguageTypes.CHANGE_LANGUAGE, changeLanguage),
        takeLatest(ChangeCurrencyTypes.CHANGE_CURRENCY, changeCurrency),
        takeLatest(OverviewTypes.OVERVIEW_REQUEST, getOverview, api),
        takeLatest(ToastTypes.SHOW_TOAST, showToastSaga),
        takeLatest(QrCodeTypes.SEND_QR_CODE_REQUEST, sendQrCodeSaga, api),
        takeLatest(QrCodeTypes.BIND_MACHINE_REQUEST, bindMachineSaga, api),
        takeLatest(MinerTypes.UNBIND_REQUEST, unbindMachineSaga, api),
        takeLatest(BonusChartTypes.BONUS_REQUEST, getBonusChart, api),
    ]);
};