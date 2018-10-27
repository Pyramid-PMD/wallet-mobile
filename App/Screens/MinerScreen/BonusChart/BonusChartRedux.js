import { createActions, createReducer} from 'reduxsauce';

const { Types, Creators} = createActions({
    bonusRequest: ['walletAddress', 'interval'],
    bonusSuccess: ['chart'],
    bonusFailure: ['error']
});

export const BonusChartTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    chart: null,
    error: null,
};

export const BonusChartSelectors = {
    selectLoading: state => state.bonus.loading,
    selectChart: state => state.bonus.chart && transaformData(state.bonus.chart)
};

export const request = state => ({...state, loading: true});
export const success = (state, action) => ({...state, loading: false, chart: action.chart, error: false});
export const failure = (state, action) => ({...state, loading: false, error: action.error });


export const reducer = createReducer(INITIAL_STATE, {
    [Types.BONUS_REQUEST]: request,
    [Types.BONUS_SUCCESS]: success,
    [Types.BONUS_FAILURE]: failure
});

function transaformData(array) {
    // if (array.length === 0) return array;
    const series = {
        date: [],
        bonus: []
    };
    if (array.length > 0) {
        array.forEach((item) => {
            series.date.push(item.date);
            series.bonus.push(item.bonus);
        });
    }

    return series;
}