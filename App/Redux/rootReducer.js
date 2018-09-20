import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    form: formReducer,
    app: require('./StartupRedux').reducer,
    auth: require('../Screens/LoginScreen/LoginRedux').reducer,
    verifyEmail: require('../Screens/RegisterScreen/VerifyEmailRedux').reducer,
    miners: require('../Screens/HomeScreen/Miners/MinersRedux').reducer,
    home: require('../Screens/HomeScreen/HomeRedux').reducer,
    miner: require('../Screens/MinerScreen/MinerRedux').reducer,
    withdraw: require('../Screens/WithdrawScreen/WithdrawRedux').reducer,
    notification: require('../Screens/NotificationScreen/NotificationRedux').reducer,
    news: require('../Screens/NewsScreen/NewsRedux').reducer,
    overview: require('./Common/Overview/OverviewRedux').reducer,
    loadingIndicator: require('../Components/LoadingIndicator/LoadingIndicatorRedux').reducer,

});

export default rootReducer;