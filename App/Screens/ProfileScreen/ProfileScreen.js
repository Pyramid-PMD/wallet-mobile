import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    Container,
    Content,
    Button,
} from 'native-base';
import { translate } from 'react-i18next';
import Balance from './Balance/Balance';
import Settings from './Settings/Settings';
import ProfileScreenStyles from './ProfileScreenStyles';
import FormStyles from '../../Theme/FormStyles';
import LoginActions from '../LoginScreen/LoginRedux';
import ProfileActions, {ProfileSelectors} from './ProfileRedux';

@translate(['common', 'dashboard'], { wait: true })
class ProfileScreen extends Component {
    componentDidMount() {
        // Get balance and incoming
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
        const {
            t,
            balance,
            selectedCurrency,
        } = this.props;
        if (this.props.balance) {
            return (
                <Content padder>
                    <Balance t={t} balance={balance} selectedCurrency={selectedCurrency}/>
                    <Settings t={t}/>
                    <Button
                        onPress={this.logout.bind(this)}
                        block
                        style={[FormStyles.submitButton, ProfileScreenStyles.signOutButton]}>
                        <Text style={ProfileScreenStyles.signOutButtonText}>{t('dashboard:profileScreen.signOut')}</Text>
                    </Button>
                </Content>
            );
        }
    }

    logout() {
        this.props.logout();
    }
}

const mapStateToProps = (state) => ({
    balance: ProfileSelectors.selectBalance(state),
    selectedCurrency: 'USD'
});

const mapDispatchToProps = (dispatch) => {
    return {
        getOverview: () => dispatch(ProfileActions.overviewRequest()),
        logout: () => dispatch(LoginActions.logoutRequest()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);