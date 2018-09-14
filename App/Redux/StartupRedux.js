import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators } = createActions({
    checkAuthStatus: null,
    isAuthenticated: ['isAuthenticated']
});

export const StartupTypes = Types;
export default Creators;


const INITIAL_STATE = {
    isAuthenticated: null
};

export const StartupSelectors = {
    selectIsAuthenticated: state => !!state.auth.token
};

export const isAuthenticated = (state, action) => {
   const { isAuthenticated } = action;
   return { ...state, isAuthenticated};
};

export const reducer = createReducer(INITIAL_STATE, {
    [Types.IS_AUTHENTICATED]: isAuthenticated
});