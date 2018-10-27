import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Text, Container, Content, ListItem, CheckBox, Body, Thumbnail, View } from 'native-base';
import Images from "../../Theme/Images";
import ApplicationStyles from "../../Theme/ApplicationStyles";
import ChangeCurrencyActions, {ChangeCurrencySelectors} from './ChangeCurrencyRedux';
import ListRadioButton from "../../Components/ListRadioButton/ListRadioButton";
import {translate} from "react-i18next";

@translate(['dashboard'], { wait: true })
class ChangeCurrencyScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const {t} = screenProps;
        return {
            title: t('dashboard:changeCurrencyScreen.title')
        }
    };
    componentDidMount() {
        const {userCurrency} = this.props;
        this.handleCheckedState(userCurrency);
    }


    onCurrencySelect(selectedCurrency) {
        this.handleCheckedState(selectedCurrency);
        this.changeCurrency(selectedCurrency);
    }

    handleCheckedState(selectedCurrency) {
        const currencies = this.props.currencies;
        const index = currencies.findIndex(currency => currency.name === selectedCurrency.name);
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
            const thumbnail = Images['icon' + currency.name.toUpperCase()];
            return (
                <ListRadioButton
                    key={currency.name}
                    title={currency.name.toUpperCase()}
                    thumbnail={thumbnail}
                    selectedItem={currency}
                    checked={currency.checked}
                    onPress={this.onCurrencySelect.bind(this)}
                />
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
