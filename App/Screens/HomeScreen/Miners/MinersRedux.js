import { createActions, createReducer} from 'reduxsauce';
import i18n from '../../../I18n/i18n.config';

const { Types, Creators} = createActions({
    minersRequest: null,
    minersSuccess: ['miners'],
    minersFailure: ['error']
});

export const MinersTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    miners: null,
    error: null
};

export const MinerListSelectors = {
    selectMiners: (state) => {
        if (state.miners.miners) {
            const list = [...state.miners.miners];
            return list.map(item => {
                item.statusName = item.status === 1 ? i18n.t('common:interface.online') : i18n.t('common:interface.offline');
                return item;
            });
        }
    }
};

export const request = state => ({...state, loading: true});
export const success = (state, action) => ({...state, loading: false, miners: action.miners, error: false});
export const failure = (state, action) => ({...state, loading: false, error: action.error });

export const reducer = createReducer(INITIAL_STATE, {
    [Types.MINERS_REQUEST]: request,
    [Types.MINERS_SUCCESS]: success,
    [Types.MINERS_FAILURE]: failure,
});


