import React, {Component} from 'react';
import { Text, Container, Content, Header, Left, Button, Icon } from 'native-base';

class NotificationScreen extends Component {

    render() {
        console.log('props', this.props.navigation)
        return(
            <Container>
                <Content>
                    <Text>Notification screen</Text>
                </Content>
            </Container>
        )
    }
}

export default NotificationScreen;