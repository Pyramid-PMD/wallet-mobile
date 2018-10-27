import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {Container, Content, Text, View, Button} from 'native-base';
import FormStyles from "../../Theme/FormStyles";
import QrCodeActions, {QrCodeSelectors} from './QrCodeRedux';
import QrCodeSuccessView from "./QrCodeSuccessView";


@translate(['dashboard', 'common'], { wait: true })
class QrCodeSuccessScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const {t} = screenProps;
        return {
            title: t('dashboard:qrCodeLoginScreen.title')
        }
    };


    componentDidMount() {
        const {navigation, sendQrCode} = this.props;
        const qrCode = navigation.getParam('qrCode', 'mac:DE-15-D3-D3-13-B2\rdisk:S314JA0FA71976');
        sendQrCode(qrCode);
    }

    render() {
        return (
            <Container>
                <Content padder>
                    {this.renderScanSuccessView()}
                </Content>
            </Container>
        );
    }

    renderScanSuccessView() {
        const {loading} = this.props;
        if (loading) return;
        const viewOptions = this.getQrCodeSuccessViewOptions();
        return (
            <QrCodeSuccessView
                title={viewOptions.title}
                successFn={viewOptions.successFn}
                successBtnText={viewOptions.successBtnText}
                cancelBtnText={viewOptions.cancelBtnText}
                cancelFn={viewOptions.cancelFn}
            />
        )
    }

    getQrCodeSuccessViewOptions() {
        const {t, isAccountBound, machineHasUsers} = this.props;
        const viewOptions = {
            cancelBtnText: t('dashboard:qrCodeLoginScreen:cancelLogin'),
            cancelFn: this.cancel.bind(this)
        };

        if (machineHasUsers) {
            viewOptions.title = t('dashboard:qrCodeLoginScreen:machineHasUsers');
            viewOptions.successBtnText = t('dashboard:qrCodeLoginScreen:contactSupport');
            viewOptions.successFn = this.contactSupport.bind(this);
            return viewOptions;
        }

        if (isAccountBound) {
            viewOptions.title = t('dashboard:qrCodeLoginScreen:machineIsBound');
            viewOptions.successBtnText = t('dashboard:qrCodeLoginScreen:confirmLogin');
            viewOptions.successFn = this.confirmLogin.bind(this);
        } else {
            viewOptions.title = t('dashboard:qrCodeLoginScreen:machineIsNotBound');
            viewOptions.successBtnText = t('dashboard:qrCodeLoginScreen:bindMachine');
            viewOptions.successFn = this.bindMachine.bind(this);
        }
        return viewOptions;
    }



    bindMachine() {
        const {walletAddress, bindMachine} = this.props;
        walletAddress && bindMachine(walletAddress);
    }

    contactSupport() {

    }

    confirmLogin() {
        this.props.navigation.popToTop();
    }

    cancel() {
        this.props.navigation.popToTop();
    }

}

const mapStateToProps = (state) => ({
    loading: QrCodeSelectors.selectLoading(state),
    isAccountBound: QrCodeSelectors.selectIsBound(state),
    walletAddress: QrCodeSelectors.selectWalletAddress(state),
    machineHasUsers: QrCodeSelectors.selectMachineHasUsers(state)
});

const mapDispatchToProps = (dispatch) => ({
    sendQrCode: (qrCode) => dispatch(QrCodeActions.sendQrCodeRequest(qrCode)),
    bindMachine: (walletAddress) => dispatch(QrCodeActions.bindMachineRequest(walletAddress))
});

export default connect(mapStateToProps, mapDispatchToProps)(QrCodeSuccessScreen);