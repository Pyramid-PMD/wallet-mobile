import React, {Component} from 'react';
import { Image, Dimensions } from 'react-native';
import { Text, Container, Content, H3, View } from 'native-base';
import ApplicationStyles from "../../Theme/ApplicationStyles";
import HTML from 'react-native-render-html';
import NewsDetailStyles from "./NewsDetailStyles";

class NewsDetailScreen extends Component {

    getNews() {
        const { navigation } = this.props;
        return navigation.getParam('news', {});
    }

    htmlRenderers() {
        return {
            img: (htmlAttribs) => {
                return(
                    <Image
                        source={{uri: htmlAttribs.src}}
                        resizeMode="cover"
                        style={[ApplicationStyles.image.responsive, { marginVertical: 16, borderRadius: 10}]}/>
                );
            },
            // p: (htmlAttribs, children) => <Text style={ApplicationStyles.typography.body}>{children}</Text>
        }
    }
    renderNews() {
        const news = this.getNews();
        const imageWidth = Dimensions.get('window').width - 36;
        return (
          <View>
              <View style={[ApplicationStyles.borders.borderBottom, { marginBottom: 14 }]}>
                  <H3 style={{ fontSize: 18}}>{ news.title }</H3>
                  <Text note>{ news.date }</Text>
              </View>
              <HTML
                  html={news.content}
                  // renderers={this.htmlRenderers()}
                  tagsStyles={NewsDetailStyles}
                  imagesInitialDimensions={{width: imageWidth}}
                  imagesMaxWidth={imageWidth}/>
              {/*<Text*/}
                  {/*style={[ApplicationStyles.typography.body]}>*/}
                  {/*{ news.body }*/}
              {/*</Text>*/}

          </View>
        );
    }

    render() {
        return(
            <Container>
                <Content padder>
                    {this.renderNews()}
                </Content>
            </Container>
        )
    }
}

export default NewsDetailScreen;