import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardItem, Body, Text, Grid, Row, Col, Button } from 'native-base';
import {StyleSheet} from 'react-native';
import ApplicationStyles from "../../Theme/ApplicationStyles";
import BalanceCardStyles from "../BalanceCard/BalanceCardStyles";

const ErrorMessage = (props) => {
    const {error} = props;
    return (
        <Card transparent style={[BalanceCardStyles.card]}>
            <CardItem>
                <Body>
                  <Text>{error}</Text>
                </Body>
            </CardItem>
        </Card>
    );
};
export default ErrorMessage;

ErrorMessage.propType = {
    error: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
    card: {

    },
    text: {

    }
});
