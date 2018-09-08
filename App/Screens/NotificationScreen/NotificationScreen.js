import React, {Component} from 'react';
import {
    Text,
    Container,
    Tabs,
    Tab,
    TabHeading,
    Content,
    View,
    List,
    ListItem,
    Card,
    H3 } from 'native-base';
import Colors from "../../Theme/Colors";
import NotificationScreenStyles from "./NotificationScreenStyles";
import ApplicationStyles from "../../Theme/ApplicationStyles";

class NotificationScreen extends Component {
    notifications = [
        {
            date: {
                day: '10',
                month: 'Jun'
            },
            notifications: [
                {
                    id: 1,
                    title: 'Notification 1 title',
                    content: 'Notification 1 content Notification 1 content Notification 1 content Notification 1',
                    day: '',
                    month: '',
                    type: 'system'
                },
                {
                    id: 2,
                    title: 'Notification 2 title',
                    content: 'Notification 2 content Notification 2 content Notification 2 content Notification 2 content',
                    day: '',
                    month: '',
                    type: 'transaction'
                },
                {
                    id: 4,
                    title: 'Notification 1 title',
                    content: 'Notification 1 content Notification 1 content Notification 1 content Notification 1',
                    day: '',
                    month: '',
                    type: 'system'
                },
            ]
        },
        {
            date: {
                day: '03',
                month: 'Jun'
            },
            notifications: [
                {
                    id: 3,
                    title: 'Notification 1 title',
                    content: 'Notification 1 content Notification 1 content Notification 1 content Notification 1',
                    day: '',
                    month: '',
                    type: 'system'
                }
            ]
        }

    ];

    renderTab(notificationType = 'system') {
        return (
            <Container>
                <Content padder>
                    <View style={NotificationScreenStyles.viewContainer}>
                        <List>
                            { this.renderNotificationListHeaders(notificationType)}
                        </List>
                    </View>
                </Content>
            </Container>
        )
    }

    renderNotificationListHeaders(notificationType) {
        return this.notifications.map(notification => {
            const filtered = this.filterNotificationsByType(notificationType, notification.notifications);
            if (filtered.length === 0) {
                return null
            }
            return (
                <View>
                    <ListItem itemHeader style={NotificationScreenStyles.listItemHeader}>
                        <Text>
                            <Text style={ApplicationStyles.typography.numberBig}>{notification.date.day} </Text>
                            {notification.date.month}</Text>
                    </ListItem>
                    { this.renderNotificationItems(filtered)}
                </View>

            );
        })
    }

    renderNotificationItems(notifications) {
        return notifications.map(notification => {
            return (
                <Card style={ApplicationStyles.card} key={notification.id}>
                    <Text
                        style={[
                            ApplicationStyles.typography.secondaryText,
                            ApplicationStyles.typography.body,
                            { marginBottom: 12}]}>
                        {notification.title}
                    </Text>
                    <Text style={[ApplicationStyles.typography.body]}>{notification.content}</Text>
                </Card>
            )
        });
    }

    filterNotificationsByType(notificationType, notifications) {
        return notifications.filter(notification => notification.type === notificationType);
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