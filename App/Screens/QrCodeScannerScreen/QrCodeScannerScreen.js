import React, { Component } from 'react';
import {translate} from 'react-i18next';
import { Dimensions} from 'react-native';
import { Container, Text } from 'native-base';
import { BarCodeScanner, Permissions } from 'expo';

@translate(['dashboard', 'common'], { wait: true })
class QrCodeScannerScreen extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const {t} = screenProps;
        return {
            title: t('dashboard:qrCodeLoginScreen.title')
        }
    };

    state = {
        hasCameraPermission: null,
        lastScannedUrl: null,
    };

    componentDidMount() {
        this._requestCameraPermission();
    }

    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };

    _handleBarCodeRead = result => {
        const {navigation} = this.props;
        // if (result.data !== this.state.lastScannedUrl) {
        //     LayoutAnimation.spring();
            // this.setState({ lastScannedUrl: result.data });
            // Alert.alert('Qrcode scanned');
            // NavigationService.goBack();
        // }
        console.log('qr code', result.data);
        navigation.navigate('QrCodeSuccess', {qrCode: result.data});
    };

    render() {
        return (
            <Container>
            {this.state.hasCameraPermission === null
                ? <Text>Requesting for camera permission</Text>
                : this.state.hasCameraPermission === false
                ? <Text style={{ color: '#fff' }}>
                    Camera permission is not granted
                </Text>
                : <BarCodeScanner
                    barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                    onBarCodeRead={this._handleBarCodeRead.bind(this)}
                    style={{
                        height: Dimensions.get('window').height,
                        width: Dimensions.get('window').width,
                    }}
                />}
            </Container>
         );
    }
}
export default QrCodeScannerScreen;