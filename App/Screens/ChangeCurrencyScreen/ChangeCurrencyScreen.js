import React, {Component} from 'react';
import { Text, Container, Content, ListItem, CheckBox, Body, Thumbnail, View } from 'native-base';
import Images from "../../Theme/Images";
import ApplicationStyles from "../../Theme/ApplicationStyles";

class ChangeCurrencyScreen extends Component {
    state = {
        currencies: [
            {
                name: 'ETH',
                icon: Images.iconETH,
                checked: true,
            },
            {
                name: 'BTC',
                icon: Images.iconBTC,
                checked: false
            },
            {
                name: 'USDT',
                icon: Images.iconUSDT,
                checked: false,
            },
            {
                name: 'CNY',
                icon: Images.iconCNY,
                checked: false,
            }
        ]
    };


    onCurrencySelect(selectedCurrency) {
        this.handleCheckedState(selectedCurrency);
        this.changeCurrency();
    }

    handleCheckedState(selectedCurrency) {
        const currencies = this.state.currencies;
        const index = currencies.indexOf(selectedCurrency);
        currencies.map(currency => currency.checked = false);
        currencies[index].checked = !currencies[index].checked;
        this.setState({ currencies });
    }

    changeCurrency() {
        console.log('dispatch change currency action');
    }

    renderCurrencies() {
        return this.state.currencies.map(currency => {
            return (
                <ListItem thumbnail style={ApplicationStyles.checkboxList.listItem} key={currency.name}>
                    <Thumbnail small source={currency.icon}/>
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

export default ChangeCurrencyScreen;