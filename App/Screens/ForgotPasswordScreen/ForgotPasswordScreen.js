import React, {Component} from 'react';
import { Container, Content, Form, Item, Input, Button, Text, View } from 'native-base';
import { reduxForm, Field } from 'redux-form';
import { translate } from 'react-i18next';
import ApplicationStyles from '../../Theme/ApplicationStyles';

@translate(['common', 'dashboard'], { wait: true })
class ForgotPasswordScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const {t} = screenProps;
        return {
            title: t('auth:login.forgotPassword')
        }
    };



    render() {
        const { handleSubmit, t } = this.props;
        return(
            <Container>
                <Content padder contentContainerStyle={{ flex: 1, alignItems: 'center', marginTop: 50}}>
                    <View style={ApplicationStyles.layout.contentWidth}>
                        <Text>Forgot password mock and api missing</Text>
                    </View>
                </Content>
            </Container>
        )
    }
}


export default reduxForm({
    form: 'forgotPasswordForm',
})(ForgotPasswordScreen);