import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Container, Content, Form, Item, Input, Button, Text, View } from 'native-base';
import { reduxForm, Field } from 'redux-form';
import { translate } from 'react-i18next';
import FormStyles from '../../Theme/FormStyles'
import ApplicationStyles from '../../Theme/ApplicationStyles';
import ChangePasswordActions from './ChangePasswordRedux';
import NavigationService from '../../Navigation/NavigationService';
import {required, email, matchField, lengthBetween} from "../../Services/Validators";
import config from "../../Config/AppConfig";

@translate(['common', 'dashboard'], { wait: true })
class ChangePasswordScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const {t} = screenProps;
        return {
            title: t('dashboard:changePasswordScreen.title')
        }
    };
    renderInput({ input, placeholder, secureTextEntry, label, type, style, meta: { touched, error, warning } }){
        let hasError= false;
        if(error !== undefined && touched){
            hasError= true;
        }
        return(
            <View style={[style]}>
                <Item regular style={[FormStyles.regularInput]} error= {hasError}>
                    <Input
                        placeholder={placeholder}
                        secureTextEntry={secureTextEntry}
                        {...input} />
                </Item>
                {hasError ? <Text style={FormStyles.error}>{error}</Text> : <Text />}
            </View>
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

const validate = (values, {screenProps}) => {
    const {t} = screenProps,
        errors = {};

    errors.old_pwd = required(values.old_pwd, t('auth:register.errors.oldPasswordRequired'));


    errors.pwd =
        required(values.pwd, t('auth:login.errors.passwordRequired')) ||
        lengthBetween(values.pwd, {min: config.password.min, max: config.password.max}, t('auth:register.errors.passwordLength', { min: config.password.min, max: config.password.max }));

    errors.pwd_repeat =
        required(values.pwd_repeat, t('auth:register.errors.passwordRepeatRequired')) ||
        matchField(values.pwd_repeat, values.pwd, t('auth:register.errors.passwordMismatch'));

    return errors;
};

export default reduxForm({
    form: 'changePasswordForm',
    validate
})(connect(null, mapDispatchToProps)(ChangePasswordScreen));