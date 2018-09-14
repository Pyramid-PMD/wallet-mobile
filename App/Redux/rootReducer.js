import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
    form: formReducer,
    auth: require('../Screens/LoginScreen/LoginRedux').reducer,
});

export default rootReducer;