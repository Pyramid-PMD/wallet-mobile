import { createActions, createReducer } from 'reduxsauce';

const { Types, Creators } = createActions({
    changeCurrency: ['currency'],
    changeCurrencySuccess: ['currency'],
    changeCurrencyFailure: ['error'],
});

export const ChangeCurrencyTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    currency: null,
    error: null
};

export const ChangeCurrencySelectors = {
    selectCurrencies: state => state.app.currencies,
    selectUserCurrency: state => state.app.currency
};

export const request = (state) => ({...state, loading: true, currency: null, error: null });
export const success = (state, action) => ({...state, loading: false, currency: action.currency, error: null });
export const failure = (state, action) => ({...state, loading: false, currency: null, error: action.error });


export const reducer = createReducer(INITIAL_STATE, {
    [Types.CHANGE_CURRENCY]: request,
    [Types.CHANGE_CURRENCY_SUCCESS]: success,
    [Types.CHANGE_CURRENCY_FAILURE]: failure,
});