import { createActions, createReducer} from 'reduxsauce';
import * as _ from 'lodash';
import {formatDateTimeAgo} from '../../Services/Utils'

const { Types, Creators} = createActions({
    newsRequest: null,
    newsSuccess: ['news'],
    newsFailure: ['error']
});

export const NewsTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    news: null,
    error: null
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
    }
};

export const request = state => ({...state, loading: true, news: null});
export const success = (state, action) => ({...state, loading: false, news: action.news, error: false});
export const failure = (state, action) => ({...state, loading: false, error: action.error });

export const reducer = createReducer(INITIAL_STATE, {
    [Types.NEWS_REQUEST]: request,
    [Types.NEWS_SUCCESS]: success,
    [Types.NEWS_FAILURE]: failure,
});