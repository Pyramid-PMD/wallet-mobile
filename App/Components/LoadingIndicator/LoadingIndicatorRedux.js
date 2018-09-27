import { createActions, createReducer} from 'reduxsauce';
const { Types, Creators } = createActions({
    showLoadingIndicator: ['show']
});

export const LoadingIndicatorTypes = Types;
export default Creators;

export const LoadingIndicatorSelectors = {
    selectLoading: state => state.loadingIndicator.show
};

const INITIAL_STATE = {
    show: false
};

const showLoading = (state, action) => ({ ...state, show: action.show });

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SHOW_LOADING_INDICATOR]: showLoading
});