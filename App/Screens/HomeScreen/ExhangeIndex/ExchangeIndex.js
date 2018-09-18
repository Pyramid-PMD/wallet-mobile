import React from 'react';
import { Image } from 'react-native';
import Images from '../../../Theme/Images';
import PropTypes from 'prop-types';
import { List, ListItem, Text, View, H2 } from 'native-base';
import ExchangeIndexStyles from "./ExchangeIndexStyles";

const ExchangeIndex = (props) => {
    const {t, exchangeIndex} = props;
    const renderExchangeIndexItem = (exchangeIndex, sectionId, rowId) => {
        const listItemStyle = rowId === "0" ?
            [ExchangeIndexStyles.listItem, ExchangeIndexStyles.listItemFirstChild]:
                  ExchangeIndexStyles.listItem;
        return (
            <ListItem style={listItemStyle}>
                <Image source={Images['bg' + exchangeIndex.name]} style={ExchangeIndexStyles.backgroundImage} />
                <Image source={Images['icon' + exchangeIndex.name]} style={ExchangeIndexStyles.icon} />
                <View>
                    <Text>{exchangeIndex.name}</Text>
                    <Text>{exchangeIndex.price}</Text>
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