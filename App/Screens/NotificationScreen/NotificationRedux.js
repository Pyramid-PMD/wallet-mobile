import { createActions, createReducer } from 'reduxsauce';
import moment from 'moment';
import * as _ from 'lodash';

const { Types, Creators } = createActions({
    notificationRequest: null,
    notificationSuccess: ['notifications'],
    notificationFailure: ['error'],
    filterNotifications: ['category']
});

export const NotificationTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    notifications: null,
    filtered: null,
    error: null
};

export const NotificationSelectors = {
    selectNotifications: (state) => {
        // TODO: find a better lodash way to handle this
        let groupedNotifications = [];
        if (state.notification.notifications) {
            if (state.notification.notifications.length > 0) {
                let notifications = [...state.notification.notifications];
                notifications.map(notification => {
                    notification.create_at = moment.unix(notification.create_at).format("d-MMM-YYYY");
                    return notification;
                });
                notifications = _.groupBy(notifications, 'create_at');
                _.forIn(notifications, (value, key) => {
                    console.log(key, value);
                    const notificationGroup = {
                       date: {
                           day: moment(key).format("DD"),
                           month: moment(key).format("MMM"),
                       },
                       notifications: value
                    };
                    groupedNotifications.push(notificationGroup);
                });
                return groupedNotifications;
            }
        }

    },
    selectFiltered: (state) => {
        return state.notification.filtered;
    }
};

export const request = (state) => ({...state, loading: true, notifications: null, error: null, filtered: null });
export const success = (state, action) => ({...state, loading: false, notifications: action.notifications, error: null, filtered: null });
export const failure = (state, action) => ({...state, loading: false, notifications: null, error: action.error, filtered: null });
export const filter = (state, action) => {
    let filtered;
    const { category } = action;
    filtered = state.notifications.list.filter(item => item.category === category)
    return {...state, filtered};
};


export const reducer = createReducer(INITIAL_STATE, {
    [Types.NOTIFICATION_REQUEST]: request,
    [Types.NOTIFICATION_SUCCESS]: success,
    [Types.NOTIFICATION_FAILURE]: failure,
    [Types.FILTER_NOTIFICATIONS]: filter
});