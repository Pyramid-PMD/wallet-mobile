import { AsyncStorage } from 'react-native';

export default {
    active: true,
    storeConfig: {
        key: 'primary',
        storage: AsyncStorage,
        blacklist: ['auth', 'form', 'verifyEmail'],
    }
};