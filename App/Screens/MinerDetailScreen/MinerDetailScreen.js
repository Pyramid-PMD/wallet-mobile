import React, {Component} from 'react';
import {
    Text,
    Container,
    Content,
    ListItem,
    Right,
    Left,
    View,
    Icon } from 'native-base';

import ApplicationStyles from "../../Theme/ApplicationStyles";
import Colors from "../../Theme/Colors";

class MinerDetailScreen extends Component {
    render() {
        const { navigation } = this.props;
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
                        <Text style={[ApplicationStyles.typography.smallText, ApplicationStyles.typography.secondaryText]}>Elapsed: <Text style={[ApplicationStyles.typography.number]}>120.5</Text>h</Text>

                        <Text style={[ApplicationStyles.typography.smallText, ApplicationStyles.typography.secondaryText]}>Margin: <Text style={[ApplicationStyles.typography.number]}>0.389</Text>PMD</Text>
                    </View>
                </Content>
            </Container>
        )
    }
}
export default MinerDetailScreen;