import moment from 'moment';
import config from '../Config/AppConfig';
import 'moment/locale/zh-cn';

export function formatDateTimeAgo(date) {
    const momentDate = moment(date),
        now = moment(new Date),
        difference = now.diff(momentDate, 'days');
    const formattedDate =
        difference <= 31 ? moment(momentDate).fromNow() : momentDate.format('d MMM, YYYY');
    return formattedDate;
}

export function formatDecimal(number, precision = config.balance.precision) {
    return +parseInt(number).toFixed(precision);
}

export function setMomentLocale(lang) {
    const locale = lang === 'cn' ? 'zh-cn' : 'en';
    moment.locale(locale);
}

