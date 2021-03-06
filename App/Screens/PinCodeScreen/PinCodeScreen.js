import React, {Component} from 'react';
import { Container, Content, Form, Item, Input, Button, Text, View } from 'native-base';
import { reduxForm, Field } from 'redux-form';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import AppLogo from '../../Components/AppLogo/AppLogo';
import FormStyles from '../../Theme/FormStyles'
import ApplicationStyles from '../../Theme/ApplicationStyles';
import Metrics from "../../Theme/Metrics";
import RegisterActions from '../RegisterScreen/RegisterRedux';
import {required, matchField} from "../../Services/Validators";


@translate(['common', 'dashboard'], { wait: true })
class PinCodeScreen extends Component {

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

    register(values) {
        const { navigation, register } = this.props;
        const user = {
            ...navigation.getParam('user'),
            ...values
        };
        register(user);
    }

    render() {
        const { handleSubmit, t } = this.props;
        return(
            <Container>
                <Content padder contentContainerStyle={[ApplicationStyles.layout.centerContent, {top: -60}]}>
                    <View style={ApplicationStyles.layout.contentWidth}>
                        <AppLogo/>
                        <Text style={{ marginBottom: Metrics.section}}>
                            {t('dashboard:pinCodeScreen.description')}
                        </Text>
                        <Form>
                            <Field
                                name="trade_pwd"
                                secureTextEntry
                                placeholder={t('dashboard:pinCodeScreen.pinCode')}
                                component={this.renderInput}/>

                            <Field
                                name="trade_pwd_repeat"
                                secureTextEntry
                                placeholder={t('dashboard:pinCodeScreen.confirmPinCode')}
                                component={this.renderInput}/>
                        </Form>
                        <Button block style={FormStyles.submitButton} onPress={handleSubmit(this.register.bind(this))}>
                            <Text>{t('common:interface.done')}</Text>
                        </Button>
                    </View>

                </Content>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    register: (user) => dispatch(RegisterActions.registerRequest(user)),

});

const validate = (values, {screenProps}) => {
    const {t} = screenProps,
        errors = {};

    errors.trade_pwd = required(values.trade_pwd, t('auth:register.errors.pinRequired'));

    errors.trade_pwd_repeat =
        required(values.trade_pwd_repeat, t('auth:register.errors.pinRepeatRequired')) ||
        matchField(values.trade_pwd_repeat, values.trade_pwd, t('auth:register.errors.pinMismatch'));

    return errors;
};

export default reduxForm({
    form: 'pinForm',
    validate
})(connect(null, mapDispatchToProps)(PinCodeScreen));