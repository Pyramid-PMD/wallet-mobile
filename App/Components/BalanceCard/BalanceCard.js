import React from 'react';
import { ImageBackground } from 'react-native';
import { Card, CardItem, Body, Text, Grid, Row, Col, Button } from 'native-base'
import Images from "../../Theme/Images";
import ApplicationStyles from "../../Theme/ApplicationStyles";
import BalanceCardStyles from "./BalanceCardStyles";
import { translate } from 'react-i18next';

const BalanceCard = (props) => {
    const {t} = props;
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
                                    <Text style={ApplicationStyles.typography.numberBig}>20,180.10<Text>PMD</Text></Text>
                                    <Text>≈100,287.88 USD</Text>
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