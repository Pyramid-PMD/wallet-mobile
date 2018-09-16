import { createActions, createReducer } from 'reduxsauce';
import moment from 'moment';

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
        if (state.notification.notifications) {
            const notifications = [...state.notification.notifications];
            if (notifications.length > 0) {
                notifications.map(notification => {
                    notification.day = moment.unix(notification.create_at).format("DD");
                    notification.month = moment.unix(notification.create_at).format("MMM");
                    return notification;
                });
                return notifications;
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