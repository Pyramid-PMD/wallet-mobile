import {Toast} from 'native-base';
import i18n from '../../../I18n/i18n.config';

export function* showToastSaga(action) {
    const {message, toastType} = action;
    Toast.show({
        text: message,
        buttonText: i18n.t('common:interface:ok'),
        duration: 4000,
        type: toastType ? toastType : 'danger'
    });
}