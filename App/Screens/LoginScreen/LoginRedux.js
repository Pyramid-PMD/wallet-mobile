import { createReducer, createActions } from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    loginRequest: ['credentials'],
    loginSuccess: ['user'],
    loginFailure: ['error'],
    logoutRequest: null,
    logoutSuccess: null
});

export const LoginTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    user: null,
    loading: null,
    error: null,
    token: null
};

/* ------------- Selectors ------------- */

export const LoginSelectors = {
    selectError: state => state.auth.error,
    selectLoading: state => state.auth.loading,
    selectUser: state => state.auth.user
};

/* ------------- Reducers ------------- */

// request the avatar for a user
export const request = (state, action) => {
  return ({ ...state, loading: true, user: null, error: null, token: null })
};


// successful avatar lookup
export const success = (state, action) => {
    const { user } = action;
    console.log('login success', user);
    return ({ ...state, loading: false, error: null, user, token: user.token })
};

// failed to get the avatar
export const failure = (state, action) =>
    ({ ...state, loading: false, error: action.error , user: null, token: null });


export const logoutRequest = (state) => {
    return ({ ...state, loading: true })
};

export const logoutSuccess = (state) => {
    return ({ ...state, loading: false, user: null, token: null, error: null });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.LOGIN_REQUEST]: request,
    [Types.LOGIN_SUCCESS]: success,
    [Types.LOGIN_FAILURE]: failure,
    [Types.LOGOUT_REQUEST]: logoutRequest,
    [Types.LOGOUT_SUCCESS]: logoutSuccess,
});
