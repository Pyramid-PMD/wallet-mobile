import React, {Component} from 'react';
import { Text, Container, Content } from 'native-base';
import Miners from "./Miners/Miners";
import ExchangeIndex from "./ExhangeIndex/ExchangeIndex";

class HomeScreen extends Component {
    render() {
        return(
            <Container>
                <Content padder>
                    <ExchangeIndex />
                    <Miners />
                </Content>
            </Container>
        )
    }
}

export default HomeScreen;