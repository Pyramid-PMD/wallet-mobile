import rootReducer from './rootReducer';
import configureStore from './CreateStore';

export default () => {
    return configureStore(rootReducer);
}