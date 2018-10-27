import React, {Component} from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import {
    Container,
    Content,
    Form,
    Item,
    Input,
    Button,
    Text,
    View
} from 'native-base';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { translate } from 'react-i18next';
import AppLogo from '../../Components/AppLogo/AppLogo';
import FormStyles from '../../Theme/FormStyles'
import ApplicationStyles from '../../Theme/ApplicationStyles';
import NavigationService from '../../Navigation/NavigationService';
import RegisterActions from './RegisterRedux';
import VerifyEmailActions, {VerifyEmailSelectors} from './VerifyEmailRedux';
import {required, email, matchField, lengthBetween, isEmail} from "../../Services/Validators";
import config from "../../Config/AppConfig";

@translate(['common', 'auth'], { wait: true })
class RegisterScreen extends Component {

    renderInput({ input, placeholder, secureTextEntry, label, type, style, meta: { touched, error, warning } }){
        let hasError= false;
        if(error !== undefined && touched){
            hasError= true;
        }
        return(
            <View style={[style]}>
                <Item regular style={[FormStyles.regularInput]} error= {hasError}>
                    <Input placeholder={placeholder} {...input} secureTextEntry={secureTextEntry}/>
                </Item>
                {hasError ? <Text style={FormStyles.error}>{error}</Text> : <Text />}
            </View>

        )
    }


    register(user) {
        NavigationService.navigate('Pin', {user});
    }

    verifyEmail() {
        const { email, verifyEmail } = this.props;
        console.log(this.props);
        verifyEmail(email);
    }

    goToLoginPage() {
        NavigationService.navigate('Login');
    }
    render() {
        const { handleSubmit, t, counter, email } = this.props;
        const buttonTextAlignment = counter === 0 ? 'flex-end': 'center';
        return(
            <Container>
                <Content padder contentContainerStyle={ApplicationStyles.layout.centerContent}>
                    <KeyboardAvoidingView style={ApplicationStyles.layout.contentWidth} behavior="padding">
                        <AppLogo/>
                        <Form>
                            <Field
                                name="email"
                                placeholder={t('auth:email')}
                                component={this.renderInput}/>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Field
                                    style={{flex:1}}
                                    name="verify_code"
                                    placeholder={t('auth:register.SMSCode')}
                                    component={this.renderInput}/>

                                <Button
                                    disabled={counter > 0 || !email}
                                    transparent
                                    onPress={this.verifyEmail.bind(this)}
                                    light
                                    style={{ marginLeft: 10, width: 70, justifyContent: buttonTextAlignment }}>
                                    { counter === 0 ?
                                        <Text>{t('auth:register.sendSMS')}</Text>
                                        : <Text>{counter}</Text>
                                    }
                                </Button>
                            </View>

                            <Field
                                name="pwd"
                                secureTextEntry
                                placeholder={t('auth:password')}
                                component={this.renderInput}/>

                            <Field
                                name="pwd_repeat"
                                secureTextEntry
                                placeholder={t('auth:confirmPassword')}
                                component={this.renderInput}/>
                        </Form>

                        <Button block style={FormStyles.submitButton} onPress={handleSubmit(this.register.bind(this))}>
                            <Text>{t('common:interface.next')}</Text>
                        </Button>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                            <Button transparent style={{ marginRight: 6}} disabled>
                                <Text style={FormStyles.linkButtonText}>
                                    {t('auth:haveAccount')}
                                </Text>
                            </Button>
                            <Button transparent light onPress={this.goToLoginPage}>
                                <Text style={ApplicationStyles.typography.textUnderlined}>
                                    {t('auth:login.title')}
                                </Text>
                            </Button>
                        </View>
                    </KeyboardAvoidingView>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    const selector = formValueSelector('registerForm');
    const email = isEmail(selector(state, 'email')) ? selector(state, 'email'): undefined;
    return {
        email,
        counter: VerifyEmailSelectors.selectCounter(state)
    }
};

const mapDispatchToProps = (dispatch) => ({
    register: (user) => dispatch(RegisterActions.registerRequest(user)),
    verifyEmail: (email) => dispatch(VerifyEmailActions.verifyEmailRequest(email))
});

const validate = (values, {screenProps}) => {
    const {t} = screenProps,
          errors = {};

    errors.email =
        required(values.email, t('auth:login.errors.emailRequired')) ||
        email(values.email, t('auth:login.errors.wrongEmailFormat'));

    errors.pwd =
        required(values.pwd, t('auth:login.errors.passwordRequired')) ||
        lengthBetween(values.pwd, {min: config.password.min, max: config.password.max}, t('auth:register.errors.passwordLength', { min: config.password.min, max: config.password.max }));

    errors.verify_code = required(values.verify_code, t('auth:register.errors.enterValidCode'));

    errors.pwd_repeat =
        required(values.pwd_repeat, t('auth:register.errors.passwordRepeatRequired')) ||
        matchField(values.pwd_repeat, values.pwd, t('auth:register.errors.passwordMismatch'));

    return errors;
};

export default reduxForm({
    // initialValues: {
    //     email: 'elhakim.nada88@gmail.com',
    //     verify_code: '5555',
    //     pwd: 'final30788',
    //     pwd_repeat: 'final30788',
    //
    // },
    validate,
    form: 'registerForm'
})(connect(mapStateToProps, mapDispatchToProps)(RegisterScreen));