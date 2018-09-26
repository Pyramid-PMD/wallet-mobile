import moment from 'moment';
import config from '../Config/AppConfig';

export function formatDateTimeAgo(date) {
    const momentDate = moment(date),
        now = moment(new Date),
        difference = now.diff(momentDate, 'days');
    return difference <= 31 ? moment(momentDate).fromNow() : momentDate.format('d MMM, YYYY');
}

export function formatDecimal(number, precision = config.balance.precision) {
    if (number) {
        return +parseInt(number).toFixed(precision);
    }
}