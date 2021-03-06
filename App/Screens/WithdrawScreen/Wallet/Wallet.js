import React, { Component } from 'react';
import {
    Card,
    CardItem,
    Text,
    Form,
    Input,
    View,
    Left,
    Right,
    Icon,
    Button } from 'native-base';
import { TouchableOpacity } from 'react-native';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import Autocomplete from 'native-base-autocomplete';
import ApplicationStyles from '../../../Theme/ApplicationStyles';
import FormStyles from "../../../Theme/FormStyles";
import ProfileScreenStyles from '../../ProfileScreen/ProfileScreenStyles';
import AutoCompleteInput from '../../../Theme/AutoCompleteInput';
import WalletStyles from './WalletStyles';
import UnderLinedInputWithButtonStyles from '../../../Theme/UnderlinedInputWithButtonStyles';
import NavigationService from '../../../Navigation/NavigationService';
import PinCodeModal from "../../../Modals/PinCodeModal/PinCodeModal";
import WithdrawActions, {WithdrawSelectors} from '../WithdrawRedux';
import {isAddress, required} from "../../../Services/Validators";

class Wallet extends Component {
     state = {
        addresses: [
            '0x863D0C461818D74D7012443E362DC21B7E4A9C52',
            '0x863D0C461818D74D7012443E362DC21B7E4A9C65'
        ],
        query: '',
        modalVisible: false,
        withdrawal: null,
        addressError: null
    };

     componentDidMount() {
         this.props.getAddressList();
     }

    findAddress(query) {
        if (query === '') {
            return [];
        }

        const { addresses } = this.props;
        console.log('addresses', addresses);
        const regex = new RegExp(`${query.trim()}`, 'i');
        return addresses.filter(address => address.search(regex) >= 0);
    }

    scanQrCode() {
        NavigationService.navigate('QrCodeScan');
    }

    openPinCodeModal() {
        this.setState({ modalVisible: true })
    }

    closePinCodeModal() {
        this.setState({ modalVisible: false })
    }

    renderInput({ input, placeholder, onButtonPress, meta: { touched, error, warning } }){
        let hasError= false;
        if(error !== undefined && touched){
            hasError= true;
        }
        return(
        <View style={{flex: 1}}>
            <View style={UnderLinedInputWithButtonStyles.container}>
                <Input
                    {...input}
                    placeholder={placeholder}
                    style={UnderLinedInputWithButtonStyles.input}/>
                <Button
                    onPress={onButtonPress}
                    transparent style={UnderLinedInputWithButtonStyles.button}>
                    <Text style={UnderLinedInputWithButtonStyles.buttonText}>All</Text>
                </Button>
            </View>
            {hasError ? <Text style={FormStyles.error}>{error}</Text> : <Text />}
        </View>

        )
    }


    setAllBalance() {
        const { balance } = this.props;
        if (balance.balance) {
            this.props.change('amount', balance.balance.toString());
        }
    }

    renderAutoCompleteInput() {
        const { query } = this.state;
        const addresses = this.findAddress(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        return (
            <View style={{flex:1}}>
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
                {this.state.addressError ? <Text style={FormStyles.error}>{this.state.addressError }</Text> : <Text />}
            </View>
        );
    }

    configureWithdrawal(values) {
        const withdrawal = {
            amount: values.amount,
            to_addr: this.state.query
        };

        const isAddressValid = this.validateWalletAddress(values.amount);

        if (isAddressValid){
            this.setState({withdrawal});
            this.openPinCodeModal();
        } else {
            this.setState({addressError: 'Please enter valid address'})
        }

    }

    validateWalletAddress(address) {
        return address ? isAddress(address) : false;
    }

    onGetPinCode(pin) {
         const withdrawal = this.state.withdrawal;
         withdrawal.trade_pwd = pin;
         this.props.withdraw(withdrawal);
         this.closePinCodeModal();
    }


    render() {
        const {t, handleSubmit} = this.props;
        return(
            <View>
                <Card style={[ApplicationStyles.card, { paddingTop: 0, marginBottom: 10 }]}>
                    <CardItem style={WalletStyles.cardHeader}>
                        <Left>
                            <Text style={{ marginLeft: 0}}>{t('dashboard:withdrawScreen.wallet')}</Text>
                        </Left>
                        <Right>
                            <Button transparent textStyle={{color: '#87838B'}} onPress={this.scanQrCode}>
                                <Icon name="qrcode-scan" type="MaterialCommunityIcons" />
                            </Button>
                        </Right>
                    </CardItem>
                    <PinCodeModal
                        onGetPinCode={this.onGetPinCode.bind(this)}
                        modalVisible={this.state.modalVisible}
                        closeModal={this.closePinCodeModal.bind(this)}/>
                    <Form>
                        { this.renderAutoCompleteInput() }

                        <Field
                            name="amount"
                            component={this.renderInput}
                            onButtonPress={this.setAllBalance.bind(this)}
                            placeholder={t('dashboard:withdrawScreen.enterAmount')}/>

                    </Form>
                    {/*</CardItem>*/}
                </Card>
                <Button
                    onPress={handleSubmit(this.configureWithdrawal.bind(this))}
                    block
                    style={[FormStyles.submitButton, ProfileScreenStyles.withdrawButton, { margin: 2}]}>
                    <Text>{t('dashboard:withdrawScreen.withdraw')}</Text>
                </Button>
            </View>

        );
    }
}

const mapStateToProps = (state) => ({
    addresses: WithdrawSelectors.selectAddressList(state)
});

const mapDispatchToProps = (dispatch) => ({
    getAddressList: () => dispatch(WithdrawActions.getSavedAddressList()),
    withdraw: (withdrawal) => dispatch(WithdrawActions.sendWithdrawRequest(withdrawal)),
});

const validate = (values, props) => {
    const {t} = props,
        errors = {};

    errors.amount = required(values.amount, t('dashboard:withdrawScreen.errors.amountRequired'));

    return errors;
};

export default reduxForm({
    initialValues: {
        to_addr: '0x863D0C461818D74D7012443E362DC21B7E4A9C52',
        amount: '1'
    },
    form: 'withdrawForm',
    validate
})(connect(mapStateToProps, mapDispatchToProps)(Wallet));