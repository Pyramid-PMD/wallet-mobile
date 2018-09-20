import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Container, Content, Form, Item, Input, Button, Text, View } from 'native-base';
import { reduxForm, Field } from 'redux-form';
import { translate } from 'react-i18next';
import FormStyles from '../../Theme/FormStyles'
import ApplicationStyles from '../../Theme/ApplicationStyles';
import ChangePasswordActions from './ChangePasswordRedux';
import NavigationService from '../../Navigation/NavigationService';

@translate(['common', 'dashboard'], { wait: true })
class ChangePasswordScreen extends Component {
    renderInput({ input, placeholder, secureTextEntry, label, type, style, meta: { touched, error, warning } }){
        let hasError= false;
        if(error !== undefined){
            hasError= true;
        }
        return(
            <Item regular style={[FormStyles.regularInput, style]} error= {hasError}>
                <Input
                    placeholder={placeholder}
                    {...input}
                    secureTextEntry={secureTextEntry}/>
                {hasError ? <Text>{error}</Text> : <Text />}
            </Item>
        )
    }

    changePassword(values) {
        const {changePassword} = this.props;
        changePassword(values);
    }

    goToChangePin() {
        NavigationService.navigate('ChangePin');
    }

    render() {
        const { handleSubmit, t } = this.props;
        return(
            <Container>
                <Content padder contentContainerStyle={{ flex: 1, alignItems: 'center', marginTop: 50}}>
                    <View style={ApplicationStyles.layout.contentWidth}>
                        <Form>
                            <Field
                                name="old_pwd"
                                secureTextEntry
                                placeholder={t('dashboard:changePasswordScreen.oldPassword')}
                                component={this.renderInput}/>

                            <Field
                                name="pwd"
                                secureTextEntry
                                placeholder={t('dashboard:changePasswordScreen.newPassword')}
                                component={this.renderInput}/>

                            <Field
                                name="pwd_repeat"
                                secureTextEntry
                                placeholder={t('dashboard:changePasswordScreen.confirmPassword')}
                                component={this.renderInput}/>
                        </Form>
                        <Button
                            block
                            style={FormStyles.submitButton}
                            onPress={handleSubmit(this.changePassword.bind(this))}>
                            <Text>{t('common:interface.done')}</Text>
                        </Button>
                        <View
                            style={{ flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                            <Button light transparent onPress={this.goToChangePin}>
                                <Text>
                                    {t('dashboard:changePasswordScreen.changePinCode')}
                                </Text>
                            </Button>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    changePassword: (password) => dispatch(ChangePasswordActions.changePasswordRequest(password))
});

export default reduxForm({
    form: 'changePasswordForm'
})(connect(null, mapDispatchToProps)(ChangePasswordScreen));