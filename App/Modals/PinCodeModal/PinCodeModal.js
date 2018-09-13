import React, { Component } from 'react';
import { Modal, TouchableOpacity } from 'react-native';
import {
    Text,
    Button,
    Card,
    CardItem,
    Right,
    Left,
    Icon,
    Input,
    View,
    Form,
    Item
} from 'native-base';
import PinCodeModalStyles from "./PinCodeModalStyles";
import ApplicationStyles from "../../Theme/ApplicationStyles";
import FormStyles from "../../Theme/FormStyles";

class PinCodeModal extends Component {
    closeModal() {
        this.props.closeModal();
    }

    withdraw() {
        this.closeModal();
    }
    render() {
      return (
          <Modal
              animationType="slide"
              visible={this.props.modalVisible}
              transparent>
              <TouchableOpacity
                  style={PinCodeModalStyles.modalContainer} onPress={this.closeModal.bind(this)}>
                  <Card style={[ApplicationStyles.card, PinCodeModalStyles.card]}>
                      <Button
                          style={PinCodeModalStyles.closeButton}
                          transparent
                          onPress={this.withdraw.bind(this)}>
                          <Icon
                              name="close"
                              type="EvilIcons"
                              style={PinCodeModalStyles.closeButtonIcon}></Icon>
                      </Button>

                      <View style={{marginHorizontal: 20}}>
                          <Form style={{ marginBottom: 16 }}>
                              <Item style={PinCodeModalStyles.pinCodeInputContainer}>
                                  <Input
                                      placeholder="Please enter your pin code"
                                      style={PinCodeModalStyles.pinCodeInput}/>
                              </Item>
                          </Form>

                          <Button block style={[FormStyles.submitButton, PinCodeModalStyles.submitButton]}>
                              <Text>Ensure</Text>
                          </Button>
                      </View>
                  </Card>
              </TouchableOpacity>
          </Modal>

      );
    }
}
export default PinCodeModal;