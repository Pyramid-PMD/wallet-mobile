import React, { Component } from 'react';
import { Container, Content} from 'native-base';
import BalanceCard from "../../Components/BalanceCard/BalanceCard";
import Wallet from "./Wallet/Wallet";

class WithdrawScreen extends Component {
    render() {
        return(
            <Container>
                <Content padder>
                    <BalanceCard/>
                    <Wallet/>
                </Content>
            </Container>
        );
    }
}

export default WithdrawScreen;