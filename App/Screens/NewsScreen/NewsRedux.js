import { createActions, createReducer} from 'reduxsauce';
import * as _ from 'lodash';
import {formatDateTimeAgo} from '../../Services/Utils'

const { Types, Creators} = createActions({
    newsRequest: ['refreshing'],
    newsSuccess: ['news'],
    newsFailure: ['error']
});

export const NewsTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    news: null,
    error: null,
    refreshing: false
};

export const NewsSelectors = {
    selectNews: (state) => {
        if (state.news.news) {
            const news = state.news.news;
            if (news.length) {
               return news.map(item => {
                    const picked = _.pick(item, ['id', 'title','date', 'content']);
                    picked.title = picked.title.rendered;
                    picked.date = formatDateTimeAgo(picked.date);
                    picked.thumb = require('../../Images/news/thumb.png');
                    picked.content = picked.content.rendered;
                    return picked;
                });
            }
        }
    },
    selectRefreshStatus: state => state.news.refreshing
};

export const request = (state, action) => {
    const {refreshing} = action;
    return {...state, loading: true, refreshing: !!refreshing};
};
export const success = (state, action) => ({...state, loading: false, news: action.news, error: false, refreshing: false});
export const failure = (state, action) => ({...state, loading: false, error: action.error, refreshing: false });

export const reducer = createReducer(INITIAL_STATE, {
    [Types.NEWS_REQUEST]: request,
    [Types.NEWS_SUCCESS]: success,
    [Types.NEWS_FAILURE]: failure,
});