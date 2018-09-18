import { createActions, createReducer } from 'reduxsauce';

const { Types, Creators } = createActions({
    changeLanguage: ['language'],
    changeLanguageSuccess: ['language'],
    changeLanguageFailure: ['error'],
});

export const ChangeLanguageTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    language: null,
    error: null
};

export const ChangeLanguageSelectors = {
  selectLanguage: state => state.app.language
};

export const request = (state) => ({...state, loading: true, language: null, error: null });
export const success = (state, action) => ({...state, loading: false, language: action.language, error: null });
export const failure = (state, action) => ({...state, loading: false, language: null, error: action.error });


export const reducer = createReducer(INITIAL_STATE, {
    [Types.CHANGE_LANGUAGE]: request,
    [Types.CHANGE_LANGUAGE_SUCCESS]: success,
    [Types.CHANGE_LANGUAGE_FAILURE]: failure,
});