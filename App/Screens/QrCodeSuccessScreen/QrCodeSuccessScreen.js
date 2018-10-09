import React, {Component} from 'react';
import {Container, Content, Text, View, Button} from 'native-base';
import FormStyles from "../../Theme/FormStyles";

class QrCodeSuccessScreen extends Component {

    render() {
        const {navigation} = this.props;
        const qrCode = navigation.getParam('qrCode', {});;
        return (
            <Container>
               <Content padder>
                   <Text style={{marginBottom: 60, marginTop: 30}}>{qrCode}</Text>
                   <View>
                       <Button
                           block
                           style={[FormStyles.submitButton, {marginBottom: 16}]}>
                           <Text>some text</Text>
                       </Button>
                       <Button
                           block
                           style={FormStyles.submitButton}>
                           <Text>some text</Text>
                       </Button>
                   </View>
               </Content>
            </Container>
        );
    }
}

export default QrCodeSuccessScreen;