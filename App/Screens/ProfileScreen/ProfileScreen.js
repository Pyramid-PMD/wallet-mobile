import React, {Component} from 'react';
import { Text, Container, Content, Button, View } from 'native-base';
import { translate } from 'react-i18next';

import Balance from "./Balance/Balance";
import Settings from "./Settings/Settings";
import ProfileScreenStyles from "./ProfileScreenStyles";
import FormStyles from "../../Theme/FormStyles";

@translate(['common', 'dashboard'], { wait: true })
class ProfileScreen extends Component {
    logout() {

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

export default ProfileScreen;