import { AsyncStorage } from 'react-native';
import config from '../Config/AppConfig';

export async function getToken() {
    try {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
            console.log(token);
            return token;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getUserId() {
    try {
        const uid = await AsyncStorage.getItem('uid');
        if (uid !== null) {
            console.log(uid);
            return parseInt(uid);
        }
    } catch (error) {
        console.log(error);
    }
}

export async function saveLanguage(language) {
    try {
        await AsyncStorage.setItem('language', JSON.stringify(language));
    } catch (error) {
        console.log('error', error);
    }
}

export async function getSelectedLanguage() {
    try {
        const language = await AsyncStorage.getItem('language');
        if (language === null) {
            return config.i18n.initialLang;
        }
        return JSON.parse(language);
    } catch (error) {
        console.log(error);
    }
}

export async function getSelectedCurrency() {
    try {
        const currency = await AsyncStorage.getItem('currency');
        if (currency !== null) {
            console.log(currency);
            return JSON.parse(currency);
        }
    } catch (error) {
        console.log(error);
    }
}