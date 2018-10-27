import React from 'react';
import { Image, FlatList } from 'react-native';
import { Constants, WebBrowser } from 'expo';
import PropTypes from 'prop-types';
import { List, ListItem, Text, View, H2 } from 'native-base';
import ExchangeIndexStyles from "./ExchangeIndexStyles";
import ApplicationStyles from "../../../Theme/ApplicationStyles";
import Images from '../../../Theme/Images';


const ExchangeIndex = (props) => {
    const {t, exchangeIndex} = props;
    const renderExchangeIndexItem = (exchangeIndexItem, sectionId, rowId) => {
        const comingSoon = parseInt(rowId) === exchangeIndex.length - 1;
        const listItemStyle = rowId === "0" ?
            [ExchangeIndexStyles.listItem, ExchangeIndexStyles.listItemFirstChild]:
            ExchangeIndexStyles.listItem;
        if (comingSoon) {
            return (
                <ListItem style={[listItemStyle, ExchangeIndexStyles.comingSoonItem]}>
                    <Text style={[ApplicationStyles.typography.secondaryText]}>{exchangeIndexItem.name}</Text>
                </ListItem>
            )
        }
        return (
            <ListItem style={listItemStyle} button onPress={() => openUrl(exchangeIndexItem)}>
                <Image source={Images['bg' + exchangeIndexItem.name]} style={ExchangeIndexStyles.backgroundImage} />
                <Image source={Images['icon' + exchangeIndexItem.name]} style={ExchangeIndexStyles.icon} />
                <View>
                    <Text>{exchangeIndexItem.name}</Text>
                    <Text>{exchangeIndexItem.price}</Text>
                </View>
            </ListItem>
        )
    };



    // const renderExchangeIndexItem = ({item, index}) => {
    //     const comingSoon = parseInt(index) === exchangeIndex.length - 1;
    //     const listItemStyle = index === "0" ?
    //         [ExchangeIndexStyles.listItem, ExchangeIndexStyles.listItemFirstChild]:
    //         ExchangeIndexStyles.listItem;
    //     if (comingSoon) {
    //         return (
    //             <ListItem style={[listItemStyle, ExchangeIndexStyles.comingSoonItem]}>
    //                 <Text style={[ApplicationStyles.typography.secondaryText]}>{item.name}</Text>
    //             </ListItem>
    //         )
    //     }
    //     return (
    //         <ListItem style={listItemStyle} button onPress={() => openUrl(item)}>
    //             <Image source={Images['bg' + item.name]} style={ExchangeIndexStyles.backgroundImage} />
    //             <Image source={Images['icon' + item.name]} style={ExchangeIndexStyles.icon} />
    //             <View>
    //                 <Text>{item.name}</Text>
    //                 <Text>{item.price}</Text>
    //             </View>
    //         </ListItem>
    //     )
    // };

    const openUrl = (coin) => {
        WebBrowser.openBrowserAsync('https://exchange.fcoin.com/ex/gpm/pmd-eth');
    };

    return (
        exchangeIndex.length > 0 ?
        <View style={ExchangeIndexStyles.container}>
            <H2 style={ExchangeIndexStyles.title}>{t('dashboard:homeScreen.priceIndex')}</H2>
            <List  style={ExchangeIndexStyles.list} dataArray={exchangeIndex} horizontal={true}
                   renderRow={renderExchangeIndexItem}>
            </List>
            {/*<FlatList data={exchangeIndex}*/}
                      {/*style={ExchangeIndexStyles.list}*/}
                      {/*renderItem={renderExchangeIndexItem}/>*/}
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