import { AsyncStorage } from 'react-native';

export default {
    active: false,
    storeConfig: {
        key: 'primary',
        storage: AsyncStorage,
        blacklist: ['auth', 'form', 'verifyEmail', 'news'],
    }
};