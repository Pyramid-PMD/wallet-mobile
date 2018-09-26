import React, {Component} from 'react';
import {connect} from 'react-redux';
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
    Card
} from 'native-base';
import NotificationActions, {NotificationSelectors} from './NotificationRedux';
import NotificationScreenStyles from "./NotificationScreenStyles";
import ApplicationStyles from "../../Theme/ApplicationStyles";
import { translate } from 'react-i18next';

@translate(['common', 'dashboard'], { wait: true })
class NotificationScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const {t} = screenProps;
        return {
            title: t('dashboard:notificationScreen.title')
        }
    };

    componentDidMount() {
        this.props.getNotifications();
    }

    render() {
        const {t} = this.props;
        return(
            <Container>
                <Tabs>
                    <Tab heading={ <TabHeading><Text>{t('dashboard:notificationScreen.system')}</Text></TabHeading>}>
                        {this.renderTab()}
                    </Tab>
                    <Tab heading={ <TabHeading><Text>{t('dashboard:notificationScreen.transaction')}</Text></TabHeading>}>
                        {this.renderTab(1)}
                    </Tab>
                    <Tab heading={ <TabHeading><Text>{t('dashboard:notificationScreen.withdraw')}</Text></TabHeading>}>
                        {this.renderTab(2)}
                    </Tab>
                </Tabs>
            </Container>
        )
    }

    renderTab(notificationCategory = 0) {
        return (
            <Container>
                <Content padder>
                    <View style={NotificationScreenStyles.viewContainer}>
                        {
                            this.props.notifications ?
                                <List>
                                    { this.renderNotificationListHeaders(notificationCategory)}
                                </List> : null
                        }

                    </View>
                </Content>
            </Container>
        )
    }

    renderNotificationListHeaders(notificationCategory) {
        return this.props.notifications.map(notification => {
            const filtered = this.filterNotificationsByType(notificationCategory, notification.notifications);
            if (filtered.length === 0) {
                return null
            }
            return (
                <View key={notification.date}>
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

    filterNotificationsByType(notificationCategory, notifications) {
        return notifications.filter(notification => notification.category === notificationCategory);
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




}

const mapStateToProps = (state) => ({
    notifications: NotificationSelectors.selectNotifications(state)
});

const mapDispatchToProps = (dispatch) => ({
    getNotifications: () => dispatch(NotificationActions.notificationRequest())
});
export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);