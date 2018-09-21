import React from 'react';
import { Image } from 'react-native';
import Images from '../../../Theme/Images';
import PropTypes from 'prop-types';
import { List, ListItem, Text, View, H2 } from 'native-base';
import ExchangeIndexStyles from "./ExchangeIndexStyles";
import ApplicationStyles from "../../../Theme/ApplicationStyles";

const ExchangeIndex = (props) => {
    const {t, exchangeIndex} = props;
    const renderExchangeIndexItem = (exchangeIndexItem, sectionId, rowId) => {
        console.log('exchange index', exchangeIndex);
        const comingSoon = parseInt(rowId) === exchangeIndex.length - 1;
        const listItemStyle = rowId === "0" ?
            [ExchangeIndexStyles.listItem, ExchangeIndexStyles.listItemFirstChild]:
                  ExchangeIndexStyles.listItem;

        console.log('coming soon', comingSoon);
        if (comingSoon) {
            return (
                <ListItem style={[listItemStyle, ExchangeIndexStyles.comingSoonItem]}>
                    <Text style={[ApplicationStyles.typography.secondaryText]}>{exchangeIndexItem.name}</Text>
                </ListItem>
            )
        }
        return (
            <ListItem style={listItemStyle}>
                <Image source={Images['bg' + exchangeIndexItem.name]} style={ExchangeIndexStyles.backgroundImage} />
                <Image source={Images['icon' + exchangeIndexItem.name]} style={ExchangeIndexStyles.icon} />
                <View>
                    <Text>{exchangeIndexItem.name}</Text>
                    <Text>{exchangeIndexItem.price}</Text>
                </View>
            </ListItem>
        )
    };

    return (
        exchangeIndex.length > 0 ?
        <View style={ExchangeIndexStyles.container}>
            <H2 style={ExchangeIndexStyles.title}>{t('dashboard:homeScreen.priceIndex')}</H2>
            <List  style={ExchangeIndexStyles.list} dataArray={exchangeIndex} horizontal={true}
                   renderRow={renderExchangeIndexItem}>
            </List>
        </View> : null
    );
};

export default ExchangeIndex;

ExchangeIndex.propTypes = {
    exchangeIndex: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired
        })
    )
};