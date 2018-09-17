import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Text, Container, Content, List, ListItem, Thumbnail, Body, Left, View } from 'native-base';
import NewsStyles from './NewsStyles';
import NewsActions, {NewsSelectors} from './NewsRedux';
import NavigationService from '../../Navigation/NavigationService';

class NewsScreen extends Component {
    componentDidMount() {
        this.props.getNews();
    }

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

const mapStateToProps = (state) => ({
    news: NewsSelectors.selectNews(state)
});

const mapDispatchToProps = (dispatch) => ({
    getNews: () => dispatch(NewsActions.newsRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsScreen);