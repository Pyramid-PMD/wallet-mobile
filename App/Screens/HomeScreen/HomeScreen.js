import React, {Component} from 'react';
import { Container, Content } from 'native-base';
import { translate } from 'react-i18next';

import Miners from "./Miners/Miners";
import ExchangeIndex from "./ExhangeIndex/ExchangeIndex";

@translate(['common', 'dashboard'], { wait: true })
class HomeScreen extends Component {
    render() {
        const { t } = this.props;
        return(
            <Container>
                <Content padder>
                    <ExchangeIndex t={t} />
                    <Miners t={t} />
                </Content>
            </Container>
        )
    }
}

export default HomeScreen;