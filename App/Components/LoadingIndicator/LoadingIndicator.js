import React from 'react';
import { Spinner, Content } from 'native-base';
import Colors from "../../Theme/Colors";
import ApplicationStyles from "../../Theme/ApplicationStyles";

const LoadingIndicator = (props) => {
    return (
        <Content contentContainerStyle={ApplicationStyles.layout.centerContent}>
            <Spinner color={Colors.primaryLight}/>
        </Content>
    );
};

export default LoadingIndicator;
