import React, {Component} from 'react';
import { translate } from 'react-i18next';
import { Container, Content, Form, Item, Input, Button, Text, View } from 'native-base';
import { reduxForm, Field } from 'redux-form';
import AppLogo from '../../Components/AppLogo/AppLogo';
import FormStyles from '../../Theme/FormStyles'
import ApplicationStyles from '../../Theme/ApplicationStyles';
import NavigationService from '../../Navigation/NavigationService';

@translate(['auth', 'common'], { wait: true })
class LoginScreen extends Component {
    renderInput({ input, placeholder, label, type, style, meta: { touched, error, warning } }){
        let hasError= false;
        if(error !== undefined){
            hasError= true;
        }
        return(
            <Item regular style={[FormStyles.regularInput, style]} error= {hasError}>
                <Input placeholder={placeholder} {...input}/>
                {hasError ? <Text>{error}</Text> : <Text />}
            </Item>
        )
    }

    login(values) {
        NavigationService.navigate('App');
    }

    goToRegisterPage() {
        console.log('navigate to register')
        NavigationService.navigate('Register');
    }
    render() {
        const { t, handleSubmit } = this.props;
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

                            <Field
                                name="password"
                                placeholder={t('auth:password')}
                                style={FormStyles.regularInputLast}
                                component={this.renderInput}/>

                            <Button transparent light>
                                <Text style={FormStyles.linkButtonText}>{t('auth:login.forgotPassword')}</Text>
                            </Button>
                        </Form>
                        <Button block style={FormStyles.submitButton} onPress={handleSubmit(this.login)}>
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
            </Container>
        )
    }
}

export default reduxForm({
    form: 'loginForm'
})(LoginScreen);