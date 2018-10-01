import { createActions, createReducer} from 'reduxsauce';
import i18n from '../../../I18n/i18n.config';
import {formatDecimal} from "../../../Services/Utils";

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
            const
                overview = {...state.overview.overview},
                balance = overview.pmd_all,
                selectedCurrency = state.app.currency,
                balanceInSelectedCurrency = selectedCurrency ? overview.pmd_all * selectedCurrency.rate: null,
                otherIncoming = overview.other_incoming,
                minerIncoming = overview.mining_profit;

            return {
                balance: formatDecimal(balance),
                balanceInSelectedCurrency: formatDecimal(balanceInSelectedCurrency),
                otherIncoming: formatDecimal(otherIncoming),
                minerIncoming: formatDecimal(minerIncoming)
            }
        }
    },
    selectExchangeIndex: state => {
        if (state.overview.overview) {
            const exchangeIndex = [...state.overview.overview.exchangeIndex];
            const comingSoonItem = {
                name: i18n.t('common:interface.comingSoon'),
                price: "0"
            };
            exchangeIndex.push(comingSoonItem);
            return exchangeIndex;
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
    return { ...state, loading: true};
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