import React from 'react';
import { Card, CardItem, Text, Icon, Right, View, H2 } from 'native-base';
import HomeScreenStyles from '../HomeScreenStyles';
import NavigationService from '../../../Navigation/NavigationService';

const Miners = (props) => {
    const { t } = props;
    const miners = [
        {
            name: 'P-001',
            statusName: 'Working'
        },
        {
            name: 'P-002',
            statusName: 'Stopped'
        },
        {
            name: 'P-003',
            statusName: 'Working'
        }

    ];

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