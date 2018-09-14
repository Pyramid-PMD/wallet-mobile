import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    form: formReducer,
    auth: require('../Screens/LoginScreen/LoginRedux').reducer,
    miners: require('../Screens/HomeScreen/Miners/MinersRedux').reducer,
    home: require('../Screens/HomeScreen/HomeRedux').reducer,
});

export default rootReducer;