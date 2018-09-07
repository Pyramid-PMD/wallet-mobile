import React, {Component} from 'react';
import { Container, Content, Form, Item, Input, Button, Text, View, Grid, Row, Col } from 'native-base';
import { reduxForm, Field } from 'redux-form';
import AppLogo from '../../Components/AppLogo/AppLogo';
import FormStyles from '../../Theme/FormStyles'
import ApplicationStyles from '../../Theme/ApplicationStyles';
import NavigationService from '../../Navigation/NavigationService';

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
        NavigationService.navigate('App');
    }

    goToLoginPage() {
        NavigationService.navigate('Login');
    }
    render() {
        const { handleSubmit } = this.props;
        return(
            <Container>
                <Content padder contentContainerStyle={ApplicationStyles.layout.centerContent}>
                    <View style={ApplicationStyles.layout.contentWidth}>
                        <AppLogo/>
                        <Form>
                            <Field
                                name="email"
                                placeholder="Email"
                                component={this.renderInput}/>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Field
                                    style={{ marginLeft: 0, flex: 1}}
                                    name="code"
                                    placeholder="SMS code"
                                    component={this.renderInput}/>

                                <Button
                                    transparent
                                    light
                                    style={{ marginLeft: 10}}>
                                    <Text>Send SMS</Text>
                                </Button>
                            </View>

                            <Field
                                name="password"
                                placeholder="Password"
                                component={this.renderInput}/>

                            <Field
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                component={this.renderInput}/>
                        </Form>

                        <Button block style={FormStyles.submitButton} onPress={handleSubmit(this.register)}>
                            <Text>Next</Text>
                        </Button>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                            <Button transparent style={{ marginRight: 6}} disabled>
                                <Text style={FormStyles.linkButtonText}>
                                    Have an account?
                                </Text>
                            </Button>
                            <Button transparent light onPress={this.goToLoginPage}>
                                <Text style={ApplicationStyles.typography.textUnderlined}>
                                    Login
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