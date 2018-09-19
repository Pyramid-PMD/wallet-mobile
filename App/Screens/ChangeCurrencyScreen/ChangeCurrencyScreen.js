import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Text, Container, Content, ListItem, CheckBox, Body, Thumbnail, View } from 'native-base';
import Images from "../../Theme/Images";
import ApplicationStyles from "../../Theme/ApplicationStyles";
import ChangeCurrencyActions, {ChangeCurrencySelectors} from './ChangeCurrencyRedux';

class ChangeCurrencyScreen extends Component {

    componentDidMount() {
        const {userCurrency} = this.props;
        console.log('user currency', userCurrency);
        this.handleCheckedState(userCurrency);
    }


    onCurrencySelect(selectedCurrency) {
        this.handleCheckedState(selectedCurrency);
        this.changeCurrency(selectedCurrency);
    }

    handleCheckedState(selectedCurrency) {
        const currencies = this.props.currencies;
        const index = currencies.indexOf(selectedCurrency);
        if (index > -1) {
            currencies.map(currency => currency.checked = false);
            currencies[index].checked = !currencies[index].checked;
            this.setState({ currencies });
        }

    }

    changeCurrency(selectedCurrency) {
        this.props.changeCurrency(selectedCurrency)
    }

    renderCurrencies() {
        return this.props.currencies.map(currency => {
            return (
                <ListItem thumbnail style={ApplicationStyles.checkboxList.listItem} key={currency.name}>
                    <Thumbnail small source={Images['icon' + currency.name.toUpperCase()]}/>
                    <Body style={ApplicationStyles.checkboxList.listItemBody}>
                        <View style={ApplicationStyles.checkboxList.listTextContainer}>
                            <Text>{currency.name}</Text>
                            <CheckBox style={ApplicationStyles.checkboxList.checkbox} checked={currency.checked} onPress={this.onCurrencySelect.bind(this, currency)}/>
                        </View>
                    </Body>
                </ListItem>
            );
        });
    }
    render() {
        return(
            <Container>
                <Content>
                    {this.renderCurrencies()}
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    userCurrency: ChangeCurrencySelectors.selectUserCurrency(state),
    currencies: ChangeCurrencySelectors.selectCurrencies(state)
});


const mapDispatchToProps = (dispatch) => ({
    changeCurrency: (selectedCurrency) => dispatch(ChangeCurrencyActions.changeCurrency(selectedCurrency))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeCurrencyScreen);