import React, {Component} from 'react';
import { Container, Content, Text } from 'native-base';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import Miners from './Miners/Miners';
import HomeActions, { HomeSelectors } from './HomeRedux';
import { MinerListSelectors } from './Miners/MinersRedux';
import ExchangeIndex from './ExhangeIndex/ExchangeIndex';

@translate(['common', 'dashboard'], { wait: true })
class HomeScreen extends Component {
    componentDidMount() {
        this.props.getMiners();
    }

    renderContent() {
        const { t, miners, loading } = this.props;
        console.log('miners', miners);
        if (loading) {
            return <Text>loading</Text>
        }
        return (
            <Content padder>
                <ExchangeIndex t={t} />
                <Miners miners={miners} t={t} />
            </Content>
        );
    }
    render() {
        return(
            <Container>
                { this.renderContent() }
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: HomeSelectors.selectLoading(state),
        miners: MinerListSelectors.selectMiners(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMiners: () => dispatch(HomeActions.minersExchangeRequest())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);