import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators } = createActions({
    bootstrapApp: null,
    checkAuthStatus: null,
    loadUserSettings: null,
    loadUserSettingSuccess: ['language', 'currency'],
    loadUserLanguage: ['language']
});

export const StartupTypes = Types;
export default Creators;


const INITIAL_STATE = {
    language: null,
    currency: null
};

export const StartupSelectors = {
    selectIsAuthenticated: state => !!state.auth.token
};

export const loadUserLanguage = (state, action) => {
    const { language } = action;
    return { ...state, language};
};

export const loadUserSettingSuccess = (state, action) => {
    const { language, currency } = action;
    return { ...state, language, currency};
};

export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOAD_USER_SETTING_SUCCESS]: loadUserSettingSuccess,
    [Types.LOAD_USER_LANGUAGE]: loadUserLanguage
});