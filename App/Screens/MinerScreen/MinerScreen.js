import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    Text,
    Container,
    Content,
    View,
    Button,
    Spinner,
    Icon } from 'native-base';
import { translate } from 'react-i18next';
import MinerActions, { MinerSelectors } from './MinerRedux'
import ApplicationStyles from "../../Theme/ApplicationStyles";
import Colors from "../../Theme/Colors";
import FormStyles from "../../Theme/FormStyles";

@translate(['common', 'dashboard'], { wait: true })
class MinerDetailScreen extends Component {

    componentDidMount() {
        this.getMiner();
    }

    getMinerFromParams () {
        const { navigation } = this.props;
        return navigation.getParam('miner', {});
    }
    getMiner() {
        const miner = this.getMinerFromParams();
        console.log('miner', miner);
        this.props.getMiner(miner);
    }

    unbindMachine() {
        const {miner, unbindMachine} = this.props;
        unbindMachine(miner.wallet_addr);
    }

    render() {
        return(
            <Container>
                { this.renderContent() }
            </Container>
        )
    }

    renderContent() {
        const { miner, t } = this.props;
        if (miner) {
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
                        <Text style={[ApplicationStyles.typography.smallText, ApplicationStyles.typography.secondaryText, {marginBottom: 10}]}>{t('dashboard:minerDetailScreen.elapsed')}: <Text style={[ApplicationStyles.typography.numberBig]}>{ miner.elapsed }</Text>h</Text>

                        <Text style={[ApplicationStyles.typography.smallText, ApplicationStyles.typography.secondaryText]}>{t('dashboard:minerDetailScreen.margin')}: <Text style={[ApplicationStyles.typography.numberBig]}>{ miner.margin }</Text>PMD</Text>
                    </View>

                    <Button
                        block
                        style={[FormStyles.submitButton, {marginTop: 40}]}
                        onPress={this.unbindMachine.bind(this)}>
                        <Text style={{ marginRight: 5}}>{t('dashboard:minerDetailScreen:unbindMachine')}</Text>
                        {this.props.unbinding ? <Spinner color="#fff"/> : null}
                    </Button>
                </Content>
            );
        }
    }

}

const mapStateToProps = (state) => ({
    loading: MinerSelectors.selectLoading(state),
    miner: MinerSelectors.selectMiner(state),
    unbinding: MinerSelectors.selectUnbinding(state)
});

const mapDispatchToProps = (dispatch) => ({
    getMiner: (mid) => dispatch(MinerActions.minerRequest(mid)),
    unbindMachine: (walletAddress) => dispatch(MinerActions.unbindRequest(walletAddress)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MinerDetailScreen);