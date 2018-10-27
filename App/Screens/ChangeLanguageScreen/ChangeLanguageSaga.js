import {call, put} from 'redux-saga/effects';
import i18n from '../../I18n/i18n.config';
import {saveLanguage} from '../../Services/Storage';
import StartUpActions from '../../Redux/StartupRedux';
import * as _ from 'lodash';
import {setMomentLocale} from "../../Services/Utils";

export function* changeLanguage(action) {
    let {language} = action;
    language = _.pick(language, ['code', 'name']);
    i18n.changeLanguage(language.code);
    yield call(setMomentLocale, language.code);
    yield call(saveLanguage, language);
    yield put(StartUpActions.loadUserLanguage(language));
    // yield call(i18n.changeLanguage, language.code);

}


