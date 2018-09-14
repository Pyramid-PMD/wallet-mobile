import { createStore, applyMiddleware, compose} from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import createSagaMiddleware from 'redux-saga';
import Config from '../Config/DebugConfig';
import ReduxPersist from '../Config/ReduxPersist';


export default (rootReducer, rootSaga) => {


    /* ------------- Redux Configuration ------------- */
    const middleware = [];
    const enhancers = [];


    /* ------------- Saga Middleware ------------- */
    const sagaMiddleware = createSagaMiddleware({});
    middleware.push(sagaMiddleware);

    const createAppropriateStore = Config.useReactotron ? console.tron.createStore : createStore;

    /* ------------- Assemble Middleware ------------- */
    enhancers.push(applyMiddleware(...middleware));

    /*-------------- Redux Persist ---------------*/
    const persistedReducer = persistReducer(ReduxPersist.storeConfig, rootReducer);

    const store = createAppropriateStore(persistedReducer, compose(...enhancers));
    // kick off root saga
    let sagasManager = sagaMiddleware.run(rootSaga);
    let persistor = persistStore(store);

    return {
        store,
        sagasManager,
        sagaMiddleware,
        persistor
    };
}