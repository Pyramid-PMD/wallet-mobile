import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    form: formReducer,
    auth: require('../Screens/LoginScreen/LoginRedux').reducer,
    miners: require('../Screens/HomeScreen/Miners/MinersRedux').reducer,
    home: require('../Screens/HomeScreen/HomeRedux').reducer,
    miner: require('../Screens/MinerScreen/MinerRedux').reducer,
    withdraw: require('../Screens/WithdrawScreen/WithdrawRedux').reducer,
});

export default rootReducer;