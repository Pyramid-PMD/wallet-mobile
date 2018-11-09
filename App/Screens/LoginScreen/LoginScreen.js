import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Container, Content, Form, Item, Input, Button, Text, View, Card, CardItem, Body } from 'native-base';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import AppLogo from '../../Components/AppLogo/AppLogo';
import FormStyles from '../../Theme/FormStyles'
import ApplicationStyles from '../../Theme/ApplicationStyles';
import NavigationService from '../../Navigation/NavigationService';
import LoginActions, {LoginSelectors} from './LoginRedux';
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import {required, email} from "../../Services/Validators";

@translate(['auth', 'common'], { wait: true })
class LoginScreen extends Component {
    renderInput({ input, placeholder, secureTextEntry, style, meta: { touched, error, warning } }){
        let hasError= false;
        if(error !== undefined && touched){
            hasError= true;
        }
        return(
            <View>
                <Item regular style={[FormStyles.regularInput]} error= {hasError}>
                    <Input
                        secureTextEntry={secureTextEntry}
                        placeholder={placeholder}
                        {...input}/>
                </Item>
                {hasError ? <Text style={FormStyles.error}>{error}</Text> : <Text />}
            </View>
        )
    }

    onLogin = (credentials) => {
        this.props.login(credentials);
    };

    goToRegisterPage() {
        NavigationService.navigate('Register');
    }

    goToForgotPassword() {
        NavigationService.navigate('ForgotPassword');
    }

    renderLoginForm() {
        const { t, handleSubmit } = this.props;

        return (
            <Content padder contentContainerStyle={ApplicationStyles.layout.centerContent}>
                <View style={ApplicationStyles.layout.contentWidth}>
                    <AppLogo/>
                    <Form>
                        <Field
                            name="email"
                            placeholder={t('auth:email')}
                            component={this.renderInput}/>

                        <Field
                            name="pwd"
                            placeholder={t('auth:password')}
                            secureTextEntry={true}
                            style={FormStyles.regularInputLast}
                            component={this.renderInput}/>

                        <Button transparent light onPress={this.goToForgotPassword.bind(this)}>
                            <Text style={FormStyles.linkButtonText}>{t('auth:login.forgotPassword')}</Text>
                        </Button>
                    </Form>
                    <Button block style={FormStyles.submitButton} onPress={handleSubmit(this.onLogin)}>
                        <Text>{t('auth:login.title')}</Text>
                    </Button>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <Button transparent style={{ marginRight: 6}} disabled>
                            <Text style={FormStyles.linkButtonText}>
                                {t('auth:noAccount')}
                            </Text>
                        </Button>
                        <Button light transparent onPress={this.goToRegisterPage}>
                            <Text>
                                {t('auth:register.title')}
                            </Text>
                        </Button>
                    </View>

                </View>

            </Content>
        )
    }
    render() {
        return(
            <Container>
                {this.renderLoginForm()}
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: LoginSelectors.selectLoading(state),
        error: LoginSelectors.selectError(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (credentials) => dispatch(LoginActions.loginRequest(credentials))
    }
};

const validate = (values, {screenProps}) => {
    const errors = {}, {t} = screenProps;
    errors.email = required(values.email, t('auth:login.errors.emailRequired')) || email(values.email, t('auth:login.errors.wrongEmailFormat'));
    errors.pwd = required(values.pwd, t('auth:login.errors.passwordRequired'));
    return errors;
};

export default reduxForm({
    initialValues: {
        email: 'elhakim.nada88@gmail.com',
        pwd: 'final30788'
    },
    validate,
    form: 'loginForm'
})(connect(mapStateToProps, mapDispatchToProps)(LoginScreen));