import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators} = createActions({
    minersExchangeRequest: null,
    minersExchangeSuccess: null,
    minersExchangeFailure: ['error']
});

export const HomeTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    error: null
};

export const HomeSelectors = {
    selectLoading: state => state.home.loading,
    selectMiners: state => state.miners.miners
};

export const request = state => ({...state, loading: true});
export const success = (state, action) => ({
    ...state,
    loading: false,
    error: false
});
export const failure = (state, action) => ({
    ...state,
    loading: false,
    error: action.error
});

export const reducer = createReducer(INITIAL_STATE, {
    [Types.MINERS_EXCHANGE_REQUEST]: request,
    [Types.MINERS_EXCHANGE_SUCCESS]: success,
    [Types.MINERS_EXCHANGE_FAILURE]: failure,
});


