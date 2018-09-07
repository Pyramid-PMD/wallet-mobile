import React from 'react';
import { ImageBackground, Image } from 'react-native';
import { List, ListItem, Text, View, H2 } from 'native-base';
import Images from "../../../Theme/Images";
import ExchangeIndexStyles from "./ExchangeIndexStyles";

const ExchangeIndex = () => {
    const exchangeIndices = [
        {
            name: 'Fcoin',
            price: 99.05,
            icon: require('../../../Images/exchange/icon-Fcoin.png'),
            background: require('../../../Images/exchange/bg-Fcoin.png')
        },
        {
            name: 'Bian',
            price: 103.5,
            icon: require('../../../Images/exchange/icon-Bian.png'),
            background: require('../../../Images/exchange/bg-Bian.png')
        },
    ];

    const renderExchangeIndexItem = (exchangeIndex, sectionId, rowId) => {
        const listItemStyle = rowId === "0" ?
            [ExchangeIndexStyles.listItem, ExchangeIndexStyles.listItemFirstChild]:
                  ExchangeIndexStyles.listItem;
        return (
            <ListItem style={listItemStyle}>
                <Image source={exchangeIndex.background} style={ExchangeIndexStyles.backgroundImage} />
                <Image source={exchangeIndex.icon} style={ExchangeIndexStyles.icon} />
                <View>
                    <Text>{exchangeIndex.name}</Text>
                    <Text>{exchangeIndex.price}</Text>
                </View>
            </ListItem>
        )
    };

    return (
        <View style={ExchangeIndexStyles.container}>
            <H2 style={ExchangeIndexStyles.title}>Price Index</H2>
            <List  style={ExchangeIndexStyles.list} dataArray={exchangeIndices} horizontal={true}
                   renderRow={renderExchangeIndexItem}>
            </List>
        </View>
    );
};

export default ExchangeIndex;