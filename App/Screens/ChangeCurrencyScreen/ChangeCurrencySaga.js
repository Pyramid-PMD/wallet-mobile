import {call, put} from 'redux-saga/effects';
import i18n from '../../I18n/i18n.config';
import {saveCurrency} from '../../Services/Storage';
import StartUpActions from '../../Redux/StartupRedux';
import * as _ from 'lodash';

export function* changeCurrency(action) {

    let {currency} = action;
    currency = _.pick(currency, ['name', 'rate']);
    console.log('currency');
    console.log('currency', currency);
    yield call(saveCurrency, currency);
    yield put(StartUpActions.loadUserCurrency(currency));

}


