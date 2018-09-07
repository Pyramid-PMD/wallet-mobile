import React, {Component} from 'react';
import { Container, Content, Form, Item, Input, Button, Text, View } from 'native-base';
import { reduxForm, Field } from 'redux-form';
import AppLogo from '../../Components/AppLogo/AppLogo';
import FormStyles from '../../Theme/FormStyles'
import ApplicationStyles from '../../Theme/ApplicationStyles';
import NavigationService from '../../Navigation/NavigationService';
import Metrics from "../../Theme/Metrics";

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
        const { handleSubmit } = this.props;
        return(
            <Container>
                <Content padder contentContainerStyle={ApplicationStyles.layout.centerContent}>
                    <View style={ApplicationStyles.layout.contentWidth}>
                        <AppLogo/>
                        <Text style={{ marginBottom: Metrics.section}}>
                            Some description here Some description here Some description here Some description here
                        </Text>
                        <Form>
                            <Field
                                name="pin"
                                placeholder="Pin Code"
                                component={this.renderInput}/>

                            <Field
                                name="confirmPin"
                                placeholder="Confirm Pin Code"
                                component={this.renderInput}/>
                        </Form>
                        <Button block style={FormStyles.submitButton} onPress={handleSubmit(this.submitPin)}>
                            <Text>Next</Text>
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