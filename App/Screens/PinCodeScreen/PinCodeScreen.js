import React, {Component} from 'react';
import { Container, Content, Form, Item, Input, Button, Text, View } from 'native-base';
import { reduxForm, Field } from 'redux-form';
import { translate } from 'react-i18next';
import AppLogo from '../../Components/AppLogo/AppLogo';
import FormStyles from '../../Theme/FormStyles'
import ApplicationStyles from '../../Theme/ApplicationStyles';
import NavigationService from '../../Navigation/NavigationService';
import Metrics from "../../Theme/Metrics";

@translate(['common', 'dashboard'], { wait: true })
class PinCodeScreen extends Component {
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

    submitPin(values) {
        NavigationService.navigate('App');
    }

    render() {
        const { handleSubmit, t } = this.props;
        return(
            <Container>
                <Content padder contentContainerStyle={ApplicationStyles.layout.centerContent}>
                    <View style={ApplicationStyles.layout.contentWidth}>
                        <AppLogo/>
                        <Text style={{ marginBottom: Metrics.section}}>
                            {t('dashboard:pinCodeScreen.description')}
                        </Text>
                        <Form>
                            <Field
                                name="pin"
                                placeholder={t('dashboard:pinCodeScreen.pinCode')}
                                component={this.renderInput}/>

                            <Field
                                name="confirmPin"
                                placeholder={t('dashboard:pinCodeScreen.confirmPinCode')}
                                component={this.renderInput}/>
                        </Form>
                        <Button block style={FormStyles.submitButton} onPress={handleSubmit(this.submitPin)}>
                            <Text>{t('common:interface.done')}</Text>
                        </Button>
                    </View>

                </Content>
            </Container>
        )
    }
}

export default reduxForm({
    form: 'pinForm'
})(PinCodeScreen);