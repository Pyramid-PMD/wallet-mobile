import React, { Component } from 'react';
import { Container, StyleProvider, Root } from 'native-base';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import AppNavigation from '../Navigation/AppNavigation';
import createStore from '../Redux';
import i18n from '../I18n/i18n.config';
import DebugConfig from '../Config/DebugConfig';
import LoadingIndicator from "../Components/LoadingIndicator/LoadingIndicator";


const { store } = createStore();

class RootContainer extends Component {
    render () {
        return (
            <Root>
                <Provider store={store}>
                    <StyleProvider style={getTheme(material)}>
                        <I18nextProvider i18n={i18n}>
                            <Container>
                                <LoadingIndicator/>
                                <AppNavigation />
                            </Container>
                        </I18nextProvider>
                    </StyleProvider>
                </Provider>
            </Root>
        )
    }
}

export default DebugConfig.useReactotron
    ? console.tron.overlay(RootContainer)
    : RootContainer