import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import StartupActions from "../../Redux/StartupRedux";

class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this.props.checkAuthStatus();
    }

    // Render any loading content that you like here
    render() {
        return (
            <View>
                <Text>Authenticating</Text>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        checkAuthStatus: () => dispatch(StartupActions.checkAuthStatus())
    }
};

export default connect(null, mapDispatchToProps)(AuthLoadingScreen);