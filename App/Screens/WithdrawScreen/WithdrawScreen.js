import React, { Component } from 'react';
import { Container, Content} from 'native-base';
import BalanceCard from "../../Components/BalanceCard/BalanceCard";
import Wallet from "./Wallet/Wallet";

class WithdrawScreen extends Component {
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