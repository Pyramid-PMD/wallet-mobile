import React, {Component} from 'react';
import {
    Text,
    Container,
    Content,
    View,
    Icon } from 'native-base';
import { translate } from 'react-i18next';

import ApplicationStyles from "../../Theme/ApplicationStyles";
import Colors from "../../Theme/Colors";

@translate(['common', 'dashboard'], { wait: true })
class MinerDetailScreen extends Component {
    render() {
        const { navigation, t } = this.props;
        const miner = navigation.getParam('miner', {});
        return(
            <Container>
                <Content padder>
                    <View style={[ApplicationStyles.borders.borderBottom, ApplicationStyles.layout.justifyContentBetween]}>
                        <View style={ApplicationStyles.layout.justifyContentStart}>
                            <Icon
                                name="screen-desktop"
                                type="SimpleLineIcons" style={{ color: Colors.secondaryText, marginRight: 6}}/>
                            <Text style={{ color: Colors.secondaryText}}>{ miner.name }</Text>
                        </View>
                        <Text>{miner.statusName}</Text>
                    </View>

                    <View style={{marginTop: 20}}>
                        <Text style={[ApplicationStyles.typography.smallText, ApplicationStyles.typography.secondaryText]}>{t('dashboard:minerDetailScreen.elapsed')}: <Text style={[ApplicationStyles.typography.number]}>120.5</Text>h</Text>

                        <Text style={[ApplicationStyles.typography.smallText, ApplicationStyles.typography.secondaryText]}>{t('dashboard:minerDetailScreen.margin')}: <Text style={[ApplicationStyles.typography.number]}>0.389</Text>PMD</Text>
                    </View>
                </Content>
            </Container>
        )
    }
}
export default MinerDetailScreen;