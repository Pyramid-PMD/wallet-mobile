import React from 'react';
import { ImageBackground } from 'react-native';
import { Card, CardItem, Body, Text, Grid, Row, Col, Button } from 'native-base'
import Images from "../../../Theme/Images";
import ProfileScreenStyles from "../ProfileScreenStyles";
import ApplicationStyles from "../../../Theme/ApplicationStyles";
import FormStyles from "../../../Theme/FormStyles";
const Balance = () => {
    return (
        <Card transparent style={[ProfileScreenStyles.card, { height: 240}]}>
            <CardItem>
                <Body>
                    <ImageBackground source={Images.withdrawCardBackground} style={ProfileScreenStyles.backgroundImage}>
                        <Grid>
                            <Row style={ProfileScreenStyles.cardSection}>
                                <Col size={1}>
                                    <Text>Balance</Text>
                                </Col>
                                <Col size={3}>
                                    <Text style={ApplicationStyles.typography.numberBig}>20,180.10<Text>PMD</Text></Text>
                                    <Text>≈100,287.88 USD</Text>
                                </Col>
                            </Row>
                            <Row style={ProfileScreenStyles.cardSection}>
                                <Col>
                                    <Text style={ApplicationStyles.typography.smallText}>Incoming from mining</Text>
                                    <Text style={ApplicationStyles.typography.number}>20,180</Text>
                                </Col>
                                <Col style={ProfileScreenStyles.otherIncoming}>
                                    <Text style={ApplicationStyles.typography.smallText}>Other incoming</Text>
                                    <Text style={ApplicationStyles.typography.number}>20,180</Text>
                                </Col>

                            </Row>
                            <Row>
                                <Col>
                                    <Button block style={[FormStyles.submitButton, ProfileScreenStyles.withdrawButton]}>
                                        <Text>Withdraw</Text>
                                    </Button>
                                </Col>
                            </Row>
                        </Grid>
                    </ImageBackground>
                </Body>
            </CardItem>
        </Card>
    );
};
export default Balance;