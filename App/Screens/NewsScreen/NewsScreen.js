import React, {Component} from 'react';
import {RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import {
    Text,
    Container,
    Content,
    List,
    ListItem,
    Thumbnail,
    Body,
    Left
} from 'native-base';
import NewsStyles from './NewsStyles';
import NewsActions, {NewsSelectors} from './NewsRedux';
import NavigationService from '../../Navigation/NavigationService';

class NewsScreen extends Component {

    render() {
        return(
            <Container>
                {this.renderContent()}
            </Container>
        )
    }

    renderContent() {
        return (
            <Content
                padder
                refreshControl={
                <RefreshControl
                    refreshing={false}
                    onRefresh={this.onRefresh}
                />
            }>
                <NavigationEvents
                    onDidFocus={this.onScreenFocus.bind(this)}
                />
                {this.renderNews()}

            </Content>
        );
    }

    renderNews() {
        const {news} = this.props;
        if (news) {
            return (
                <List dataArray={news}
                      style={NewsStyles.list}
                      renderRow={this.renderNewsItem.bind(this)}>
                </List>
            );
        }
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

    onScreenFocus() {
        this.props.getNews();
    }

    goToNewsDetail(news) {
        NavigationService.navigate('NewsDetail', {news});
    }

    onRefresh = () => {
        this.props.getNews();
    };
}

const mapStateToProps = (state) => ({
    news: NewsSelectors.selectNews(state)
});

const mapDispatchToProps = (dispatch) => ({
    getNews: () => dispatch(NewsActions.newsRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsScreen);