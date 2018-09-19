import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    Text,
    Container,
    Content,
    View,
    Icon } from 'native-base';
import { translate } from 'react-i18next';
import MinerActions, { MinerSelectors } from './MinerRedux'
import ApplicationStyles from "../../Theme/ApplicationStyles";
import Colors from "../../Theme/Colors";

@translate(['common', 'dashboard'], { wait: true })
class MinerDetailScreen extends Component {
    componentDidMount() {
        this.getMiner();
    }

    getMiner() {
        const { navigation } = this.props;
        const miner = navigation.getParam('miner', {});
        this.props.getMiner(miner);
    }

    renderContent() {
        const { loading, miner, t } = this.props;
        if (loading) {
            return <Text>loading</Text>
        }
        return(
            <Content padder>
                <View style={[ApplicationStyles.borders.borderBottom, ApplicationStyles.layout.justifyContentBetween]}>
                    <View style={ApplicationStyles.layout.justifyContentStart}>
                        <Icon
                            name="screen-desktop"
                            type="SimpleLineIcons" style={{ color: Colors.secondaryText, marginRight: 6}}/>
                        <Text style={{ color: Colors.secondaryText}}>{ miner.machine_nick }</Text>
                    </View>
                    <Text>{miner.statusName}</Text>
                </View>

                <View style={{marginTop: 20}}>
                    <Text style={[ApplicationStyles.typography.smallText, ApplicationStyles.typography.secondaryText]}>{t('dashboard:minerDetailScreen.elapsed')}: <Text style={[ApplicationStyles.typography.number]}>{ miner.elapsed }</Text>h</Text>

                    <Text style={[ApplicationStyles.typography.smallText, ApplicationStyles.typography.secondaryText]}>{t('dashboard:minerDetailScreen.margin')}: <Text style={[ApplicationStyles.typography.number]}>{ miner.margin }</Text>PMD</Text>
                </View>
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

const mapStateToProps = (state) => ({
    loading: MinerSelectors.selectLoading(state),
    miner: MinerSelectors.selectMiner(state)
});

const mapDispatchToProps = (dispatch) => ({
    getMiner: (mid) => dispatch(MinerActions.minerRequest(mid))
});
export default connect(mapStateToProps, mapDispatchToProps)(MinerDetailScreen);