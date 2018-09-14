import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    Container,
    Content,
    Button,
} from 'native-base';
import { translate } from 'react-i18next';
import Balance from "./Balance/Balance";
import Settings from "./Settings/Settings";
import ProfileScreenStyles from "./ProfileScreenStyles";
import FormStyles from "../../Theme/FormStyles";
import LoginActions from "../LoginScreen/LoginRedux";

@translate(['common', 'dashboard'], { wait: true })
class ProfileScreen extends Component {
    logout() {
        this.props.logout();
    }
    render() {
        const { t } = this.props;
        return(
            <Container>
                <Content padder>
                    <Balance t={t}/>
                    <Settings t={t}/>
                    <Button
                        onPress={this.logout.bind(this)}
                        block
                        style={[FormStyles.submitButton, ProfileScreenStyles.signOutButton]}>
                        <Text style={ProfileScreenStyles.signOutButtonText}>{t('dashboard:profileScreen.signOut')}</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(LoginActions.logoutRequest()),
    }
};

export default connect(null, mapDispatchToProps)(ProfileScreen);