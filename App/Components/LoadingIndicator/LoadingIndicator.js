import React from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import { Spinner, Content } from 'native-base';
import Colors from "../../Theme/Colors";
import ApplicationStyles from "../../Theme/ApplicationStyles";
import {LoadingIndicatorSelectors} from './LoadingIndicatorRedux';

const LoadingIndicator = (props) => {
    if (props.loading) {
        return (
            <View style={[ApplicationStyles.layout.centerContent, styles.spinnerContainer]}>
                <Spinner color={Colors.primaryLight}/>
            </View>
        );
    }
    return null;
};

const mapStateToProps = (state) => ({
    loading: LoadingIndicatorSelectors.selectLoading(state)
});

export default connect(mapStateToProps)(LoadingIndicator);

const styles = StyleSheet.create({
    spinnerContainer: {
        backgroundColor: 'rgba(0,0,0,.5)',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        zIndex: 2
    }
});

