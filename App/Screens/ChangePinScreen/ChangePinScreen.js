import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Container, Content, Form, Item, Input, Button, Text, View } from 'native-base';
import { reduxForm, Field } from 'redux-form';
import { translate } from 'react-i18next';
import FormStyles from '../../Theme/FormStyles'
import ApplicationStyles from '../../Theme/ApplicationStyles';
import NavigationService from '../../Navigation/NavigationService';
import ChangePinActions from './ChangePinRedux';
import {required, matchField} from "../../Services/Validators";

@translate(['common', 'dashboard'], { wait: true })
class ChangePinScreen extends Component {
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

    changePin(newPin) {
        const {changePin} = this.props;
        changePin(newPin);
    }

    goToChangePassword() {
        NavigationService.navigate('ChangePassword');
    }

    render() {
        const { handleSubmit, t } = this.props;
        return(
            <Container>
                <Content padder contentContainerStyle={{ flex: 1, alignItems: 'center', marginTop: 50}}>
                    <View style={ApplicationStyles.layout.contentWidth}>
                        <Form>
                            <Field
                                name="old_trade_pwd"
                                secureTextEntry
                                placeholder={t('dashboard:changePinScreen.oldPin')}
                                component={this.renderInput}/>

                            <Field
                                name="trade_pwd"
                                secureTextEntry
                                placeholder={t('dashboard:changePinScreen.newPin')}
                                component={this.renderInput}/>

                            <Field
                                name="trade_pwd_repeat"
                                secureTextEntry
                                placeholder={t('dashboard:changePinScreen.confirmPin')}
                                component={this.renderInput}/>
                        </Form>
                        <Button block style={FormStyles.submitButton} onPress={handleSubmit(this.changePin.bind(this))}>
                            <Text>{t('common:interface.done')}</Text>
                        </Button>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                            <Button light transparent onPress={this.goToChangePassword}>
                                <Text>
                                    {t('dashboard:changePinScreen.changePassword')}
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
    changePin: (pin) => dispatch(ChangePinActions.changePinRequest(pin))
});

const validate = (values, {screenProps}) => {
    const {t} = screenProps,
        errors = {};

    errors.old_trade_pwd = required(values.old_trade_pwd, t('auth:register.errors.oldPinRequired'));

    errors.trade_pwd = required(values.trade_pwd, t('auth:register.errors.pinRequired'));

    errors.trade_pwd_repeat =
        required(values.trade_pwd_repeat, t('auth:register.errors.pinRepeatRequired')) ||
        matchField(values.trade_pwd_repeat, values.trade_pwd, t('auth:register.errors.pinMismatch'));

    return errors;
};

export default reduxForm({
    form: 'changePinForm',
    validate
})(connect(null, mapDispatchToProps)(ChangePinScreen));