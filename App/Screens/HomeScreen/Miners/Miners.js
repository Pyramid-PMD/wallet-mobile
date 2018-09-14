import React from 'react';
import { Card, CardItem, Text, Icon, Right, View, H2 } from 'native-base';
import HomeScreenStyles from '../HomeScreenStyles';
import NavigationService from '../../../Navigation/NavigationService';
import PropTypes from 'prop-types';

const Miners = (props) => {
    const { t, miners } = props;
    const goToMiner = (miner) => {
        NavigationService.navigate('MinerDetail', { miner });
    };

    const renderMinerItems = () => {
        return miners.map((miner, index) => {
            const style = index === miners.length - 1 ?
                [HomeScreenStyles.cardItem, HomeScreenStyles.cardItemLastChild] :
                HomeScreenStyles.cardItem;

            return (

                <CardItem key={ miner.name } style={style} button={true} onPress={goToMiner.bind(this, miner)}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <Icon
                            name="screen-desktop"
                            type="SimpleLineIcons"
                            style={HomeScreenStyles.cardItemIcon}/>
                        <Text style={HomeScreenStyles.cardItemText}>{ miner.name }</Text>
                    </View>

                    <Right>
                        <Text>{miner.statusName}</Text>
                    </Right>
                </CardItem>
            );
        })
    };

    return (
        <View>
            <H2>{t('dashboard:homeScreen.miners')}</H2>
            <Card transparent style={HomeScreenStyles.card}>
                { renderMinerItems() }
            </Card>
        </View>

    );
};

export default Miners;

Miners.propTypes = {
    miners: PropTypes.arrayOf(PropTypes.shape({
        mid: PropTypes.number,
        name: PropTypes.string,
        status: PropTypes.number,
        statusName: PropTypes.string
    }))
};