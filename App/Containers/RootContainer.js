import React, { Component } from 'react';
import { Container } from 'native-base';
import AppNavigation from '../Navigation/AppNavigation';
import NavigationService from '../Navigation/NavigationService';

class RootContainer extends Component {
    render () {
        return (
            <Container>
                <AppNavigation ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                }}/>
            </Container>
        )
    }
}

export default RootContainer;