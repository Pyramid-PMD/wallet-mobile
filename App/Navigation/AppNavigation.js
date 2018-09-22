import React from 'react';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import NavigationService from './NavigationService';
import { translate } from 'react-i18next';
import i18n from '../I18n/i18n.config';


import AuthLoadingScreen from '../Screens/AuthLoadingScreen/AuthLoadingScreen';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import NewsScreen from '../Screens/NewsScreen/NewsScreen';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import LoginScreen from '../Screens/LoginScreen/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen/RegisterScreen';
import NotificationScreen from '../Screens/NotificationScreen/NotificationScreen';
import PinCodeScreen from "../Screens/PinCodeScreen/PinCodeScreen";
import NewsDetailScreen from "../Screens/NewsDetailScreen/NewsDetailScreen";
import ChangePasswordScreen from "../Screens/ChangePasswordScreen/ChangePasswordScreen";
import ChangeCurrencyScreen from "../Screens/ChangeCurrencyScreen/ChangeCurrencyScreen";
import ChangeLanguageScreen from "../Screens/ChangeLanguageScreen/ChangeLanguageScreen";
import HelpScreen from "../Screens/HelpScreen/HelpScreen";
import ChangePinScreen from "../Screens/ChangePinScreen/ChangePinScreen";
import HelpDetailScreen from "../Screens/HelpDetailScreen/HelpDetailScreen";
import MinerDetailScreen from "../Screens/MinerScreen/MinerScreen";

import NavigationTabs from './NavigationTabs';
import HeaderNotificationButton from '../Components/HeaderNotificationButton/HeaderNotificationButton';
import NavigationStyles from './NavigationStyles';
import WithdrawScreen from "../Screens/WithdrawScreen/WithdrawScreen";
import QrCodeScannerScreen from "../Screens/QrCodeScannerScreen/QrCodeScannerScreen";
import Colors from "../Theme/Colors";
import AppLogo from "../Components/AppLogo/AppLogo";
import QrCodeButton from "../Components/QrCodeButton/QrCodeButton";



const HomeStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            headerTitle: (<AppLogo orientation="horizontal" />),
            headerRight: (<HeaderNotificationButton />),
            headerLeft: (<QrCodeButton />),
            ...NavigationStyles
        }
    },
    MinerDetail: MinerDetailScreen,
    Notification: NotificationScreen,
    QrCodeScan: QrCodeScannerScreen

}, {
    initialRouteName: 'Home',
    navigationOptions: {
     ...NavigationStyles
    }
});

const NewsStack = createStackNavigator({
    News: {
        screen: NewsScreen,
        navigationOptions: {
            headerTitle: (<AppLogo orientation="horizontal" />),
            headerRight: (<HeaderNotificationButton />),
            headerLeft: (<QrCodeButton />),
            ...NavigationStyles
        }
    },
    NewsDetail: NewsDetailScreen,
    Notification: NotificationScreen,
    QrCodeScan: QrCodeScannerScreen


}, {
    initialRouteName: 'News',
    navigationOptions: {
        ...NavigationStyles
    }
});


const ProfileStack = createStackNavigator({
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            headerTitle: (<AppLogo orientation="horizontal" />),
            headerRight: (<HeaderNotificationButton />),
            headerLeft: (<QrCodeButton />),
            ...NavigationStyles
        }
    },
    ChangePassword: ChangePasswordScreen,
    ChangeCurrency: ChangeCurrencyScreen,
    ChangeLanguage: ChangeLanguageScreen,
    ChangePin: ChangePinScreen,
    Help: HelpScreen,
    HelpDetail: HelpDetailScreen,
    Notification: NotificationScreen,
    Withdraw: WithdrawScreen,
    QrCodeScan: QrCodeScannerScreen,

}, {
    initialRouteName: 'Profile',
    navigationOptions: {
        ...NavigationStyles
    }
});

const AuthNavigation = createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            header: null
        }
    },
    Register: {
        screen: RegisterScreen,
        navigationOptions: {
            header: null
        }
    },
    Pin: {
        screen: PinCodeScreen,
        navigationOptions: {
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: Colors.primaryBackground,
                borderBottomWidth: 0
            }
        }
    }
}, {
    initialRouteName: 'Login',

});

const TabNavigation = createBottomTabNavigator({
    Home: HomeStack,
    News: NewsStack,
    Profile: ProfileStack
}, {
    initialRouteName: 'Home',
    tabBarComponent: NavigationTabs,
    navigationOptions: ({navigation}) => {
        const {index, routes} = navigation.state;
        const {routeName} = routes[index];
        let tabBarVisible = false;
        if (routeName === 'Home' || routeName === 'News' || routeName === 'Profile') {
            tabBarVisible = true;
        }
        return {
            tabBarVisible: tabBarVisible
        }
    }
});




const RootNavigation = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: TabNavigation,
    Auth: AuthNavigation
},
{
    initialRouteName: 'AuthLoading',
});

// Wrapping a stack with translation hoc asserts we trigger new render on language change
// the hoc is set to only trigger rerender on languageChanged
const WrappedStack = () => {
    return <RootNavigation ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
    }} screenProps={{ t: i18n.getFixedT() }} />;
};
const WrappedRootNavigation = translate('translation', {
    bindI18n: 'languageChanged',
    bindStore: false
})(WrappedStack);


export default WrappedRootNavigation;