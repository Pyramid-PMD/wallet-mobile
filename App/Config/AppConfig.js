export const languages = [
    {
        code: 'en',
        name: 'English'
    },
    {
        code: 'cn',
        name: '简体中文'
    }
];

export default {
    appName: 'Pyramid',
    i18n: {
        locales: ['en', 'cn'],
        languages,
        fallbackLng: languages[0],
        initialLang: languages[0],
        namespace: ['common', 'menu', 'auth', 'dashboard']
    },
    api: {
        baseUrl: 'http://101.132.161.0/api/mobile/',
        wpApi: 'https://jhfund.vip/wp-json/wp/v2/'
    }
};

