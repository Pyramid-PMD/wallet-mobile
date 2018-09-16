import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import { Modal, TouchableOpacity } from 'react-native';
import {
    Text,
    Button,
    Card,
    Icon,
    Input,
    View,
    Form,
    Item
} from 'native-base';
import { translate } from 'react-i18next';
import PinCodeModalStyles from "./PinCodeModalStyles";
import ApplicationStyles from "../../Theme/ApplicationStyles";
import FormStyles from "../../Theme/FormStyles";

@translate(['common', 'dashboard'], { wait: true })
class PinCodeModal extends Component {

    closeModal() {
        this.props.closeModal();
    }


    renderInput({ input, placeholder, style, meta: { touched, error, warning } }){
        let hasError= false;
        if(error !== undefined){
            hasError= true;
        }
        return(
            <Item style={PinCodeModalStyles.pinCodeInputContainer}>
                <Input
                    {...input}
                    placeholder={placeholder}
                    secureTextEntry
                    style={PinCodeModalStyles.pinCodeInput}/>
            </Item>
        );
    }

    sendPinCode(values) {
        const {trade_pwd} = values;
        this.props.onGetPinCode(trade_pwd);
    }

    render() {
        const {t, modalVisible, handleSubmit} = this.props;
      return (
          <Modal
              animationType="slide"
              visible={modalVisible}
              transparent>
              <TouchableOpacity
                  style={PinCodeModalStyles.modalContainer} onPress={this.closeModal.bind(this)}>
                  <Card style={[ApplicationStyles.card, PinCodeModalStyles.card]}>
                      <Button
                          style={PinCodeModalStyles.closeButton}
                          transparent
                          onPress={this.closeModal.bind(this)}>
                          <Icon
                              name="close"
                              type="EvilIcons"
                              style={PinCodeModalStyles.closeButtonIcon}></Icon>
                      </Button>

                      <View style={{marginHorizontal: 20}}>
                          <Form style={{ marginBottom: 16 }}>
                              <Field
                                  name="trade_pwd"
                                  placeholder={t('dashboard:pinCodeModal.enterPin')}
                                  component={this.renderInput}/>
                          </Form>

                          <Button
                              onPress={handleSubmit(this.sendPinCode.bind(this))}
                              block
                              style={[FormStyles.submitButton, PinCodeModalStyles.submitButton]}>
                              <Text>{t('common:interface.ensure')}</Text>
                          </Button>
                      </View>
                  </Card>
              </TouchableOpacity>
          </Modal>

      );
    }
}
export default reduxForm({
    form: 'withdrawalPinForm'
})(PinCodeModal);

PinCodeModal.propTypes = {
    onGetPinCode: PropTypes.func.isRequired
};