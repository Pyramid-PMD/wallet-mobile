import { createActions, createReducer} from 'reduxsauce';
import i18n from '../../../I18n/i18n.config';

const { Types, Creators } = createActions({
    overviewRequest: null,
    overviewSuccess: ['overview'],
    overviewFailure: ['error']
});

export const OverviewTypes = Types;
export default Creators;

const INITIAL_STATE = {
    loading: null,
    overview: null,
    error: null
};

/* ------------- Selectors ------------- */

export const OverviewSelectors = {
    selectBalance: state => {
        if (state.overview.overview) {
            const balance = state.overview.overview.pmd_all, selectedCurrency = state.app.currency;
            const balanceInSelectedCurrency = state.overview.overview.pmd_all * state.app.currency.rate;
            return {
                balance,
                balanceInSelectedCurrency,
                otherIncoming: state.overview.overview.other_incoming,
                minerIncoming: state.overview.overview.mining_profit
            }
        }
    },
    selectExchangeIndex: state => {
        if (state.overview.overview) {
            return state.overview.overview.exchangeIndex;
        }
    },
    selectMiners: state => {
        if (state.overview.overview) {
            const miners = [...state.overview.overview.machine_list];
            return miners.map(item => {
                item.statusName = item.status === 1 ? i18n.t('common:interface.online') : i18n.t('common:interface.offline');
                return item;
            });
        }
    },
    selectUserCurrency: state => state.app.currency
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