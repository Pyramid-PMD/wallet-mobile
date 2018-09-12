import React, { Component } from 'react';
import {
    Card,
    CardItem,
    Text,
    Form,
    Item,
    Input,
    View,
    Left,
    Right,
    Icon,
    Button } from 'native-base';
import { TouchableOpacity } from 'react-native';
import Autocomplete from 'native-base-autocomplete';

import ApplicationStyles from "../../../Theme/ApplicationStyles";
import FormStyles from "../../../Theme/FormStyles";
import ProfileScreenStyles from "../../ProfileScreen/ProfileScreenStyles";
import AutoCompleteInput from "../../../Theme/AutoCompleteInput";
import WalletStyles from "./WalletStyles";
import UnderLinedInputWithButtonStyles from "../../../Theme/UnderlinedInputWithButtonStyles";
import NavigationService from '../../../Navigation/NavigationService';
import PinCodeModal from "../../../Modals/PinCodeModal/PinCodeModal";

class Wallet extends Component {
     state = {
        addresses: [
            '0x863D0C461818D74D7012443E362DC21B7E4A9C52',
            '0x863D0C461818D74D7012443E362DC21B7E4A9C65'
        ],
        query: '',
        modalVisible: false
    };

    findAddress(query) {
        if (query === '') {
            return [];
        }

        const { addresses } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return addresses.filter(address => address.search(regex) >= 0);
    }

    scanQrCode() {

    }

    openPinCodeModal() {
        this.setState({ modalVisible: true })
    }

    closePinCodeModal() {
        this.setState({ modalVisible: false })
    }


    renderAutoCompleteInput() {
        const { query } = this.state;
        const addresses = this.findAddress(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        return (
            <Autocomplete
                autoCapitalize="none"
                autoCorrect={false}
                inputContainerStyle={AutoCompleteInput.inputContainer}
                containerStyle={AutoCompleteInput.autoCompleteContainer}
                listContainerStyle={AutoCompleteInput.listContainerStyle}
                listStyle={AutoCompleteInput.listStyle}
                data={addresses.length === 1 && comp(query, addresses[0]) ? [] : addresses}
                defaultValue={query}
                onChangeText={text => this.setState({ query: text })}
                style={AutoCompleteInput.inputStyle}
                placeholder="Enter wallet address"
                renderItem={(address) => (
                    <TouchableOpacity onPress={() => this.setState({ query: address })}>
                        <View style={AutoCompleteInput.listItemStyle}>
                            <Text style={AutoCompleteInput.textStyle}>
                                { address }
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

        );
    }
    render() {
        return(
            <View>
                <Card style={[ApplicationStyles.card, { paddingTop: 0, marginBottom: 10 }]}>
                    <CardItem style={WalletStyles.cardHeader}>
                        <Left>
                            <Text style={{ marginLeft: 0}}>Wallet</Text>
                        </Left>
                        <Right>
                            <Button transparent textStyle={{color: '#87838B'}} onPress={this.scanQrCode}>
                                <Icon name="qrcode-scan" type="MaterialCommunityIcons" />
                            </Button>
                        </Right>
                    </CardItem>
                    {/*<CardItem>*/}
                    <PinCodeModal modalVisible={this.state.modalVisible} closeModal={this.closePinCodeModal.bind(this)}/>
                    <Form>
                        { this.renderAutoCompleteInput() }
                        <View style={UnderLinedInputWithButtonStyles.container}>
                            <Input placeholder="Enter amount" style={UnderLinedInputWithButtonStyles.input}/>
                            <Button transparent style={UnderLinedInputWithButtonStyles.button}>
                                <Text style={UnderLinedInputWithButtonStyles.buttonText}>All</Text>
                            </Button>
                        </View>
                    </Form>
                    {/*</CardItem>*/}
                </Card>
                <Button
                    onPress={this.openPinCodeModal.bind(this)}
                    block
                    style={[FormStyles.submitButton, ProfileScreenStyles.withdrawButton, { margin: 2}]}>
                    <Text>Withdraw</Text>
                </Button>
            </View>

        );
    }
}

export default Wallet;