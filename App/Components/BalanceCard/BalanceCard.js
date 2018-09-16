import React from 'react';
import { ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import { Card, CardItem, Body, Text, Grid, Row, Col, Button } from 'native-base'
import Images from "../../Theme/Images";
import ApplicationStyles from "../../Theme/ApplicationStyles";
import BalanceCardStyles from "./BalanceCardStyles";
import { translate } from 'react-i18next';

const BalanceCard = (props) => {
    const {t, balance, selectedCurrency} = props;
    return (
        <Card transparent style={[BalanceCardStyles.card]}>
            <CardItem>
                <Body>
                    <ImageBackground source={Images.withdrawCardBackground} style={BalanceCardStyles.backgroundImage}>
                        <Grid>
                            <Row style={BalanceCardStyles.cardSection}>
                                <Col size={1}>
                                    <Text>{t('common:interface.balance')}</Text>
                                </Col>
                                <Col size={3}>
                                    <Text style={ApplicationStyles.typography.numberBig}>{balance.balance}<Text>PMD</Text></Text>
                                    <Text>≈{balance.balanceInSelectedCurrency} {selectedCurrency}</Text>
                                </Col>
                            </Row>
                            { props.children }
                        </Grid>
                    </ImageBackground>
                </Body>
            </CardItem>
        </Card>
    );
};
export default translate('common')(BalanceCard);

BalanceCard.propType = {
    balance: PropTypes.shape({
        balance: PropTypes.number.isRequired,
        balanceInSelectedCurrency: PropTypes.number.isRequired
    }),
    selectedCurrency: PropTypes.string.isRequired
};
