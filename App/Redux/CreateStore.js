import { createStore, applyMiddleware, compose} from 'redux';


export default (rootReducer, rootSaga) => {


    /* ------------- Redux Configuration ------------- */
    const middleware = [];
    const enhancers = [];



    const store = createStore(rootReducer, compose(...enhancers));

    return {
        store
    };
}