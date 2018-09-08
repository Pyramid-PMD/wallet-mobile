import React, {Component} from 'react';
import { Container, Content, Form, Item, Input, Button, Text, View } from 'native-base';
import { reduxForm, Field } from 'redux-form';
import AppLogo from '../../Components/AppLogo/AppLogo';
import FormStyles from '../../Theme/FormStyles'
import ApplicationStyles from '../../Theme/ApplicationStyles';
import NavigationService from '../../Navigation/NavigationService';

class ChangePinScreen extends Component {
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

    changePin(values) {
        NavigationService.goBack();
    }

    goToChangePassword() {
        NavigationService.navigate('ChangePassword');
    }

    render() {
        const { handleSubmit } = this.props;
        return(
            <Container>
                <Content padder contentContainerStyle={{ flex: 1, alignItems: 'center', marginTop: 50}}>
                    <View style={ApplicationStyles.layout.contentWidth}>
                        <Form>
                            <Field
                                name="oldPin"
                                placeholder="Old PIN"
                                component={this.renderInput}/>

                            <Field
                                name="newPin"
                                placeholder="New PIN"
                                component={this.renderInput}/>

                            <Field
                                name="newPinConfirm"
                                placeholder="Confirm new PIN"
                                component={this.renderInput}/>
                        </Form>
                        <Button block style={FormStyles.submitButton} onPress={handleSubmit(this.changePin)}>
                            <Text>Done</Text>
                        </Button>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                            <Button light transparent onPress={this.goToChangePassword}>
                                <Text>
                                    Change Account Password
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
    form: 'changePinForm'
})(ChangePinScreen);