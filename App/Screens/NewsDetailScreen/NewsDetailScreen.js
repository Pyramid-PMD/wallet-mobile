import React, {Component} from 'react';
import { Image } from 'react-native';
import { Text, Container, Content, H3, View } from 'native-base';
import ApplicationStyles from "../../Theme/ApplicationStyles";

class NewsDetailScreen extends Component {
    render() {
        const { navigation } = this.props;
        const news = navigation.getParam('news', {});
        return(
            <Container>
                <Content padder>
                    <View style={[ApplicationStyles.borders.borderBottom, { marginBottom: 14 }]}>
                        <H3 style={{ fontSize: 18}}>{ news.title }</H3>
                        <Text note>{ news.date }</Text>
                    </View>
                    <Text
                        style={[ApplicationStyles.typography.body]}>
                        { news.body }
                    </Text>
                    <Image
                        source={news.image}
                        resizeMode="cover"
                        style={[ApplicationStyles.image.responsive, { marginVertical: 16, borderRadius: 10}]}/>
                </Content>
            </Container>
        )
    }
}
export default NewsDetailScreen;