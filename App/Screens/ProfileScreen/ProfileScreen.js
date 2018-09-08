import React, {Component} from 'react';
import { Text, Container, Content, Button } from 'native-base';
import Balance from "./Balance/Balance";
import Settings from "./Settings/Settings";
import ProfileScreenStyles from "./ProfileScreenStyles";
import FormStyles from "../../Theme/FormStyles";

class ProfileScreen extends Component {
    render() {
        return(
            <Container>
                <Content padder>
                    <Balance />
                    <Settings />
                    <Button block style={[FormStyles.submitButton, ProfileScreenStyles.signOutButton]}>
                        <Text style={ProfileScreenStyles.signOutButtonText}>Sign out</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

export default ProfileScreen;