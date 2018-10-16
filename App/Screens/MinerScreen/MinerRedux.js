import { createActions, createReducer} from 'reduxsauce';
import i18n from '../../I18n/i18n.config';

const { Types, Creators} = createActions({
    minerRequest: ['machine'],
    minerSuccess: ['miner'],
    minerFailure: ['error'],
    unbindRequest: ['walletAddress'],
    unbindSuccess: null,
    unbindFailure: ['error']
});

export const MinerTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    miner: null,
    error: null,
    unbinding: null
};

export const MinerSelectors = {
    selectLoading: state => state.miner.loading,
    selectMiner: (state) => {
        if (state.miner.miner) {
            const newMiner = {...state.miner.miner};
            newMiner.statusName = newMiner.status === 1 ? i18n.t('common:interface.online') : i18n.t('common:interface.offline');
            return newMiner;
        }
    },
    selectUnbinding: state => state.miner.unbinding
};

export const request = state => ({...state, loading: true});
export const success = (state, action) => ({...state, loading: false, miner: action.miner, error: false});
export const failure = (state, action) => ({...state, loading: false, error: action.error });


export const unbindRequest = state => ({...state, unbinding: true});
export const unbindSuccess = (state, action) => ({...state, unbinding: false});
export const unbindFailure = (state, action) => ({...state, unbinding: false});

export const reducer = createReducer(INITIAL_STATE, {
    [Types.MINER_REQUEST]: request,
    [Types.MINER_SUCCESS]: success,
    [Types.MINER_FAILURE]: failure,
    [Types.UNBIND_REQUEST]: unbindRequest,
    [Types.UNBIND_SUCCESS]: unbindSuccess,
    [Types.UNBIND_FAILURE]: unbindFailure,
});