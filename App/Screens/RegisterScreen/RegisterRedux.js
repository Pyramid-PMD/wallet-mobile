import { createActions, createReducer } from 'reduxsauce';


/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
    registerRequest: ['user'],
    registerSuccess: null,
    registerFailure: ['error']
});

export const RegisterTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
    loading: null,
    error: null
};

/* ------------- Selectors ------------- */

export const RegisterSelectors = {
    selectError: state => state.register.error
};

/* ------------- Reducers ------------- */

export const request = (state) => {
    return { ...state, loading: true, error: null };
};

export const success = (state) => {
    return { ...state, loading: false, error: null };
};

export const failure = (state, action) => {
    return { ...state, loading: false, error: action.error };
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.REGISTER_REQUEST]: request,
    [Types.REGISTER_SUCCESS]: success,
    [Types.REGISTER_FAILURE]: failure
});