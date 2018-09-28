import React, {Component} from 'react';
import { Container, Content, Text } from 'native-base';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import {RefreshControl} from 'react-native';
import Miners from './Miners/Miners';
import HomeActions, { HomeSelectors } from './HomeRedux';
import OverviewActions, {OverviewSelectors} from '../../Redux/Common/Overview/OverviewRedux';
import ExchangeIndex from './ExhangeIndex/ExchangeIndex';


@translate(['common', 'dashboard'], { wait: true })
class HomeScreen extends Component {

    componentDidMount() {
        this.props.getOverview();
    }

    render() {
        return(
            <Container>
                { this.renderContent() }
            </Container>
        )
    }

    renderContent() {
        const { t, miners, loading, exchangeIndex } = this.props;

        return (
            <Content
                padder
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={this.onRefresh}
                    />}>
                {exchangeIndex ? <ExchangeIndex t={t} exchangeIndex={exchangeIndex}/> : null}
                {miners ? <Miners miners={miners} t={t} />: null}
            </Content>
        );
    }


    onScreenFocus = () => {
        this.props.getOverview();
    };

    onRefresh = () => {
        this.props.getOverview();
    };
}

const mapStateToProps = (state) => {
    return {
        loading: HomeSelectors.selectLoading(state),
        miners: OverviewSelectors.selectMiners(state),
        exchangeIndex: OverviewSelectors.selectExchangeIndex(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getOverview: () => dispatch(OverviewActions.overviewRequest())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);