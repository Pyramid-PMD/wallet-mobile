import React, { Component } from 'react';
import {translate} from 'react-i18next';
import { Container, Content} from 'native-base';
import BalanceCard from "../../Components/BalanceCard/BalanceCard";
import Wallet from "./Wallet/Wallet";

@translate(['common', 'dashboard'], { wait: true })
class WithdrawScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const {t} = screenProps;
        return {
            title: t('dashboard:withdrawScreen.title')
        }
    };

    componentDidMount() {

    }

    getNavigationParams() {
        const {navigation} = this.props;
        const balance = navigation.getParam('balance'),
            selectedCurrency = navigation.getParam('selectedCurrency');

        return {
            balance,
            selectedCurrency
        };
    }
    render() {
        const { balance, selectedCurrency} = this.getNavigationParams();
        return(
            <Container>
                <Content padder>
                    <BalanceCard balance={balance} selectedCurrency={selectedCurrency}/>
                    <Wallet balance={balance}/>
                </Content>
            </Container>
        );
    }
}

export default WithdrawScreen;