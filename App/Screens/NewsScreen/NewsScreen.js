import React, {Component} from 'react';
import {RefreshControl, FlatList} from 'react-native';
import {connect} from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import {
    Text,
    Container,
    Content,
    ListItem,
    Thumbnail,
    Body,
    Left
} from 'native-base';
import NewsStyles from './NewsStyles';
import NewsActions, {NewsSelectors} from './NewsRedux';
import NavigationService from '../../Navigation/NavigationService';

class NewsScreen extends Component {

    componentDidMount() {
        this.props.getNews();
    }

    render() {
        return(
            <Container>
                {this.renderContent()}
            </Container>
        )
    }

    renderContent() {
        const {refreshing} = this.props;
        console.log('refreshing', refreshing);
        return (
            <Content
                padder
                refreshControl={
                <RefreshControl
                    refreshing={refreshing}
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
                <FlatList data={news}
                      style={NewsStyles.list}
                          renderItem={this.renderNewsItem.bind(this)}/>
            );
        }
    }

    renderNewsItem ({item}) {
        return (
            <ListItem thumbnail style={NewsStyles.listItem} button={true} onPress={this.goToNewsDetail.bind(this, item)}>
                <Left>
                    <Thumbnail large square source={item.thumb}/>
                </Left>
                <Body style={NewsStyles.listItemBody}>
                <Text style={{ marginBottom: 32 }}>{item.title}</Text>
                <Text note>{item.date}</Text>
                </Body>
            </ListItem>
        )
    }

    onScreenFocus() {
        // this.props.getNews();
    }

    goToNewsDetail(news) {
        NavigationService.navigate('NewsDetail', {news});
    }

    onRefresh = () => {
        this.props.getNews({refreshing: true});
    };
}

const mapStateToProps = (state) => ({
    news: NewsSelectors.selectNews(state),
    refreshing: NewsSelectors.selectRefreshStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
    getNews: (refreshing) => dispatch(NewsActions.newsRequest(refreshing))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsScreen);