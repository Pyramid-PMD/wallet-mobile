import moment from 'moment';

export function formatDateTimeAgo(date) {
    const momentDate = moment(date),
        now = moment(new Date),
        difference = now.diff(momentDate, 'days');
    return difference <= 31 ? moment(momentDate).fromNow() : momentDate.format('d MMM, YYYY');
}