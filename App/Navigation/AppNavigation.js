import React from 'react';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import AuthLoadingScreen from '../Screens/AuthLoadingScreen/AuthLoadingScreen';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import NewsScreen from '../Screens/NewsScreen/NewsScreen';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import LoginScreen from '../Screens/LoginScreen/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen/RegisterScreen';

import NotificationScreen from '../Screens/NotificationScreen/NotificationScreen';

import NavigationTabs from './NavigationTabs';
import HeaderNotificationButton from '../Components/HeaderNotificationButton/HeaderNotificationButton';
import NavigationStyles from './NavigationStyles';
import PinCodeScreen from "../Screens/PinCodeScreen/PinCodeScreen";


const HomeStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            headerRight: (<HeaderNotificationButton />),
            ...NavigationStyles
        }
    },
    Notification: NotificationScreen,
});

const NewsStack = createStackNavigator({
    News: {
        screen: NewsScreen,
        navigationOptions: {
            headerRight: (<HeaderNotificationButton />),
            ...NavigationStyles
        }
    },
    Notification: NotificationScreen

});


const ProfileStack = createStackNavigator({
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            headerRight: (<HeaderNotificationButton />),
            ...NavigationStyles
        }
    },
    Notification: NotificationScreen

});

const AuthNavigation = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen,
    Pin: PinCodeScreen
}, {
    headerMode: 'none',
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
    Auth: AuthNavigation,
},
{
    initialRouteName: 'AuthLoading',
});




export default RootNavigation;