import React from 'react';
import { Text, Row, Col, Button } from 'native-base'
import ProfileScreenStyles from "../ProfileScreenStyles";
import ApplicationStyles from "../../../Theme/ApplicationStyles";
import FormStyles from "../../../Theme/FormStyles";
import NavigationService from '../../../Navigation/NavigationService';
import BalanceCard from "../../../Components/BalanceCard/BalanceCard";

const Balance = (props) => {
    const {t} = props;
    const goToWithdrawScreen = () => {
        NavigationService.navigate('Withdraw');
    };
    return (
        <BalanceCard>
            <Row style={ProfileScreenStyles.cardSection}>
                <Col>
                    <Text style={ApplicationStyles.typography.smallText}>{t('dashboard:profileScreen.balance.minerIncoming')}</Text>
                    <Text style={ApplicationStyles.typography.number}>20,180</Text>
                </Col>
                <Col style={ProfileScreenStyles.otherIncoming}>
                    <Text style={ApplicationStyles.typography.smallText}>{t('dashboard:profileScreen.balance.otherIncoming')}</Text>
                    <Text style={ApplicationStyles.typography.number}>20,180</Text>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button
                        onPress={goToWithdrawScreen}
                        block
                        style={[FormStyles.submitButton, ProfileScreenStyles.withdrawButton]}>
                        <Text>{t('dashboard:profileScreen.balance.withdraw')}</Text>
                    </Button>
                </Col>
            </Row>
        </BalanceCard>
    );
};
export default Balance;
