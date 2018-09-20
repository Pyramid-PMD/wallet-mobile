import { createActions, createReducer } from 'reduxsauce';


/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
    changePasswordRequest: ['password'],
    changePasswordSuccess: null,
    changePasswordFailure: ['error']
});

export const ChangePasswordTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
    loading: null,
    error: null
};

/* ------------- Selectors ------------- */

export const ChangePasswordSelectors = {
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
    [Types.CHANGE_PASSWORD_REQUEST]: request,
    [Types.CHANGE_PASSWORD_SUCCESS]: success,
    [Types.CHANGE_PASSWORD_FAILURE]: failure
});