import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators } = createActions({
    overviewRequest: null,
    overviewSuccess: ['overview'],
    overviewFailure: ['error']
});

export const ProfileTypes = Types;
export default Creators;

const INITIAL_STATE = {
    loading: null,
    overview: null,
    error: null
};

/* ------------- Selectors ------------- */

export const ProfileSelectors = {
    selectBalance: (state) => {
        if (state.profile.overview) {
            const balance = state.profile.overview.pmd_all;

            // TODO: Get selected currency
            const balanceInSelectedCurrency = state.profile.overview.pmd_all * 0.5;
            return {
                balance,
                balanceInSelectedCurrency,
                otherIncoming: state.profile.overview.other_incoming,
                minerIncoming: state.profile.overview.mining_profit
            }
        }
    },
    selectMiningProfit: state => state.profile.overview ? state.profile.overview.mining_profit: null,
    selectOtherIncoming: state => state.profile.overview ? state.profile.overview.other_incoming: null,
    selectPmdAll: state => state.profile.overview ? state.profile.overview.pmd_all: null
};

export const request = (state) => {
    return { ...state, loading: true };
};

export const success = (state, action) => {
    const { overview } = action;
    return { ...state, loading: false, overview, error: null };
};

export const failure = (state, action) => {
    const { error } = action;
    return { ...state, loading: false, overview: null, error };
};

export const reducer = createReducer(INITIAL_STATE, {
    [Types.OVERVIEW_REQUEST]: request,
    [Types.OVERVIEW_SUCCESS]: success,
    [Types.OVERVIEW_FAILURE]: failure,
});