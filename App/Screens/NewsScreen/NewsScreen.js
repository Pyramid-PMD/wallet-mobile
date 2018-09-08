import React, {Component} from 'react';
import { Text, Container, Content, List, ListItem, Thumbnail, Body, Left, View } from 'native-base';
import NewsStyles from "./NewsStyles";
import NavigationService from '../../Navigation/NavigationService';

class NewsScreen extends Component {
    news = [
        {
            title: 'Article 1',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            thumb: require('../../Images/news/thumb.png'),
            image: require('../../Images/news/newsdetail.png'),
            date: '13 min ago'
        },
        {
            title: 'Article 2',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            thumb: require('../../Images/news/thumb.png'),
            image: require('../../Images/news/newsdetail.png'),
            date: '29 min ago'
        }
    ];

    goToNewsDetail(news) {
        NavigationService.navigate('NewsDetail', {news});
    }

    renderNewsItem (news, sectionId, rowId) {
        return (
            <ListItem thumbnail style={NewsStyles.listItem} button={true} onPress={this.goToNewsDetail.bind(this, news)}>
                <Left>
                    <Thumbnail large square source={news.thumb}/>
                </Left>
                <Body style={NewsStyles.listItemBody}>
                    <Text style={{ marginBottom: 32 }}>{news.title}</Text>
                    <Text note>{news.date}</Text>
                </Body>
            </ListItem>
        )
    }

    render() {
        return(
            <Container>
                <Content padder>
                    <List dataArray={this.news}
                          style={NewsStyles.list}
                          renderRow={this.renderNewsItem.bind(this)}>
                    </List>
                </Content>
            </Container>
        )
    }
}

export default NewsScreen;