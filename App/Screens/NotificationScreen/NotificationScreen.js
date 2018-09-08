import React, {Component} from 'react';
import { Text, Container, Tabs, Tab, TabHeading, Content, View, List, ListItem } from 'native-base';
import Colors from "../../Theme/Colors";

class NotificationScreen extends Component {
    notifications = [
        {
            title: 'Notification 1 title',
            content: 'Notification 1 content Notification 1 content Notification 1 content Notification 1 content Notification 1 content',
            day: '',
            month: '',
            type: 'system'
        },
        {
            title: 'Notification 2 title',
            content: 'Notification 2 content Notification 2 content Notification 2 content Notification 2 content Notification 2 content',
            day: '',
            month: '',
            type: 'transaction'
        }
    ];

    renderTab(notificationType = 'system') {
        return (
            <Container>
                <Content padder>
                    <View style={{ borderTopWidth: 1, borderColor: Colors.listBorderColor, paddingTop: 12 }}>
                        <List>

                        </List>
                    </View>
                </Content>
            </Container>
        )
    }

    renderNotifications(notificationType) {

    }

    filterNotificationsByType(notificationType) {

    }

    render() {
        console.log('props', this.props.navigation)
        return(
            <Container>
                <Tabs>
                    <Tab heading={ <TabHeading><Text>System</Text></TabHeading>}>
                        {this.renderTab()}
                    </Tab>
                    <Tab heading={ <TabHeading><Text>Transaction</Text></TabHeading>}>
                        {this.renderTab('transaction')}
                    </Tab>
                    <Tab heading={ <TabHeading><Text>Withdraw</Text></TabHeading>}>
                        {this.renderTab('withdraw')}
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

export default NotificationScreen;