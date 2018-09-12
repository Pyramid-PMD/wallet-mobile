import React, {Component} from 'react';
import { Container, Content, Form, Item, Input, Button, Text, View, Grid, Row, Col } from 'native-base';
import { reduxForm, Field } from 'redux-form';
import { translate } from 'react-i18next';
import AppLogo from '../../Components/AppLogo/AppLogo';
import FormStyles from '../../Theme/FormStyles'
import ApplicationStyles from '../../Theme/ApplicationStyles';
import NavigationService from '../../Navigation/NavigationService';

@translate(['common', 'auth'], { wait: true })
class RegisterScreen extends Component {
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

    register(values) {
        NavigationService.navigate('Pin');
    }

    goToLoginPage() {
        NavigationService.navigate('Login');
    }
    render() {
        const { handleSubmit, t } = this.props;
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
                                    name="code"
                                    placeholder={t('auth:register.SMSCode')}
                                    component={this.renderInput}/>

                                <Button
                                    transparent
                                    light
                                    style={{ marginLeft: 10}}>
                                    <Text>{t('auth:register.sendSMS')}</Text>
                                </Button>
                            </View>

                            <Field
                                name="password"
                                placeholder={t('auth:password')}
                                component={this.renderInput}/>

                            <Field
                                name="confirmPassword"
                                placeholder={t('auth:confirmPassword')}
                                component={this.renderInput}/>
                        </Form>

                        <Button block style={FormStyles.submitButton} onPress={handleSubmit(this.register)}>
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

export default reduxForm({
    form: 'registerForm'
})(RegisterScreen);