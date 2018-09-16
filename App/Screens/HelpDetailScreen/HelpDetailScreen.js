import React, {Component} from 'react';
import { Text, Container, Content, H3, View } from 'native-base';
import ApplicationStyles from "../../Theme/ApplicationStyles";

class HelpDetailScreen extends Component {
    render() {
        const { navigation } = this.props;
        const help = navigation.getParam('help', {});
        return(
            <Container>
                <Content padder>
                    <View style={[ApplicationStyles.borders.borderBottom, { marginBottom: 14 }]}>
                        <H3 style={{ fontSize: 18}}>{ help.head }</H3>
                    </View>
                    <Text style={[ApplicationStyles.typography.body, ApplicationStyles.typography.secondaryText]}>{ help.body }</Text>
                </Content>
            </Container>
        )
    }
}
export default HelpDetailScreen;