import React, {Component} from 'react';
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

@translate(['common', 'auth'], { wait: true })
class RegisterScreen extends Component {
    renderInput({ input, placeholder, secureTextEntry, label, type, style, meta: { touched, error, warning } }){
        let hasError= false;
        if(error !== undefined){
            hasError= true;
        }
        return(
            <Item regular style={[FormStyles.regularInput, style]} error= {hasError}>
                <Input placeholder={placeholder} {...input} secureTextEntry={secureTextEntry}/>
                {hasError ? <Text>{error}</Text> : <Text />}
            </Item>
        )
    }

    register(user) {
        // TODO: not sure whether to register now or
        // After entering pin

        // const user = {
        //     ...values,
        //     trade_pwd: values.pwd,
        //     trade_pwd_repeat: values.pwd,
        // };
        // this.props.register(user);

        NavigationService.navigate('Pin', {user});

    }

    verifyEmail() {
        const { email, verifyEmail } = this.props;
        verifyEmail(email);
    }

    goToLoginPage() {
        NavigationService.navigate('Login');
    }
    render() {
        const { handleSubmit, t, counter } = this.props;
        console.log('counter', counter);
        return(
            <Container>
                <Content padder contentContainerStyle={ApplicationStyles.layout.centerContent}>
                    <View style={ApplicationStyles.layout.contentWidth}>
                        <AppLogo/>
                        <Form>
                            <Field
                                name="email"
                                placeholder={t('auth:email')}
                                component={this.renderInput}/>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Field
                                    style={{ marginLeft: 0, flex: 1}}
                                    name="verify_code"
                                    placeholder={t('auth:register.SMSCode')}
                                    component={this.renderInput}/>

                                <Button
                                    disabled={counter > 0}
                                    transparent
                                    onPress={this.verifyEmail.bind(this)}
                                    light
                                    style={{ marginLeft: 10}}>
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
                    </View>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('state', state.verifyEmail);
    const selector = formValueSelector('registerForm');
    const email = selector(state, 'email');
    return {
        email,
        counter: VerifyEmailSelectors.selectCounter(state)
    }

};

const mapDispatchToProps = (dispatch) => ({
    register: (user) => dispatch(RegisterActions.registerRequest(user)),
    verifyEmail: (email) => dispatch(VerifyEmailActions.verifyEmailRequest(email))
});

export default reduxForm({
    initialValues: {
        email: 'elhakim.nada@gmail.com',
        verify_code: '5555',
        pwd: 'final30788',
        pwd_repeat: 'final30788',

    },
    form: 'registerForm'
})(connect(mapStateToProps, mapDispatchToProps)(RegisterScreen));