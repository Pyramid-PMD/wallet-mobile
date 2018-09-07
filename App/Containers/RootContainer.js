import React, { Component } from 'react';
import { Container, StyleProvider } from 'native-base';
import { Provider } from 'react-redux';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import AppNavigation from '../Navigation/AppNavigation';
import NavigationService from '../Navigation/NavigationService';
import createStore from '../Redux';


const { store } = createStore();

class RootContainer extends Component {
    render () {
        return (
            <Provider store={store}>
                <StyleProvider style={getTheme(material)}>
                    <Container>
                        <AppNavigation ref={navigatorRef => {
                            NavigationService.setTopLevelNavigator(navigatorRef);
                        }}/>
                    </Container>
                </StyleProvider>
            </Provider>
        )
    }
}

export default RootContainer;