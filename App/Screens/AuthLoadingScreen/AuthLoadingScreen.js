import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    Text,
    AsyncStorage,
    View,
} from 'react-native';
import StartupActions from "../../Redux/StartupRedux";

class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // AsyncStorage.clear();
        this.props.startUp();
    }

    render() {
        return (
            <View>
                <StatusBar barStyle="default" />
            </View>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        startUp: () => dispatch(StartupActions.bootstrapApp())
    }
};

export default connect(null, mapDispatchToProps)(AuthLoadingScreen);