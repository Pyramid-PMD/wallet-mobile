import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators } = createActions({
    bootstrapApp: null,
    checkAuthStatus: null,
    loadUserSettings: null,
    loadUserSettingSuccess: ['language', 'currency'],
    loadUserLanguage: ['language'],
    loadUserCurrency: ['currency'],
    exchangeRateSuccess: ['currencies'],
    exchangeRateFailure: ['error'],
});

export const StartupTypes = Types;
export default Creators;


const INITIAL_STATE = {
    language: null,
    currency: null,
    currencies: null
};

export const StartupSelectors = {
    selectIsAuthenticated: state => !!state.auth.token
};

export const loadUserLanguage = (state, action) => {
    const { language } = action;
    return { ...state, language};
};

export const loadUserCurrency = (state, action) => {
    const { currency } = action;
    return { ...state, currency};
};

export const loadUserSettingSuccess = (state, action) => {
    const { language, currency } = action;
    return { ...state, language, currency};
};

export const exchangeRateSuccess = (state, action) => {
    const { currencies } = action;
    return { ...state, currencies};
};

export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOAD_USER_SETTING_SUCCESS]: loadUserSettingSuccess,
    [Types.LOAD_USER_LANGUAGE]: loadUserLanguage,
    [Types.LOAD_USER_CURRENCY]: loadUserCurrency,
    [Types.EXCHANGE_RATE_SUCCESS]: exchangeRateSuccess
});