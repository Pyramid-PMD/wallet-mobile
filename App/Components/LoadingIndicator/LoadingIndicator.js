import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const LoadingIndicator = (props) => {
    const { show } = props;
    return (
        show ?
        <View>
            <img src="./src/assets/img/loaders/oval.svg"/>
        </View> : null
    );
};

export default LoadingIndicator;

LoadingIndicator.propTypes = {
    show: PropTypes.bool
};


