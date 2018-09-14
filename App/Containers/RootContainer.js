import React, { Component } from 'react';
import { Container, StyleProvider } from 'native-base';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import AppNavigation from '../Navigation/AppNavigation';
import createStore from '../Redux';
import i18n from '../I18n/i18n.config';
import DebugConfig from '../Config/DebugConfig';


const { store } = createStore();

class RootContainer extends Component {
    render () {
        return (
            <Provider store={store}>
                <StyleProvider style={getTheme(material)}>
                    <I18nextProvider i18n={i18n}>
                        <Container>
                            <AppNavigation />
                        </Container>
                    </I18nextProvider>
                </StyleProvider>
            </Provider>
        )
    }
}

export default DebugConfig.useReactotron
    ? console.tron.overlay(RootContainer)
    : RootContainer