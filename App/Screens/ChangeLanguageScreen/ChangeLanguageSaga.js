import {call, put} from 'redux-saga/effects';
import i18n from '../../I18n/i18n.config';
import {saveLanguage} from '../../Services/Storage';
import StartUpActions from '../../Redux/StartupRedux';
import * as _ from 'lodash';

export function* changeLanguage(action) {
    let {language} = action;
    language = _.pick(language, ['code', 'name']);
    console.log('language', language);
    i18n.changeLanguage(language.code);
    yield call(saveLanguage, language);
    yield put(StartUpActions.loadUserLanguage(language));
    // yield call(i18n.changeLanguage, language.code);

}


