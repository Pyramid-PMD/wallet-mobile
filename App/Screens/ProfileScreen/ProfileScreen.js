import React, {Component} from 'react';
import {Alert} from 'react-native';
import {connect} from 'react-redux';
import {
    Text,
    Container,
    Content,
    Button,
    View
} from 'native-base';
import { NavigationEvents } from 'react-navigation';
import {RefreshControl} from 'react-native';
import { translate } from 'react-i18next';
import Balance from './Balance/Balance';
import Settings from './Settings/Settings';
import ProfileScreenStyles from './ProfileScreenStyles';
import FormStyles from '../../Theme/FormStyles';
import LoginActions from '../LoginScreen/LoginRedux';
import OverviewActions, {OverviewSelectors} from '../../Redux/Common/Overview/OverviewRedux';

@translate(['common', 'dashboard'], { wait: true })
class ProfileScreen extends Component {
    componentDidMount() {
        this.props.getOverview();
    }
    render() {
        return(
            <Container>
                {this.renderContent()}
            </Container>
        )
    }

    renderContent() {
        return (
            <Content
                padder
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={this.onRefresh}
                    />}>
                <NavigationEvents
                    onDidFocus={this.onScreenFocus.bind(this)}
                />
                {this.renderBalance()}
            </Content>
        );
    }

    renderBalance() {
        const {
            t,
            balance,
            selectedCurrency,
        } = this.props;

        if (balance) {
            console.log('balance', balance);
            return (
                <View style={{flex:-1}}>
                    <Balance t={t} balance={balance} selectedCurrency={selectedCurrency}/>
                    <Settings t={t}/>
                    <Button
                        onPress={this.logout.bind(this)}
                        block
                        style={[FormStyles.submitButton, ProfileScreenStyles.signOutButton]}>
                        <Text style={ProfileScreenStyles.signOutButtonText}>{t('dashboard:profileScreen.signOut')}</Text>
                    </Button>
                </View>
            )
        }
    }

    logout() {
        const {t} = this.props;
        Alert.alert(
            t('dashboard:profileScreen.signOut'),
            t('dashboard:profileScreen.confirmSignOut'),
            [
                {text: t('common:interface.cancel'), style: 'cancel'},
                {text: t('common:interface.ok'), onPress: () => this.props.logout()},
            ],
        );

    }

    onScreenFocus() {
        // this.props.getOverview();
    }

    onRefresh = () => {
        this.props.getOverview();
    };
}

const mapStateToProps = (state) => ({
    balance: OverviewSelectors.selectBalance(state),
    selectedCurrency: OverviewSelectors.selectUserCurrency(state)
});

const mapDispatchToProps = (dispatch) => {
    return {
        getOverview: () => dispatch(OverviewActions.overviewRequest()),
        logout: () => dispatch(LoginActions.logoutRequest()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);