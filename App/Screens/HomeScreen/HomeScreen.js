import React, {Component} from 'react';
import { Text, Container, Content } from 'native-base';

class HomeScreen extends Component {
    // static navigationOptions = {
    //     headerTitle: 'NAda',
    // };
    render() {
        console.log('home screen');
        return(
            <Container>
                <Content>
                    <Text>Home screen</Text>
                </Content>
            </Container>
        )
    }
}

export default HomeScreen;